import Login from '../Components/login'
import Register from '../Components/registration_form'

import { addPersonAsynch } from '../ActionTypes/person_actions'

import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoginRegistration extends Component{

  render(){
      return(
      <div className="text-center">
        <Login />
        <hr/>
        <Register onSubmit={(user)=>this.props.register(user)}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register : (person)=>{
      dispatch(addPersonAsynch(person))
    }
  }
}
export default connect(null,mapDispatchToProps)(LoginRegistration)
