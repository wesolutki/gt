from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)
import os

def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path) if ".git" not in x]
    else:
        d['type'] = "file"
    return d

class HelloWorld(Resource):
    def get(self):
        return path_to_dict("..\..");

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)