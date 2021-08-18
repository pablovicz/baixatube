from pathlib import Path
import datetime
import pytube
import json


class VideoDownloader:

    def __init__(self, request_body):
        body_unicode = request_body.decode('utf-8')
        self.__body = json.loads(body_unicode)
        self.__url = self.__body['url']
        self.__youtube = pytube.YouTube(self.__url)
        self.__file_name = None
        self.__resources_path = Path(__file__).parents[2].joinpath('resources')

    def __get_file_info(self):
        return {'title': self.__youtube.title,
                'author': self.__youtube.author,
                'description': self.__youtube.description,
                'duration': datetime. timedelta(seconds=self.__youtube.length),
                'download_path': str(self.__resources_path.joinpath(self.__youtube.title).joinpath(self.__file_name))
                }

    def __download(self, video=None, audio=None):
        file = None
        if video is not None:
            file_extension = 'mp4'
            file = video
            self.__file_name = f'{self.__youtube.title}({video.resolution}).{file_extension}'
        if audio is not None:
            file_extension = 'mp3'
            file = audio
            self.__file_name = f'{self.__youtube.title}.{file_extension}'
        file.download(str(self.__resources_path), filename=self.__file_name)

    def get_video_by_resolution(self, resolution):
        self.__download(video=self.__youtube.streams.get_by_resolution(resolution=resolution))
        return self.__get_file_info()

    def get_video_highest_resolution(self):
        self.__download(video=self.__youtube.streams.get_highest_resolution())
        return self.__get_file_info()

    def get_video_lowest_resolution(self):
        self.__download(video=self.__youtube.streams.get_lowest_resolution())
        return self.__get_file_info()

    def get_only_audio(self):
        self.__download(audio=self.__youtube.streams.get_audio_only())
        return self.__get_file_info()
