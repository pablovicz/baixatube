from utils.downloader_utils import VideoDownloader

import flask
from flask import request, make_response
from flask_cors import CORS
import base64
import os

app = flask.Flask(__name__)
CORS(app, support_credentials=True)
app.config["DEBUG"] = True


@app.route('/download/<video_id>', methods=['POST'])
def download(video_id):
    request_data = request.get_json()
    video_info = VideoDownloader(request_data, video_id).get_file()
    if os.path.exists(video_info['download_path']):
        with open(video_info['download_path'], 'rb') as fh:
            response = make_response(base64.b64encode(fh.read()), 200)
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.set('Content-Type', 'application/octet-stream')
            response.headers.set(
                'Content-Disposition', 'inline; filename=' + video_info['file_name'])
    return response


app.run()
