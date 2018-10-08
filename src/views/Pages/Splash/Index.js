import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import RetinaImage from 'react-retina-image';

 const dt = new Date();

 const years = dt.getFullYear();

class Splash extends Component {
  render() {
    return (
      <div className="appx flex-row align-items-center bg-purple">
        <Container>
          <Row className="justify-content-center" style={{marginTop:'-5%'}}>

              <img src="assets/img/logo_catcahsurvey.png" alt="logo catcha"/>
          <div className="bg-splash"></div>
          <div style={{width:'100%', position:'fixed', bottom: 80, textAlign:'center'}}>
            <img src="assets/img/superadmin_ico.png" alt="admin" width="20%"/>
          </div>
           <div className="bg-footer">

             <p>&copy; {years} Catcha all rights reserved.</p>
           </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Splash
