import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import {MainApi, DevApi} from '../../../../views/Api/';
import axios from "axios";
import ReactLoading from 'react-loading';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Alert,
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
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import ReactQuill from "react-quill";
import MDSpinner from "react-md-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let pathname = window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var path = pathArray[3];

//console.log(path);
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
      firstname: '',
      nik: '',
      verified:'',
      idfkppi:'',
      unverified:'',
      reason:'',
      is_rejected:'',
      loader:false,
     loading: true,
     redirect: false,
     size: '',
     data:{}
     }
    this.SubmitVer = this.onVerif.bind(this);
    this.SubmitUnVer = this.UnVerifikasi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }


  handleChange(event) {
    this.setState({
      size: event.target.value
    });
  }
  ///

  toggleLoading() {

    this.setState({
      loader: !this.state.loader,
    });
     
     //this.handleSubmit();
      setTimeout(() => {
    
       this.handleSubmit();

      }, 2000)
    
  }


  handleSubmit() {
    //event.preventDefault();
    //console.log(`${this.state.size}`);
    if(`${this.state.size}` == 1 ){

    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[3];

     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'member/verify/'+ path;
  
      const data = new FormData()
     // console.log(data)
      data.append('reason', this.state.reason);
      axios.post(url, data).then((response) => {

         if (response.status == '200') {

            this.setState({
                      loader: false,
                    });

            toast('Verifikasi Berhasil', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));

         }
         else if (response.status == '400') {

           this.setState({
                      loader: false,
                    });

            toast('Verifikasi Gagal', { type: toast.TYPE.ERROR, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));

         }
         else if (response.status == '404') {

            this.setState({
                      loader: false,
                    });

            toast('Verifikasi Gagal', { type: toast.TYPE.ERROR, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));

         }


        //this.setState({redirect: true});
       
        //console.log(response)
      })

    }else{

      let pathname = window.location.pathname;
      var pathArray = window.location.pathname.split( '/' );
      var path = pathArray[3];
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'member/unverify/'+ path;
  
      const data = new FormData()
      //console.log(data)
      data.append('reason', this.state.reason);
      axios.post(url, data).then((response) => {
        //this.setState({redirect: true});
        this.setState({
                      loader: false,
                    });
        toast('Verifikasi Dibatalkan', { type: toast.TYPE.ERROR, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));
        //console.log(response)
      })  
    }
  }
  // componentDidMount() {
  //    this.props.newsStore.fetchCategory();
  //    this.getNews();
  //  }

   //////

   onVerif = (event) => {
    //console.log(event.target.value);
    console.log(event.target.value);
  };

   onSelectedSetuju = (event) => {
    this.setState({ value: event.target.value });
        //console.log(event.target.value);
         this.Verifikasitest(event.target.value);
    //this.getKota(key);
    //this.props.Provinsi.clearItems();
  };

  async Verifikasitest(value){

  this.setState({
      verified: '',
      //loading: true
  });
  

  //console.log(this.state.myToken)
  let pathname = window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var path = pathArray[3];
  var url =  DevApi + 'member/verify/'+ path;
  var that = this;
  return fetch(url, {
          method: 'POST',
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
        //firstname: result.firstname,
              verified: result.is_verified,
              //loading: false

                    });
      //data : this.state.data(result.data),
      
      //console.log(that.state.data);
    })
    .catch((error) => {  });
  }

////////
   UnVerifikasi(){

    this.setState({
         
         //loading: true
         
     });
     //console.log(this.state.myToken)
     
     let pathname = window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var path = pathArray[3];
     var url =  DevApi + 'member/unverify/'+ path;
     var that = this;
     return fetch(url, {
             method: 'POST',
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
           //firstname: result.firstname,
                 //loading: false

                       });
          //data : this.state.data(result.data),

         //console.log(that.state.data)

       })
       .catch((error) => {  });
   }


   componentDidMount() {
    //this.props.newsStore.fetchCategory();
    
    setTimeout(() => {
    
        this.dataMember();

      }, 2000)
    this.props.newsStore.fetchKota();
  }
    
    dataMember(){

      let pathname = window.location.pathname;
      var pathArray = window.location.pathname.split( '/' );
      var path = pathArray[3];
  
       this.setState({
            loading: true
        });
        
  
        //console.log(this.state.myToken)
        
        
        var url =  DevApi + 'member/profile/' + path;
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
                    firstname: result.firstname,
                    nik: result.nik,
                    verified: result.is_verified,
                    unverified: result.is_uverified,
                    is_rejected: result.is_rejected,
                    reason: result.verified_reason,
                    idfkppi: result.idfkppi,
                    loading: false
  
                          });
             //data : this.state.data(result.data),
  
            // console.log(that.state.data)
             
          })
          .catch((error) => {  });
    }

   /////

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


  renderReason(){

    if(this.state.reason == 'null'){

       this.setState({reason: '' })

     return(

      
       <Input 
                    type="textarea" 
                    value={this.state.reason}
                    name="reason"
                    onChange={(e) => this.setState({reason: e.target.value})} 
                    placeholder="Tuliskan Alasan" />

      )

    }else{

      
       return(

      
       <Input 
                    type="textarea" 
                    value={this.state.reason}
                    name="reason"
                    onChange={(e) => this.setState({reason: e.target.value})} 
                    placeholder="Tuliskan Alasan" />

      )


    }



  }

  renderCat(){
    
     const store = this.props.newsStore;

     //console.log(store)
    
    return(
      
        <div>
            {store.itemCat.map((cat) => (
              <div>{cat.firstname}</div>
              ))}   
        </div>
     )

  }
  
  renderAlasan(){
    
    //console.log(store)
    if(this.state.is_rejected == 1){
      return(
        <div>
        
          <Label>ALASAN PENOLAKAN</Label>
          <Alert color="dark">
          <div>{this.state.reason}</div>
          </Alert>
        
        </div>
      )
    }
    else {
      return(
        <div>
        </div>
      )
    }
  }

  render() {
    // if(this.state.redirect){
    //   return (<Redirect to={'/keanggotaan'}/>)
    // }
    // if(this.state.redirect){
    //   return (<Redirect to={'/active'}/>)
    // }
     const { store } = this.props;

    if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px"/></Col>
               </Row>

              )
      }else{
     //console.log(store.);


    return (
             <div>
               <ToastContainer autoClose={3000} />
              <CardBody>
                <Form className="form-horizontal">
                 <FormGroup row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                    <Label>STATUS</Label>
                    <Alert color="dark">
                    <div><strong>ANGGOTA NO. </strong></div>
                    </Alert>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                  {this.renderAlasan()}
                  </Col>
                  </FormGroup>
                  <FormGroup tag="fieldset">
                  <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                  <Label>HASIL VERIFIKASI</Label>
                  <Row>
                  <FormGroup check>
                  <Col xs="12" sm="12" md="12" lg="12">
                    <Label check>
                      <Input  type="radio" name="radio1"
                      value="1"
                      checked={this.state.size === "1"}
                      onChange={this.handleChange1}
                      />{' '}
                      DI SETUJUI
                    </Label>
                  </Col>
                  </FormGroup>
                  <FormGroup check>
                  <Col xs="12" sm="12" md="12" lg="12">
                    <Label check>
                      <Input type="radio" name="radio1"
                      value="0"
                      checked={this.state.size === "0"}
                      onChange={this.handleChange1}
                      />{' '}
                      TIDAK DI SETUJUI
                    </Label>
                  </Col>
                  </FormGroup>
                  </Row>
                  </Col>
                </FormGroup>
                
                <FormGroup row>
                  <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                  <Label>ALASAN PERSETUJUAN/ PENOLAKAN</Label>
                  {this.renderReason()}
                  </Col>
                </FormGroup>
                <Row className="mt-4 text-center">
                  <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
                    <Link to="/keanggotaan"><Button className="tombol3"><i className="fa fa-chevron-left"></i>  Kembali</Button></Link>&nbsp;&nbsp;
                    <Button className="tombol1" onClick={this.toggleLoading}>Simpan </Button>
                  </Col>
                </Row>
                </Form>
              </CardBody>
              <CardFooter>
                
              </CardFooter>
              <Modal isOpen={this.state.loader} toggle={this.toggleLoading} className={this.props.className} style={{marginTop:'20%'}} backdrop='static'>

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
           </div>

    );
  }
}
}

export default Forms;
