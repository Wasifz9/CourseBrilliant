import axios from 'axios';

const BASE_URI = 'http://localhost:5001';


const client = axios.create({
  baseURL: BASE_URI,
  json: true
});

class SearchClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  // createKudo(search) {
  //   return this.perform('post', '/kudos', repo);
  // }

  // deleteKudo(repo) {
  //   return this.perform('delete', `/kudos/${repo.id}`);
  // }

  getDegree(degree) {
    return this.perform('get', `/course/degree/${degree}`);
  }

  getCourseInfo(course) {
    return this.perform('get', `/course/info/${course}`);
  }

  getCoursePlanInfo(course) {
    return this.perform('get', `/course/plan/${course}`);
  }

  getInfo(text){
    return this.perform('get', `/search/${text}`);
  }

  ////////// This is the start of the queries for recommendation:

  getBreadth(faculty, breadth_type){ 
    return this.perform('get', `/queries/breadth/${faculty}/${breadth_type}`);
  }

  getPrePost(course_type, courseCode){ 
    return this.perform('get', `/queries/prepost/${course_type}/${courseCode}`);
  }

  getMajorMinor(degree_type, degree_path){ 
    return this.perform('get', `/queries/majorminor/${degree_type}/${degree_path}`);
  }

  getSemester(semester){ 
    return this.perform('get', `/queries/semester/${semester}`);
  }

  getLevel(level){ 
    return this.perform('get', `/queries/level/${level}`);
  }

  getCampus(campus){ 
    return this.perform('get', `/queries/campus/${campus}`);
  }

  ////////////////////////////////////////////////////////////

  async perform (method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }).then(resp => {   
      return resp.data ? resp.data : [];
    })
  }
}

export default SearchClient;