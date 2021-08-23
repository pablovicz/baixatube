from django.http import JsonResponse
from baixatube.utils.downloader_utils import VideoDownloader
from django.http import HttpResponse
import base64
import os

# Create your views here.
'''
def get_file(request):
    if request.method == 'POST':
        video = VideoDownloader(request.body).get_file()
        print(video['download_path'])
        return JsonResponse(video)
'''


def get_file(request):
    if request.method == 'POST':
        video = VideoDownloader(request.body).get_file()
        if os.path.exists(video['download_path']):
            with open(video['download_path'], 'rb') as fh:
                response = HttpResponse(base64.b64encode(fh.read()), content_type="application/force-download")
                response['Content-Disposition'] = 'inline; filename=' + video['file_name']
                response['file_name'] = video['file_name']
                return response


def video_highest_quality(request):
    if request.method == 'GET':
        video = VideoDownloader(request.body).get_video_highest_resolution()
        return JsonResponse(video)


def video_lowest_quality(request):
    if request.method == 'GET':
        video = VideoDownloader(request.body).get_video_lowest_resolution()
        return JsonResponse(video)


def video_by_resolution(request, resolution):
    if request.method == 'GET':
        video = VideoDownloader(request.body).get_video_by_resolution(resolution)
        return JsonResponse(video)


def only_audio(request):
    if request.method == 'GET':
        video = VideoDownloader(request.body).get_only_audio()
        return JsonResponse(video)

