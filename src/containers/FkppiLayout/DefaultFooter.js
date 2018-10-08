import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

 const dt = new Date();

 const years = dt.getFullYear();

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span style={{color:'#adadad', fontFamily:'Roboto', fontWeight:400, fontSize:10}}><a href="#">Fkppi</a> &copy; {years} Fkppi Super Admin</span>

      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
