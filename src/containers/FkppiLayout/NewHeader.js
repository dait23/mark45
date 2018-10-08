import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo_fkppi.png'

import drop from '../../assets/img/brand/ico_drop.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class NewHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const todayTime = moment().format('LTS');
    const today = moment().format('dddd');  
    const todayDate = moment().format('LL');

    return (
      <React.Fragment>
       

        <AppNavbarBrand style={{width:200, height:145}}
          full={{ src: logo, width: 55, height: 80, alt: 'Fkppi Logo' }}
          minimized={{ src: logo, width: 55, height: 80, alt: 'Fkppi Logo' }}
        />

        
       
       
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

NewHeader.propTypes = propTypes;
NewHeader.defaultProps = defaultProps;

export default NewHeader;
