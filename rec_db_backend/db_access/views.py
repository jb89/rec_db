from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.db import connection
from django.forms.models import model_to_dict
import json

from .models import Zutat, Quelle, Rezept, RezeptQuelle, ZutatRezept

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
        data = list(Zutat.objects.values())
        return JsonResponse(data, safe=False)
    except Zutat.DoesNotExist:
        raise Http404("Does not exist")

def get_rezepte_for_quelle_and_zutat(request, quelle_id, zutat_id):
    qry2 = 'select r.id as rezeptId, r.name as rezeptName, rq.stelle as stelle \
    from db_access_rezept r \
    join db_access_rezeptquelle rq on r.id = rq.rezept_fk_id \
    join db_access_zutatrezept zr on r.id = zr.rezept_fk_id \
    join db_access_zutat z on zr.zutat_fk_id = z.id \
    where z.id = %s' % (zutat_id)

    cursor = connection.cursor().execute(qry2)
    columns = [column[0] for column in cursor.description]
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))
    return JsonResponse(results, safe=False)

def set_rezepte_for_quelle_and_zutat(request, rezept_id, quelle_id, zutat_id, stelle):
    r = Rezept.objects.get(id = rezept_id)
    q = Quelle.objects.get(id = quelle_id)
    z = Zutat.objects.get(id = zutat_id)
    rq = RezeptQuelle(quelle_fk = q, rezept_fk = r, stelle = stelle)
    rq.save()
    zr = ZutatRezept(rezept_fk = r, zutat_fk = z)
    zr.save()
    returnDict = model_to_dict(rq)
    returnDict['rezeptName'] = r.name
    returnDict['quelleName'] = q.name
    return JsonResponse(returnDict)