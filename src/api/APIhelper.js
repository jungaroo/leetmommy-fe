/**
 * Helper file to use 
 */
const axios = require('axios');

const API_URL = 'http://leetmommy.herokuapp.com/api';

class SearchAPI {

  static async ping() {
    try {
      const response = await axios.get(`${API_URL}/ping`);
      return response ;
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns an array of links that match the search words.
   * @param {array of strings} searchWords Space separated search word
   * @param {string} cohort 'r13' 'r12' 'r11' 
   */

  static async indexSearch(searchWords, cohort) {
    
    try {
      const response = await axios.get(
        `${API_URL}/index-search?search=${searchWords}&cohort=${cohort}`
        );
      return response.data;
    } catch(error) {
      return {error};
    }

  }
}

module.exports = SearchAPI;