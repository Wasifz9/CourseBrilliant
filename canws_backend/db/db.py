import os
import json

def db_destroy():
    from src.models import Degree_Map, Course_Info, Course_Planning
    Degree_Map.objects.delete() 
    Course_Info.objects.delete() 
    Course_Planning.objects.delete()
    
    
def db_init():
    db_destroy() 
    print('in db init') 

    from src.models import Degree_Map, Course_Info, Course_Planning

    print('starting load') 

    # Loading Degree Data:
    data = json.load(open('./resources/code_map_formatted.json',))
    for key, value in data.items():
        newDegree = Degree_Map(degree_code=key,degree_name=value).save()
    
    print('starting info') 

    # Get the course information data:
    with open('./resources/df_processed.json',) as file:
        for jsonObj in file:
            info_data = json.loads(jsonObj) # 'load' opens a file object and 'loads' takes the file contents.
            if not isinstance(info_data["Course Description"], str):
                info_data["Course Description"] = 'No Description'
            newCourseInfo = Course_Info(course_code=info_data["Code"], 
                                        course_name=info_data["Name"], 
                                        division=info_data["Division"],
                                        department=info_data["Department"],
                                        course_level=info_data["Course Level"],
                                        term=info_data["Term"],
                                        campus=info_data["Campus"],
                                        description=info_data["Course Description"]).save()
            
    
    
    # Get Prerequisite and Postrequsite information:
    postreqs = []
    with open('./resources/graph_postreq.json',) as file:
        for jsonObj in file:
            postreq = json.loads(jsonObj) 
            postreqs.append(postreq)
    print('starting course plan') 
    with open('./resources/df_processed.json',) as file:
        for jsonObj in file:
            info_data = json.loads(jsonObj) 
            if [item["target"] for item in postreqs if item["source"] == info_data["Code"]] == []:
                postReqList = ['No Post-requisites']
            else:
                postReqList = next(item["target"] for item in postreqs if item["source"] == info_data["Code"])
            if not isinstance(info_data["APSC Electives"], str):
                info_data["APSC Electives"] = 'Not APSC Elective'
            if not isinstance(info_data["UTSC Breadth"], str):
                info_data["UTSC Breadth"] = 'Not Part of UTSC Breadth'
            if not isinstance(info_data["Arts and Science Breadth"], str):
                info_data["Arts and Science Breadth"] = 'Not Part of ArtSci Breadth'
            prePost = Course_Planning(course_code = info_data["Code"], 
                                      prerequsities = info_data['Pre-requisites'],
                                      postrequsities =  postReqList, # This field comes from the graph database.
                                      corequisites =  info_data["Corequisite"], 
                                      exclusions = info_data["Exclusion"],
                                      AI_prereqs = info_data["AIPreReqs"],
                                      APSC_electives = info_data["APSC Electives"],
                                      UTSC_breadth = info_data["UTSC Breadth"],
                                      artsci_breadth = info_data["Arts and Science Breadth"],
                                      major_outcomes = info_data["MajorsOutcomes"],
                                      minor_outcomes = info_data["MinorsOutcomes"]).save()
        print('done')
            
