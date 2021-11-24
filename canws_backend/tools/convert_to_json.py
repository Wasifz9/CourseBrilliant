import os
import pickle 
import json
import pandas as pd
from numpy import load
from scipy.sparse import csc_matrix
import networkx as nx

os.chdir("..")
cwd = os.getcwd()

dataDir = os.path.join(cwd, 'resources')

# Loading df_processed.pickle into JSON:
df_path = os.path.join(dataDir, 'df_processed.pickle')
with open(df_path, 'rb') as f:
    data = pickle.load(f)

data = data.to_dict(orient='records')

for doc in data:
    doc['Term'] = list(doc['Term'])
    doc['Activity'] = list(doc['Activity'])  

path_data_json = os.path.join(dataDir, 'df_processed.json')
with open(path_data_json, 'w') as f: 
    for doc in data:
        json.dump(doc, f)
        f.write('\n')


# Loading code_map_formatted.pickle into JSON:
code_map_path = os.path.join(dataDir, 'code_map_formatted.pickle')
with open(code_map_path, 'rb') as fm:
    map_data = pickle.load(fm)

map_path_data_json = os.path.join(dataDir, 'code_map_formatted.json')
with open(map_path_data_json, 'w') as fm: 
    json.dump(map_data, fm)


# Loading fake_registration_data.csv into JSON:
fake_reg = pd.read_csv(os.path.join(dataDir, 'fake_registration_data.csv'), delimiter=',')

fake_reg = fake_reg.to_dict(orient='records')

reg_data_json = os.path.join(dataDir, 'fake_registration_data.json')
with open(reg_data_json, 'w') as fr: 
    for doc in fake_reg:
        json.dump(doc, fr)
        fr.write('\n')


# Loading npz file:
course_vec = load(os.path.join(dataDir, 'course_vectors.npz'), allow_pickle=True)
course_coords = course_vec.tocoo(copy=False) # Return coordiante representation of CSC matrix.
course_vec_dataframe = pd.DataFrame({'row': course_coords.row, 'col': course_coords.col, 'data': course_coords.data})
course_vec_json = course_vec_dataframe.to_dict(orient='records')

course_vec_data_json = os.path.join(dataDir, 'course_vectors.json')
with open(course_vec_data_json, 'w') as fcv: 
    for doc in course_vec_json:
        json.dump(doc, fcv)
        fcv.write('\n')


# Converting the graph into a JSON:
graph_path = os.path.join(dataDir, 'graph.pickle')
with open(graph_path, 'rb') as fg:
    graph_data = pickle.load(fg)
edge_list = nx.to_pandas_edgelist(graph_data) # Returns edgelist as a pandas dataframe.
edge_list_json = edge_list.to_dict(orient='records')

# Postreq Courses:
final_edge_list_json = []
course_hash = {}
course_index = 0
for edge in edge_list_json:
    if edge['source'] not in course_hash:
        new_doc = {"source": edge['source'], "target": [edge["target"]]} 
        course_hash[edge['source']] = course_index
        final_edge_list_json.append(new_doc)
        course_index += 1
    else:
        idx = course_hash[edge['source']]
        final_edge_list_json[idx]["target"].append(edge["target"]) 

graph_data_json = os.path.join(dataDir, 'graph_postreq.json')
with open(graph_data_json, 'w') as fg: 
    for doc in final_edge_list_json:
        json.dump(doc, fg)
        fg.write('\n')

# Prereq Courses:
graph_data_predecessor = os.path.join(dataDir, 'graph_prereq.json')
with open(graph_data_predecessor, 'w') as fp: 
    for course_node in edge_list['target']:
        predecessor_courses =  list(graph_data.predecessors(course_node))
        prereq_doc = {"target": course_node, "prereq": predecessor_courses} 
        json.dump(prereq_doc, fp)
        fp.write('\n')   
