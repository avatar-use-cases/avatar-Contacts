import {requestError, requestSuccess, requestPending} from './request_actions'
import { getPersons, getContacts, createContact, createAddress, createPerson, getPerson } from '../Functions/dispatch_func'

export const ADD_PERSONS = 'ADD_PERSONS';
export const ADD_CONTACTS = 'ADD_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_PERSON = 'ADD_PERSON';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function addPersons(persons) {
    return { type: ADD_PERSONS, persons}
}

export function addPerson(person) {
    return { type: ADD_PERSON, person}
}
export function addContacts(contacts) {
    return {type: ADD_CONTACTS, contacts}
}

export function addContact(contact) {
    return {type: ADD_CONTACT, contact}
}

export function loginUser(user) {
    return {type: LOGIN, user}
}
export function getPersonsAsynch() {
    return function(dispatch){
        dispatch(requestPending())
        let success = (users)=>{
            dispatch(addPersons(users))
            dispatch(requestSuccess())
        }
        let error = (error)=>{
            dispatch(requestError(error.message))
        }
        getPersons(success,error);
    }
}

export function addPersonAsynch(person) {
    return function(dispatch) {
        dispatch(requestPending())
        let success = (personId) => {
              person.userId = personId
              dispatch(addPerson(person))
              dispatch(requestSuccess())
        }
        let error = (error) => {
            dispatch(requestError())
        }
        dispatch(createPerson(success, error, person))
    }
}

export function loginUserAsynch(id){
  return function(dispatch){
    dispatch(requestPending())
    let success = (user)=>{
      dispatch(requestSuccess())
      dispatch(loginUser(user))
    }
    let error = (error)=>{
      dispatch(requestError(error.message))
    }
    getUser(success,error, id);
  }
}

export function getContactsAsynch() {
    return function(dispatch) {
      dispatch(requestPending())
      let success = (contacts)=>{
          dispatch(addContacts(contacts))
          dispatch(requestSuccess())
      }
      let error = (error)=>{
        dispatch(requestError(error.message))
      }
      getContacts(success, error)
    }

}


export function addContactAsynch(contact) {
    return function(dispatch) {
        dispatch(requestPending())
        contact.addressId = addressId;
        let success = (contactId)=>{
            contact.contactId = contactId;
            dispatch(addContacts(contact))
            dispatch(requestSuccess())
        }
        let error = (error)=>{
            dispatch(requestError(error.message))
        }
        dispatch(createContact(success, error, contact))
    }
}

export function addAddressAsynch(contact, address) {
    return function(dispatch) {
        dispatch(requestPending())
        let success = (addressId) => {
            contact.addressId = addressId
            dispatch(addContactAsynch(contact))
            dispatch(requestSuccess())
        }
        let error = (error) => {
            dispatch(requestError(error.message))
        }
        dispatch(createAddress(success, error, address))
    }
}
