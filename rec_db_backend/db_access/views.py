from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.db import connection
from django.forms.models import model_to_dict
import json

from .models import Zutat, Quelle, Rezept, RezeptQuelle, ZutatRezept

def _zuordnung_rezeptquelle(q, r, stelle):
    try:
        rq = RezeptQuelle.objects.get(quelle_fk = q, rezept_fk = r)
    except RezeptQuelle.DoesNotExist:
        rq = RezeptQuelle(quelle_fk = q, rezept_fk = r, stelle = stelle)
        rq.save()
    return rq

def _zuordnung_zutatrezept(z, r):
    try:
        zr = ZutatRezept.objects.get(zutat_fk = z, rezept_fk = r)
    except ZutatRezept.DoesNotExist:
        zr = ZutatRezept(zutat_fk = z, rezept_fk = r)
        zr.save()
    return zr

def put_quelle(request, name, autor):
    q = Quelle(name=name, autor=autor)
    q.save()
    return JsonResponse(model_to_dict(q))

def get_quellen(request):
    try:
        data = list(Quelle.objects.values())
        return JsonResponse(data, safe=False)
    except Quelle.DoesNotExist:
        raise Http404("Does not exist")

def put_rezept(request, name):
    r = Rezept(name=name)
    r.save()
    return JsonResponse(model_to_dict(r))

def get_rezepte(request):
    try:
        data = list(Rezept.objects.values())
        return JsonResponse(data, safe=False)
    except Rezept.DoesNotExist:
        raise Http404("Does not exist")
 

def put_zutat(request, name):
    z = Zutat(name = name)
    z.save()
    return JsonResponse(model_to_dict(z))

def get_zutaten(request):
    try:
        data = list(Zutat.objects.order_by('name').values())
        return JsonResponse(data, safe=False)
    except Zutat.DoesNotExist:
        raise Http404("Does not exist")

def qry_rezepte_for_quelle_and_zutat(quelle_id, zutat_id):
    qry2 = 'select r.id as rezeptId, r.name as rezeptName, rq.stelle as stelle \
    from db_access_rezept r \
    join db_access_rezeptquelle rq on r.id = rq.rezept_fk_id \
    join db_access_zutatrezept zr on r.id = zr.rezept_fk_id \
    join db_access_zutat z on zr.zutat_fk_id = z.id \
    where z.id = %s and rq.quelle_fk_id = %s' % (zutat_id, quelle_id)

    cursor = connection.cursor().execute(qry2)
    columns = [column[0] for column in cursor.description]
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))
    return results


def get_rezepte_with_quelle_for_zutat(request, zutat_id):
    quellen = Quelle.objects.all()
    resultArray = []
    for quelle in quellen:
        rezepte = qry_rezepte_for_quelle_and_zutat(quelle.id, zutat_id)
        if len(rezepte) > 0:
            results = dict()
            results['quelleName'] = quelle.name
            results['rezepte'] = rezepte
            resultArray.append(results)
    return JsonResponse(resultArray, safe=False)

def get_rezepte_for_quelle_and_zutat(request, quelle_id, zutat_id):
    results = qry_rezepte_for_quelle_and_zutat(quelle_id, zutat_id)
    return JsonResponse(results, safe=False)

def set_rezepte_for_quelle_and_zutat(request, rezept_id, quelle_id, zutat_id, stelle):
    r = Rezept.objects.get(id = rezept_id)
    q = Quelle.objects.get(id = quelle_id)
    z = Zutat.objects.get(id = zutat_id)
    rq = _zuordnung_rezeptquelle(r, q, stelle)
    zr = _zuordnung_zutatrezept(z, r)
    returnDict = model_to_dict(rq)
    returnDict['rezeptName'] = r.name
    returnDict['quelleName'] = q.name
    return JsonResponse(returnDict)

# 1) Split by '$'
# Iterate 1) --> Array of Zeilen
# 2) Split by ':'
# [0] = Zutat
# [1] = String of Rezepte
# 3) Split String of Rezepte by ';'
# Iterate 3) --> Array of Rezepte
# 4) Split Array of Rezepte by '#'
# [0] = Rezeptname
# [1] = Stelle
def bulk_rezepte_for_quelle_and_zutat(request, quelleId):
    zutatenCount = 0
    rezepteCount = 0
    try:
        q = Quelle.objects.get(id = quelleId)
    except Quelle.DoesNotExist:
        raise Http404("Quelle does not exist")
    print('Started Bulk import of Rezepte for Zutat for Quelle: ', q.name)
    completeString = request.body.decode('utf-8').removesuffix('$')
    for zutatWithRezepteStr in completeString.split('$'):
        zutatWithRezepteArr = zutatWithRezepteStr.split(':')
        zutatName = zutatWithRezepteArr[0]
        print('Inserting for Zutat: ', zutatName)
        try:
            z = Zutat.objects.get(name = zutatName)
        except Zutat.DoesNotExist:
            z = Zutat(name = zutatName)
            z.save()
        zutatenCount = zutatenCount + 1
        rezepteArr = zutatWithRezepteArr[1].split(';')
        print('Insert %s Rezepte for Zutat: %s' % (len(rezepteArr), z.name))
        for rezeptStr in rezepteArr:
            print('Inserting Rezept: ', rezeptStr)
            rezeptArr = rezeptStr.split('#')
            rezeptName = rezeptArr[0]
            rezeptStelle = rezeptArr[1]
            try:
                r = Rezept.objects.get(name = rezeptName)
            except Rezept.DoesNotExist:
                r = Rezept(name = rezeptName)
                r.save()
            print('Rezept \'%s\' an Stelle %s' % (r.name, rezeptStelle))
            rq = _zuordnung_rezeptquelle(q, r, rezeptStelle)
            zr = _zuordnung_zutatrezept(z, r)
            print('Zurdnung OK: RezeptQuelleId: %s, ZutatRezeptId: %s an Stelle: %s' % (rq.id, zr.id, rq.stelle))
            rezepteCount = rezepteCount + 1

    print('**********Bulk import of %s Zutaten und %s Rezepte completed **********' % (zutatenCount, rezepteCount))
    return HttpResponse()

def bulk_rezepte_for_quelle(request, quelleId):
    rezepteCount = 0
    try:
        q = Quelle.objects.get(id = quelleId)
    except Quelle.DoesNotExist:
        raise Http404("Quelle does not exist")
    print('Started Bulk import of Rezepte for Quelle: ', q.name)
    completeString = request.body.decode('utf-8').removesuffix(';')
    
    rezepteArr = completeString.split(';')
    print('Inserting %s Rezepte' % (len(rezepteArr)))
    for rezeptStr in rezepteArr:
        print('Inserting Rezept: ', rezeptStr)
        rezeptArr = rezeptStr.split('#')
        rezeptName = rezeptArr[0]
        rezeptStelle = rezeptArr[1]
        try:
            r = Rezept.objects.get(name = rezeptName)
        except Rezept.DoesNotExist:
            r = Rezept(name = rezeptName)
            r.save()
        print('Rezept \'%s\' an Stelle %s' % (r.name, rezeptStelle))
        rq = _zuordnung_rezeptquelle(q, r, rezeptStelle)
        print('Zurdnung OK: RezeptQuelleId: %s, an Stelle: %s' % (rq.id, rq.stelle))
        rezepteCount = rezepteCount + 1

    print('**********Bulk import %s Rezepte completed **********' % (rezepteCount))
    return HttpResponse()