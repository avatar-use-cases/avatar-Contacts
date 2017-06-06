import LoginRegistration from './login_registration_container'
import PersonContainer from './person_container'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Jumbotron} from 'react-bootstrap'

class HomeContainer extends Component{
  render(){

      return(
        <Jumbotron componentClass="div">
          <LoginRegistration />
          <PersonContainer />
        </Jumbotron>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      logged_in: state.person.logged_in
    }
  }

export default connect(mapStateToProps)(HomeContainer)
