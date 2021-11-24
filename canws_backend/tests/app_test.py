import os
import pytest
import json
from flask import Flask, Response, request, jsonify
from flask_mongoengine import MongoEngine
from db.db import db_init, db_destroy

@pytest.fixture
def client():
    db = MongoEngine()

    app = Flask(__name__)

    app.config['MONGODB_SETTINGS'] = {
        'host': os.environ['MONGODB_HOST'],
        'username': os.environ['MONGODB_USERNAME'],
        'password': os.environ['MONGODB_PASSWORD'],
        'db': 'canws-database'
    }
    
    from src.course import course_blueprint
    app.register_blueprint(course_blueprint)

    db.init_app(app)
    db_init()
    yield app.test_client()
    db_destroy()

# wasif zulkernine
def test_code_map_route(client):
    response = client.get("/course/degree/ASSPE1305", content_type="html/text")
    data = json.loads(response.data)
    assert data == {"code": "ASSPE1305",
                             "name": "Sp Developmental Biology"}


def test_code_info_route(client):
    response = client.get("/course/info/ACT391H1", content_type="html/text")
    data = json.loads(response.data)
    assert data  == {"campus":"St. George",
                             "code":"ACT391H1",
                             "dept":"Statistical Sciences",
                             "desrp":"Internship course for students enrolled in the Actuarial Science Specialist, fulfilled as a 12-week work term in a workplace related to actuarial science in third or fourth year. ACT390H1 must be completed first in preparation. Contact Department for more information. (No tuition fee associated, however an ancillary fee of $720 will be assessed towards Professional Experience placement.)",
                             "div":"Faculty of Arts and Science",
                             "level":3,
                             "name":"Professional Internship",
                             "term":["2021 Summer Y"]}


def test_code_plan_route(client):
    response = client.get("/course/plan/ACT391H1", content_type="html/text")
    data = json.loads(response.data)
    assert data == { "AI": [], 
                             "APSC": "Not APSC Elective", 
                             "UTSC": "Not Part of UTSC Breadth",
                             "artsci": "(5) The Physical and Mathematical Universes", 
                             "code": "ACT391H1", 
                             "coreqs": [], 
                             "exclusions": [], 
                             "majors": [], 
                             "minors": [], 
                             "postreqs": ["No Post-requisites"], 
                             "prereqs": []}
