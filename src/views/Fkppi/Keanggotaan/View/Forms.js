import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import {MainApi, DevApi} from '../../../../views/Api/';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler, AppBreadcrumb} from '@coreui/react';
import classnames from 'classnames';

import {
  Badge,
  Button,
  TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText,
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
import ImageZoom from 'react-medium-image-zoom'
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import ReactQuill from "react-quill";
import kartuang from '../../../../assets/img/brand/Kartuanggota.png';
import kirimpes from '../../../../assets/img/brand/Kirimpesan.png';
import ReactLoading from 'react-loading';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');


let pathname = window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var path = pathArray[3];

axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

//console.log(path);
@inject("newsStore")
@observer
class Forms extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
     this.state = { 
      activeTab: '1',
      firstname: '',
      modal: false,
      nik: '',
      verified:'',
      id:'',
      idfkppi:'',
      unverified:'',
      photo:'',
      title1_name:'',
      title2_name:'',
      gender:'',
      reason:'',
      active:'',
      loading: true,
      redirect: false,
      occupation: '',
      spousename:'',
      birthplace:'',
      birthdate:'',
      maritalstatus:'',
      status:'',
      registered_date:'',
      size: '',
      idfkppi:'',
      alias:'',
      religion:'',
      degree:'',
      nik:'',
      jabatan_end:'',
      jabatan_start:'',
      nrp:'',
      p_name:'',
      military_status:'',
      military_uo:'',
      military_ranks:'',
      military_position:'',
      childrens:'',
      kinship:'',
      p_religion:'',
      o_pd:'',
      o_pc:'',
      o_rayon:'',
      o_position:'',
      o_status:'',
      o_jabatan_start:'',
      o_jabatan_end:'',
      position:'',
      info:'',
      o_registered_at:'',
      of_address_1: '',
      of_address_2: '',
      of_rtrw: '',
      of_phone: '',
      of_province: '',
      of_regency: '',
      of_subdistrict: '',
      of_village: '',
      of_postcode: '',
      h_address_1: '',
      d_KTA1: '',
      d_KTA2: '',
      d_DA1: '',
      d_DA2: '',
      d_DH1: '',
      d_DH2: '',
      d_Ortu1: '',
      d_Ortu2: '',
      d_Ortu3: '',
      h_address_2: '',
      h_rtrw: '',
      h_village: '',
      h_phone: '',
      h_province: '',
      h_regency: '',
      h_subdistrict: '',
      h_postcode: '',
      kartuanggota: '',
      hits: [],
      isLoading: false,
      datax:{},
      datax:[],
      data:{},
      subject:'',
      message:''
     }
    this.SubmitVer = this.onVerif.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     this.handleSend = this.handleSend.bind(this);
    this.togglex = this.togglex.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  togglex() {

    this.setState({
      modal: !this.state.modal,
    });

    // setTimeout(() => {
  
    // this.setState({
    //   modal: false,
    // });

    // }, 3000)
    
  }

  handleChange(event) {
    this.setState({
      size: event.target.value
    });
  }



//////


handleSend(){

if(this.state.subject == ''){
  // this.setState({
  //                       loading: false,
  //                       //invalid:true
  //                     });
       //console.log('Nama Depan tidak boleh kosong')
       toast.info("Judul pesan tidak boleh kosong !", {
        autoClose: 2000
      });
     }


  else if(this.state.message == ''){
     // this.setState({
     //                    loading: false,
     //                    //invalid:true
     //                  });
     toast.info("Isi pesan tidak boleh kosong !", {
        autoClose: 2000
      });
      //console.log('Nama Belakang tidak boleh kosong')
     }
     else{

       axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'message/send';
       const datax = new FormData()
      //console.log(data)
     datax.append('member_id', path); 
     datax.append('subject', this.state.subject);
     datax.append('message', this.state.message);

      axios.post(url, datax).then((response) => {


       if (response.status == '200') {

        this.setState({modal: false});
        toast('Berhasil Terkirim', { type: toast.TYPE.SUCCESS, autoClose: 2000, position: toast.POSITION.TOP_CENTER, }, setTimeout("location.href = '/keanggotaan';",2000));


       }else{

         this.setState({loading: false});
        toast('Gagal Terkirim', { type: toast.TYPE.ERROR, autoClose: 2000, position: toast.POSITION.TOP_CENTER, });

       }


      })


     }


}


///
  handleSubmit(event) {
    event.preventDefault();
    //console.log(`${this.state.size}`);
    if(`${this.state.size}` == 1 ){

     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'member/verify/'+ path;
  
      const data = new FormData()
      //console.log(data)
      data.append('reason', this.state.reason);
      axios.post(url, data).then((response) => {
        this.setState({redirect: true});
        alert('Verifikasi Sukses');
        //console.log(response)
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
        this.setState({redirect: true});
        alert('Verifikasi Dibatalkan');
        //console.log(response)
      })  
    }
  }
  // componentDidMount() {
  //    this.props.newsStore.fetchCategory();
  //    this.getNews();
  //  }

   //////

   onVerif = (event) => {
    //console.log(event.target.value);
    //console.log(event.target.value);
  };

   onSelectedSetuju = (event) => {
    this.setState({ value: event.target.value });
        //console.log(event.target.value);
         this.Verifikasitest(event.target.value);
    //this.getKota(key);
    //this.props.Provinsi.clearItems();
  };

  async Verifikasitest(value){

  this.setState({
      verified: '',
      loading: true
  });
  

  //console.log(this.state.myToken)
  
  var url =  DevApi + 'member/verify/'+ path;
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
              verified: result.is_verified,
              loading: false

                    });
      //data : this.state.data(result.data),
      
      //console.log(that.state.data);
    })
    .catch((error) => {  });
  }

   
static propTypes = {
    news: PropTypes.object,
  }
  
  

   componentDidMount() {
    //this.props.newsStore.fetchCategory();
    
    setTimeout(() => {
    
        this.dataMember();
    this.dataMember2();

      }, 2000)
    this.props.newsStore.fetchViewMember();
    this.setState({ isLoading: true });
      //this.props.newsStore.fetchCategory();

  }
    
  dataMember2(){

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
                  kartuanggota: result.cards.printedcard,

                        });
           //data : this.state.data(result.data),

           //console.log(that.state.data)
           
        })
        .catch((error) => {  });
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
                    id: result.id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    nik: result.nik,
                    title1_name: result.title1_name,
                    title1: result.title1,
                    title2: result.title2,
                    title2_name: result.title2_name,
                    photo: result.photo,
                    gender: result.gender,
                    gender_id: result.gender_id,
                    mobile: result.mobile,
                    verified: result.is_verified,
                    active: result.is_activated,
                    unverified: result.is_uverified,
                    idfkppi: result.idfkppi,
                    occupations: result.occupation,
                    pd: result.organizations.pd,
                    registered_date: result.organizations.registered_date,
                    birthdate: result.birthday,
                    birthplace: result.birthplace,
                    maritalstatus: result.maritalstatus,
                    status: result.organizations.status,
                    jabatan_start: result.organizations.jabatan_start,
                    jabatan_end: result.organizations.jabatan_end,
                    idfkppi: result.idfkppi,
                    alias: result.alias,
                    religion: result.religion,
                    degree: result.degree,
                    nik: result.nik,
                    spousename: result.spousename,
                    mothername: result.mothername,
                    nrp: result.parents.nrp,
                    p_name: result.parents.name,
                    h_address_1: result.addresses[0].address_1,
                    h_address_2: result.addresses[0].address_2,
                    h_rtrw: result.addresses[0].rtrw,
                    h_phone: result.addresses[0].phone,
                    h_province: result.addresses[0].province,
                    h_regency: result.addresses[0].regency,
                    h_subdistrict: result.addresses[0].subdistrict,
                    h_postcode: result.addresses[0].postcode,
                    h_village: result.addresses[0].village,
                    of_address_1: result.addresses[1].address_1,
                    of_address_2: result.addresses[1].address_2,
                    of_rtrw: result.addresses[1].rtrw,
                    of_phone: result.addresses[1].phone,
                    of_province: result.addresses[1].province,
                    of_regency: result.addresses[1].regency,
                    of_subdistrict: result.addresses[1].subdistrict,
                    of_postcode: result.addresses[1].postcode,
                    of_village: result.addresses[1].village,
                    military_status: result.parents.military_status,
                    military_uo: result.parents.military_uo,
                    military_ranks: result.parents.military_ranks,
                    military_position: result.parents.military_position,
                    childrens: result.parents.childrens,
                    kinship: result.parents.kinship,
                    info: result.parents.info,
                    p_religion: result.parents.religion,
                    o_pd: result.organizations.pd,
                    o_pc: result.organizations.pc,
                    o_rayon: result.organizations.rayon,
                    o_position: result.organizations.position,
                    o_status: result.organizations.status,
                    o_jabatan_start: result.organizations.position_start,
                    o_jabatan_end: result.organizations.position_end,
                    position: result.organizations.position,
                    o_registered_at: result.organizations.registered_at,
                    d_KTA1: result.documents[0].path,
                    d_KTA2: result.documents[1].path,
                    d_DA1: result.documents[2].path,
                    d_DA2: result.documents[3].path,
                    d_DH1: result.documents[4].path,
                    d_DH1Back: result.documents[9].path,
                    d_DH2: result.documents[5].path,
                    d_DHBack: result.documents[10].path,
                    d_Ortu1: result.documents[6].path,
                    d_Ortu2: result.documents[7].path,
                    d_Ortu3: result.documents[8].path,
                    hits: result.hits,
                    isLoading: false,
                    loading: false
  
                          });
             //data : this.state.data(result.data),
  
             console.log(result)
             
          })
          .catch((error) => {  });
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

//   renderAlamat(){
//     const store = this.props.newsStore;
//     //console.log(store)
//    return(
//        <div>
//            {store.address.map((add) => (
//                        <option key={add.address_1} value={cat.address_2}>{cat.address_}</option>
//                       ))}   
//        </div>
//     )
//  }


  // renderCat(){
    
  //    const store = this.props.newsStore;

  //    //console.log(store)
  //   if(this.state.photo == ""){
  //     return(
      
  //       <div>
  //           {store.itemCat.map((cat) => (
  //             <div>{cat.firstname}</div>
  //             ))}   
  //       </div>
  //    )
  //   }
  //   else{
  //     return(
  //       <div>
  //           {store.itemCat.map((cat) => (
  //             <div>{cat.firstname}</div>
  //             ))}   
  //       </div>
  //    )
  //   }
  // }

  renderTombolKartu(){
    
    //console.log(store)
    if(this.state.kartuanggota == ''){
      return(
        <div>
            
        </div>
     )
    }
    else{
      return(
        <div>
        <a href={this.state.kartuanggota} target="_blank" download="KartuAnggota"><img src={kartuang} alt="tombolkartu" width="72%"/></a><img src={kirimpes} alt="tombolkartu" width="72%" onClick={this.togglex}/></div>
        
     )
    }
  }

  renderButtons(){
    
    //console.log(store)
     if(this.state.verified == 0){
      return(
         
          <div>
           {this.renderButtons2()}
           <Link to={`/keanggotaan/edit/${this.state.id}`}><Button className="tombol1" type="submit" > Edit </Button></Link>
          <Link to={`/keanggotaan/verify/${this.state.id}`}><Button className="tombol1" type="submit" > Verifikasi </Button></Link>
          </div>
      )
    }if(this.state.active  == 0){
      return(
        
          <Link to={`/keanggotaan/active/${this.state.id}`}><Button className="tombol1" type="submit" > Aktivasi </Button></Link>
        
      )
    }
    if(this.state.active == 1){
      return(
        
          <Link to={`/keanggotaan/edit/${this.state.id}`}><Button className="tombol1" type="submit" > Edit </Button></Link>
        
      )
    }
  }
  
  renderButtons2(){
    
    //console.log(store)
     if(this.state.verified == 0){
      return(
        <Link to="/keanggotaan/verify"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>
      )
    }if(this.state.active  == 0){
      return(
        <Link to="/keanggotaan/active"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>
      )
    }
    if(this.state.active == 1){
      return(
        <Link to="/keanggotaan"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>
      )
    }
  }

  render() {
    // if(this.state.redirect){
    //   return (<Redirect to={'/keanggotaan'}/>)
    // }



     //console.log(store.);
    // if(this.state.data == ''){

    // return(
            
    //         <div className="col-md-4 col-sm-4">
    //         No Publications
    //         </div>


    //   )

    // }else{
      const { hits, isLoading } = this.state;
      const { store } = this.props;

      if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px"/></Col>
               </Row>

              )
      }else {
        
      
      
    return (
      
             <div>
             <ToastContainer autoClose={2000} />
              <CardBody>
                <Row className="mt-3 text-center">
                    <Col className="textcenter" xs="3" sm="3" md="3" lg="3">
                      <div className="DetailMemberList">Foto Anggota</div>
                      <div className="DetailMemberList"><img src={this.state.photo} alt={this.state.id} width="250"/></div>
                      <div className="mt-3 text-center" >{this.renderTombolKartu()}</div>
                    </Col>
                    <Col className="text-left" xs="9" sm="9" md="9" lg="9">
                      <div><strong className="ViewProfileName">{this.state.title1_name} {this.state.firstname} {this.state.lastname}, {this.state.title2_name}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-map-marker"></i> {this.state.pd} </div>
                      <div><strong className="ViewProfileJab">{this.state.occupation}</strong></div>
                      <table strong className="ViewProfileTab mt-4" hover bordered striped responsive size="sm">
                        <tr>
                        <td>Terdaftar Sejak</td>
                        <td>Nomor Anggota</td>
                        <td>Status Anggota</td>
                        <td>Periode jabatan</td>
                        </tr>
                        <tr>
                        <th>{this.state.registered_date}</th>
                        <th>{this.state.idfkppi}</th>
                        <th>{this.state.status}</th>
                        <th>{this.state.jabatan_start} - {this.state.jabatan_end}</th>
                        </tr>
                      </table>
                      <div>
        <Nav className="mt-5" tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
             <i class="fa fa-user icons font-1xl d-block"><span className="fontroboto">  Data Personal</span></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <i class="fa fa-home icons font-1xl d-block"><span className="fontroboto">  Alamat Rumah</span></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
             <i class="fa fa-building icons font-1xl d-block"><span className="fontroboto">  Alamat Kantor</span></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
             <i class="fa fa-child icons font-1xl d-block"><span className="fontroboto">  Data Orang Tua</span></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
             <i class="fa fa fa-shield icons font-1xl d-block"><span className="fontroboto">  Data Organisasi</span></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' })}
              onClick={() => { this.toggle('6'); }}
            >
             <i class="fa fa-paperclip icons font-1xl d-block"><span className="fontroboto">  Dokumen</span></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <table strong className="ViewProfileTab2 mt-4" hover bordered striped responsive size="sm">
                <tr>
                <td>Gelar Depan</td>
                <td>Tempat Lahir</td>
                <td>Status Perkawinan</td>
                </tr>
                <tr>
                <th>{this.state.title1_name}</th>
                <th>{this.state.birthplace}</th>
                <th>{this.state.maritalstatus}</th>
                </tr>
                <tr>
                <td>Nama Depan</td>
                <td>Tanggal Lahir</td>
                <td>Nama Pasangan</td>
                
                </tr>
                <tr>
                <th>{this.state.firstname}</th>
                <th>{ moment(this.state.birthdate).format('LL')}</th>
                <th>{this.state.spousename == 'null' ? 'tidak diisi' : this.state.spousename} </th>
               
                </tr>
                <tr>
                <td>Nama Belakang</td>
                <td>Jenis Kelamin</td>
                 <td>Nama Gadis Ibu Kandung</td>
                </tr>
                <tr>
                <th>{this.state.lastname}</th>
                <th>{this.state.gender}</th>
                  <th>{this.state.mothername}</th>
                </tr>
                <tr>
                <td>Email Anggota</td>
                <td>Gelar Belakang</td>
                <td>Agama</td>
                </tr>
                <tr>
                 <th>{this.state.email}</th>
                <th>{this.state.title2_name}</th>
                <th>{this.state.religion}</th>
                </tr>
                <tr>
                <td>Nama Alias</td>
                <td>Pendidikan Terakhir</td>
                </tr>
                <tr>
                <th>{this.state.alias}</th>
                <th>{this.state.degree}</th>
                </tr>
                <tr>
                <td>Nomor KTP/ Kartu Pelajar</td>
                <td>Pekerjaan</td>
                </tr>
                <tr>
                <th>{this.state.nik}</th>
                <th>{this.state.occupations}</th>
                </tr>
              </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
              <Col sm="12">
              <table strong className="ViewProfileTab2 mt-4" hover bordered striped responsive size="sm">
                <tr>
                <td>Provinsi</td>
   
                </tr>
                <tr>
                <th>{this.state.h_province}</th>
           
                </tr>
                <tr>
                <td>Kota/ Kabupaten</td>
                <td>RT/RW</td>
                </tr>
                <tr>
                <th>{this.state.h_regency}</th>
                <th>{this.state.h_rtrw}</th>
                </tr>
                <tr>
                <td>Kecamatan</td>
                <td>Kode Pos</td>
                </tr>
                <tr>
                <th>{this.state.h_subdistrict}</th>
                <th>{this.state.h_postcode}</th>
                </tr>
                <tr>
                <td>Kelurahan</td>
                <td>Nomor Telepon</td>
                </tr>
                <tr>
                <th>{this.state.h_village}</th>
                <th>{this.state.h_phone == 'null' ? 'tidak diisi' : this.state.h_phone }</th>
                </tr>
                <tr>
                <td>Alamat Lengkap</td>
                <td>Nomor Handphone</td>
                </tr>
                <tr>
                <th>{this.state.h_address_1}</th>
                <th>{this.state.mobile}</th>
                </tr>
              </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
          <Row>
              <Col sm="12">
              <table strong className="ViewProfileTab2 mt-4" hover bordered striped responsive size="sm">
              <tr>
                <td>Provinsi</td>
          
                </tr>
                <tr>
                <th>{this.state.of_province}</th>
        
                </tr>
                <tr>
                <td>Kota/ Kabupaten</td>
                <td>RT/RW</td>
                </tr>
                <tr>
                <th>{this.state.of_regency}</th>
                <th>{this.state.of_rtrw  == 'null' ? 'tidak diisi' : this.state.of_rtrw }</th>
                </tr>
                <tr>
                <td>Kecamatan</td>
                <td>Kode Pos</td>
                </tr>
                <tr>
                <th>{this.state.of_subdistrict}</th>
                <th>{this.state.of_postcode}</th>
                </tr>
                <tr>
                <td>Kelurahan</td>
                <td>Nomor Telepon</td>
                </tr>
                <tr>
                <th>{this.state.of_village}</th>
                <th>{this.state.of_phone == 'null' ? 'Tidak diisi' : this.state.of_phone}</th>
                </tr>
                <tr>
                <td>Alamat Lengkap</td>
                <td>Nomor Handphone</td>
                </tr>
                <tr>
                <th>{this.state.of_address_1 == 'null' ? 'Tidak diisi' : this.state.of_address_1}</th>
                <th>{this.state.of_phone == 'null' ? 'Tidak diisi' : this.state.of_phone}</th>
                </tr>
              </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
          <Row>
              <Col sm="12">
              <table strong className="ViewProfileTab2 mt-4" hover bordered striped responsive size="sm">
                <tr>
                <td>N.R.P/ N.I.P</td>
                <td>Jumlah Anak</td>
                </tr>
                <tr>
                <th>{this.state.nrp}</th>
                <th>{this.state.childrens}</th>
                </tr>
                <tr>
                <td>Nama</td>
                <td>Agama</td>
                </tr>
                <tr>
                <th>{this.state.p_name}</th>
                <th>{this.state.p_religion}</th>
                </tr>
                <tr>
                <td>Status Kemiliteran</td>
                <td>Hubungan Dengan Anggota</td>
                </tr>
                <tr>
                <th>{this.state.military_status}</th>
                <th>{this.state.kinship}</th>
                </tr>
                <tr>
                <td>Kesatuan</td>
                <td>Keterangan</td>
                </tr>
                <tr>
                <th>{this.state.military_uo}</th>
                <th>{ this.state.info == 'null' ? 'Tidak diisi' : this.state.info}</th>
                </tr>
                <tr>
                <td>Pangkat Terakhir</td>
                </tr>
                <tr>
                <th>{this.state.position}</th>
                </tr>
                <tr>
                <td>Jabatan Terakhir</td>
                </tr>
                <tr>
                <th>{this.state.military_position}</th>
                </tr>
              </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
          <Row>
              <Col sm="12">
              <table strong className="ViewProfileTab2 mt-4" hover bordered striped responsive size="sm">
                <tr>
                <td>Status Keanggotaan</td>
                <td>Jabatan</td>
                </tr>
                <tr>
                <th>{this.state.o_status}</th>
                <th>{this.state.o_position}</th>
                </tr>
                {/* <tr>
                <td>Periode Jabatan Organisasi</td>
                </tr>
                <tr>
                <th>{this.state.o_registered_at}</th>
                </tr> */}
                <tr>
                <td>Terdaftar Anggotan Sejak</td>
               
                </tr>
                <tr>
                <th>{this.state.registered_date}</th>
              
                </tr>
                <tr>
                <td>PD</td>
                </tr>
                <tr>
                <th>{this.state.o_pd}</th>
                </tr>
                <tr>
                <td>PC</td>
                </tr>
                <tr>
                <th>{this.state.o_pc}</th>
                </tr>
                <tr>
                <td>Rayon</td>
                </tr>
                <tr>
                <th>{this.state.o_rayon}</th>
                </tr>
              </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="6">
          <Row>
 
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">KTA DEPAN</div>
                  <div className="DetailMemberList text-center">

                  <ImageZoom
                      image={{
                        src: this.state.d_KTA1,
                        alt: this.state.d_KTA1,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_KTA1,
                        alt: this.state.d_KTA1
                      }}
                    />






                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">KTA BELAKANG</div>
                  <div className="DetailMemberList text-center">
                 

                  <ImageZoom
                      image={{
                        src: this.state.d_KTA2,
                        alt: this.state.d_KTA2,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_KTA2,
                        alt: this.state.d_KTA2
                      }}
                    />

                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">FOTO ANGGOTA</div>
                  <div className="DetailMemberList text-center">

                  <ImageZoom
                      image={{
                        src: this.state.d_DA1,
                        alt: this.state.d_DA1,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_DA1,
                        alt: this.state.d_DA1
                      }}
                    />


                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">KTP / KARTU PELAJAR</div>
                  <div className="DetailMemberList text-center">

                   <ImageZoom
                      image={{
                        src: this.state.d_DA2,
                        alt: this.state.d_DA2,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_DA2,
                        alt: this.state.d_DA2
                      }}
                    />


                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">SKEP PENSIUN Depan</div>
                  <div className="DetailMemberList text-center">

                   <ImageZoom
                      image={{
                        src: this.state.d_DH1,
                        alt: this.state.d_DH1,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_DH1,
                        alt: this.state.d_DH1
                      }}
                    />

                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">SKEP PENSIUN Belakang</div>
                  <div className="DetailMemberList text-center">
                   <ImageZoom
                      image={{
                        src: this.state.d_DH1Back,
                        alt: this.state.d_DH1Back,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_DH1Back,
                        alt: this.state.d_DH1Back
                      }}
                    />

                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">KTA ORANG TUA Depan</div>
                  <div className="DetailMemberList text-center">

                  <ImageZoom
                      image={{
                        src: this.state.d_DH2,
                        alt: this.state.d_DH2,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_DH2,
                        alt: this.state.d_DH2
                      }}
                    />




                  </div>
                </Col>
                 <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">KTA ORANG TUA Belakang</div>
                  <div className="DetailMemberList text-center">

                  <ImageZoom
                      image={{
                        src: this.state.d_DH2Back,
                        alt: this.state.d_DH2Back,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_DH2Back,
                        alt: this.state.d_DH2Back
                      }}
                    />



                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">AKTE KELAHIRAN</div>
                  <div className="DetailMemberList text-center">

                  <ImageZoom
                      image={{
                        src: this.state.d_Ortu1,
                        alt: this.state.d_Ortu1,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_Ortu1,
                        alt: this.state.d_Ortu1
                      }}
                    />


                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">KET. HUB DARAH</div>
                  <div className="DetailMemberList text-center">

                   <ImageZoom
                      image={{
                        src: this.state.d_Ortu2,
                        alt: this.state.d_Ortu2,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_Ortu2,
                        alt: this.state.d_Ortu2
                      }}
                    />



                  </div>
                </Col>
                <Col className="textcenter mt-2" xs="3" sm="3" md="3" lg="3">
                  <div className="DetailMemberList text-center">KET. LAINYA</div>
                  <div className="DetailMemberList text-center">


                  <ImageZoom
                      image={{
                        src: this.state.d_Ortu3,
                        alt: this.state.d_Ortu3,
                        className: 'img',
                        style: { width: '100px' }
                      }}
                      zoomImage={{
                        src: this.state.d_Ortu3,
                        alt: this.state.d_Ortu3
                      }}
                    />




                  </div>
                </Col>
         
            </Row>
          </TabPane>
        </TabContent>
      </div>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center mt-3 text-center">
               
               
                   <Col className="textcenter" xs="6" sm="6" md="6" lg="6">
                
                      
                      {this.renderButtons()}
                      
                  </Col>
                </Row>

              </CardBody>
              <Modal isOpen={this.state.modal} toggle={this.togglex} className={this.props.className} style={{marginTop:'12%'}}>

            <ModalBody>
              <div className="flex-row align-items-center">
              <Row className="justify-content-center">
                <Col md="10" className="catcha-modal">
                  <h1>Kirim Pesan</h1>
                 
                  <Form>
                    <Input 
                      type="text" 
                       maxlength="30"
                       placeholder="Judul Pesan Anda" 
                        value={this.state.subject}
                        onChange={(e) => this.setState({subject: e.target.value})}
                       className="input-forgot" style={{marginBottom:10}}/>
                       <Input 
                      type="textarea" 
                       placeholder="Isi Pesan Anda" 
                        value={this.state.message}
                        onChange={(e) => this.setState({message: e.target.value})}
                       className="input-forgot" style={{marginTop:5, height:100}}/>
                    <Button size="lg" block className="button-forgot" style={{color:'#fff'}} onClick={this.handleSend}>Kirim Pesan</Button>
                  </Form>
                </Col>
              </Row>
            </div>
            </ModalBody>

          </Modal>
           </div>

      );
    //}
  }
}
}

export default Forms;
