from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('put_quelle/<str:name>/<str:autor>/', views.put_quelle, name='put_quelle'),
    path('get_quelle/<str:name>/', views.get_quelle, name='get_quelle'),
    path('get_quellen', views.get_quellen, name='get_quellen'),
    path('put_rezept/<str:name>/', views.put_rezept, name='put_rezept'),
    path('get_rezept/<str:name>/', views.get_rezept, name='get_rezept'),
    path('put_zutat/<str:name>/', views.put_zutat, name='put_zutat'),
    path('get_zutat/<str:name>/', views.get_zutat, name='get_zutat'),
    path('put_zutat_rezept/<int:zutat_id>/<int:rezept_id>/<str:menge>/', views.put_zutat_rezept, name='put_zutat_rezept'),
    path('put_rezept_quelle/<int:rezept_id>/<int:quelle_id>/<str:stelle>/', views.put_rezept_quelle, name='put_rezept_quelle'),
]