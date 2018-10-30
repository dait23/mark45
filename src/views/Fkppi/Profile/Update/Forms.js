import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import {MainApi, DevApi} from '../../../../views/Api/';
import axios, { post } from 'axios';

import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import ReactQuill from "react-quill";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

@inject("newsStore")
@observer
class Forms extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
     this.state = { 
     title:'',
     body: '',
     publisher:'',
     image:'',
     categoryId:'',
     avatar:'',
     konfirmpassword:'',
     loading: true,
     files: [],
     redirect: false,
     loader:false,
     data:{}

     }

     this.handleChange = this.handleChange.bind(this);
     this.onSubmitPress = this.onSubmitPress.bind(this);
     this.toggleLoading = this.toggleLoading.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }


  toggleLoading() {

    this.setState({
      loader: !this.state.loading,
    });
     
     
      setTimeout(() => {
    
       this.onSubmitPress();

      }, 2000)
    
  }


  componentDidMount() {
     //this.props.newsStore.fetchCategory();
     setTimeout(() => {
    
       this.getProfile();

      }, 2000)

   }

   //////
    
    getProfile(){

    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[3];

     this.setState({
          loading: true
      });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'user/profile';
      var that = this;
      return fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token')  
              }
        })
        .then(function(response) {
          return response.json();
        }).then(function(result) {
          //componentWillUnmount();
          that.setState({ data : result,
                  avatar: result.avatar,
                  loading: false
                        });
           //data : this.state.data(result.data),

           console.log(result)

        })
        .catch((error) => { console.error(error); });
    }

    onChangeGambar = (event) => {

      let files = event.target.files || event.dataTransfer.files;
        // if (!files.length)
        //   return;
        // this.createImage(files[0]);
  
  
      this.setState({
            image: files[0]
          });
  
     console.log(files[0])
  
    }


    onSubmitPress() {
      //evt.preventDefault()

      if(this.state.password == null){

         toast.warn("password tidak boleh kosong", {
                      autoClose: 2000
                    });
        this.setState({
                      loader: false,
                    });

      }
        else{

          if(this.state.password == this.state.password_confirmation){
         
    
       axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
       axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
       axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
       var url =  DevApi + 'user/profile/update';
    
        const data = new FormData()
        console.log(data)
        data.append('avatar', this.state.image)
        data.append('password', this.state.password);
        data.append('password_confirmation', this.state.password_confirmation);
        // data.append('publisher', this.state.publisher);
        // data.append('category_id', this.state.category_id);
        axios.post(url, data).then((response) => {
          // this.setState({redirect: true});
     
        if (response.status == '200') {

            
             this.setState({
                        loader: false,
                      });
                     toast.success("Sukses Update !", {
                        autoClose: 2000
                      }, setTimeout("window.location.reload();", 2000));


        }else{

           toast.error("update gagal ", {
                      autoClose: 2000
                    });

                   this.setState({
                      loader: false,
                    });



        }



          console.log(response)
  
        })
      }
      else {
        toast.info("password tidak sama", {
                      autoClose: 2000
                    });
        this.setState({
                      loader: false,
                    });
      }

        }
     
      

       
       }
   ////////

   modules = {
    toolbar: [
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image']
    ]
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 
  ]

  
  
  render() {


     //console.log(store.);
   
   if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px" /></Col>
               </Row>

              )
      }else{

    return (
             <div>
              <ToastContainer autoClose={2000} />
              <CardBody>
                <Form onSubmit={this.handleSubmit} className="form-horizontal">
                 <FormGroup row>
                    <Col className="text-center" xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                     <img src={this.state.avatar} alt="image" width="100" height="100" style={{borderRadius:100}}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col className="text-center" xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                      <Label htmlFor="file-input">UPLOAD FOTO</Label>
                    </Col>
                    <Col className="text-center" xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                    <input type="file" onChange={this.onChangeGambar} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                      <Label htmlFor="text-input">PASSWORD BARU</Label>
                    </Col>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                      <Input 
                      type="text" 
                      value={this.state.password} 
                      name="password"
                      onChange={(e) => this.setState({password: e.target.value})} 
                      placeholder="Password Baru" />
                    </Col>
                  </FormGroup>
                 
                   <FormGroup row>
                   <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                      <Label htmlFor="text-input">KONFIRMASI PASSWORD</Label>
                    </Col>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                      <Input type="text" 
                      value={this.state.password_confirmation} 
                      name="password_confirmation"
                      onChange={(e) => this.setState({password_confirmation: e.target.value})} 
                       placeholder="Konfirmasi Password" />
                    </Col>
                  </FormGroup>

                  
                </Form>
                <Row className="mt-4 text-center">
                <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                <Link to="/"><Button  className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
                <Button onClick={this.toggleLoading} className="tombol1">Save</Button>&nbsp;&nbsp;
                </Col>
              </Row>
              </CardBody>
               <Modal isOpen={this.state.loader} toggle={this.toggleLoading} className={this.props.className} style={{marginTop:'20%'}} backdrop='static'>

            <ModalBody>
              <div className="flex-row align-items-center">
              <Row className="justify-content-center">
                <Col md="1" className="catcha-modal">
                  <ReactLoading type='spin' color="#404f3d" width="40px" height="40px"/>
                  
                 
                  
                </Col>
              </Row>
            </div>
            </ModalBody>

          </Modal>

           </div>

    );
  }
}
}

export default Forms;
