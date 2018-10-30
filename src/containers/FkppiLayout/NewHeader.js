import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, withRouter, Redirect} from 'react-router-dom';
import routes from '../../routes';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler, AppBreadcrumb } from '@coreui/react';
import Time from 'react-time';
import Clock from 'react-live-clock';
import logo from '../../assets/img/brand/logo_fkppi.png'
import drop from '../../assets/img/brand/ico_drop.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {MainApi, DevApi} from '../../views/Api/';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const logox ='https://res.cloudinary.com/catcha/image/upload/v1536118419/logo.png';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class NewHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      error: "",
      redirect: false,
      data : {}
    }
    this.logout = this.logout.bind(this);
  }


  getProf() {
    // Set loading to true to display a Spinner
    let firstname = this.state.firstname;
    this.setState({
        firstname: firstname,
        loading: true
    });
      var url =  DevApi + 'user/profile';
      var that = this;
      return fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token'),
                'Access-Control-Allow-Origin': '*'
              }
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          that.setState({ data : result,
                          loading: false,
                          id: result.id,
                          firstname: result.firstname,
                          avatar: result.avatar
                        });
           //console.log(that.state.data)
        })
        .catch((error) => { console.error(error); });
  }
  
  componentDidMount(){
      this.getProf()
  }


logout(){
  localStorage.setItem("userData",'');
  localStorage.clear();
  this.setState({redirect: true});
  }

  renderBred(){
  
    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[1];
    var pathx = pathArray[2];

    if(pathx == ''){
     
      return(


        <ol className="breadcrumb"><li className="breadcrumb-item"><a href="/fkppi/">Home</a></li><li className="active breadcrumb-item" aria-current="page">{path}</li></ol>

      )

    }else{


      return(


        <ol className="breadcrumb"><li className="breadcrumb-item"><a href="/fkppi/">Home</a></li><li className="breadcrumb-item" aria-current="page"><a href={`/fkppi/${path}`}>{path}</a></li><li className="active breadcrumb-item" aria-current="page">{pathx}</li></ol>

      )

    }

   


  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={'/'}/>)
    }
    let now = new Date()

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const todayTime = moment().format('LTS');
    const today = moment().format('dddd');  
    const todayDate = moment().format('LL');

    return (
      <React.Fragment>
       
       <Col md="12" style={{paddingTop:15}}>
                <Row>
                  <Col className="padding0" xs="2" sm="2" md="2" lg="2">
                  <div className="borderheader">
                  <AppNavbarBrand style={{width:200, height:100}}
                    full={{ src: logox, width: 55, height: 80, alt: 'Fkppi Logo' }}
                    minimized={{ src: logo, width: 55, height: 80, alt: 'Fkppi Logo' }}
                  />
                  </div>
                  </Col>

                  <Col className="padding0" xs="0" sm="3" md="6" lg="5">
                  <p className="headerforum">FORUM KOMUNIKASI PUTRA PUTRI<br></br> PURNAWIRAWAN DAN PUTRA PUTRI TNI POLRI</p>
                  <Row >
                  <Col xs="12" sm="6" md="3" lg="6">
                 
                 
                  {this.renderBred()}
                  </Col>
                  </Row>
                  </Col>
                  
                 <Col className="padding0 displaynone" xs="0" sm="3" md="2" lg="3">
                 <p className="headertime"><strong className="orangetime"><Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} /></strong><br></br><strong>{todayDate}</strong></p>
                  </Col>
                  <Col className="padding0" xs="6" sm="3" md="3" lg="2">
                  <AppHeaderDropdown className="displayinline" direction="down">
                    <DropdownToggle nav>
                      <img src={this.state.avatar} className="img-avatar" alt="admin" style={{width:25, height:25}}/>
                      <span style={{fontSize:13, marginRight:30,color:'#2d2a26', fontFamily:'Roboto', fontWeight:400}}>{this.state.firstname}<i className="fa fa-caret-down ml-2"></i></span>
                      
                    </DropdownToggle>
                    <DropdownMenu right style={{ right: 'auto' }}>
                    <Link className="colorhome" to={'/profile/update'} ><DropdownItem><i className="fa fa-cog"></i> Pengaturan</DropdownItem></Link>
                      <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
                    </DropdownMenu>
                  </AppHeaderDropdown>
                  <Row >
                 <Col className="headerhome" xs="3" sm="12" lg="12">
                 <Link className="colorhome" to={'/'} ><i className="fa fa-home"></i></Link>
                  </Col>
                  </Row>

                  </Col>
                 
                </Row>

            </Col>

        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

NewHeader.propTypes = propTypes;
NewHeader.defaultProps = defaultProps;

export default NewHeader;
