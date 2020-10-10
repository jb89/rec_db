from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.db import connection
from django.forms.models import model_to_dict

from .models import Zutat, Quelle

# Create your views here.
def index(request):
    z = Zutat(name='asdf')
    z.save()

    # return HttpResponse(Zutat.objects.all())
    return HttpResponse('beschde')

def put_quelle(request, name, autor):
    q = Quelle(name=name, autor=autor)
    q.save()
    return JsonResponse(model_to_dict(q))

def get_quelle(request, name):
    try:
        q = Quelle.objects.get(name=name)
        return JsonResponse(model_to_dict(q))
    except Quelle.DoesNotExist:
        raise Http404("Does not exist")

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

def get_rezept(request, name):
    try:
        r = Rezept.objects.get(name=name)
        return JsonResponse(model_to_dict(r))
    except Rezept.DoesNotExist:
        raise Http404("Does not exist")    

def put_zutat(request, name):
    z = Zutat(name = name)
    z.save()
    return JsonResponse(model_to_dict(z))

def get_zutat(request, name):
    try:
        z = Zutat.objects.get(name=name)
        return JsonResponse(model_to_dict(z))
    except Zutat.DoesNotExist:
        raise Http404("Does not exist")

def put_zutat_rezept(request, zutat_id, rezept_id, menge):
    # Todo
    return HttpResponse()

def put_rezept_quelle(request, rezept_id, quelle_id, stelle):
    # Todo
    return HttpResponse()
