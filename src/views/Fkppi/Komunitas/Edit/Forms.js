import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios, { post } from 'axios';
import {MainApi, DevApi} from '../../../../views/Api/';


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
     loading: true,
     loader:false,
     data:{}

     }
     this.onSubmitPress = this.onSubmitPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
     this.toggleLoading = this.toggleLoading.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }

  ////

  toggleLoading() {

    this.setState({
      loader: !this.state.loader,
    });
     
     
      setTimeout(() => {
    
       this.onSubmitPress();

      }, 2000)
    
  }
  ////

  componentDidMount() {

   
  setTimeout(() => {
    
       this.getData();

      }, 2000)
     //this.getNews();

   }

   /////////

    getData(){

    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[3];

     this.setState({
          loading: true
      });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'community/detail/' + path;
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
                  link: result.link,
                  image: result.image,
                  loading: false

                        });
           //data : this.state.data(result.data),
           //toast('Berhasil Edit Berita', { type: toast.TYPE.INFO, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/berita';",3000));
           //console.log(that.state.data)

        })
        .catch((error) => { console.error(error); });
    }


/////////////////////////


onChangeGambar = (event) => {

  let files = event.target.files || event.dataTransfer.files;
    // if (!files.length)
    //   return;
    // this.createImage(files[0]);

  this.setState({
        imagex: files[0]
      });

 console.log(files[0])

}


  onSubmitPress() {

  

  if(this.state.imagex == null){
     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'community/edit/'+ this.state.id;
  
      const data = new FormData()
      console.log(data)
      //data.append('image', this.state.imagex);
      data.append('link', this.state.link);
      // data.append('publisher', this.state.publisher);
      // data.append('category_id', this.state.category_id);
      axios.post(url, data).then((response) => {
         if(response.status == 200) {
          //this.setState({redirect: true});
          this.setState({
                        loader: false,
                      });
          toast('Berhasil Update', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/fkppi/komunitas';",3000));
          //console.log(response)
          }else{
            this.setState({
                        loader: false,
                      });
          toast('Update Gagal', { type: toast.TYPE.Error, autoClose: 3000, position: toast.POSITION.TOP_CENTER, });
          }
    })
      
     }else{
    //evt.preventDefault()
      //var url =  DevApi + 'news/add';
      let pathname = window.location.pathname;
      var pathArray = window.location.pathname.split( '/' );
      var path = pathArray[4];
  
      // this.setState({
      //       loading: true
      //   });
        
  
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'community/edit/'+ this.state.id;
  
      const data = new FormData()
      console.log(data)
      data.append('image', this.state.imagex)
      data.append('link', this.state.link);
      // data.append('publisher', this.state.publisher);
      // data.append('category_id', this.state.category_id);
      axios.post(url, data).then((response) => {
         if(response.status == 200) {
          //this.setState({redirect: true});
          this.setState({
                        loader: false,
                      });
          toast('Berhasil Update', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/fkppi/komunitas';",3000));
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


/////////////////////



///////////////////////    
    // getNews(){

    //    let pathname = window.location.pathname;
    // var pathArray = window.location.pathname.split( '/' );
    // var path = pathArray[3];

    //  this.setState({
    //       loading: true
    //   });
      

    //   //console.log(this.state.myToken)
      
      
    //   var url =  DevApi + 'news/detail/' + path;
    //   var that = this;
    //   return fetch(url, {
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('Token')  
    //           }
    //     })
    //     .then(function(response) {
    //       return response.json();
    //     }).then(function(result) {
    //       //componentWillUnmount();
    //       that.setState({ data : result,
    //              title: result.title,
    //               body: result.body,
    //               image: result.image,
    //               category_id: result.category_id,
    //               publisher : result.publisher,
    //               loading: false

    //                     });
    //        //data : this.state.data(result.data),

    //        console.log(that.state.data)

    //     })
    //     .catch((error) => { console.error(error); });
    // }

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
      
        <select id="select" value={this.state.category_id}  name="category_id" className="form-control" onChange={(e) => this.setState({category_id: e.target.value})}>
                        
             <option>Kategory Berita</option>
            {store.itemCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.category}</option>
                       ))}   
        </select>
     )

  }
  
  render() {

   //  const { store } = this.props;
   //  if(this.state.redirect){
   //   return (<Redirect to={'/komunitas'}/>)
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
               <Form  className="form-horizontal">
                 
                <FormGroup row>
                   <Col md="3">
                   </Col>
                   <Col xs="12" md="9">
                     <img src={this.state.image} alt="image" width="80"/> 
                   </Col>
                 </FormGroup>
                 
                
                  <FormGroup row>
                   <Col md="3">
                     <Label htmlFor="text-input">Link Komunitas</Label>
                   </Col>
                   <Col xs="12" md="9">
                     <Input type="text" 
                     value={this.state.link} 
                     name="link"
                     onChange={(e) => this.setState({link: e.target.value})} 
                      placeholder="Isi Link" />
                   </Col>
                 </FormGroup>
             
                
                 <FormGroup row>
                   <Col md="3">
                     <Label htmlFor="file-input">Gambar Komunitas</Label>
                   </Col>
                   <Col xs="12" md="9">
                   <input type="file" onChange={this.onChangeGambar} />
                   </Col>
                 </FormGroup>
                 
               </Form>
               <Row className="mt-4 text-center">
                 <Col className="" xs="12" sm="12" md="12" lg="12">
               <Link to="/komunitas"><Button  className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
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
