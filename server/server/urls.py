from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("gre_chrome/", include("gre_chrome.urls")),
    path("admin/", admin.site.urls),
]
