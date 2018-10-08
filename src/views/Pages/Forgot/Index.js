import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  FormGroup,
  Label,
  InputGroupAddon,
  InputGroupText,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

class Forgot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      success: false,
      danger: false,

    };

    this.toggle = this.toggle.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }


  render() {
    return (
      <div className="appx flex-row align-items-center bg-purple" style={{paddingBottom:80}}>
        <div className="bg-splash"></div>
        <Container>

         <Row className="justify-content-center">
           <Col md="4">
             <div style={{width: '100%',textAlign:'center', marginBottom:20}}>

              <img src="assets/img/logo_catcha_survey_2.png" alt="logo catcha" style={{marginBottom:30}}/>
              <h1 style={{color:'#fff', fontFamily:'Roboto', fontSize:30, fontWeight:700, marginTop:30}}>Change Your Password</h1>
              <div style={{padding:10}}>
                <p style={{color:'#fff', fontFamily:'Roboto', fontSize:15, fontWeight:300}}>
                  Hello there! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

             </div>
           </Col>
         </Row>
          <Row className="justify-content-center">

            <Col md="4">

                    <Form>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="input-avatar">

                            <img src="assets/img/ic_user.png"  alt="user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username"  className="input-login"/>
                      </InputGroup>
                      <InputGroup className="mb-5">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="input-avatar">
                            <img src="assets/img/ic_pass.png"  alt="pass"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" className="input-login"/>
                      </InputGroup>

                      <Button size="lg" block className="button-login" onClick={this.toggleSuccess}>Update Password</Button>
                    </Form>

            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={{marginTop:'12%'}}>

            <ModalBody>
              <div className="flex-row align-items-center">
              <Row className="justify-content-center">
                <Col md="10" className="catcha-modal">
                  <h1>Forgot Password</h1>
                  <p>Hello there! Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <Form>
                    <Input type="text" placeholder="Your e-mail address"  className="input-forgot"/>
                    <Button size="lg" block className="button-forgot">Reset my password</Button>
                  </Form>
                </Col>
              </Row>
            </div>
            </ModalBody>

          </Modal>

          <Modal isOpen={this.state.success} toggle={this.toggleSuccess} className={this.props.className} style={{marginTop:'12%'}}>

            <ModalBody>
              <div className="flex-row align-items-center">
              <Row className="justify-content-center">
                <Col md="10" className="catcha-modal">
                  <img src="assets/img/ic_success.png" alt="icon success"/>
                  <h1 className="black">Success!</h1>
                  <p className="error">Hello there! Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <Form>

                    <Button size="lg" block className="button-forgot" onClick={this.toggleDanger}>OK</Button>
                  </Form>
                </Col>
              </Row>
            </div>
            </ModalBody>

          </Modal>

          <Modal isOpen={this.state.danger} toggle={this.toggleDanger} className={this.props.className} style={{marginTop:'12%'}}>

            <ModalBody>
              <div className="flex-row align-items-center">
              <Row className="justify-content-center">
                <Col md="10" className="catcha-modal">
                  <img src="assets/img/ic_alert.png" alt="icon alert"/>
                  <h1 className="black">Oops!</h1>
                  <p className="error">Hello there! Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <Form>

                    <Button size="lg" block className="button-danger" onClick={this.toggleDanger}>Back</Button>
                  </Form>
                </Col>
              </Row>
            </div>
            </ModalBody>

          </Modal>
        </Container>
      </div>
    );
  }
}

export default Forgot;
