# recipe-db
Imagine having a set of vegetables in your fridge and looking for a way of processing them. One could either open every single cookbook or one could simply use this app to find every recipe which is linked to a ingredient.

This App is managing a dataset of cookbooks with its recipes and, most important, its linked ingredients. Aim of this App is searching by an ingredient and receiving linked recipes by a book. 

# build
## django backend
DB should be up to date in sqlite-file. If not, migrate schema via:
python rec_db_backend/manage.py migrate

python rec_db_backend/manage.py runserver

## frontend
rec-db-ui/ng serve
