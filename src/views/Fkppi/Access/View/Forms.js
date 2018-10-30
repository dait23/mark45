import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import {MainApi, DevApi} from '../../../../views/Api/';
import axios from "axios";
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
} from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import ReactQuill from "react-quill";
import kartuang from '../../../../assets/img/brand/Kartuanggota.png';
import kirimpes from '../../../../assets/img/brand/Kirimpesan.png';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');


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
    this.toggle = this.toggle.bind(this);
     this.state = { 
      activeTab: '1',
      firstname: '',
      nik: '',
      verified:'',
      idfkppi:'',
      unverified:'',
      photo:'',
      title1_name:'',
      title2_name:'',
      gender:'',
      reason:'',
      loading: true,
      redirect: false,
      occupation: '',
      spousename:'',
      birthplace:'',
      birthdate:'',
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
      o_position:'',
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
      hits: [],
      isLoading: false,
      datax:{},
      datax:[],
      data:{}
     }
    this.SubmitVer = this.onVerif.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(event) {
    this.setState({
      size: event.target.value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    //console.log(`${this.state.size}`);
    if(`${this.state.size}` == 1 ){

     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'member/verify/'+ path;
  
      const data = new FormData()
      console.log(data)
      data.append('reason', this.state.reason);
      axios.post(url, data).then((response) => {
        this.setState({redirect: true});
        alert('Verifikasi Sukses');
        console.log(response)
      })

    }else{
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
      var url =  DevApi + 'member/unverify/'+ path;
  
      const data = new FormData()
      console.log(data)
      data.append('reason', this.state.reason);
      axios.post(url, data).then((response) => {
        this.setState({redirect: true});
        alert('Verifikasi Dibatalkan');
        console.log(response)
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
    console.log(event.target.value);
  };

   onSelectedSetuju = (event) => {
    this.setState({ value: event.target.value });
        console.log(event.target.value);
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
      
      console.log(that.state.data);
    })
    .catch((error) => { console.error(error); });
  }

   
static propTypes = {
    news: PropTypes.object,
  }
  
  

   componentDidMount() {
    //this.props.newsStore.fetchCategory();
    this.dataMember();
    this.props.newsStore.fetchViewMember();
    this.setState({ isLoading: true });
      //this.props.newsStore.fetchCategory();

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
                    lastname: result.lastname,
                    nik: result.nik,
                    title1_name: result.title1_name,
                    title2_name: result.title2_name,
                    photo: result.photo,
                    gender: result.gender,
                    verified: result.is_verified,
                    unverified: result.is_uverified,
                    idfkppi: result.idfkppi,
                    occupation: result.occupation,
                    pd: result.organizations.pd,
                    registered_date: result.registered_date,
                    birthdate: result.birthdate,
                    birthplace: result.birthplace,
                    status: result.organizations.status,
                    jabatan_start: result.organizations.jabatan_start,
                    jabatan_end: result.organizations.jabatan_end,
                    idfkppi: result.idfkppi,
                    alias: result.alias,
                    religion: result.religion,
                    degree: result.degree,
                    nik: result.nik,
                    spousename: result.spousename,
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
                    o_jabatan_start: result.organizations.jabatan_start,
                    o_jabatan_end: result.organizations.jabatan_end,
                    o_position: result.organizations.position,
                    o_registered_at: result.organizations.registered_at,
                    d_KTA1: result.documents[0].path,
                    d_KTA2: result.documents[1].path,
                    d_DA1: result.documents[2].path,
                    d_DA2: result.documents[3].path,
                    d_DH1: result.documents[4].path,
                    d_DH2: result.documents[5].path,
                    d_Ortu1: result.documents[6].path,
                    d_Ortu2: result.documents[7].path,
                    d_Ortu3: result.documents[8].path,
                    hits: result.hits,
                    isLoading: false,
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


  renderCat(){
    
     const store = this.props.newsStore;

     //console.log(store)
    if(this.state.photo == ""){
      return(
      
        <div>
            {store.itemCat.map((cat) => (
              <div>{cat.firstname}</div>
              ))}   
        </div>
     )
    }
    else{
      return(
      
        <div>
            {store.itemCat.map((cat) => (
              <div>{cat.firstname}</div>
              ))}   
        </div>
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
      if (isLoading) {
        return <i className="fa fa-spinner fa-spin mt-4 mb-4 text-center loadingicon"></i>;
      }
    return (
      
             <div>
              <CardBody>
                <Row className="mt-3 text-center">
                    <Col className="textcenter" xs="3" sm="3" md="3" lg="3">
                      <div className="DetailMemberList">Foto Anggota</div>
                      <div className="DetailMemberList"><img src={this.state.photo} alt={this.state.id} height="150px"/></div>
                      <div className="mt-3 text-center" ><img src={kartuang} alt="tombolkartu" width="80%"/></div>
                      <div ><img src={kirimpes} alt="tombolkartu" width="80%"/></div>
                    </Col>
                    <Col className="text-left" xs="9" sm="9" md="9" lg="9">
                      <div><strong className="ViewProfileName">{this.state.title1_name} {this.state.firstname} {this.state.lastname}, {this.state.title2_name}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker"></i> {this.state.pd} </div>
                      <div><strong className="ViewProfileJab">{this.state.occupation}</strong></div>
                      <table strong className="ViewProfileTab mt-4" hover bordered striped responsive size="sm">
                        <tr>
                        <td>Terdaftar Sejak</td>
                        <td>Nomor Anggota</td>
                        <td>Status Anggota</td>
                        <td>Perioder jabatan</td>
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
                <th>{this.state.lastname}</th>
                </tr>
                <tr>
                <td>Nama Depan</td>
                <td>Tanggal Lahir</td>
                <td>Nama Pasangan</td>
                </tr>
                <tr>
                <th>{this.state.firstname}</th>
                <th>{this.state.birthdate}</th>
                <th>{this.state.spousename}</th>
                </tr>
                <tr>
                <td>Nama Belakang</td>
                <td>Jenis Kelamin</td>
                </tr>
                <tr>
                <th>{this.state.lastname}</th>
                <th>{this.state.gender}</th>
                </tr>
                <tr>
                <td>Gelar Belakang</td>
                <td>Agama</td>
                </tr>
                <tr>
                <th>{this.state.lastname}</th>
                <th>{this.state.religion}</th>
                </tr>
                <tr>
                <td>Nama Alias</td>
                <td>Pendidikan Terakhir</td>
                </tr>
                <tr>
                <th>{this.state.lastname}</th>
                <th>{this.state.gender}</th>
                </tr>
                <tr>
                <td>Nomor KTP/ Kartu Pelajar</td>
                <td>Pekerjaan</td>
                </tr>
                <tr>
                <th>{this.state.nik}</th>
                <th>{this.state.gender}</th>
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
                <td>Alamat 2</td>
                </tr>
                <tr>
                <th>{this.state.h_province}</th>
                <th>{this.state.h_address_2}</th>
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
                <th>{this.state.h_phone}</th>
                </tr>
                <tr>
                <td>Alamat 1</td>
                <td>Nomor Handphone</td>
                </tr>
                <tr>
                <th>{this.state.h_address_1}</th>
                <th>{this.state.h_phone}</th>
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
                <td>Alamat 2</td>
                </tr>
                <tr>
                <th>{this.state.of_province}</th>
                <th>{this.state.of_address_2}</th>
                </tr>
                <tr>
                <td>Kota/ Kabupaten</td>
                <td>RT/RW</td>
                </tr>
                <tr>
                <th>{this.state.of_regency}</th>
                <th>{this.state.of_rtrw}</th>
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
                <th>{this.state.of_phone}</th>
                </tr>
                <tr>
                <td>Alamat 1</td>
                <td>Nomor Handphone</td>
                </tr>
                <tr>
                <th>{this.state.of_address_1}</th>
                <th>{this.state.of_phone}</th>
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
                <th>{this.state.info}</th>
                </tr>
                <tr>
                <td>Pangkat Terakhir</td>
                </tr>
                <tr>
                <th>{this.state.military_ranks}</th>
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
                <tr>
                <td>Periode Jabatan Organisasi</td>
                </tr>
                <tr>
                <th>{this.state.o_registered_at}</th>
                </tr>
                <tr>
                <td>Terdaftar Anggotan Sejak</td>
                <td>Sampai Dengan</td>
                </tr>
                <tr>
                <th>{this.state.o_jabatan_start}</th>
                <th>{this.state.o_jabatan_end}</th>
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
 
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">KTA Depan</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_KTA1} alt={this.state.d_KTA1} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">KTA Belakang</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_KTA2} alt={this.state.d_KTA2} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">KTP / Kartu Pelajar</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_DA1} alt={this.state.d_DA1} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">Foto Anggota</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_DA2} alt={this.state.d_DA2} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">SKEP Pensiun</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_DH1} alt={this.state.d_DH1} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">KTA TNI/ Polri Orang Tua</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_DH2} alt={this.state.d_DH2} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">Akte Kelahiran</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_Ortu1} alt={this.state.d_Ortu1} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">KK/ Ket. Hubungan Darah</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_Ortu2} alt={this.state.d_Ortu2} height="70px"/></div>
                </Col>
                <Col className="textcenter" xs="2" sm="2" md="2" lg="2">
                  <div className="DetailMemberList text-center">Keterangan Lainnya</div>
                  <div className="DetailMemberList text-center"><img src={this.state.d_Ortu3} alt={this.state.d_Ortu3} height="70px"/></div>
                </Col>
         
            </Row>
          </TabPane>
        </TabContent>
      </div>
                    </Col>
                </Row>

                <Row className="mt-3 text-center">
                  <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
                    <Link to="/keanggotaan"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali</Button></Link>&nbsp;&nbsp;
                    {/* <Button className="tombol1" type="submit" > Edit </Button> */}
                  </Col>
                </Row>

              </CardBody>
           </div>

      );
    //}
  }
}

export default Forms;
