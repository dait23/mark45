import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
import {MainApi, DevApi} from '../../../views/Api/';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      success: false,
      danger: false,
      username: "",
      password: "",

    };

    this.toggle = this.toggle.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.onLoginPress = this.onLoginPress.bind(this);

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

  //////Login


  onLoginPress() {

  let username = this.state.username;
  let password = this.state.password;
  
  var url =  DevApi + 'user/login';
  var that = this;
  
  return fetch(url,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
      
              },
              body: JSON.stringify({

                'username' : username,
                'password' : password


              }),
        }).then((response) => {

                console.log(response.status);

                if (response.status == '403') {

                    console.log('Gagal Login');
                }
                if (response.status == '200') {

                   //console.log(response);
                   //that.saveKey(response.headers.map.authorization[0]);

                    console.log(response.headers.get('Authorization'));
                    localStorage.setItem('Token', response.headers.get('Authorization'))
                    //this.props.history.replace('/')
                     window.location.reload();
                }
            });





     }

  

  ////


  render() {
    return (
      <div className="appx flex-row align-items-center bg-brown" style={{paddingBottom:80}}>
        <div className="bg-splash"></div>
        <Container>

         <Row className="justify-content-center">
           <Col md="4">
             <div style={{width: '100%',textAlign:'center', marginBottom:20}}>

              <img src="assets/img/logo_fkppi.png" alt="logo catcha" style={{marginBottom:10, width:'20%'}}/>
              <h1 style={{color:'#fff', fontFamily:'Roboto', fontSize:40, fontWeight:300, marginTop:10}}>Sign in</h1>
              <div style={{padding:10}}>
                <p style={{color:'#fff', fontFamily:'Roboto', fontSize:15, fontWeight:500}}>
                  Forum Komunitas Putra Putri Purnawirawan Dan Putra Putri Polri
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
                        <Input type="text" 
                         placeholder="Username" 
                         autoComplete="username"  
                         className="input-login"
                         value={this.state.username}
                         onChange={(e) => this.setState({username: e.target.value})}

                         />
                      </InputGroup>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="input-avatar">
                            <img src="assets/img/ic_pass.png"  alt="pass"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                         placeholder="Password" 
                         autoComplete="current-password" 
                         className="input-login"
                         value={this.state.password}
                         onChange={(e) => this.setState({password: e.target.value})}
                         />
                      </InputGroup>
                      <Row style={{marginBottom:20}}>
                        <Col xs="6">

                          <FormGroup check inline style={{paddingTop:5}}>
                            <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                            <Label className="form-check-label" check htmlFor="inline-checkbox1" style={{color:'#ffbf20', fontSize:13, fontFamily:'Roboto',}}>Remember me</Label>
                          </FormGroup>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" style={{color:'#ffbf20', fontSize:13, fontFamily:'Roboto',}} onClick={this.toggle}>Forgot password?</Button>
                        </Col>
                      </Row>
                      <Button size="lg" block className="button-login" onClick={this.onLoginPress}>Sign In</Button>
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

export default Login;
