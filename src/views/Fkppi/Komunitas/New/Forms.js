import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
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
} from 'reactstrap';

import PropTypes from 'prop-types';
import ReactQuill from "react-quill";
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import {MainApi, DevApi} from '../../../Api/';
import MDSpinner from "react-md-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  timeout: 5000,
  position: "bottom center"
};

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
     link: '',
     image:'',
     file:'',
     files: [],
     loading:false,

     }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }

   onFilesChange = ( files: File[] ) =>{ 
    this.setState( { files } )
  }


  toggleLoading() {

    this.setState({
      loading: !this.state.loading,
    });
     
     
      setTimeout(() => {
    
       this.onSubmitPress();

      }, 2000)
    
  }

  componentDidMount() {
     
     this.props.newsStore.fetchCategory();

   }
   onChangeFile = (event) => {

    let files = event.target.files || event.dataTransfer.files;
      // if (!files.length)
      //   return;
      // this.createImage(files[0]);


    this.setState({
          gambar: files[0]
        });

   console.log(files[0])

  }

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
   //////

   onSubmitPress() {
     
     if(this.state.link == ''){
    this.setState({
                          loading: false,
                        });
        
         toast.info("Link tidak boleh kosong !", {
          autoClose: 3000
        });
       }


  else if(this.state.gambar == null){
     this.setState({
                        loading: false,
                      });
     toast.info("Gambar tidak boleh kosong !", {
        autoClose: 3000
      });
      
     }else{

     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'community/add';
  
      const data = new FormData()
      console.log(data)
      data.append('image', this.state.gambar)
      data.append('link', this.state.link);
      axios.post(url, data).then((response) => {
        
        if(response.status == 200) {
          //this.setState({redirect: true});
          this.setState({
                        loading: false,
                      });
          toast('Berhasil Tambah', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/komunitas';",3000));
          //console.log(response)
          }else{
            this.setState({
                        loading: false,
                      });
          toast('Tambah Gagal', { type: toast.TYPE.Error, autoClose: 3000, position: toast.POSITION.TOP_CENTER, });
          }

      })
     }
  }

  renderCat(){
    
     const store = this.props.newsStore;

     //console.log(store)
    
    return(
      
        <select id="select" value={this.state.category_id}  name="category_id" className="form-control" onChange={(e) => this.setState({category_id: e.target.value})}>
                        
             <option>Kategory Berita</option>
            {store.itemCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.category}</option>
                       ))}   
        </select>
     )

  }
  
  render() {
    if(this.state.redirect){
      return (<Redirect to={'/komunitas'}/>)
    }
    
     //console.log(store.);


    return (
      <div>
        <ToastContainer autoClose={3000} />
      <CardBody>
        <Form className="form-horizontal">


           <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Link Komunitas</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" 
              value={this.state.link} 
              name="link"
              onChange={(e) => this.setState({link: e.target.value})} 
               placeholder="Link Komunitas" />
            </Col>
          </FormGroup>      
         
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="file-input">Image Komuntias</Label>
            </Col>
            <Col xs="12" md="9">
              <input type="file" onChange={this.onChangeFile} />
            </Col>
          </FormGroup>
             <Row className="mt-4 text-center">
                 <Col className="" xs="12" sm="12" md="12" lg="12">
               <Link to="/komunitas"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
               <Button onClick={this.toggleLoading} className="tombol1">Save</Button>
               </Col>
             </Row>
        </Form>
      </CardBody>
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
   </div>

    );
  }
}

export default Forms;
