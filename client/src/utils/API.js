import axios from "axios";

const GoogleApi = " https://www.googleapis.com/books/v1/volumes";

export default {
  // Get books from Google
  getBooks: function(query) {
    let queryString = GoogleApi + "?q=" + query.replace(" ", "+");
    return axios.get(queryString);
  },
  // Get books from database
  getBook: function() {
    return axios.get("/api/books/");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a parent to the database
  saveParent: function(parentData) {
    return axios.post("/api/parent", parentData);
  },
  // Saves a child to the database
  saveChild: function(id, childData) {
    return axios.post("/api/child/" + id, childData);
  },
  // Saves a note to the database
  saveNote: function(id, noteData) {
    return axios.post("/api/note/" + id, noteData);
  },
  // Authenticate user
  authenticateUser: function(userData) {
    return axios.post("/api/authenticate", userData);
  },
  // Authenticate user
  authenticate: function() {
    return axios.get("/api/authenticate");
  },
  // Get all child notes
  getNotes: function(id) {
    return axios.get("/api/getnotes/" + id);
  }
};