import commonAPI from "./commonAPI";
import { serverURL } from "./serverURL";


// registerAPI
export const registerAPI = async (reqBody) => {
  return commonAPI("POST", `${serverURL}/register`, reqBody);
};

// loginAPI
export const loginAPI = async (reqBody) => {
  return commonAPI("POST", `${serverURL}/login`, reqBody);
};

//edit-profile
export const updateUserAPI = async (reqBody, reqHeader) => {
  return commonAPI("PUT", `${serverURL}/edit-profile`, reqBody, reqHeader);
};

//change-password
export const updateUserPasswordAPI = async (reqBody, reqHeader) => {
  return commonAPI("PUT", `${serverURL}/change-password`, reqBody, reqHeader);
};

// Fetch list of users
export const getAllUsersAPI = async () => {
  return commonAPI("GET", `${serverURL}/allusers`);
};

//new doc
export const createNewDocAPI = async (userId) => {
  return commonAPI("POST", `${serverURL}/documents`, { owner: userId });
};

//get Doc Title
export const getDocTitleAPI = async (docId) => {
  return commonAPI("GET", `${serverURL}/documents/title/${docId}`);
};

// get doc SharedUsers
export const getdocSharedUsers = async (docId) => {
  return commonAPI("GET", `${serverURL}/documents/sharedusers/${docId}`);
};

// Update document title
export const updateDocTitleAPI = async (docId, reqBody) => {
  return commonAPI(
    "PUT",
    `${serverURL}/documents/title-update/${docId}`,
    reqBody
  );
};

// Add a user to the shared list
export const addSharedUserAPI = async (docId, userEmail) => {
  return commonAPI("PUT", `${serverURL}/documents/add-collaborator`, {
    docId,
    userEmail,
  });
};

// Remove a user from the shared list
export const removeSharedUserAPI = async (docId, userEmail) => {
  return commonAPI("PUT", `${serverURL}/documents/${docId}/remove-user`, {
    userEmail,
  });
};

// Fetch user's documents
export const getUserDocumentsAPI = async (userId) => {
  return commonAPI("GET", `${serverURL}/documents/user/${userId}`);
};

// save doc
export const saveDocAPI = async (docId, reqBody) => {
  return commonAPI("POST", `${serverURL}/documents/${docId}`, reqBody);
};

// load doc
export const loadDocAPI = async (docId) => {
  return commonAPI("GET", `${serverURL}/documents/${docId}`);
};

// removeDoc
export const removeDocAPI = async (id) => {
  return commonAPI("DELETE", `${serverURL}/projects/${id}/remove`, {});
};
