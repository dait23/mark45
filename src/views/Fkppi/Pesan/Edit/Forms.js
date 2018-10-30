import React, { Component } from 'react';
import { Link} from 'react-router-dom';
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
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

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
     id:'',
     from: '',
     title:'',
     body:'',
     udpatedAt:'',
     loading: true,
     loader:false,
     data:{}

     }

    this.handleChange = this.handleChange.bind(this)
  }

   handleChange(value) {
    this.setState({ body: value })
  }

  componentDidMount() {

   
     this.props.newsStore.fetchCategory();
     this.getNews();

   }

   toggleLoading() {

    this.setState({
      loader: !this.state.loader,
    });
     
     
      setTimeout(() => {
    
       this.onSubmitPress();

      }, 2000)
    
  }

  //////

   componentDidMount() {

   
  setTimeout(() => {
    
       this.getData();

      }, 2000)
     //this.getNews();

   }

   
   //////
    
    getData(){

    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[4];

     this.setState({
          loading: true
      });
      

      //console.log(this.state.myToken)
      
      
      var url =  DevApi + 'message/sent/' + path;
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
                   from: result.from,
                   title: result.title,
                   body: result.body,
                   createdAt:result.createdAt,
                  loading: false

                        });
           //data : this.state.data(result.data),

           console.log(result)

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

  // renderCat(){
    
  //    const store = this.props.newsStore;

  //    //console.log(store)
    
  //   return(
      
  //       <select id="select" value={this.state.category_id}  name="category_id" className="form-control" onChange={(e) => this.setState({category_id: e.target.value})}>
                        
  //            <option>Kategory Berita</option>
  //           {store.itemCat.map((cat) => (
  //                       <option key={cat.id} value={cat.id}>{cat.category}</option>
  //                      ))}   
  //       </select>
  //    )

  // }
  delete = () => {
    this.props.newsStore.deleteData(this.props.news.id)
 }
  render() {

     const { store } = this.props;


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
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Tanggal  {moment(this.state.createdAt).format('LL')}</Label>
                     
                    </Col>
                   
                  </FormGroup>
                 <FormGroup row>
                    <Col md="6">
                    <Label htmlFor="text-input">From :</Label>
                    <Input 
                      type="text" 
                      disabled
                      value={this.state.from} 
                       />
                    </Col>
                    
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="text-input">Isi Pesan</Label>
              
                        <div styele={{width:'100%', height:'auto', minHeight:'200px', background:'#f9f9f9'}} dangerouslySetInnerHTML={{ __html: this.state.body }}></div>
           
                    </Col>
                    
                  </FormGroup>

                  
                </Form>
                <Row className="mt-4 text-center">
                  <Col className="" xs="12" sm="12" md="12" lg="12">
                <Link to="/pesan"><Button type="submit"  className="tombol3" color="primary"><i className="fa fa-chevron-left"></i>Kembali</Button></Link>&nbsp;&nbsp;
              
                </Col>
              </Row>
              </CardBody>
           </div>

    );
  }
}
}

export default Forms;
