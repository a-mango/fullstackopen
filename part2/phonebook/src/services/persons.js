import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

/**
 * Get all the persons on the server
 */
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

/**
 * Create a new person on the server
 *
 * @param  {} newObject The person to create
 */
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

/**
 * Modifies a person on the server
 *
 * @param  {} id The ID of the person to modify
 * @param  {} newObject The modified person
 */
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request;
};

/**
 * Removes a person from the server
 *
 * @param  {} id The ID of the person to remove
 */
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default { getAll, create, update, remove };
