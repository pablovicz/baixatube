from django.http import JsonResponse
from baixatube.utils.downloader_utils import VideoDownloader


# Create your views here.
def get_file(request):
    if request.method == 'POST':
        video = VideoDownloader(request.body).get_file()
        return JsonResponse(video)


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

