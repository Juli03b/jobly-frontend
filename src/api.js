import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getCompanies() {
    let res = await this.request(`companies/`);
    return res;
  }
  
  // Get details on a company by handle

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //  Search for companies by handle

  static async searchCompanies(handle) {
    let res = await this.request(`companies/`, {name: handle});
    return res;
  }

  // Individual API routes

  static async getJobs() {
    let res = await this.request(`jobs/`);
    return res;
  }
  
  /** Get details on a job by handle. */

  static async getJob(handle) {
    let res = await this.request(`jobs/${handle}`);
    return res.company;
  }
  
  //  Search for jobs by handle

  static async searchJobs(handle) {
    let res = await this.request(`jobs/`, {title: handle});
    return res;
  }

  // Sign up -> token

  static async signUp(user){
    let res = await this.request(`auth/register/`, user, "POST");
    return res;
  }

  // Sign In -> token

  static async signIn(user){
    let res = await this.request(`auth/token/`, user, "POST");
    return res;
  }

  // Get user info -> { username, firstName, lastName, isAdmin, applications, jobs }

  static async getUser(username){
    this.token = JSON.parse(localStorage.getItem("token"));
    let res = await this.request(`users/${username}/`);
    return res;
  }

  // Patch info -> { username, firstName, lastName, email, isAdmin }

  static async patchUser(username, user){
    let res = await this.request(`users/${username}/`, user, "PATCH");
    return res;
  }

  // Apply to job -> { applied: job id }

  static async applyToJob(username, id){
    let res = await this.request(`users/${username}/jobs/${id}`, {},"POST");
    return res;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = JSON.parse(localStorage.getItem("token"));

export default JoblyApi;