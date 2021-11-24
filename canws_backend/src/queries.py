from flask import Blueprint, jsonify
from src.models import Degree_Map, Course_Info, Course_Planning

course_queries = Blueprint('queries', __name__, )

# Search/filter for courses by breadth category, APSC electives, and HSS course designation.
@course_queries.route("/queries/breadth/<string:faculty>/<string:breadth_type>", methods=["GET"])
def query_courses_by_breadth_electives(faculty, breadth_type):     
    if faculty == 'scarborough':
        breadth_courses = Course_Planning.objects(UTSC_breadth=breadth_type).limit(15)
    elif faculty == 'arts_and_sciences':
        breadth_courses = Course_Planning.objects(artsci_breadth=breadth_type).limit(15)
    elif faculty == 'apsc':
        breadth_courses = Course_Planning.objects(APSC_electives=breadth_type).limit(15)
    if not breadth_courses:
        return jsonify({'error': 'data not found'})
    return jsonify(breadth_courses.to_json())
    

# Find prereqs and postreqs: This is working now!
@course_queries.route("/queries/prepost/<string:course_type>/<string:courseCode>", methods=["GET"])
def query_prereq_postreq(course_type, courseCode):
    req_courses = Course_Planning.objects(course_code=courseCode).first()
    if not req_courses:
        return jsonify({'error': 'data not found'})
    if course_type == 'prerequisties':
        return jsonify({'prerequisties': req_courses.to_json()['prereqs']})
    elif course_type == 'postrequisities':
        return jsonify({'postrequisities': req_courses.to_json()['postreqs']})


# Search to find courses within a major, minor, or certificate requirements/options that should be available: this is now working!
@course_queries.route("/queries/majorminor/<string:degree_type>/<string:degree_path>", methods=["GET"])
def query_by_major_minor(degree_type, degree_path):
    if degree_type == 'major':
        courses_degree = Course_Planning.objects(major_outcomes__all=[degree_path]).limit(15)
    elif degree_type ==' minor':
        courses_degree = Course_Planning.objects(minor_outcomes__all=[degree_path]).limit(15)
    if not courses_degree:
        return jsonify({'error': 'data not found'})
    return jsonify(courses_degree.to_json())


# Users should be able to input their availability into the website so that they can filter search results to only show 
# courses that fit in their timetables.
@course_queries.route("/queries/semester/<string:semester>", methods=["GET"])
def query_courses_by_semester(semester):
    semester_courses = Course_Info.objects(term__all=[semester]).limit(15)
    if not semester_courses:
        return jsonify({'error': 'data not found'})
    return jsonify(semester_courses.to_json())


# Users should be able to filter search results by year of study.
@course_queries.route("/queries/level/<int:level>", methods=["GET"])
def query_by_year(level):
    course_with_level = Course_Info.objects(course_level=level).limit(15)
    if not course_with_level:
        return jsonify({'error': 'data not found'})
    return jsonify(course_with_level.to_json())


# Users should be able to filter search results by campus availability.
@course_queries.route("/queries/campus/<string:campus>", methods=["GET"])
def query_by_campus(campus):
    campus_courses = Course_Info.objects(campus=campus).limit(15)
    if not campus_courses:
        return jsonify({'error': 'data not found'})
    return jsonify(campus_courses.to_json())



