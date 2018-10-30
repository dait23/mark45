import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios from "axios";
import {MainApi, DevApi} from '../../../../views/Api/';
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

const options = {
  timeout: 5000,
  position: "bottom center"
};

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
      is_verified:'',
      membership_id:'',
      size: '',
      reason:'',
     loading: true,
     loader:false,
     redirect: false,
     data:{}

     }
    this.SubmitAct = this.Activetest.bind(this);
    //this.SubmitUnVer = this.UnVerifikasi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }

 toggleLoading() {

    this.setState({
      loader: !this.state.loader,
    });
     
     //this.handleSubmit();
      setTimeout(() => {
    
       this.handleSubmit();

      }, 2000)
    
  }

  handleChange(event) {
    this.setState({
      size: event.target.value
    });
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
  

renderMembers(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
     <select id="select" value={this.state.membership_id}  name="membership_id" className="form-control" style={{width:300}} onChange={(e) => this.setState({membership_id: e.target.value})}>
                     
          <option>Pilih Status</option>
         {store.itemMembers.map((mem) => (
                     <option key={mem.id} value={mem.id}>{mem.status}</option>
                    ))}   
     </select>
  )
}


  handleSubmit() {
  
   if(this.state.membership_id == ''){
    this.setState({
                      loader: false,
                    });
      toast.info("Status Keanggotaan tidak boleh kosong !", {
        autoClose: 3000
      });

   }

    else if(`${this.state.size}` == 1 ){
    //evt.preventDefault()
     //var url =  DevApi + 'news/add';
    //  this.setState({
    //   loading: true
    // });
  
     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'member/activate/'+ path;
  
      const datax = new FormData()
      datax.append('membership_id', this.state.membership_id);
      //console.log(data)
      //data.append('activated', this.state.activated);
   
      axios.post(url, datax).then((response) => {
        //console.log(response)
        //this.setState({redirect: true});
        
        if (response.status == '200') {

            this.setState({
                      loader: false,
                    });

            toast('Aktivasi Berhasil', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));

         }
         else if (response.status == '400') {

           this.setState({
                      loader: false,
                    });

            toast('Aktivasi  Gagal', { type: toast.TYPE.ERROR, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));

         }
         else if (response.status == '404') {

            this.setState({
                      loader: false,
                    });

            toast('Aktivasi Gagal', { type: toast.TYPE.ERROR, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));

         }
      })
    }else{
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
        toast('Aktivasi Ditolak', { type: toast.TYPE.ERROR, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan/verify';",3000));
        //console.log(response)
      })  
    }
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
          //this.setState({redirect: true});
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
     setTimeout(() => {
    
        this.dataMember();
         this.props.newsStore.fetchMembers();

      }, 2000)

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
                    is_activated: result.is_activated,
                    is_verified: result.is_verified,
                    reason: result.verified_reason,
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

  ///////

renderReason(){

    if(this.state.reason == 'null'){

       this.setState({reason: '' })

     return(

      
         <div>{this.state.reason}</div>

      )

    }else{

      
       return(

      
         <div>{this.state.reason}</div>

      )


    }



  }



  ////

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
  
  renderVerified(){
    
    //console.log(store)
     if(this.state.is_verified == 1){
      return(
        <Row>
        <FormGroup check>
        <Col xs="12" sm="12" md="12" lg="12">
          <Label check>
            <Input  type="radio" name="radio2"
              disabled
            checked="checked"
            />{' '}
            DI SETUJUI
          </Label>
        </Col>
        </FormGroup>
        <FormGroup check>
        <Col xs="12" sm="12" md="12" lg="12">
          <Label check>
            <Input type="radio" name="radio2"
            disabled
            />{' '}
            TIDAK DI SETUJUI
          </Label>
        </Col>
        </FormGroup>
        </Row>
      )
    }else {
      return(
        <Row>
        <FormGroup check>
        <Col xs="12" sm="12" md="12" lg="12">
          <Label check>
            <Input  type="radio" name="radio2"
            disabled
            />{' '}
            DI SETUJUI
          </Label>
        </Col>
        </FormGroup>
        <FormGroup check>
        <Col xs="12" sm="12" md="12" lg="12">
          <Label check>
            <Input type="radio" name="radio2"
            disabled
            checked="checked"
            />{' '}
            TIDAK DI SETUJUI
          </Label>
        </Col>
        </FormGroup>
        </Row>
      )
    }
  }

  render() {
    // if(this.state.redirect){
    //   return (<Redirect to={'/keanggotaan/active'}/>)
    // }

     const { store } = this.props;


     //console.log(store.);
    
    if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px"/></Col>
               </Row>

              )
      }else{

    return (
             <div>
               <ToastContainer autoClose={3000} />
              <CardBody>
                <Form  className="form-horizontal">
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
                    <Label>HASIL VERIFIKASI</Label>
                    {this.renderVerified()}
                    </Col>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                    <Label>ALASAN</Label>
                    <Alert color="dark">
                   {this.renderReason()}
                    </Alert>
                    </Col>
                  </FormGroup>
                  <FormGroup tag="fieldset">
                  <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                  <Label>AKTIVASI</Label>
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
                 <FormGroup tag="fieldset">
                  <Col xs="12" sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
                  <Label>Status Keanggotaan Anggota</Label>
                  <Row>
                  <FormGroup>
                  <Col xs="12" sm="12" md="12" lg="12">
                    {this.renderMembers()}
                  </Col>
                  </FormGroup>
                 
                  
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
                <Link to="/active"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
                <Button className="tombol1" onClick={this.toggleLoading}> Simpan </Button>
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
