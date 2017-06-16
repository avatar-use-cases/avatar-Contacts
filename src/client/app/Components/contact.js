import React, {Component} from 'react'
import {Well, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

class Contact extends Component {

  constructor(props){
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(){
      let contact = this.props.contact
      this.props.onSubmit(contact)
  }

    render() {
      var contact = this.props.contact

      return (
        <form onSubmit={(e)=>{
          e.preventDefault()
          this.onSubmit()}
        }>
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
          <Button bsStyle="danger" type="submit">Delete Contact</Button>
        </form>
      )
    }
}

Contact.PropTypes = {
    contact: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Contact
