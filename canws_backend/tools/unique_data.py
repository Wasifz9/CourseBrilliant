import os
import json

os.chdir("..")
cwd = os.getcwd()

dataDir = os.path.join(cwd, 'resources')

data_path = os.path.join(dataDir, 'df_processed.json')

division = []
department = []
level = []
utsc = []
apsc = []
campus = []
term = []
artsci = []

with open(data_path,) as file:
        for jsonObj in file:
            info_data = json.loads(jsonObj)
            if info_data['Course Level'] == 7:
                level.append((info_data['Code'], info_data['Course Level']))


print(level)

'''
dict_keys(['Code', 'Name', 'Division', 'Course Description', 'Department', 'Pre-requisites', 'Course Level', 
'UTSC Breadth', 'APSC Electives', 'Campus', 'Term', 'Activity', 'Last updated', 'Exclusion', 'UTM Distribution', 
'Corequisite', 'Recommended Preparation', 'Arts and Science Breadth', 'Arts and Science Distribution', 
'Later term course details', 'Course', 'FASEAvailable', 'MaybeRestricted', 'MajorsOutcomes', 'MinorsOutcomes', 'AIPreReqs'])
'''