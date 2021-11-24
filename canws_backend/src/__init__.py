import os
import json 
from flask import Flask, Response, request, jsonify
from flask_mongoengine import MongoEngine

#from app.models import Courses

db = MongoEngine()

def create_app(): 
    app = Flask(__name__)

    app.config['MONGODB_SETTINGS'] = {
        'host': os.environ['MONGODB_HOST'],
        # 'username': os.environ['MONGODB_USERNAME'],
        # 'password': os.environ['MONGODB_PASSWORD'],
        # 'db': 'canws-database'
    }
    
    db.init_app(app)
    
    from src.course import course_blueprint
    app.register_blueprint(course_blueprint)

    from src.queries import course_queries
    app.register_blueprint(course_queries)

    return app 