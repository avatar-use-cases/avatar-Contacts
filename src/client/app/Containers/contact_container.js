
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {ProgressBar, Well} from 'react-bootstrap'
import Contacts from '../Components/contacts'
import ContactPrompt from '../Components/add_contacts'

class ContactContainer extends Component
{
    render(){
        if (this.props.contacts === null) {
            return (
                <Well>
                    <ContactPrompt userId={this.props.activeUser.userId} />
                </Well>
            )
        } else {
                return (
                <Well>
                <Contacts contacts={this.props.contacts}/>
                  <ContactPrompt userId={this.props.activeUser.userId} />
                </Well>
              )

            }

    }
}




const mapStateToProps = (state) => {
    return {
       contacts: state.person.activeUser.contacts,
       activeUser: state.person.activeUser.activeUserInfo,
    }
}

export default connect(mapStateToProps, null)(ContactContainer)
