from flask import Blueprint, jsonify
from src.models import Degree_Map, Course_Info, Course_Planning


course_blueprint = Blueprint('course', __name__, )


@course_blueprint.route("/course/degree/<string:degree_code>", methods=["GET"])
def query_degrees_from_code(degree_code):
    degree = Degree_Map.objects(degree_code=degree_code).first()
    if not degree:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify(degree.to_json())


@course_blueprint.route("/course/plan/<string:course_code>", methods=["GET"])
def query_course_info_from_code(course_code):
    course = Course_Planning.objects(course_code=course_code).first()
    if not course:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify(course.to_json())


@course_blueprint.route("/course/info/<string:course_code>", methods=["GET"])
def query_course_planning_from_code(course_code):
    course = Course_Info.objects(course_code=course_code).first()
    if not course:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify(course.to_json())


@course_blueprint.route("/search/<string:text>", methods=["GET"])
def general_search(text):
    result = Course_Info.objects.search_text(text).limit(15)
    if not result:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify(result.to_json())


# @app.route('/api', methods=['PUT'])
# def create_course_record():
#     courseRecord = json.loads(request.data)
#     newCourse = Courses(course_code=courseRecord['course_code'],
#                         course_name=courseRecord['course_name'],
#                         description=courseRecord['description'])
#     newCourse.save()
#     return jsonify(newCourse.to_json())


# @app.route('/api')
# def query_course_records():
#     # #course_code = request.args.get('course_code')
#     # course = Courses.objects(course_code="ERSPE1338").first()
#     # if not course:
#     #     return jsonify({'error': 'data not found'})
#     # else:
#     #     return jsonify(course.to_json())
#     return jsonify({'error': 'data not found'})


# @app.route('/api', methods=['DELETE'])
# def delete_course_record():
#     course_data = json.loads(request.data)
#     course = Courses.objects(course_name=course_data['course_name']).first()
#     if not course:
#         return jsonify({'error': 'course not found'})
#     else:
#         course.delete()
#     return jsonify(course.to_json())