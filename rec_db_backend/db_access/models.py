from django.db import models

# Create your models here.

class Zutat(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
            return self.name

class Quelle(models.Model):
    name = models.CharField(max_length=20, unique=True)
    autor = models.CharField(max_length=20)
    def __str__(self):
            return self.name

class Rezept(models.Model):
    name = models.CharField(max_length=20, unique=True)
    def __str__(self):
            return self.name

class RezeptQuelle(models.Model):
    rezept_fk = models.ForeignKey(Rezept, on_delete=models.CASCADE)
    quelle_fk = models.ForeignKey(Quelle, on_delete=models.CASCADE)
    stelle = models.CharField(max_length=150)

class ZutatRezept(models.Model):
    zutat_fk = models.ForeignKey(Zutat, on_delete=models.CASCADE)
    rezept_fk = models.ForeignKey(Rezept, on_delete=models.CASCADE)
    menge = models.CharField(max_length=20, null=True)