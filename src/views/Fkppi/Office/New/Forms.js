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
     data:[],
     datalurah:[],
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
    this.getProv();
    this.props.newsStore.fetchProv();
    this.props.newsStore.fetchPD();
   }
  
  toggleLoading() {

    this.setState({
      loading: !this.state.loading,
    });
     
      this.onSubmitPress();
      // setTimeout(() => {
    
      //  this.onSubmitPress();

      // }, 2000)
    
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
      // id : data.id,
      // name : data.name,
    });
    //console.log(this.state.data)
  }


  renderProv(){
     const store = this.props.newsStore;
     console.log(store.province)
    return(
        <select id="test"  value={this.state.province_id}  name="province_id" className="form-control" onChange={this.onSelectedProv.bind(this)}>
                        
             <option>Pilih Provinsi</option>
            {this.state.data.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                       ))}   
        </select>
     )
  }

  renderKota(){
    const kot = this.state.datakota || []
    //console.log(store)
   return(
     
       <select id="select" value={this.state.regency_id}  name="regency_id" className="form-control" onChange={this.onSelectedKota.bind(this)}>
                       
            <option>Pilih Provinsi Terlebih Dahulu</option>
           {kot.map((kota) => (
                       <option key={kota.id} value={kota.id}>{kota.name}</option>
                      ))}
       </select>
    )

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

  onSelectedProv = (event) => {
    this.setState({ province_id: event.target.value });
        console.log(event.target.value);
        this.fetchKota(event.target.value);
    //this.getKota(key);
    //this.props.Provinsi.clearItems();
  };

  async fetchKota(id) {
    let { data } = await axios.get(
      DevApi + `list/regency/${id}`
    );
    //console.log(data);
    this.setState({
      datakota : data,
      //loading: false,
      // idkota : data.id,
      // namekota : data.name,
    });
    //console.log(this.state.data)
  }

  
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
      // id : data.id,
      // name : data.name,
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

  getProv(){


   // this.setState({
   //        loading: true
   //    });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'list/province';
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
          console.log(response)
        }).then(function(result) {
          //componentWillUnmount();
          that.setState({ data : result,
                  loading: false
                        });
           //data : this.state.data(result.data),

           console.log(result)

        })
        .catch((error) => { console.error(error); });


  }


  ////

  onSelectedKota = (event) => {
  this.setState({regency_id: event.target.value });
      //console.log(event.target.value);
      this.fetchKecamatan(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchKecamatan(id) {
  let { data } = await axios.get(
    DevApi + `list/subdistrict/${id}`
  );
  //console.log(data);
  this.setState({
    datacamat : data,
    // loading: false,
    // id : data.id,
    // name : data.name,
  });
  //console.log(this.state.data)
}

renderKecamatan(){
  const camat = this.state.datacamat || []
  console.log(camat)
 return(
     <select id="select" value={this.state.subdistrict_id}  name="subdistrict_id" className="form-control" onChange={this.onSelectedKecamatan.bind(this)}>
          <option>Pilih Kota Terlebih Dahulu</option>
         {camat.map((cmat) => (
                     <option key={cmat.id} value={cmat.id}>{cmat.name}</option>
                    ))}
     </select>
  )
}

onSelectedKecamatan = (event) => {
  this.setState({ subdistrict_id: event.target.value });
      //console.log(event.target.value);
      this.fetchKelurahan(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

fetchKelurahan(id) {
  // let { data } = await axios.get(
  //   DevApi + `list/village/${id}`
  // );
  var url =  DevApi + 'list/village/' + id;
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
          console.log(response)
        }).then(function(result) {
          //componentWillUnmount();
          that.setState({ datalurah : result,
                  loading: false
                        });
           //data : this.state.data(result.data),

           console.log(result)

        })
        .catch((error) => { console.error(error); });
}

renderKelurahan(){
  const lurah = this.state.datalurah || []
  //console.log(store)
 return(
     <select id="select" value={this.state.village_id}  name="village_id" className="form-control" onChange={this.onSelectedKelurahan.bind(this)}>
          <option>Pilih Kecamatan Terlebih Dahulu</option>
         {this.state.datalurah.map((lur) => (
                     <option key={lur.id} value={lur.id}>{lur.name}</option>
                    ))}
     </select>
  )
}

onSelectedKelurahan = (eventx) => {
  this.setState({village_id: eventx.target.value });
      console.log('kel' + eventx.target.value);
      this.fetchPostcode(eventx.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchPostcode(id) {
  let { data } = await axios.get(
    DevApi + `list/postcode/${id}`
  );
  console.log(data);
  this.setState({
    // dataPostcode : data,
    // loading: false,
    postcode_id : data.postcode,
  });
  //console.log(this.state.data)
}

// renderPostcode(){
//   const postc = this.state.dataPostcode || []
//   //console.log(store)
//  return(
   
//      <Input id="select" value={this.state.postcode}  name="category_id" className="form-control" onChange={(e) => this.setState({h_postcodes_id: e.target.value})} />
         
//   )
// }


  onSubmitPress() {

    if(this.state.title == ''){
    this.setState({
                          loading: false,
                        });
        
         toast.info(" Nama Kantor tidak boleh kosong !", {
          autoClose: 3000
        });
       }


   else if(this.state.address ==''){
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
    var url =  DevApi + 'office/add';

    const data = new FormData()
    //console.log(data)
    data.append('title', this.state.title);
    data.append('address', this.state.address);
    data.append('phone', this.state.phone);
    data.append('email', this.state.email);
    data.append('postcode_id', '0');
    data.append('province_id', '0');
    data.append('regency_id', '0');
    data.append('subdistrict_id', '0');
    data.append('village_id', '0');
    data.append('pd_id', this.state.g_dpd_id);
    data.append('pc_id', this.state.g_dpw_id);
    data.append('rayon_id', this.state.g_dpra_id);
      axios.post(url, data).then((response) => {
        //this.setState({redirect: true});
        if(response.status == 200) {
          //this.setState({redirect: true});
          this.setState({
                        loading: false,
                      });
          toast('Berhasil ', { type: toast.TYPE.SUCCESS, autoClose: 3000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/office';",3000));
          //console.log(response)
          }else{
            this.setState({
                        loading: false,
                      });
          toast('Gagal', { type: toast.TYPE.Error, autoClose: 3000, position: toast.POSITION.TOP_CENTER, });
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
                   
                    <Label htmlFor="select" style={{marginTop:0}}>PD</Label>
                    {this.renderPD()}
                    <Label htmlFor="text-input" style={{marginTop:10}}>PC</Label>
                    {this.renderPC()}
                      <Label htmlFor="text-input" style={{marginTop:10}}>RAYON</Label>
                    {this.renderRayon()}
                    </Col>
                    <Col xs="12" md="9">
                      <Label htmlFor="text-input">Nama Kantor</Label>
                      <Input 
                      type="text" 
                      value={this.state.title} 
                      name="title"
                      onChange={(e) => this.setState({title: e.target.value})} 
                       placeholder="Nama Kantor" />
                     
                      <br></br>
                         <Label htmlFor="text-input">Telepon Kantor</Label>
                      <Input 
                      type="number" 
                      value={this.state.phone} 
                      name="phone"
                      onChange={(e) => this.setState({phone: e.target.value})}  
                      placeholder="Telepon Kantor" />
                       <br></br>
                         <Label htmlFor="text-input">Email Kantor</Label>
                      <Input 
                      type="text" 
                      value={this.state.email} 
                      name="email"
                      onChange={(e) => this.setState({email: e.target.value})}  
                      placeholder="Email  Kantor" />
                      <br></br>
                         
                      <br></br>
                       <Label htmlFor="text-input">Alamat Lengkap Kantor</Label>
                       <Input type="textarea" name="address" 
                        onChange={(e) => this.setState({address: e.target.value})}  
                       />
                    </Col>
                  </FormGroup>
                  <Col className="text-center" xs="12" sm="12" md="12" lg="12">
                  <Link to="/pesan"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali </Button></Link>&nbsp;&nbsp;
                  <Button onClick={this.toggleLoading} className="tombol1" > <i className="fa fa-send"></i> Tambah</Button>
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
