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
import PropTypes from 'prop-types';
import MDSpinner from "react-md-spinner";
import { inject, observer, Provider} from 'mobx-react';
import ReactQuill from "react-quill";
import ReactLoading from 'react-loading';
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
     title:'',
     body: '',
     icon_height:'',
     icon:'',
     icon_width:'',
     loading: true,
     loader:false,
     files: [],
     redirect: false,
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
      loader: !this.state.loader,
    });
     
     
      setTimeout(() => {
    
       this.onSubmitPress();

      }, 2000)
    
  }

  componentDidMount() {
     //this.props.newsStore.fetchCategory();
     setTimeout(() => {
    
       this.getData();

      }, 2000)
   }

   //////
    
    getData(){

    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[3];

     this.setState({
          loading: true
      });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'faq/detail/' + path;
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
                 id: result.id,
                 title: result.title,
                  body: result.body,
                  icon: result.icon,
                  icon_height: result.icon_height,
                  icon_width: result.icon_width,
                  //category_id: result.category_id,
                  //publisher : result.publisher,
                  loading: false

                        });
           //data : this.state.data(result.data),
           //toast('Berhasil Edit Berita', { type: toast.TYPE.INFO, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/berita';",3000));
           //console.log(that.state.data)

        })
        .catch((error) => { console.error(error); });
    }

    onChangeGambar = (event) => {

      let files = event.target.files || event.dataTransfer.files;
        // if (!files.length)
        //   return;
        // this.createImage(files[0]);
  
  
      this.setState({
          iconx: files[0]
          });
  
     console.log(files[0])
  
    }

    /////////


    onChangeFile = (event) => {

    let files = event.target.files || event.dataTransfer.files;
      // if (!files.length)
      //   return;
      // this.createImage(files[0]);


    this.setState({
          gambarx: files[0]
        });

   console.log(files[0])

  }


    onSubmitPress() {


       if(this.state.gambarx == null){

     
      let pathname = window.location.pathname;
      var pathArray = window.location.pathname.split( '/' );
      var path = pathArray[3];
  
       // this.setState({
       //      loading: true
       //  });
    
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'faq/update/'+ this.state.id;
    
        const datax = new FormData()
        //console.log(data)
        //data.append('icon', this.state.icon);
        datax.append('id', this.state.id);
        datax.append('title', this.state.title);
        datax.append('body', this.state.body);
        datax.append('icon_width', this.state.icon_width);
        datax.append('icon_height', this.state.icon_height);
        //data.append('publisher', this.state.publisher);
        //data.append('category_id', this.state.category_id);
        axios.post(url, datax).then((response) => {
          if(response.status == 200) {
          //this.setState({redirect: true});
          this.setState({
                        loader: false,
                      });
          toast('Berhasil Update', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/faq';",3000));
          //console.log(response)
          }else{
            this.setState({
                        loader: false,
                      });
          toast('Update Gagal', { type: toast.TYPE.Error, autoClose: 3000, position: toast.POSITION.TOP_CENTER, });
          }
        })




       }else{

        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'faq/update/'+ this.state.id;
    
        const datax = new FormData()
        //console.log(data)
        datax.append('icon', this.state.gambarx);
        datax.append('id', this.state.id);
        datax.append('title', this.state.title);
        datax.append('body', this.state.body);
        datax.append('icon_width', this.state.icon_width);
        datax.append('icon_height', this.state.icon_height);
        //data.append('publisher', this.state.publisher);
        //data.append('category_id', this.state.category_id);
        axios.post(url, datax).then((response) => {
          if(response.status == 200) {
          //this.setState({redirect: true});
          this.setState({
                        loader: false,
                      });
          toast('Berhasil Update', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/faq';",3000));
          //console.log(response)
          }else{
            this.setState({
                        loader: false,
                      });
          toast('Update Gagal', { type: toast.TYPE.Error, autoClose: 3000, position: toast.POSITION.TOP_CENTER, });
          }
        })

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

    //  const { store } = this.props;
    //  if(this.state.redirect){
    //   return (<Redirect to={'/berita'}/>)
    // }
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
      <ToastContainer autoClose={3000} />
     <CardBody>
       <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
       <FormGroup row>
           <Col md="3">
           <div className="text-center DetailMemberList">
           <img src={this.state.icon} alt="image" width="100" height="100"/>
           </div>
           {/* <Label htmlFor="text-input">KATEGORI BERITA</Label>
           {this.renderCat()} 
           <Label htmlFor="select">SUMBER BERITA</Label>
           <Input type="text" 
           value={this.state.publisher} 
           name="publisher"
           onChange={(e) => this.setState({publisher: e.target.value})} 
             placeholder="Sumber Berita" />*/}
           <Label htmlFor="text-input">Gambar FAQ</Label>
           <div><input type="file" onChange={this.onChangeFile} /></div>
           <br></br>
           <Label htmlFor="text-input">Panjang Gambar</Label>
              <Input 
             type="number" 
             value={this.state.icon_height} 
             name="name"
             onChange={(e) => this.setState({icon_height: e.target.value})} 
             placeholder="Masukan Angka" />
             <Label htmlFor="text-input">Lebar Gambar</Label>
             <Input 
             type="number" 
             value={this.state.icon_width} 
             name="name"
             onChange={(e) => this.setState({icon_width: e.target.value})} 
             placeholder="Masukan Angka" />
           </Col>
           <Col xs="12" md="9">
             <Label htmlFor="text-input">Judul FAQ</Label>
              <Input 
             type="text" 
             value={this.state.title} 
             name="name"
             onChange={(e) => this.setState({title: e.target.value})} 
             placeholder="Judul" />
             <br></br>
             <Label htmlFor="text-input">Isi FAQ</Label>
             <ReactQuill theme="snow"
             value={this.state.body}
             modules={this.modules}
             formats={this.formats}
             placeholder="Isi FAQ"
             onChange={this.handleChange}
             >
             </ReactQuill>
           </Col>
         </FormGroup>
       </Form>
       <Row className="mt-4 text-center">
         <Col className="" xs="12" sm="12" md="12" lg="12">
       <Link to="/faq"><Button  className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
       <Button onClick={this.toggleLoading} className="tombol1">Save</Button>&nbsp;&nbsp;
       </Col>
     </Row>
     </CardBody>
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
