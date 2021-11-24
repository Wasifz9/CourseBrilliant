import axios from 'axios';

const BASE_URI = 'http://localhost:5001';

const client = axios.create({
  baseURL: BASE_URI,
  json: true
});

class PrereqParsingClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  // createKudo(search) {
  //   return this.perform('post', '/kudos', repo);
  // }

  // deleteKudo(repo) {
  //   return this.perform('delete', `/kudos/${repo.id}`);
  // }

  getCoursePrereqs(course) {
    return this.perform('get', `/course/plan/${course}`);
  }

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

export default PrereqParsingClient;
