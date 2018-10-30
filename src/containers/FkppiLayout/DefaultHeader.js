import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, withRouter} from 'react-router-dom';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logosurvey_s@2x.png'

import drop from '../../assets/img/brand/ico_drop.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    // const todayTime = moment().format('LTS');
    // const today = moment().format('dddd');  
    // const todayDate = moment().format('LL');

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
       
        <Link to={'/'} >
        <AppNavbarBrand style={{width:200, height:145}}
          full={{ src: logo, width: 100, height: 17, alt: 'Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
        />
        </Link>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        
        <Nav className="ml-auto" navbar>
          <div style={{height:52, width:1,background:'#e1e3e4', marginRight:10}}></div>
          <NavItem className="d-md-down-none">
            <div style={{padding:10, textAlign:'right'}}>
              <span style={{color:'#ffbf20', fontFamily:'Roboto', fontWeight:700, fontSize:16}}></span><br />
              <span style={{color:'#adadad', fontFamily:'Roboto', fontWeight:400, fontSize:10}}></span>
            </div>
            
          </NavItem>
          <div style={{height:52, width:1,background:'#e1e3e4', marginRight:10, marginLeft:10}}></div>
          
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin" style={{width:25, height:25}}/>
              <span style={{fontSize:13, marginRight:30,color:'#2d2a26', fontFamily:'Roboto', fontWeight:400}}>Maudy Ayunda</span> 
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
             
           
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
       
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
