import React, {Component} from 'react'
import {Well, ListGroup, ListGroupItem} from 'react-bootstrap'
import PropTypes from 'prop-types'

class Contact extends Component {

    render() {
      var contact = this.props.contact
      return (
          <ListGroup>
            <ListGroupItem><h2>{contact.name}</h2></ListGroupItem>
            <ListGroupItem>{contact.nickname}</ListGroupItem>
            <ListGroupItem>{contact.birthday}</ListGroupItem>
            <ListGroupItem>{contact.email}</ListGroupItem>
            <ListGroupItem>{contact.phone}</ListGroupItem>
            <ListGroupItem>{contact.address.streetAddress}</ListGroupItem>
            <ListGroupItem>{contact.address.city}</ListGroupItem>
            <ListGroupItem>{contact.address.state}</ListGroupItem>
            <ListGroupItem>{contact.address.zipCode}</ListGroupItem>
            <ListGroupItem>{contact.address.country}</ListGroupItem>
            <ListGroupItem>{contact.employer}</ListGroupItem>
            <ListGroupItem>{contact.jobTitle}</ListGroupItem>
            <ListGroupItem>{contact.relation}</ListGroupItem>
            <ListGroupItem>{contact.notes}</ListGroupItem>
          </ListGroup>
      )
    }
}

Contact.PropTypes = {
    contact: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Contact
