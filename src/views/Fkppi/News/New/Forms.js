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
  ModalHeader
} from 'reactstrap';

import PropTypes from 'prop-types';
import ReactQuill from "react-quill";
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import {MainApi, DevApi} from '../../../Api/';
import MDSpinner from "react-md-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
     category_id:'',
     files: [],
     redirect: false,
     loading:false,

     }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }
  //
  
  toggleLoading() {

    this.setState({
      loading: !this.state.loading,
    });
     
     this.onSubmitPress();
      // setTimeout(() => {
    
      //  this.onSubmitPress();

      // }, 1000)
    
  }

  //
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

  componentDidMount() {
     
     this.props.newsStore.fetchCategory();

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

    //evt.preventDefault()
     //var url =  DevApi + 'news/add';
     if(this.state.title === ''){
       this.setState({
                        loading: false,
                      });
       toast.info("title tidak boleh kosong !", {
        autoClose: 3000
      });
     }
     else if(this.state.body === ''){
      this.setState({
                        loading: false,
                      });
       toast.info("body tidak boleh kosong !", {
        autoClose: 3000
      });
     }
     else if(this.state.publisher === ''){
      this.setState({
                        loading: false,
                      });
       toast.info("publisher tidak boleh kosong !", {
        autoClose: 3000
      });
     }
     else if(this.state.gambar === ''){
      this.setState({
                        loading: false,
                      });
       toast.info("gambar tidak boleh kosong !", {
        autoClose: 3000
      });
     }
     else{
  
     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'news/add';
  
      const data = new FormData()
      console.log(data)
      data.append('image', this.state.gambar);
      data.append('title', this.state.title);
      data.append('body', this.state.body);
      data.append('publisher', this.state.publisher);
      data.append('category_id', this.state.category_id);
      axios.post(url, data).then((response) => {
         this.setState({loading: false});
        toast('Berhasil Tambah Berita', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/berita';",3000));
        console.log(response)
      })
     }
    }

  //  onSubmitPress= ( evt: FormEvent<HTMLFormElement> ) => {
  //   if(this.state.title === ''){
  //     alert('Username tidak boleh kosong');
  //    }
  //    if(this.state.publisher === ''){
  //     alert('publisher tidak boleh kosong');
  //    }
  //    if(this.state.title === ''){
  //     alert('title tidak boleh kosong');
  //    }
  //    if(this.state.publisher === ''){
  //     alert('publisher tidak boleh kosong');
  //    }
  // evt.preventDefault()
  
  //  var url =  DevApi + 'news/add';

  //  const {file} = this.state

  //  const body = new FormData();
  //   body.append('title','vvv')
  //   body.append('body', 'ccc')
  //   body.append('publisher', 'fdsfdsf')
  //   body.append('category_id', '1')
  //   body.append('image', file)
  //   //files.map( ( f, i ) => body.append(`files[${i}]`,f) )
  //   fetch(url , { 
  //     method:'POST', 
  //     //mode: "no-cors",
  //     redirect: 'follow',
  //     headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': localStorage.getItem('Token'),
  //             'Access-Control-Allow-Origin': '*'
              
  //           },
  //     body: body
  //   })
  //     .then( response => console.log( response ) )
      

  //   console.log(body)
  //   //console.log( { text, file ,files } )

  //  }

  renderCat(){
    
     const store = this.props.newsStore;

     //console.log(store)
    
    return(
      
        <select id="select" value={this.state.category_id}  name="category_id" className="form-control" onChange={(e) => this.setState({category_id: e.target.value})}>
                        
             <option>Kategory Berita</option>
            {store.itemCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.news_category}</option>
                       ))}   
        </select>
     )

  }
  
  
  render() {
    if(this.state.redirect){
      return (<Redirect to={'/berita'}/>)
    }



     //console.log(store.);


    return (


<div><ToastContainer autoClose={3000} />
              <CardBody>

                <Form className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                    <Label htmlFor="text-input">KATEGORI BERITA</Label>
                    {this.renderCat()}
                    <Label htmlFor="select">SUMBER BERITA</Label>
                    <Input type="text" 
                    value={this.state.publisher} 
                    name="publisher"
                    onChange={(e) => this.setState({publisher: e.target.value})} 
                      placeholder="Sumber Berita" />
                    <Label htmlFor="text-input">Image Berita</Label>
                    <div><input type="file" onChange={this.onChangeFile} /></div>
                    </Col>
                    <Col xs="12" md="9">
                      <Label htmlFor="text-input">Judul Berita</Label>
                       <Input 
                      type="text" 
                      value={this.state.title} 
                      name="name"
                      onChange={(e) => this.setState({title: e.target.value})} 
                      placeholder="Judul Berita" />
                      <br></br>
                      <Label htmlFor="text-input">Isi Berita</Label>
                      <ReactQuill theme="snow"
                      value={this.state.body}
                      modules={this.modules}
                      formats={this.formats}
                      placeholder="Isi Berita"
                      onChange={this.handleChange}
                      >
                      </ReactQuill>
                    </Col>
                  </FormGroup>
                  <Col className="text-center" xs="12" sm="12" md="12" lg="12">
                  <Link to="/berita"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali </Button></Link>&nbsp;&nbsp;
                  <Button onClick={this.toggleLoading} className="tombol1" > <i className="fa fa-send"></i> Kirim</Button>
                  </Col>
                </Form>
              </CardBody>
              <Modal isOpen={this.state.loading} toggle={this.toggleLoading} className={this.props.className} style={{marginTop:'20%'}}>

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
