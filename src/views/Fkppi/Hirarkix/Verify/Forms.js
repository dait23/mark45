import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import {MainApi, DevApi} from '../../../../views/Api/';
import axios from "axios";

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
} from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import ReactQuill from "react-quill";


let pathname = window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var path = pathArray[3];

console.log(path);
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
  }

   handleChange(value) {
    this.setState({ body: value })
  }


  handleChange(event) {
    this.setState({
      size: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(`${this.state.size}`);
    if(`${this.state.size}` == 1 ){

     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'member/verify/'+ path;
  
      const data = new FormData()
      console.log(data)
      data.append('verified_reason', this.state.reason);
      axios.post(url, data).then((response) => {
        this.setState({redirect: true});
        alert('Verifikasi Sukses');
        console.log(response)
      })

    }else{
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'member/unverify/'+ path;
  
      const data = new FormData()
      console.log(data)
      data.append('verified_reason', this.state.reason);
      axios.post(url, data).then((response) => {
        //this.setState({redirect: true});
        alert('Verifikasi Dibatalkan');
        console.log(response)
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
        console.log(event.target.value);
         this.Verifikasitest(event.target.value);
    //this.getKota(key);
    //this.props.Provinsi.clearItems();
  };

  async Verifikasitest(value){

  this.setState({
      verified: '',
      loading: true
  });
  

  //console.log(this.state.myToken)
  
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
              loading: false

                    });
      //data : this.state.data(result.data),
      
      console.log(that.state.data);
    })
    .catch((error) => { console.error(error); });
  }

   UnVerifikasi(){

    this.setState({
         
         loading: true
         
     });
     //console.log(this.state.myToken)
     
     
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
                 loading: false

                       });
          //data : this.state.data(result.data),

          console.log(that.state.data)

       })
       .catch((error) => { console.error(error); });
   }


   componentDidMount() {
    //this.props.newsStore.fetchCategory();
    this.dataMember();
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
                    idfkppi: result.idfkppi,
                    loading: false
  
                          });
             //data : this.state.data(result.data),
  
             console.log(that.state.data)
             
          })
          .catch((error) => { console.error(error); });
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
  
  render() {
    // if(this.state.redirect){
    //   return (<Redirect to={'/keanggotaan'}/>)
    // }
    if(this.state.redirect){
      return (<Redirect to={'/active'}/>)
    }
     const { store } = this.props;


     //console.log(store.);


    return (
             <div>
              <CardBody>
                <Form onSubmit={this.handleSubmit} className="form-horizontal">
                 <FormGroup row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                    <Label>STATUS</Label>
                    <Alert color="dark">
                    <div><strong>ANGGOTA NO. {this.state.nik}{this.state.is_verified}</strong></div>
                    </Alert>
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
                  <Input 
                    type="textarea" 
                    value={this.state.reason} 
                    name="reason"
                    onChange={(e) => this.setState({reason: e.target.value})} 
                    placeholder="Tuliskan Alasan" />
                  </Col>
                </FormGroup>
                <Row className="mt-4 text-center">
                  <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
                    <Link to="/keanggotaan"><Button className="tombol3"><i className="fa fa-chevron-left"></i>  Kembali</Button></Link>&nbsp;&nbsp;
                    <Button className="tombol1" type="submit" >Simpan </Button>
                  </Col>
                </Row>
                </Form>
              </CardBody>
              <CardFooter>
                
              </CardFooter>
           </div>

    );
  }
}

export default Forms;
