from . import db 

# Data Model for Degrees:
class Degree_Map(db.Document):
    degree_code = db.StringField()
    degree_name = db.StringField()
    def to_json(self):
        return {"code": self.degree_code,
                "name": self.degree_name
                }


class Course_Info(db.Document):
    course_code = db.StringField()
    course_name = db.StringField()
    division = db.StringField()
    department = db.StringField()
    course_level = db.IntField()
    term = db.ListField()
    campus = db.StringField()
    description = db.StringField()
    meta = {'indexes': [
        {'fields': ['$course_code', "$course_name", "$department", "$description"],
         'default_language': 'english',
         'weights': {'course_code': 2, 'course_name': 20, 'department': 2, 'description': 10}

        }
    ]}
    def to_json(self):
        return {"code": self.course_code,
                "name": self.course_name,
                "div": self.division, 
                "dept": self.department,
                "level": self.course_level,
                "term": self.term,
                "campus": self.campus,
                "desrp": self.description
                }


class Course_Planning(db.Document):
    course_code = db.StringField()
    prerequsities = db.ListField()
    postrequsities = db.ListField() # This field comes from the graph database.
    corequisites = db.ListField() # This field comes from the graph database.
    exclusions = db.ListField()
    AI_prereqs = db.ListField()
    APSC_electives = db.StringField()
    UTSC_breadth = db.StringField()
    artsci_breadth = db.StringField()
    major_outcomes = db.ListField()
    minor_outcomes = db.ListField()
    def to_json(self):
        return {"code": self.course_code,
                "prereqs": self.prerequsities,
                "postreqs": self.postrequsities, 
                "coreqs": self.corequisites,
                "exclusions": self.exclusions,
                "AI": self.AI_prereqs,
                "APSC": self.APSC_electives,
                "UTSC": self.UTSC_breadth,
                "artsci": self.artsci_breadth,
                "majors": self.major_outcomes,
                "minors": self.minor_outcomes
                }