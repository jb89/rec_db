from django.urls import path

from . import views

urlpatterns = [
    path('get_quellen', views.get_quellen, name='get_quellen'),
    path('put_quelle/<str:name>/<str:autor>/', views.put_quelle, name='put_quelle'),
    path('get_zutaten', views.get_zutaten, name='get_zutaten'),
    path('put_zutat/<str:name>/', views.put_zutat, name='put_zutat'),
    path('get_rezepte_for_quelle_and_zutat/<int:quelle_id>/<int:zutat_id>/', views.get_rezepte_for_quelle_and_zutat, name='get_rezepte_for_quelle_and_zutat'),
    path('get_rezepte', views.get_rezepte, name='get_rezepte'),
    path('put_rezept/<str:name>/', views.put_rezept, name='put_rezept'),
    path('set_rezepte_for_quelle_and_zutat/<int:rezept_id>/<int:quelle_id>/<int:zutat_id>/<str:stelle>/', views.set_rezepte_for_quelle_and_zutat, name='set_rezepte_for_quelle_and_zutat'),
]