import { ADD_PERSONS, ADD_PERSON, LOGIN, LOGOUT, ADD_CONTACTS, ADD_CONTACT} from '../ActionTypes/person_actions'
import { REQUEST_ERROR, REQUEST_SUCCESS, REQUEST_PENDING } from '../ActionTypes/request_actions'
const initialState = {
    persons : [],
    activeUser: {
      activeUserInfo:{},
      contacts: []
    },
    logged_in: false,
    isFetching: false,
    requestErrorMessage: ''
}
function person(state = initialState, action) {
    switch (action.type) {
        case ADD_PERSONS:
            return {
                ...state,
                persons : action.persons
            }
        case ADD_CONTACTS:
            return {
                ...state,
                activeUser: {
                    ...state.activeUser,
                    contacts: action.contacts
                }
            }
       case ADD_CONTACT:
            return {
                ...state,
                activeUser: {
                    ...state.activeUser,
                    contacts: [
                        ...state.activeUser.contacts,
                        action.contact
                    ]
                }
            }
        case LOGIN:
          return {
              ...state,
              activeUser: {
                ...state.activeUser,
                activeUserInfo: action.user
              },
              logged_in: true
          }
        case LOGOUT:
          return initialState
        case ADD_PERSON:
            return {
                ...state,
                persons: [
                  ...state.persons,
                  action.person
                ],
                activeUser: {
                  ...state.activeUser,
                  activeUserInfo: action.person
                },
                logged_in: true
            }
        case REQUEST_PENDING:
            return {
                ...state,
                isFetching : true,
                fetchErrorMessage : ""
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isFetching : false,
                fetchErrorMessage : ""
            }
        case REQUEST_ERROR:
            return {
                ...state,
                isFetching : false,
                fetchErrorMessage : action.error_message
            }
        default:
            return state
    }
}

export default person;
