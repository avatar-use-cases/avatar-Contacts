import React, {Component} from 'react'
import Contact from './contact'
import PropTypes from 'prop-types';

class Contacts extends Component {
    constructor(props){
        super(props)
        this.getContacts = this.getContacts.bind(this)
    }
    getContacts (){
        return this.props.contacts.map((contact)=><Contact contact={contact} key={contact.contactId}/>)
    }
    render() {

        return (
         <div>
                <h2>Contacts</h2>
                {this.getContacts()}
        </div>
      )

    }

}

Contacts.PropTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Contacts
