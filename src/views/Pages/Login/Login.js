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
import ProgressButton from 'react-progress-button'
import {MainApi, DevApi} from '../../../views/Api/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import MDSpinner from "react-md-spinner";


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading:false,
      success: false,
      danger: false,
      username: "",
      password: "",
      buttonState: '',
      email:''

    };

    this.toggle = this.toggle.bind(this);
     this.onForgotPass = this.onForgotPass.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleForgot = this.toggleForgot.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.onLoginPress = this.onLoginPress.bind(this);

  }

  toggle() {

    this.setState({
      modal: !this.state.modal,
    });

    // setTimeout(() => {
  
    // this.setState({
    //   modal: false,
    // });

    // }, 3000)
    
  }
  //////


  toggleLoading() {

    this.setState({
      loading: !this.state.loading,
    });
     
     
      setTimeout(() => {
    
       this.onLoginPress();

      }, 2000)
    
  }

  toggleForgot() {

    this.setState({
      loading: !this.state.loading,
    });
     
     this.onForgotPass();
     
      // setTimeout(() => {
    
      //  this.onForgotPass();

      // }, 2000)
    
  }

  ////


////
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


 // handleClick () {
 //    this.toggle();
 //    // make asynchronous call
 //    setTimeout(() => {
 //    }, 3000)
 //  }




// onSave(event) {
//     event.preventDefault();
//     console.log("onSave handler called");
//     //event.onLoginPress();
//   }


// // handleKeyUp(event) {
// //   if (event.keyCode == 13){

// //     onLoginPress();
// //   }
// // }

// /////

// handleTest(e) {
//       if (e.charCode == 13) {
//         this.toggleLoading();
//       }
//       if (e.keyCode == 13) {
//         this.toggleLoading();
//        // alert('Enter... (KeyDown, use keyCode)');
//       }
//     }

////

onForgotPass(){

    if(this.state.email === ''){

       this.setState({
                        loading: false,
                      });
       //console.log('username tidak boleh kosong')
       toast.info("Email tidak boleh kosong !", {
        autoClose: 2000
      });

     }else{

        let email = this.state.email;

        var url =  DevApi + 'user/requestpassword';
        var that = this;


        return fetch(url,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
      
              },
              body: JSON.stringify({

                'email' : that.state.email,


              }),
        }).then((response) => {

                //console.log(response);
                that.setState({
                      loading: false,

                    });

                if (response.status == '200') {
                   
                   this.toggleSuccess();
                   this.setState({
                        loading: false,
                        modal: false,
                      });

                }else{

                   toast.error("Email tidak terdaftar", {
                      autoClose: 2000
                    });

                   this.setState({
                      loading: false,

                    });
                }
            });




     }


  }



//////

  onLoginPress() {

 if(this.state.username == ''){
  this.setState({
                        loading: false,
                      });
       //console.log('username tidak boleh kosong')
       toast.info("username tidak boleh kosong !", {
        autoClose: 2000
      });
     }


  else if(this.state.password ==''){
     this.setState({
                        loading: false,
                      });
     toast.info("password tidak boleh kosong !", {
        autoClose: 2000
      });
      //console.log('password tidak boleh kosong')
     }

  else{

   
   let username = this.state.username;
  let password = this.state.password;
  
  var url =  DevApi + 'admin/login';
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

                //console.log(response.status);

                if (response.status == '403') {

                   toast.error("Login Gagal , username / password tidak sama", {
                      autoClose: 2000
                    });

                   this.setState({
                      loading: false,
                    });

                    //console.log('Gagal Login');
                }
                if (response.status == '200') {

                   //console.log(response);
                   //that.saveKey(response.headers.map.authorization[0]);

                    //console.log(response.headers.get('Authorization'));
                    localStorage.setItem('Token', response.headers.get('Authorization'))
                    //this.props.history.replace('/')
                     //window.location.reload();
                     this.setState({
                        loading: false,
                      });
                     toast.success("Sukses Login !", {
                        autoClose: 2000
                      }, setTimeout("window.location.reload();", 2000));
                            }
            });




  }

     }

  

  ////


  render() {
    return (

      <div className="appx flex-row align-items-center bg-brown" style={{paddingBottom:80}}>
        <ToastContainer autoClose={2000} />
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
                         onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            this.toggleLoading()
                          }
                        }}
                         value={this.state.password}
                         onChange={(e) => this.setState({password: e.target.value})}
                         />
                      </InputGroup>
                      <Row style={{marginBottom:20}}>
                        <Col xs="6">

                          
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" style={{color:'#ffbf20', fontSize:13, fontFamily:'Roboto',}} onClick={this.toggle}>Forgot password?</Button>
                        </Col>
                      </Row>
                      <Button size="lg" block className="button-login" onClick={this.toggleLoading}>Sign In</Button>
                    
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
                    <Input 
                      type="text" 
                       placeholder="Alamat Email Anda" 
                        //value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}
                       className="input-forgot"/>
                    <Button size="lg" block className="button-forgot" style={{color:'#fff'}} onClick={this.toggleForgot}>Reset my password</Button>
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
                  <p className="error">Password baru dikirim ke alamat email anda.</p>
                  <Form>

                    <Button size="lg" block className="button-forgot" onClick={this.toggleSuccess} style={{color:'#fff'}}>OK</Button>
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

          <Modal isOpen={this.state.loading} toggle={this.toggleLoading} className={this.props.className} style={{marginTop:'20%'}} backdrop='static'>

            <ModalBody>
              <div className="flex-row align-items-center">
              <Row className="justify-content-center">
                <Col md="10" className="catcha-modal">
                  <MDSpinner />
                  <h1 className="black">Please Wait ...!</h1>
                 
                  
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
