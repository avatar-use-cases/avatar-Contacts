import React, { Component, PropTypes, StyleSheet} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import UserAutocomplete from './user_autocomplete'
import PrettyPrint from './pretty_print'
import {Well, Button} from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css';
import {addAddressAsynch} from '../ActionTypes/person_actions'

const initialContactState = {
  name: '',
  nickname:'',
  contactId: '',
  userId: '',
  prefix: '',
  email: '',
  birthday: moment().format('MM/DD/YYYY'),
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
class ContactPrompt extends Component{
  constructor(props) {
    super(props);
    this.state = {
      contact: initialContactState,
      address: initialAddressState
    }
    this.onChange = this.onChange.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
  }

  onChange(name, value) {
    this.setState({
      ...this.state,
        contact: {
          ...this.state.contact,
          [name]: value
        }
    });
  }

  onChangeAddress(name, value) {
      this.setState({
        ...this.state,
          address: {
            ...this.state.address,
            [name]:value
          }
      })

  }

  onSubmission() {
    //These props are required for each event object
      this.state.contact.userId = this.props.userId
      console.log(this.state.contact)
      this.props.addContact(this.state.contact, this.state.address);
      this.setState({contact:initialContactState})
      this.setState({address:initialAddressState})
  }
  render(){
    /*Will replace with Date Pickers*/
    return(
        <Well>
          <form onSubmit={(e) => {
                    e.preventDefault();
                    this.onSubmission();
                }}>
            <input name="name" placeholder ="Contact Name" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
                    }}/>
            <input name="nickname" placeholder="Contact Nickname (optional)" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
            }} />
            <input name="prefix" placeholder="Contact Prefix (optional)" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
                    }} />
            <input name="email" placeholder="Contact Email" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
                    }} />
            <input name="phone" placeholder="Contact Phone Number" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value)
            }} />
            <DatePicker selected = {moment(this.state.contact.birthday, 'MM/DD/YYYY')}
                                  onChange={(e)=> {
                                  this.onChange("birthday", e.format('MM/DD/YYYY'));
                                  }}
                                  placeholderText="birthday"
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
            />
            <input name="streetAddress" placeholder ="Contact Street Address" onChange={(e)=>{
                        this.onChangeAddress(e.target.name, e.target.value);
                    }}/>
            <input name="city" placeholder="Contact City" onChange={(e)=>{
                        this.onChangeAddress(e.target.name, e.target.value);
                    }} />
            <input name="state" placeholder="Contact State" onChange={(e)=>{
                        this.onChangeAddress(e.target.name, e.target.value);
                    }} />
            <input name="zipCode" placeholder="Contact zipCode" onChange={(e)=>{
                        this.onChangeAddress(e.target.name, e.target.value);
            }} />
            <input name="country" placeholder="Contact Country" onChange={(e)=>{
                        this.onChangeAddress(e.target.name, e.target.value)
            }} />
            <input name="employer" placeholder="Employer" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
                    }}/>
            <input name="jobTitle" placeholder="Job Title" onChange={(e)=>{
                        this.onChange(e.target.name, e.target.value);
            }} />
            <input name="notes" placeholder="Any Comments on the Contact" onChange={(e)=>{
                      this.onChange(e.target.name, e.target.value);
            }}/>
            <input name="relation" placeholder="User's relation to Contact (e.g. Brother, Client, etc.)" onChange={(e)=>{
                      this.onChange(e.target.name, e.target.value);
            }}/>
            <Button bsStyle="primary" type="submit">Add Contact</Button>
          </form>
          <PrettyPrint data={this.state.contact}/>
          <PrettyPrint data={this.state.address}/>
        </Well>)
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    addContact : (newContact, newAddress)=> {
      dispatch(addAddressAsynch(newContact, newAddress))
    }
  }
};

export default connect(null, mapDispatchToProps)(ContactPrompt)
