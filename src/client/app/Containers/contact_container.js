
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {deleteContactAsynch} from '../ActionTypes/person_actions'
import {ProgressBar, Well} from 'react-bootstrap'
import Contacts from '../Components/contacts'
import ContactImport from '../Components/contacts_import'
import ContactPrompt from '../Components/add_contacts'

class ContactContainer extends Component
{
    render(){
        if (this.props.contacts === null) {
            return (
                <Well>
                    <ContactPrompt userId={this.props.activeUser.userId} />
                    <ContactImport userId={this.props.activeUser.userId}/>
                </Well>
            )
        } else {
                return (
                <Well>
                  <Contacts contacts={this.props.contacts} onSubmit={this.props.deleteContact}/>
                  <ContactPrompt userId={this.props.activeUser.userId} />
                  <ContactImport userId={this.props.activeUser.userId}/>
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

const mapDispatchToProps = (dispatch) => {
    return {  deleteContact: (contact) => {
          dispatch(deleteContactAsynch(contact))
        }
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer)
