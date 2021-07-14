from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("fetch_word", views.fetch_word, name="fetch_word"),
]
