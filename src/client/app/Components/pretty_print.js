import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Well} from 'react-bootstrap'
class PrettyPrint extends Component{
  render(){
        return <Well><pre>{JSON.stringify(this.props.data, null, 2) }</pre></Well>;
  }
}

PrettyPrint.propTypes = {
  data : PropTypes.object.isRequired
}

export default PrettyPrint
