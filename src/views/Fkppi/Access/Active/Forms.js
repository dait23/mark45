import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios from "axios";
import {MainApi, DevApi} from '../../../../views/Api/';
import { Provider as AlertProvider } from 'react-alert'

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

axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

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
      active:'',
      idfkppi:'',
      activated:'',
     loading: true,
     redirect: false,
     data:{}

     }
    this.SubmitAct = this.Activetest.bind(this);
    //this.SubmitUnVer = this.UnVerifikasi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

   handleChange(value) {
    this.setState({ body: value })
  }

  // componentDidMount() {
  //    this.props.newsStore.fetchCategory();
  //    this.getNews();
  //  }

   //////

  //  onSiteChanged = (event) => {
  //   let files = event.target.value || event.dataTransfer.files;
  //     this.setState({
  //     gambarDH2: files[0]
  //   });
  // };

  onChangeActive = (event) => {
    let value = event.target.value || event.dataTransfer.value;
    this.setState({
      active: value[1]
    });
  };
  

  onSubmitPress() {

    //evt.preventDefault()
     //var url =  DevApi + 'news/add';
     this.setState({
      loading: true
    });
  
     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'member/activate/'+ path;
  
      const data = new FormData()
      console.log(data)
      data.append('activated', this.state.activated);
      data.append('lastname', this.state.lastname);
   
      axios.post(url, data).then((response) => {
        console.log(response)
        this.setState({redirect: true});
        this.props.alert.show('Aktivasi Sukses');
      })
     }

  
   Activetest(){

    this.setState({
         loading: true
     });
     //console.log(this.state.myToken)
     var url =  DevApi + 'member/activate/'+ path;
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
                 active : result.is_Activated,
                 loading: false
                       });
          //data : this.state.data(result.data),
          alert('Aktivasi Sukses');
          this.setState({redirect: true});
          console.log(that.state.data);
       })
       .catch((error) => { console.error(error); });
   }

  //  UnVerifikasi(){

  //   this.setState({
  //        loading: true
  //    });
     

  //    //console.log(this.state.myToken)
     
     
  //    var url =  DevApi + 'member/activate/'+ path;
  //    var that = this;
  //    return fetch(url, {
  //            method: 'POST',
  //            headers: {
  //              'Content-Type': 'application/json',
  //              'Authorization': localStorage.getItem('Token')  
  //            }
  //      })
  //      .then(function(response) {
  //        return response.json();
  //      }).then(function(result) {
  //        //componentWillUnmount();
  //        that.setState({ data : result,
  //          //firstname: result.firstname,
  //                loading: false

  //                      });
  //         //data : this.state.data(result.data),
          
  //         console.log(that.state.data)

  //      })
  //      .catch((error) => { console.error(error); });
  //  }


   componentDidMount() {
    //this.props.newsStore.fetchCategory();
    this.dataMember();

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
                    active: result.is_activated,
                    //unverified: result.is_uverified,
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
    if(this.state.redirect){
      return (<Redirect to={'/keanggotaan'}/>)
    }

     const { store } = this.props;


     //console.log(store.);


    return (
             <div>
              <CardBody>
                <Form className="form-horizontal">
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
                  <Label>HASIL AKTIVASI</Label>
                  <Row>
                  <FormGroup check>
                  <Col xs="12" sm="12" md="12" lg="12">
                    <Label check>
                      <Input 
                      type="radio" name="radio1" 
                      value={this.state.active}
                      onChange={this.onChangeActive}
                      />
                      DI SETUJUI
                    </Label>
                  </Col>
                  </FormGroup>
                  {/* <FormGroup check>
                  <Col xs="12" sm="12" md="12" lg="12">
                    <Label check>
                      <Input type="radio" name="radio1" />{' '}
                      TIDAK DI SETUJUI
                    </Label>
                  </Col>
                  </FormGroup> */}
                  </Row>
                  </Col>
                </FormGroup>
                {/* <FormGroup row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                    <Label>ALASAN PERSETUJUAN/ PENOLAKAN</Label>
                    <Input 
                      type="textarea" 
                      value={this.state.title} 
                      name="name"
                      onChange={(e) => this.setState({title: e.target.value})} 
                      placeholder="Tuliskan Alasan" />
                    </Col>
                </FormGroup> */}
                <Row className="mt-4 text-center">
                <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
                <Link to="/keanggotaan"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
                <Button className="tombol1" onClick={this.SubmitAct} > Simpan </Button>
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
