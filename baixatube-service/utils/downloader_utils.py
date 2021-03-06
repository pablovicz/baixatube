from pathlib import Path
import datetime
import pytube
import os


class VideoDownloader:

    def __init__(self, request_body=None, video_id=None):
        self.__body = request_body
        self.__url = f'https://www.youtube.com/watch?v={video_id}'
        self.__youtube = pytube.YouTube(self.__url)
        self.__file_name = None
        self.__storage_path = Path(__file__).parents[1].joinpath('storage')
        self.__storage_helper()

    def __storage_helper(self):
        for f in os.listdir(self.__storage_path):
            os.remove(os.path.join(self.__storage_path, f))

    def __get_file_info(self):
        return {'title': self.__youtube.title,
                'author': self.__youtube.author,
                'description': self.__youtube.description,
                'duration': datetime.timedelta(seconds=self.__youtube.length),
                'file_name': self.__file_name,
                'download_path': str(self.__storage_path.joinpath(self.__file_name))
                }

    def __get_file_name(self):
        file_name = str(self.__youtube.title)
        remove_characters = ['/', '\\', '|', '*', '?', ':', '<', '>', '"']
        for c in remove_characters:
            file_name = file_name.replace(c, '')
        self.__file_name = file_name

    def __download(self, video=None, audio=None):
        file = None
        self.__get_file_name()
        if video is not None:
            file_extension = 'mp4'
            file = video
            self.__file_name = f'{self.__file_name}({video.resolution}).{file_extension}'
        if audio is not None:
            file_extension = 'mp3'
            file = audio
            self.__file_name = f'{self.__file_name}.{file_extension}'
        file.download(str(self.__storage_path), filename=self.__file_name)

    def get_file(self):
        if self.__body['extension'] == 'mp3':
            self.__download(audio=self.__youtube.streams.get_audio_only())
        if self.__body['extension'] == 'mp4':
            if self.__body['quality'] == 'baixa':
                self.__download(video=self.__youtube.streams.get_lowest_resolution())
            if self.__body['quality'] == 'alta':
                self.__download(video=self.__youtube.streams.get_highest_resolution())
        return self.__get_file_info()

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
