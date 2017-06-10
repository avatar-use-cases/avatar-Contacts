import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserAutocomplete from './user_autocomplete'
import { loginUser, addContacts, getContactsAsynch} from '../ActionTypes/person_actions'
class Login extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(username){
    let findUserId = (user)=>user.username === username
    let thisUser = this.props.allUsers.find(findUserId)
    if(!thisUser)
      return
    this.props.login(thisUser);
    this.props.getContacts(thisUser);
  }
  render() {
    let username // variable for referencing username <input> element
    let fullName // variable for referencing fullName <input> element
    return(
      <div>
        <UserAutocomplete allUsers={this.props.allUsers} id="login-autocomplete" label="Login" onSubmit={this.onSubmit}/>
      </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(loginUser(user))
    },
    getContacts: (activeUser) => {
      dispatch(getContactsAsynch(activeUser))
    }

  }
}

const mapStateToProps = (state) => {
  return {
    allUsers : state.person.persons
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
