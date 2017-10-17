import axios from 'axios';
import apiURL from './api';

export function getCustomerList() {
  return axios.get(apiURL).then(response => response.data);
}

export const createCustomer = function(customer) {
  return axios.post(apiURL, customer).then(response => response.data);
}

export const getCustomer = function(id) {
  return axios.get(apiURL + id).then(response => response.data);
}

export const updateCustomer = function(id, obj) {
  return axios.patch(apiURL + id, obj).then(response => response.data);
}

export const deleteCustomer = function(id) {
  return axios.delete(apiURL + id).then(response => response.data);
}
