import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Well, Button} from 'react-bootstrap'
import DropZone from 'react-dropzone'
import Papa from 'papaparse'
import {addAddressAsynch} from '../ActionTypes/person_actions'

const initialContactState = {
  name: '',
  nickname:'',
  contactId: '',
  userId: '',
  prefix: '',
  email: '',
  birthday: '',
  phone: '',
  address: '',
  employer: '',
  jobTitle: '',
  notes: '',
  relation: ''
}
const initialAddressState = {
      addressId: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
}
class ContactImport extends Component {
    constructor(props){
        super(props)
        this.state = {
            ContactFile: null,
            contacts: [],
            addresses:[],
            files: false
        }
        this.onDrop = this.onDrop.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onDrop(file){
        this.setState({
          ...this.state,
            ContactFile: file,
            files: true
        })
    }

    onChange(){
        for (var i = 0; i < this.state.contacts.length; i++){
            this.props.addContact(JSON.parse(this.state.contacts[i]), JSON.parse(this.state.addresses[i]))
        }
    }

    onSubmit(){
        let ContactFile = this.state.ContactFile[0]
        Papa.parse(ContactFile, {
            complete: (result) =>{
               result.data.map((contact)=>{
                 var contactToAdd1 = initialContactState
                 var addressToAdd1 = initialAddressState
                 contactToAdd1.name = contact.Name
                 contactToAdd1.nickname = contact.Nickname
                 contactToAdd1.userId = this.props.userId
                 contactToAdd1.prefix = contact["Name Prefix"]
                 contactToAdd1.email = contact["E-mail 1 - Value"]
                 contactToAdd1.phone = contact["Phone 1 - Value"]
                 contactToAdd1.birthday = contact.Birthday
                 contactToAdd1.employer = contact["Organization 1 - Name"]
                 contactToAdd1.jobTitle = contact["Organization 1 - Title"]
                 contactToAdd1.notes = contact.Notes
                 contactToAdd1.relation = contact["Relation 1 - Value"]
                 addressToAdd1.streetAddress = contact["Address 1 - Street"]
                 addressToAdd1.city = contact["Address 1 - City"]
                 addressToAdd1.state = contact["Address 1 - Region"]
                 addressToAdd1.zipCode = contact["Address 1 - Postal Code"]
                 addressToAdd1.country = contact["Address 1 - Country"]
                 this.setState({
                   ...this.state,
                    contacts:[
                      ...this.state.contacts,
                      JSON.stringify(contactToAdd1)
                    ],
                    addresses:[
                      ...this.state.addresses,
                      JSON.stringify(addressToAdd1)
                    ]
                 })
               }
             )
             this.onChange()
            },
            header:true,
            skipEmptyLines: true
        })
    }
    render(){
        return (
              <Well>
                <form onSubmit={(e)=>{
                  e.preventDefault()
                  this.onSubmit()}
                }>
                  <DropZone onDrop={this.onDrop}>
                  {({ isDragActive, isDragReject }) => {
                      if (isDragActive) {
                          return "All files will be accepted";
                        }
                        if (isDragReject) {
                          return "Some files will be rejected";
                        }
                        if (this.state.files) {
                            return "CSV file dropped"
                        }
                        return "Drop CSV files here";
                      }}
                  </DropZone>
                  <Button bsStyle="success" type="submit">Import Contacts</Button>
                </form>
              </Well>
        )
    }


}

const mapDispatchToProps = (dispatch) => {
  return {
    addContact : (newContact, newAddress)=> {
      dispatch(addAddressAsynch(newContact, newAddress))
    }
  }
};


export default connect(null, mapDispatchToProps)(ContactImport)
