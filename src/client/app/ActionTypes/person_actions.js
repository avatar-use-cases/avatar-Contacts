import {requestError, requestSuccess, requestPending} from './request_actions'
import { getPersons, getContacts, getAddresses, createContact, createAddress, createPerson, getPerson, deleteContact, deleteAddress} from '../Functions/dispatch_func'
import {findContactsWithUserId, matchContactsWithAddresses} from '../Functions/helper_functions'

export const ADD_PERSONS = 'ADD_PERSONS';
export const ADD_CONTACTS = 'ADD_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_PERSON = 'ADD_PERSON';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const DELETE_CONTACT = 'DELETE_CONTACT'

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

export function removeContact(contactId) {
    return {type: DELETE_CONTACT, contactId}
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

export function getAddressesAsynch(contacts, activeUser) {
      return function (dispatch) {
        dispatch(requestPending())
          let success = (addresses) => {
              let newContacts = matchContactsWithAddresses(contacts, addresses)
              let userContacts = findContactsWithUserId(newContacts, activeUser.userId)
              dispatch(addContacts(userContacts))
              dispatch(requestSuccess())
          }
          let error = (error)=>{
              dispatch(requestError(error.message))
          }
          getAddresses(success, error)
      }
}

export function addPersonAsynch(person) {
    return function(dispatch) {
        dispatch(requestPending())
        let success = (result) => {
              person.userId = result.userId
              dispatch(addPerson(person))
              dispatch(requestSuccess())
        }
        let error = (error) => {
            dispatch(requestError(error.message))
        }
         createPerson(success, error, person)
    }
}


export function getContactsAsynch(activeUser) {
    return function(dispatch) {
      dispatch(requestPending())
      let success = (contacts)=>{
          dispatch(requestSuccess())
          dispatch(getAddressesAsynch(contacts, activeUser))
      }
      let error = (error)=>{
        dispatch(requestError(error.message))
      }
      getContacts(success, error)
    }

}


export function addContactAsynch(contact, address) {
    return function(dispatch) {
        let success = (result)=>{
            let contactAddress = address
            let contactRedux = contact
            contactRedux.contactId = result.contactId;
            contactRedux.address = contactAddress
            dispatch(addContact(contactRedux))
            dispatch(requestSuccess())
        }
        let error = (error)=>{
            dispatch(requestError(error.message))
        }
      createContact(success, error, contact)
    }
}

export function addAddressAsynch(contact, address) {
    return function(dispatch) {
        dispatch(requestPending())
        let success = (result) => {
            let addressRedux = address
            addressRedux.addressId = result.addressId;
            contact.address = result.addressId;
            dispatch(addContactAsynch(contact, addressRedux))
        }
        let error = (error) => {
            dispatch(requestError(error.message))
        }
        createAddress(success, error, address)
    }
}

export function deleteContactAsynch(contact) {
    return function(dispatch) {
        dispatch(requestPending())
        let success = (result) => {
            dispatch(removeContact(contact.contactId))
            dispatch(requestSuccess())
        }
        let successAddress = (result) => {

        }
        let error = (error)=>{
            dispatch(requestError(error.message))
        }
        deleteAddress(successAddress, error, contact.address.addressId)
        deleteContact(success, error, contact.contactId)
    }
}
