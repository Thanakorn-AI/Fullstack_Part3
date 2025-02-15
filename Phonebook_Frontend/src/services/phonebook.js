// Phonebook/src/services/phonebook.js
import axios from 'axios';
const baseUrl = 'https://fullstack-part3-i509.onrender.com/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = newPerson => {
  return axios.post(baseUrl, newPerson);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`);
  };
  
  export default { getAll, create, update, remove };
