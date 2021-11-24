import os
import pickle # We are going to assume the new file will come as a pickle file.
import json
import pandas as pd
from src.models import Degree_Map, Course_Info, Course_Planning

os.chdir("..")
cwd = os.getcwd()

dataDir = os.path.join(cwd, 'resources')
newData = '' # Put the name of the new datafile here. 
postreq_path = ''

updated_data_path = os.path.join(dataDir, newData)
updated_post_path = os.path.join(dataDir, postreq_path)

### We are assuming that the files come as pickle files. In this case, we need to turn them into JSON files.
### The old code will do this and this code bascially takes an existing database and changes the documents that need to be changed.

# Updating the course information:
def update_existing_Course_Info(updated_data_path):
    with open(updated_data_path,) as updated_data:
        for jsonObj in updated_data:
            newDoc = json.loads(jsonObj) # 'load' opens a file object and 'loads' takes the file contents.
            query = {"code" : newDoc["Code"] } # Checks if the course exists within the collection.
            if Course_Info.find(query).count() > 0:
                oldCourse = Course_Info.objects(course_name=newDoc["Code"]).first() # Should just be one course.
                oldCourse.delete() # Deletes the old course information.
                if not isinstance(newDoc["Course Description"], str):
                    newDoc["Course Description"] = 'No Description'
                updatedCourseInfo = Course_Info(course_code=newDoc["Code"], 
                                                course_name=newDoc["Name"], 
                                                division=newDoc["Division"],
                                                department=newDoc["Department"],
                                                course_level=newDoc["Course Level"],
                                                term=newDoc["Term"],
                                                campus=newDoc["Campus"],
                                                description=newDoc["Course Description"]).save()

# Updating the pre and postreqs:
def update_Prerequisites_Postrequsisites(updated_data_path, updated_post_path):
    postreqs = []
    with open(updated_post_path,) as post_file:
        for jsonObj in post_file:
            postreq = json.loads(jsonObj) 
            postreqs.append(postreq)
    
    with open(updated_data_path,) as updated_data:
        for jsonObj in updated_data:
            newDoc = json.loads(jsonObj) 
            query = {"code" : newDoc["Code"] } # Checks if the course exists within the collection.
            if Course_Planning.find(query).count() > 0:
                oldPosts = Course_Planning.objects(course_name=newDoc["Code"]).first() # Should be one doc.
                oldPosts.delete() # Deletes each of the old course postreqs.
                if [item["target"] for item in postreqs if item["source"] == newDoc["Code"]] == []:
                    postReqList = ['No Post-requisites']
                else:
                    postReqList = next(item["target"] for item in postreqs if item["source"] == newDoc["Code"])
                if not isinstance(newDoc["APSC Electives"], str):
                    newDoc["APSC Electives"] = 'Not APSC Elective'
                if not isinstance(newDoc["UTSC Breadth"], str):
                    newDoc["UTSC Breadth"] = 'Not Part of UTSC Breadth'
                if not isinstance(newDoc["Arts and Science Breadth"], str):
                    newDoc["Arts and Science Breadth"] = 'Not Part of ArtSci Breadth'
                prePost = Course_Planning(course_code = newDoc["Code"], 
                                        prerequsities = newDoc['Pre-requisites'],
                                        postrequsities =  postReqList, # This field comes from the graph database.
                                        corequisites =  newDoc["Corequisite"], 
                                        exclusions = newDoc["Exclusion"],
                                        AI_prereqs = newDoc["AIPreReqs"],
                                        APSC_electives = newDoc["APSC Electives"],
                                        UTSC_breadth = newDoc["UTSC Breadth"],
                                        artsci_breadth = newDoc["Arts and Science Breadth"],
                                        major_outcomes = newDoc["MajorsOutcomes"],
                                        minor_outcomes = newDoc["MinorsOutcomes"]).save()