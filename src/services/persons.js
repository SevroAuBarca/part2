import axios from "axios";
const baseUrl = "api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = (id, newObject) => {
  console.log(id);
  console.log(newObject);

  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const deleted = (id, newObject) => {
  return axios
    .delete(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

export { getAll, create, update, deleted };
