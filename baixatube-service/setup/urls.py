from django.contrib import admin
from django.urls import path
from baixatube.views import get_file

urlpatterns = [
    path('admin/', admin.site.urls),
    path('download/', get_file)
]
