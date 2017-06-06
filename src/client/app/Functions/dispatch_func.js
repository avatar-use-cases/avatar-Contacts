
const url = require('../../../../.env').API_HOST;
import axios from 'axios'

export const getPersons = (success, error) => {
    axios.get(`${url}/person?detail`).then((result)=>success(result.data)).catch(error);
}
export const getPerson = (success, error, personId) => {
    axios.get(`${url}/person/${personId}?detail`).then((result)=>success(result.data)).catch(error);
}
export const getContacts = (success, error) => {
    axios.get(`${url}/contact`).then((result)=>success(result.data)).catch(error);
}

export const createPerson = (success, error, person)=> {
    axios.post(`${url}/person`, person).then((result)=>success(result.data.userId)).catch(error);
}

export const createContact = (success, error, contact) => {
    axios.post(`${url}/contact`, contact).then((result)=>success(result.data.contactId)).catch(error);
}

export const createAddress = (success, error, address) => {
    axios.post(`${url}/address`, address).then((result)=>success(result.data.addressId)).catch(error);
}
