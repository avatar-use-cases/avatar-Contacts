
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ProgressBar, Well} from 'react-bootstrap'
import Persons from '../Components/persons'
class PersonContainer extends Component
{
    render(){
        if (!this.props.isFetching) {
            return (
                <Well>
                    <Persons persons={this.props.persons}/>
                </Well>
            )
        } else {
                return <ProgressBar active label="Loading" now = {50}/>
            }

    }
}




const mapStateToProps = (state) => {
    return {
       persons: state.person.persons,
       isFetching: state.person.isFetching
    }
}

export default connect(mapStateToProps, null)(PersonContainer)
