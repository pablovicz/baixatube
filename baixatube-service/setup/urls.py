from django.contrib import admin
from django.urls import path
from baixatube.views import video_highest_quality, video_lowest_quality, only_audio, video_by_resolution, get_file

urlpatterns = [
    path('admin/', admin.site.urls),
    path('download/', get_file)
    #path('download/<resolution>/', video_by_resolution),
    #path('download/highest/', video_highest_quality),
    #path('download/lowest/', video_lowest_quality),
    #path('download/audio/', only_audio)
]
