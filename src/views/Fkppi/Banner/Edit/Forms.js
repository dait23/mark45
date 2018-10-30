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
} from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import ReactQuill from "react-quill";

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
     link: '',
     publisher:'',
     image:'',
     categoryId:'',
     loading: true,
     data:{}

     }
     this.onSubmitPress = this.onSubmitPress.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

   handleChange(value) {
    this.setState({ body: value })
  }

  componentDidMount() {

   
     this.props.newsStore.fetchCategory();
     //this.getNews();

   }

/////////////////////////


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
      //var url =  DevApi + 'news/add';
      // if(this.state.title === ''){
      //   alert('Username tidak boleh kosong');
      //  }
      //  if(this.state.image === ''){
      //   alert('publisher tidak boleh kosong');
      //  }

      let pathname = window.location.pathname;
      var pathArray = window.location.pathname.split( '/' );
      var path = pathArray[3];
  
      this.setState({
            loading: true
        });
        
  
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'banner/edit/'+ path;
  
      const data = new FormData()
      console.log(data)
      data.append('image', this.state.image)
      data.append('title', this.state.title);
      data.append('link', this.state.link);
      // data.append('publisher', this.state.publisher);
      // data.append('category_id', this.state.category_id);
      axios.post(url, data).then((response) => {
        //this.setState({redirect: true});
        toast('Berhasil Edit Banner', { type: toast.TYPE.INFO, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/banner';",3000));
        console.log(response)
    })
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

    const { store } = this.props;
    if(this.state.redirect){
     return (<Redirect to={'/banner'}/>)
   }
    //console.log(store.);


   return (
    
            <div>
              <ToastContainer autoClose={3000} />
             <CardBody>
               <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                 
                <FormGroup row>
                   <Col md="3">
                   </Col>
                   <Col xs="12" md="9">
                    {/* <img src={this.state.image} alt="image" width="200"/> */}
                   </Col>
                 </FormGroup>
                 <FormGroup row>
                   <Col md="3">
                     <Label htmlFor="text-input">Judul Banner</Label>
                   </Col>
                   <Col xs="12" md="9">
                     <Input 
                     type="text" 
                     value={this.state.title} 
                     name="name"
                     onChange={(e) => this.setState({title: e.target.value})} 
                     placeholder="Judul Banner" />
                   </Col>
                 </FormGroup>
                
                  <FormGroup row>
                   <Col md="3">
                     <Label htmlFor="text-input">Link Banner</Label>
                   </Col>
                   <Col xs="12" md="9">
                     <Input type="text" 
                     value={this.state.link} 
                     name="publisher"
                     onChange={(e) => this.setState({link: e.target.value})} 
                      placeholder="Link Banner" />
                   </Col>
                 </FormGroup>
             
                
                 <FormGroup row>
                   <Col md="3">
                     <Label htmlFor="file-input">Image Banner</Label>
                   </Col>
                   <Col xs="12" md="9">
                   <input type="file" onChange={this.onChangeGambar} />
                   </Col>
                 </FormGroup>
                 
               </Form>
               <Row className="mt-4 text-center">
                 <Col className="" xs="12" sm="12" md="12" lg="12">
               <Link to="/banner"><Button  className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
               <Button onClick={this.onSubmitPress} className="tombol1">Save</Button>&nbsp;&nbsp;
               </Col>
             </Row>
             </CardBody>

          </div>

   );
 }
}

export default Forms;
