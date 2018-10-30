import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
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
     subject:'',
     message: '',
     g_dpd_id:'',
     g_dpw_id:'',
     g_dpra_id:'',
     file:'',
     g_jabatan_id:'',
     files: [],
     loading:false,


     }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

   handleChange(value) {
    this.setState({ message: value })
    console.log(value);
  }

   onFilesChange = ( files: File[] ) =>{ 
    this.setState( { files } )
  }

  componentDidMount() { 
    this.props.newsStore.fetchJabatan();
    this.props.newsStore.fetchPD();
   }
  
  toggleLoading() {

    this.setState({
      loading: !this.state.loading,
    });
     
     
      setTimeout(() => {
    
       this.onSubmitPress();

      }, 2000)
    
  }

   modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link']
    ]
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  formats = [
    'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 
  ]

   //////////////////////////////////

   renderPD(){
    const store = this.props.newsStore;
    //console.log(store)
   return(
       <select id="select" value={this.state.pd_id}  name="g_dpd_id" className="form-control "onChange={this.onSelectedPD.bind(this)}>
                       
            <option>Pilih PD</option>
           {store.itemPD.map((pede) => (
                       <option key={pede.id} value={pede.id}>{pede.pd}</option>
                      ))}   
       </select>
    )
  }

  onSelectedPD = (event) => {
    this.setState({ g_dpd_id: event.target.value });
        console.log(event.target.value);
        this.fetchPC(event.target.value);
    //this.getKota(key);
    //this.props.Provinsi.clearItems();
  };

  async fetchPC(id) {
    let { data } = await axios.get(
      DevApi + `list/pc/${id}`
    );
    //console.log(data);
    this.setState({
      datapc : data,
      loading: false,
      id : data.id,
      name : data.name,
    });
    //console.log(this.state.data)
  }

  renderPC(){
    const pece = this.state.datapc || []
    //console.log(store)
   return(
       <select id="select" value={this.state.g_dpw_id}  name="g_dpw_id" className="form-control" onChange={this.onSelectedPC.bind(this)}>
                       
            <option>Pilih PD Terlebih Dahulu</option>
           {pece.map((pec) => (
                       <option key={pec.id} value={pec.id}>{pec.pc}</option>
                      ))}   
       </select>
    )
  }

  onSelectedPC = (event) => {
    this.setState({ g_dpw_id: event.target.value });
        console.log(event.target.value);
        this.fetchRayon(event.target.value);
    //this.getKota(key);
    //this.props.Provinsi.clearItems();
  };

  
  renderRayon(){
    const rayon = this.state.datarayon || []
    //console.log(store)
   return(
       <select id="select" value={this.state.g_dpra_id}  name="g_dpra_id" className="form-control" onChange={(e) => this.setState({g_dpra_id: e.target.value})} >
                       
            <option>Pilih PC Terlebih Dahulu</option>
           {rayon.map((ray) => (
                       <option key={ray.id} value={ray.id}>{ray.rayon}</option>
                      ))}   
       </select>
    )
  }

  async fetchRayon(id) {
    let { data } = await axios.get(
      DevApi + `list/rayon/${id}`
    );
    //console.log(data);
    this.setState({
      datarayon : data,
      loading: false,
      id : data.id,
      name : data.name,
    });
    //console.log(this.state.data)
  }

/////////////////////////////////////////

   renderJabatan(){
    const store = this.props.newsStore;
    //console.log(store)
   return(
       <select id="select" value={this.state.g_jabatan_id}  name="g_jabatan_id" className="form-control" onChange={(e) => this.setState({g_jabatan_id: e.target.value})}>
                       
            <option>Pilih Jabatan</option>
          {store.itemJabatan.map((jab) => (
                      <option key={jab.id} value={jab.id}>{jab.position}</option>
                    ))}
       </select>
    )
  }


  onSubmitPress() {

    if(this.state.subject == ''){
    this.setState({
                          loading: false,
                        });
        
         toast.info("Judul tidak boleh kosong !", {
          autoClose: 3000
        });
       }


  else if(this.state.message ==''){
     this.setState({
                        loading: false,
                      });
     toast.info("Isi pesan tidak boleh kosong !", {
        autoClose: 3000
      });
      
     }
    else{
  
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
    var url =  DevApi + 'message/send';

    const data = new FormData()
    console.log(data)
    data.append('jabatan_id', this.state.g_jabatan_id);
    data.append('pd_id', this.state.g_dpd_id);
    data.append('pc_id', this.state.g_dpw_id);
    data.append('rayon_id', this.state.g_dpra_id);
    data.append('subject', this.state.subject);
    data.append('message', this.state.message);
      axios.post(url, data).then((response) => {
        //this.setState({redirect: true});
        if(response.status == 200) {
          //this.setState({redirect: true});
          this.setState({
                        loading: false,
                      });
          toast('Berhasil Terkirim', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/pesan';",3000));
          //console.log(response)
          }else{
            this.setState({
                        loading: false,
                      });
          toast('Gagal Terkirim', { type: toast.TYPE.Error, autoClose: 3000, position: toast.POSITION.TOP_CENTER, });
          }
        
        //console.log(response)
      })
     }

}


  renderCat(){
    
     const store = this.props.newsStore;

     //console.log(store)
    
    return(
      
        <select id="select" value={this.state.category_id}  name="category_id" className="form-control" onChange={(e) => this.setState({category_id: e.target.value})}>
                        
             <option>Pilih PD</option>
            {store.itemCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.category}</option>
                       ))}   
        </select>
     )

  }
  
  render() {

    if(this.state.redirect){
        return (<Redirect to={'/pesan'}/>)
      }


     //console.log(store.);


    return (
             <div>
              <CardBody>
              <ToastContainer autoClose={3000} />
                <Form className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                    <Label htmlFor="text-input">Posisi</Label>
                    {this.renderJabatan()}
                    <Label htmlFor="select">PD</Label>
                    {this.renderPD()}
                    <Label htmlFor="text-input">PC</Label>
                    {this.renderPC()}
                      <Label htmlFor="text-input">RAYON</Label>
                    {this.renderRayon()}
                    </Col>
                    <Col xs="12" md="9">
                      <Label htmlFor="text-input">Judul Pesan</Label>
                      <Input 
                      type="text" 
                      value={this.state.subject} 
                      name="name"
                      maxlength="30"
                      onChange={(e) => this.setState({subject: e.target.value})} 
                      placeholder="Judul pesan" />
                      <br></br>
                      <ReactQuill theme="snow"
                        value={this.state.message}
                        modules={this.modules}
                        formats={this.formats}
                        placeholder="Isi Pesan"
                        onChange={this.handleChange} >
                    </ReactQuill>
                    </Col>
                  </FormGroup>
                  <Col className="text-center" xs="12" sm="12" md="12" lg="12">
                  <Link to="/pesan"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali </Button></Link>&nbsp;&nbsp;
                  <Button onClick={this.toggleLoading} className="tombol1" > <i className="fa fa-send"></i> Kirim</Button>
                  </Col>
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
