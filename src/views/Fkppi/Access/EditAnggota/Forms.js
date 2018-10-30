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
} from 'reactstrap';

import PropTypes from 'prop-types';
import ReactQuill from "react-quill";
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import {MainApi, DevApi} from '../../../Api/';

let pathname = window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var path = pathArray[3];

axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

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
     title1:'',
     firstname: '',
     lastname:'',
     title2:'',
     alias:'',
     birthplace:'',
     birthday:'',
     birthdate:'',
     sex:'',
     religions_id:'',
     degree:'',
     occupations:'',
     maritalstatus:'',
     spousename:'',
     h_province_id:'',
     h_cities_id:'',
     h_districts_id:'',
     h_villages_id:'',
     h_address_1:'',
     h_address_2:'',
     h_rtrw:'',
     postcode:'',
     h_phone:'',
     mobile:'',
     o_province_id:'',
     o_cities_id:'',
     o_districts_id:'',
     o_villages_id:'',
     o_address_1:'',
     o_address_2:'',
     o_rtrw:'',
     o_postcodes_id:'',
     o_phone:'',
     p_nrp:'',
     p_name:'',
     p_military_status_id:'',
     p_military_uo_id:'',
     p_military_ranks_id:'',
     p_military_position_id:'',
     p_childrens:'',
     p_religions_id:'',
     p_kinship_id:'',
     p_info:'',
     g_members_memberstatus_id:'',
     g_organizations_id:'',
     g_dpd_id:'',
     g_dpw_id:'',
     g_dpra_id:'',
     g_jabatan_id:'',
     g_jabatan_start:'',
     g_jabatan_end:'',
     d_kta_front:'',
     d_KTA1: '',
      d_KTA2: '',
      d_DA1: '',
      d_DA2: '',
      d_DH1: '',
      d_DH2: '',
      d_Ortu1: '',
      d_Ortu2: '',
      d_Ortu3: '',
     d_kta_back:'',
     d_foto:'',
     d_ktp:'',
     d_skep_pensiun:'',
     d_kta_tnipolri:'',
     d_dok_tambahan:'',
     d_aktalahir:'',
     register_from:'',
     o_address_1: '',
     o_address_2: '',
      of_rtrw: '',
      of_phone: '',
      of_province: '',
      of_regency: '',
      of_subdistrict: '',
      of_village: '',
      of_postcode: '',
      h_address_1: '',
      h_address_2: '',
      h_rtrw: '',
      h_village: '',
      h_phone: '',
      h_province: '',
      h_regency: '',
      h_subdistrict: '',
      h_postcode: '',
     d_kk:'',
     files: [],
     data: [],
     redirect: false
     }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
    //this.dataMember = this.dataMember.bind(this);
  }

   handleChange(value) {
    this.setState({ body: value })
  }

   onFilesChange = ( files: File[] ) =>{ 
    this.setState( { files } )
  }

  componentDidMount() {
    //this.props.newsStore.dataMember();
    this.props.newsStore.fetchMiliter();
    this.props.newsStore.ViewEditmember(path);
    this.props.newsStore.fetchMiliterUO();
    this.props.newsStore.fetchCategory();
    this.props.newsStore.fetchKota();
    this.props.newsStore.fetchMiliter();
    this.props.newsStore.fetchAgama();
    this.props.newsStore.fetchDarah();
    this.props.newsStore.fetchMembers();
    this.props.newsStore.fetchPD();
    this.props.newsStore.fetchGelar();
    this.props.newsStore.fetchPekerjaan();
    this.props.newsStore.fetchGender();
    this.props.newsStore.fetchKawin();
    this.props.newsStore.fetchGelar1();
    this.props.newsStore.fetchGelar2();
    this.props.newsStore.fetchJabatan();
    this.dataMember();
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
                  birthdate: result.birthday,
                  maritalstatus: result.maritalstatus,
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
                  p_nrp: result.parents.nrp,
                  p_name: result.parents.name,
                  p_religion: result.parents.religion,
                  military_status: result.parents.military_status,
                  military_uo: result.parents.military_uo,
                  p_military_ranks: result.parents.military_ranks,
                  p_military_position: result.parents.military_position,
                  p_childrens: result.parents.childrens,
                  p_kinship: result.parents.kinship,
                  p_info: result.parents.info,
                  o_pd: result.organizations.pd,
                  o_pc: result.organizations.pc,
                  h_address_1: result.addresses[0].address_1,
                  h_address_2: result.addresses[0].address_2,
                  h_rtrw: result.addresses[0].rtrw,
                  h_phone: result.addresses[0].phone,
                  mobile: result.addresses[0].mobile,
                  h_province: result.addresses[0].province,
                  h_regency: result.addresses[0].regency,
                  h_subdistrict: result.addresses[0].subdistrict,
                  postcode: result.addresses[0].postcode,
                  h_village: result.addresses[0].village,
                  o_address_1: result.addresses[1].address_1,
                  o_address_2: result.addresses[1].address_2,
                  of_rtrw: result.addresses[1].rtrw,
                  o_phone: result.addresses[1].phone,
                  of_province: result.addresses[1].province,
                  of_regency: result.addresses[1].regency,
                  of_subdistrict: result.addresses[1].subdistrict,
                  o_postcodes_id: result.addresses[1].postcode,
                  of_village: result.addresses[1].village,
                  d_KTA1: result.documents[0].path,
                    d_KTA2: result.documents[1].path,
                    d_DA1: result.documents[2].path,
                    d_DA2: result.documents[3].path,
                    d_DH1: result.documents[4].path,
                    d_DH2: result.documents[5].path,
                    d_Ortu1: result.documents[6].path,
                    d_Ortu2: result.documents[7].path,
                    d_Ortu3: result.documents[8].path,
                  o_rayon: result.organizations.rayon,
                  o_position: result.organizations.position,
                  o_status: result.organizations.status,
                  o_jabatan_start: result.organizations.position_start,
                  o_jabatan_end: result.organizations.position_end,
                  o_position: result.organizations.position,
                  o_registered_at: result.organizations.registered_at,
                  loading: false

                        });
           //data : this.state.data(result.data),

           console.log(that.state.data)
           
        })
        .catch((error) => { console.error(error); });
  }


   onSubmitPress() {

    //evt.preventDefault()
     //var url =  DevApi + 'news/add';
    //  if(this.state.lastname === ''){
    //   alert('Nama tidak boleh kosong');
    //  }
    //  if(this.state.title1 === ''){
    //   alert('title1 tidak boleh kosong');
    //  }
    //  if(this.state.title2 === ''){
    //   alert('title2 tidak boleh kosong');
    //  }
    //  if(this.state.birthplace === ''){
    //   alert('alias tidak boleh kosong');
    //  }
    //  if(this.state.nik === ''){
    //   alert('publisher tidak boleh kosong');
    //  }
  
     axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
     axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
     var url =  DevApi + 'member/edit/'+ path;
  
      const data = new FormData()
      console.log(data)
      data.append('firstname', this.state.firstname);
   data.append('lastname', this.state.lastname);
   data.append('title1', this.state.title1);
   data.append('title2', this.state.title2);
   data.append('alias', this.state.alias);
   data.append('nik', this.state.nik);
   data.append('birthplace', this.state.birthplace);
   data.append('birthday', this.state.birthday);
   data.append('sex', this.state.sex);
   data.append('religions_id', this.state.religions_id);
   data.append('degree', this.state.degree);
   data.append('occupations', this.state.occupations);
   data.append('maritalstatus', this.state.maritalstatus);
   data.append('spousename', this.state.spousename);
   data.append('h_province_id', this.state.h_province_id);
   data.append('h_cities_id', this.state.h_cities_id);
   data.append('h_districts_id', this.state.h_districts_id);
   data.append('h_villages_id', this.state.h_villages_id);
   data.append('h_address_1', this.state.h_address_1);
   data.append('h_address_2', this.state.h_address_2);
   data.append('h_rtrw', this.state.h_rtrw);
   data.append('h_postcodes_id', this.state.h_postcodes_id);
   data.append('h_phone', this.state.h_phone);
   data.append('mobile', this.state.mobile);
   data.append('o_province_id', this.state.o_province_id);
   data.append('o_cities_id', this.state.o_cities_id);
   data.append('o_districts_id', this.state.o_districts_id);
   data.append('o_villages_id', this.state.o_villages_id);
   data.append('o_address_1', this.state.o_address_1);
   data.append('o_address_2', this.state.o_address_2);
   data.append('o_rtrw', this.state.o_rtrw);
   data.append('o_postcodes_id', this.state.o_postcodes_id);
   data.append('o_phone', this.state.o_phone);
   data.append('p_nrp', this.state.p_nrp);
   data.append('p_name', this.state.p_name);
   data.append('p_military_status_id', this.state.p_military_status_id);
   data.append('p_military_uo_id', this.state.p_military_uo_id);
   data.append('p_military_ranks_id',  this.state.p_military_ranks_id);
   data.append('p_military_position_id', this.state.p_military_position_id);
   data.append('p_childrens', this.state.p_childrens);
   data.append('p_religions_id', this.state.p_religions_id);
   data.append('p_kinship_id', this.state.p_kinship_id);
   data.append('p_info', this.state.p_info);
   data.append('g_members_memberstatus_id', this.state.g_members_memberstatus_id);
   data.append('g_organizations_id', this.state.g_organizations_id);
   data.append('g_registered_at', this.state.g_registered_at);
   data.append('g_dpd_id', this.state.g_dpd_id);
   data.append('g_dpw_id', this.state.g_dpw_id);
   data.append('g_dpra_id', this.state.g_dpra_id);
   data.append('g_jabatan_id', this.state.g_jabatan_id);
   data.append('g_jabatan_start', this.state.g_jabatan_start);
   data.append('g_jabatan_end', this.state.g_jabatan_end);
   data.append('d_kta_front', this.state.gambarKTA1);
   data.append('d_kta_back', this.state.gambarKTA2);
   data.append('d_foto', this.state.gambarDA1);
   data.append('d_ktp', this.state.gambarDA2);
   data.append('d_skep_pensiun', this.state.gambarDH1);
   data.append('d_kta_tnipolri', this.state.gambarDH2);
   data.append('d_dok_tambahan', this.state.gambarOrtu1);
   data.append('d_aktalahir', this.state.gambarOrtu2);
   data.append('d_kk', this.state.gambarOrtu3);
   data.append('register_from', this.state.register_from);
      axios.post(url, data).then((response) => {
        this.setState({redirect: true});
        alert('Pendaftaran Sukses');
        console.log(response)
      })
     }

  onSelectedProv = (event) => {
    this.setState({ h_province_id: event.target.value });
        //console.log(event.target.value);
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
      loading: false,
      idkota : data.id,
      namekota : data.name,
    });
    //console.log(this.state.data)
  }
  
renderKota(){
    const kot = this.state.datakota || []
    //console.log(store)
   return(
     
       <select id="select" value={this.state.h_cities_id}  name="h_cities_id" className="form-control" onChange={this.onSelectedKota.bind(this)}>
                       
            <option>{this.state.h_regency}</option>
           {kot.map((kota) => (
                       <option key={kota.id} value={kota.id}>{kota.name}</option>
                      ))}
       </select>
    )

 }
 
 onSelectedKota = (event) => {
  this.setState({ h_cities_id: event.target.value });
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
    loading: false,
    id : data.id,
    name : data.name,
  });
  //console.log(this.state.data)
}

renderKecamatan(){
  const camat = this.state.datacamat || []
  //console.log(store)
 return(
     <select id="select" value={this.state.h_districts_id}  name="h_districts_id" className="form-control" onChange={this.onSelectedKecamatan.bind(this)}>
          <option>{this.state.h_subdistrict} </option>
         {camat.map((cmat) => (
                     <option key={cmat.id} value={cmat.id}>{cmat.name}</option>
                    ))}
     </select>
  )
}

onSelectedKecamatan = (event) => {
  this.setState({ h_districts_id: event.target.value });
      //console.log(event.target.value);
      this.fetchKelurahan(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchKelurahan(id) {
  let { data } = await axios.get(
    DevApi + `list/village/${id}`
  );
  console.log(data);
  this.setState({
    datalurah : data,
    loading: false,
    id : data.id,
    name : data.name,
  });
  //console.log(this.state.data)
}

renderKelurahan(){
  const lurah = this.state.datalurah || []
  //console.log(store)
 return(
     <select id="select" value={this.state.h_villages_id}  name="h_villages_id" className="form-control" onChange={this.onSelectedKelurahan.bind(this)}>
          <option>{this.state.h_village}</option>
         {lurah.map((lur) => (
                     <option key={lur.id} value={lur.id}>{lur.name}</option>
                    ))}
     </select>
  )
}

onSelectedKelurahan = (event) => {
  this.setState({ h_villages_id: event.target.value });
      console.log(event.target.value);
      this.fetchPostcode(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchPostcode(id) {
  let { data } = await axios.get(
    DevApi + `list/postcode/${id}`
  );
  console.log(data);
  this.setState({
    dataPostcode : data,
    loading: false,
    postcode : data.postcode,
  });
  //console.log(this.state.data)
}

renderPostcode(){
  const postc = this.state.dataPostcode || []
  //console.log(store)
 return(
   
     <Input id="select" value={this.state.postcode}  name="category_id" className="form-control" onChange={(e) => this.setState({h_postcodes_id: e.target.value})} />
         
  )
}

  renderCat(){
     const store = this.props.newsStore;
     //console.log(store)
    return(
        <select id="test" className={this.state.h_province_id} value={this.state.h_province_id}  name="h_province_id" className="form-control" onChange={this.onSelectedProv.bind(this)}>
                        
             <option>{this.state.h_province}</option>
            {store.itemCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                       ))}   
        </select>
     )
  }
  // PCCPDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  renderPD(){
    const store = this.props.newsStore;
    //console.log(store)
   return(
       <select id="select" value={this.state.g_dpd_id}  name="g_dpd_id" className="form-control "onChange={this.onSelectedPD.bind(this)}>
                       
            <option>{this.state.o_pd}</option>
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
              {this.state.g_dpw_id}         
            <option>{this.state.o_pc}</option>
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
                       
            <option>{this.state.o_rayon}</option>
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

// --------------------------------------------------

renderProvOf(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
     <select id="test" className={this.state.o_province_id} value={this.state.o_province_id}  name="o_province_id" className="form-control" onChange={this.onSelectedProvOf.bind(this)}>
                     
          <option>{this.state.of_province}</option>
         {store.itemCat.map((cat) => (
                     <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}   
     </select>
  )
}

onSelectedProvOf = (event) => {
  this.setState({ o_province_id: event.target.value });
      //console.log(event.target.value);
       this.fetchKotaOf(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchKotaOf(id) {
  let { data } = await axios.get(
    DevApi + `list/regency/${id}`
  );
  //console.log(data);
  this.setState({
    datakotaof : data,
    loading: false,
    idkota : data.id,
    namekota : data.name,
  });
  //console.log(this.state.data)
}

renderKotaOf(){
  const kot = this.state.datakotaof || []
  //console.log(store)
 return(
   
     <select id="select" value={this.state.o_cities_id}  name="o_cities_id" className="form-control" onChange={this.onSelectedKotaOf.bind(this)}>
                     
          <option>{this.state.of_regency}</option>
         {kot.map((kota) => (
                     <option key={kota.id} value={kota.id}>{kota.name}</option>
                    ))}
     </select>
  )

}

onSelectedKotaOf = (event) => {
  this.setState({ o_cities_id: event.target.value });
      //console.log(event.target.value);
      this.fetchKecamatanOf(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchKecamatanOf(id) {
  let { data } = await axios.get(
    DevApi + `list/subdistrict/${id}`
  );
  //console.log(data);
  this.setState({
    datacamatOf : data,
    loading: false,
    id : data.id,
    name : data.name,
  });
  //console.log(this.state.data)
}

renderKecamatanOf(){
  const camat = this.state.datacamatOf || []
  //console.log(store)
 return(
     <select id="select" value={this.state.o_districts_id}  name="o_districts_id" className="form-control" onChange={this.onSelectedKecamatanOf.bind(this)}>
          <option>{this.state.of_subdistrict}</option>
         {camat.map((cmat) => (
                     <option key={cmat.id} value={cmat.id}>{cmat.name}</option>
                    ))}
     </select>
  )
}

onSelectedKecamatanOf = (event) => {
  this.setState({ o_districts_id: event.target.value });
      //console.log(event.target.value);
      this.fetchKelurahanOf(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchKelurahanOf(id) {
  let { data } = await axios.get(
    DevApi + `list/village/${id}`
  );
  console.log(data);
  this.setState({
    datalurahOf : data,
    loading: false,
    id : data.id,
    name : data.name,
  });
  //console.log(this.state.data)
}

renderKelurahanOf(){
  const lurahof = this.state.datalurahOf || []
  //console.log(store)
 return(
     <select id="select" value={this.state.o_villages_id}  name="o_villages_id" className="form-control" onChange={this.onSelectedKelurahanOf.bind(this)}>
          <option>{this.state.of_village}</option>
         {lurahof.map((lur) => (
                     <option key={lur.id} value={lur.id}>{lur.name}</option>
                    ))}
     </select>
  )
}

onSelectedKelurahanOf = (event) => {
  this.setState({ o_villages_id: event.target.value });
      console.log(event.target.value);
      this.fetchPostcodeOf(event.target.value);
  //this.getKota(key);
  //this.props.Provinsi.clearItems();
};

async fetchPostcodeOf(id) {
  let { data } = await axios.get(
    DevApi + `list/postcode/${id}`
  );
  console.log(data);
  this.setState({
    dataPostcodeOf : data,
    loading: false,
    o_postcodes_id : data.postcode,
  });
  //console.log(this.state.data)
}

renderPostcodeOf(){
  const postc = this.state.dataPostcode || []
  //console.log(store)
 return(
   
     <Input id="select" value={this.state.o_postcodes_id}  name="category_id" className="form-control" onChange={(e) => this.setState({o_postcodes_id: e.target.value})} />
         
  )
}



// --------------------------------------------------


renderGelar1(){
  const gelar1 = this.props.newsStore;
  //console.log(store)
 return(
     <select id="select" value={this.state.title1}  name="title1" className="form-control" onChange={(e) => this.setState({title1: e.target.value})}>
                     
          <option>{this.state.title1_name}</option>
         {gelar1.itemGelar1.map((gel1) => (
                     <option key={gel1.id} value={gel1.id}>{gel1.title}</option>
                    ))}   
     </select>
  )
}

renderGelar2(){
  const gelar2 = this.props.newsStore;
  //console.log(store)
 return(
   
     <select id="select" value={this.state.title2}  name="title2" className="form-control" onChange={(e) => this.setState({title2: e.target.value})}>
                     
          <option>{this.state.title2_name}</option>
         {gelar2.itemGelar2.map((gel2) => (
                     <option key={gel2.id} value={gel2.id}>{gel2.title}</option>
                    ))}   
     </select>
  )
}

  renderAgama(){
    const store = this.props.newsStore;
      //console.log(store)
    return(
      
        <select id="select" value={this.state.religions_id}  name="religions_id" className="form-control" onChange={(e) => this.setState({religions_id: e.target.value})}>
                        
              <option>{this.state.religion}</option>
            {store.itemAgama.map((agam) => (
                        <option key={agam.id} value={agam.id}>{agam.religion}</option>
                        ))}   
        </select>
      )

  }

  renderAgamaOrtu(){
    const store = this.props.newsStore;
      //console.log(store)
    return(
      
        <select id="select" value={this.state.p_religions_id}  name="p_religions_id" className="form-control" onChange={(e) => this.setState({p_religions_id: e.target.value})}>
                        
              <option>{this.state.p_religion}</option>
            {store.itemAgama.map((agam) => (
                        <option key={agam.id} value={agam.id}>{agam.religion}</option>
                        ))}   
        </select>
      )

  }


  renderDarah(){
    const store = this.props.newsStore;
    //console.log(store)
  return(
    
      <select id="select" value={this.state.p_kinship_id}  name="p_kinship_id" className="form-control" onChange={(e) => this.setState({p_kinship_id: e.target.value})}>
                      
            <option>{this.state.p_kinship}</option>
          {store.itemDarah.map((dara) => (
                      <option key={dara.id} value={dara.id}>{dara.name}</option>
                      ))}   
      </select>
    )
  }
  

  renderKawin(){
    const store = this.props.newsStore;
    //console.log(store)
  return(
    
      <select id="select" value={this.state.maritalstatus}  name="maritalstatus" className="form-control" onChange={(e) => this.setState({maritalstatus: e.target.value})}>
                      
            <option>{this.state.maritalstatus}</option>
          {store.itemKawin.map((win) => (
                      <option key={win.id} value={win.id}>{win.status}</option>
                      ))}   
      </select>
    )
  }

  

 renderMiliter(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
     <select id="select" value={this.state.p_military_status_id}  name="category_id" className="form-control" onChange={(e) => this.setState({p_military_status_id: e.target.value})}>
                     
          <option>{this.state.military_status}</option>
         {store.itemMiliter.map((mil) => (
                     <option key={mil.id} value={mil.id}>{mil.status}</option>
                    ))}   
     </select>
  )
}

renderMembers(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
     <select id="select" value={this.state.g_members_memberstatus_id}  name="category_id" className="form-control" onChange={(e) => this.setState({g_members_memberstatus_id: e.target.value})}>
                     
          <option>{this.state.status}</option>
         {store.itemMembers.map((mem) => (
                     <option key={mem.id} value={mem.id}>{mem.status}</option>
                    ))}   
     </select>
  )
}

renderGelar(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
     <select id="select" value={this.state.degree}  name="category_id" className="form-control" onChange={(e) => this.setState({degree: e.target.value})}>
                     
          <option>{this.state.degree}</option>
         {store.itemGelar.map((gelar) => (
                     <option key={gelar.id} value={gelar.id}>{gelar.degree}</option>
                    ))}   
     </select>
  )
}

renderJabatan(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
     <select id="select" value={this.state.g_jabatan_id}  name="g_jabatan_id" className="form-control" onChange={(e) => this.setState({g_jabatan_id: e.target.value})}>
                     
          <option>{this.state.o_position}</option>
        {store.itemJabatan.map((jab) => (
                    <option key={jab.id} value={jab.id}>{jab.position}</option>
                  ))}   
     </select>
  )
}

renderMiliterUO(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
   
     <select id="select" value={this.state.p_military_uo_id}  name="category_id" className="form-control" onChange={(e) => this.setState({p_military_uo_id: e.target.value})}>
          <option>{this.state.military_uo}</option>
         {store.itemMiliterUO.map((milo) => (
                     <option key={milo.id} value={milo.id}>{milo.uo}</option>
                    ))}   
     </select>
  )

}

renderPekerjaan(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
   
     <select id="select" value={this.state.occupations}  name="category_id" className="form-control" onChange={(e) => this.setState({occupations: e.target.value})}>
                     
          <option>{this.state.occupation}</option>
         {store.itemPekerjaan.map((kerja) => (
                     <option key={kerja.id} value={kerja.id}>{kerja.occupation}</option>
                    ))}   
     </select>
  )
}

renderGender(){
  const store = this.props.newsStore;
  //console.log(store)
 return(
   
     <select id="select" value={this.state.sex}  name="category_id" className="form-control" onChange={(e) => this.setState({sex: e.target.value})}>
                     
          <option>{this.state.gender}</option>
         {store.itemGender.map((gender) => (
                     <option key={gender.id} value={gender.id}>{gender.gender}</option>
                    ))}   
     </select>
  )
}
/////////////////////////////////////////////////////////////////////

onChangeFileKTA1 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarKTA1: files[0]
  });
};

onChangeFileKTA2 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarKTA2: files[0]
  });
};

onChangeFileDA1 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarDA1: files[0]
  });
};

onChangeFileDA2 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarDA2: files[0]
  });
};

onChangeFileDH1 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarDH1: files[0]
  });
};

onChangeFileDH2 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarDH2: files[0]
  });
};

onChangeFileOrtu1 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarOrtu1: files[0]
  });
};

onChangeFileOrtu2 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarOrtu2: files[0]
  });
};

onChangeFileOrtu3 = (event) => {
  let files = event.target.files || event.dataTransfer.files;
  this.setState({
    gambarOrtu3: files[0]
  });
};


////////////////////////////////////////////////////////////////////
  render() {
    if(this.state.redirect){
      return (<Redirect to={'/keanggotaan'}/>)
    }

    const store = this.props.newsStore;

     //console.log(store.);


    return (
             <div>
              <CardBody>
                <Form onSubmit={this.SubmitVer} className="form-horizontal">
                  <FormGroup row>
                    <Col xs="12" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">GELAR DEPAN </Label>
                      {this.renderGelar1()}
                      <Label htmlFor="text-input">NAMA DEPAN </Label>
                      {/* {store.itemGelar2.map((gel2) => (
                      <div key={gel2.id} value={gel2.id}>{gel2.firstname}</div>
                      ))}  */}
                      <Input 
                      type="text" 
                      value={this.state.firstname} 
                      name="name"
                      onChange={(e) => this.setState({firstname: e.target.value})} 
                      placeholder={this.state.firstname} />
                      <Label htmlFor="text-input">NAMA BELAKANG</Label>
                      <Input 
                      type="text" 
                      value={this.state.lastname} 
                      name="name"
                      onChange={(e) => this.setState({lastname: e.target.value})} 
                      placeholder={this.state.lastname}  />
                      <Label htmlFor="text-input">ALIAS</Label>
                      <Input 
                      type="text" 
                      value={this.state.alias} 
                      name="name"
                      onChange={(e) => this.setState({alias: e.target.value})} 
                      placeholder={this.state.alias} />
                      <Label htmlFor="text-input">GELAR BELAKANG</Label>
                      {this.renderGelar2()}
                      <Label htmlFor="text-input">NO KTP / KARTU PELAJAR</Label>
                      <Input 
                      type="text" 
                      value={this.state.nik} 
                      name="name"
                      onChange={(e) => this.setState({nik: e.target.value})} 
                      placeholder="No KTP/ Kartu Pelajar" />
                      <Label htmlFor="text-input">TEMPAT LAHIR </Label>
                      <Input 
                      type="text"
                      value={this.state.birthplace} 
                      name="name"
                      onChange={(e) => this.setState({birthplace: e.target.value})} 
                      placeholder="Tempat Lahir" />
                      <Label htmlFor="text-input">TANGGAL LAHIR <strong> {this.state.birthdate}</strong></Label>
                      <Input 
                      type="date" 
                      value={this.state.birthday} 
                      name="name"
                      onChange={(e) => this.setState({birthday: e.target.value})} 
                      placeholder="Tanggal Lahir" />
                    </Col>
                    <Col  xs="12" sm="6" md="6" lg="6">
                    <Label htmlFor="text-input">JENIS KELAMIN</Label>
                      {this.renderGender()}
                      <Label htmlFor="text-input">AGAMA</Label>
                      {this.renderAgama()}
                      <Label htmlFor="text-input">PENDIDIKAN TERAKHIR</Label>
                      {this.renderGelar()}
                      <Label htmlFor="text-input">PEKERJAAN</Label>
                      {this.renderPekerjaan()}
                      <Label htmlFor="text-input">STATUS PERKAWINAN</Label>
                      {this.renderKawin()}
                      <Label htmlFor="text-input">NAMA PASANGAN</Label>
                      <Input 
                      type="text" 
                      value={this.state.spousename} 
                      name="name"
                      onChange={(e) => this.setState({spousename: e.target.value})} 
                      placeholder="Nama Pasangan" />
                    </Col>
                  </FormGroup>
                  <strong>ALAMAT RUMAH</strong>
                  <hr></hr>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">PROVINSI</Label>
                      {this.renderCat()}
                      <Label htmlFor="text-input">KOTA/ KABUPATEN</Label>
                      {this.renderKota()}
                      <Label htmlFor="text-input">KECAMATAN</Label>
                      {this.renderKecamatan()}
                      <Label htmlFor="text-input">KELURAHAN</Label>
                      {this.renderKelurahan()}
                      <Label htmlFor="text-input">ALAMAT 1</Label>
                      <Input 
                      type="textarea"
                      value={this.state.h_address_1} 
                      name="name"
                      onChange={(e) => this.setState({h_address_1: e.target.value})} 
                      placeholder="Alamat Rumah 1" />
                    </Col>
                    <Col  xs="12" sm="6" md="6" lg="6">
                    <Label htmlFor="text-input">ALAMAT2</Label>
                      <Input 
                      type="textarea" 
                      value={this.state.h_address_2} 
                      name="name"
                      onChange={(e) => this.setState({h_address_2: e.target.value})} 
                      placeholder="Alamat Rumah 2" />
                      <Label htmlFor="text-input">RT/ RW</Label>
                      <Input 
                      type="text" 
                      value={this.state.h_rtrw} 
                      name="name"
                      onChange={(e) => this.setState({h_rtrw: e.target.value})} 
                      placeholder="RT/ RW"/>
                      <Label htmlFor="text-input">KODE POS</Label>
                      {this.renderPostcode()}
                      <Label htmlFor="text-input">NO TELEPHONE</Label>
                      <Input 
                      type="text" 
                      value={this.state.h_phone} 
                      name="name"
                      onChange={(e) => this.setState({h_phone: e.target.value})} 
                      placeholder="Nomor Telephone" />
                      <Label htmlFor="text-input">NO HANDPHONE</Label>
                      <Input 
                      type="text" 
                      value={this.state.mobile} 
                      name="name"
                      onChange={(e) => this.setState({mobile: e.target.value})} 
                      placeholder="Nomor Handphone" />
                    </Col>
                  </FormGroup>
                  <strong>ALAMAT KANTOR</strong>
                  <hr></hr>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">PROVINSI</Label>
                      {this.renderProvOf()}
                      <Label htmlFor="text-input">KOTA/ KABUPATEN</Label>
                      {this.renderKotaOf()}
                      <Label htmlFor="text-input">KECAMATAN</Label>
                      {this.renderKecamatanOf()}
                      <Label htmlFor="text-input">KELURAHAN</Label>
                      {this.renderKelurahanOf()}
                      <Label htmlFor="text-input">ALAMAT 1</Label>
                      <Input 
                      type="textarea"
                      value={this.state.o_address_1} 
                      name="name"
                      onChange={(e) => this.setState({o_address_1: e.target.value})} 
                      placeholder="Alamat Kantor 1" />
                    </Col>
                    <Col  xs="12" sm="6" md="6" lg="6">
                    <Label htmlFor="text-input">ALAMAT 2</Label>
                      <Input 
                      type="textarea" 
                      value={this.state.o_address_2} 
                      name="name"
                      onChange={(e) => this.setState({o_address_2: e.target.value})} 
                      placeholder="Alamat Kantor 2" />
                      <Label htmlFor="text-input">RT</Label>
                      <Input 
                      type="text" 
                      value={this.state.o_rtrw} 
                      name="name"
                      onChange={(e) => this.setState({o_rtrw: e.target.value})} 
                      placeholder="RT/ RW" />
                      <Label htmlFor="text-input">KODE POS</Label>
                      {this.renderPostcodeOf()}
                      <Label htmlFor="text-input">NO TELEPHONE</Label>
                      <Input 
                      type="text" 
                      value={this.state.o_phone} 
                      name="name"
                      onChange={(e) => this.setState({o_phone: e.target.value})} 
                      placeholder="Nomor Telephone" />
                    </Col>
                  </FormGroup>
                  <strong>DATA ORANG TUA</strong>
                  <hr></hr>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">N.R.P / N.I.P</Label>
                      <Input 
                      type="text"
                      value={this.state.p_nrp} 
                      name="name"
                      onChange={(e) => this.setState({p_nrp: e.target.value})} 
                      placeholder="N.R.P / N.I.P" />
                      <Label htmlFor="text-input">NAMA ORANGTUA</Label>
                      <Input 
                      type="text"
                      value={this.state.p_name} 
                      name="name"
                      onChange={(e) => this.setState({p_name: e.target.value})} 
                      placeholder="Nama Orang Tua" />
                      <Label htmlFor="text-input">STATUS KEMILITERAN</Label>
                      {this.renderMiliter()}
                      <Label htmlFor="text-input">KESATUAN</Label>
                      {this.renderMiliterUO()}
                      <Label htmlFor="text-input">PANGKAT TERAKHIR</Label>
                      <Input 
                      type="text"
                      value={this.state.p_military_rank} 
                      name="name"
                      onChange={(e) => this.setState({p_military_rank: e.target.value})} 
                      placeholder="Belum Ada Data" />
                    </Col>
                    <Col  xs="12" sm="6" md="6" lg="6">
                    <Label htmlFor="text-input">JABATAN TERAKHIR</Label>
                      <Input 
                      type="text" 
                      value={this.state.p_military_position} 
                      name="name"
                      onChange={(e) => this.setState({p_military_position: e.target.value})} 
                      placeholder="Belum Ada Data" />
                      <Row>
                      <Col  xs="6" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">JUMLAH ANAK</Label>
                      <Input 
                      type="text" 
                      value={this.state.p_childrens} 
                      name="name"
                      onChange={(e) => this.setState({p_childrens: e.target.value})} 
                      placeholder="Judul Berita" />
                      </Col>
                      <Col  xs="6" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">AGAMA</Label>
                      {this.renderAgamaOrtu()}
                      </Col>
                      </Row>
                      <Label htmlFor="text-input">HUBUNGAN DENGAN ANGGOTA</Label>
                      {this.renderDarah()}
                      <Label htmlFor="text-input">KETERANGAN</Label>
                      <Input 
                      type="textarea" 
                      value={this.state.p_info} 
                      name="name"
                      onChange={(e) => this.setState({p_info: e.target.value})} 
                      placeholder="Judul Berita" />
                    </Col>
                  </FormGroup>
                  <strong>DATA ORGANISASI</strong>
                  <hr></hr>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">STATUS KEANGGOTAAN</Label>
                      {this.renderMembers()}
                      <Label htmlFor="text-input">TERDAFTAR ANGGOTA SEJAK</Label>
                      <Input 
                      type="date"
                      value={this.state.g_organizations_id} 
                      name="name"
                      onChange={(e) => this.setState({g_organizations_id: e.target.value})} 
                      placeholder="Judul Berita" />
                      <Label htmlFor="text-input">PD</Label>
                      {this.renderPD()}
                      <Label htmlFor="text-input">PC</Label>
                      {this.renderPC()}
                    </Col>
                    <Col  xs="12" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">RAYON</Label>
                      {this.renderRayon()}
                      <Label htmlFor="text-input">JABATAN </Label>
                      {this.renderJabatan()}
                      <Label htmlFor="text-input">PERIODE JABATAN <strong> ({this.state.o_jabatan_start})</strong></Label>
                      <Input 
                      type="date"
                      value={this.state.g_jabatan_start} 
                      name="name"
                      onChange={(e) => this.setState({g_jabatan_start: e.target.value})} 
                      placeholder="Judul Berita" />
                      <Label htmlFor="text-input">SAMPAI DENGAN <strong> ({this.state.o_jabatan_end})</strong></Label>
                      <Input 
                      type="date"
                      value={this.state.g_jabatan_end} 
                      name="name"
                      onChange={(e) => this.setState({g_jabatan_end: e.target.value})} 
                      placeholder="Judul Berita" />
                    </Col>
                  </FormGroup>
                  <strong>DOKUMEN</strong>
                  <hr></hr>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="6" lg="6">
                      <Label htmlFor="text-input">FOTO KTA (KARTU TANDA ANGGOTA</Label>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_KTA1} alt={this.state.d_KTA1} height="70px"/></div>
                      <Input type="file" id="file-input1" name="FileKTA1" onChange={this.onChangeFileKTA1}/>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_KTA2} alt={this.state.d_KTA2} height="70px"/></div>
                      <Input type="file" id="file-input2" name="FileKTA2" onChange={this.onChangeFileKTA2}/>
                      <Label htmlFor="text-input">DOKUMEN ANGGOTA</Label>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_DA1} alt={this.state.d_DA1} height="70px"/></div>
                      <Input type="file" id="file-input3" name="FileDA1" onChange={this.onChangeFileDA1}/>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_DA2} alt={this.state.d_DA2} height="70px"/></div>
                      <Input type="file" id="file-input4" name="FileDA2" onChange={this.onChangeFileDA2}/>
                      <Label htmlFor="text-input">DOKUMEN HUBUNGAN</Label>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_DH1} alt={this.state.d_DH1} height="70px"/></div>
                      <Input type="file" id="file-input5" name="FileDH1" onChange={this.onChangeFileDH1}/>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_DH2} alt={this.state.d_DH2} height="70px"/></div>
                      <Input type="file" id="file-input6" name="FileDH2" onChange={this.onChangeFileDH2}/>
                    </Col>
                    <Col  xs="12" sm="6" md="6" lg="6">
                    <Label htmlFor="text-input">DOKUMEN ORANGTUA</Label>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_Ortu1} alt={this.state.d_Ortu1} height="70px"/></div>
                      <Input type="file" id="file-input7" name="FileOrtu1" onChange={this.onChangeFileOrtu1}/>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_Ortu2} alt={this.state.d_Ortu2} height="70px"/></div>
                      <Input type="file" id="file-input8" name="FileOrtu2" onChange={this.onChangeFileOrtu2}/>
                      <div className="DocEditPhoto text-center"><img src={this.state.d_Ortu3} alt={this.state.d_Ortu3} height="70px"/></div>
                      <Input type="file" id="file-input9" name="FileOrtu3" onChange={this.onChangeFileOrtu3}/>
                      {/* <Input 
                      type="text"
                      value={this.state.register_from} 
                      name="register_from"
                      onChange={(e) => this.setState({register_from: e.target.value})} 
                      placeholder="Regist From" /> */}
                    </Col>
                  </FormGroup>
                   {/* <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Isi Berita</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <ReactQuill theme="snow"
                        value={this.state.body}
                        modules={this.modules}
                        formats={this.formats}
                        placeholder="Isi Berita"
                        onChange={this.handleChange}
                        >

                        </ReactQuill>
                    </Col>
                  </FormGroup> */}
              
                  {/* <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Image Berita</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" name="image" />
                    </Col>
                  </FormGroup> */}
                  <Col className="text-center" xs="12" sm="12" md="12" lg="12">
                  <Link to="/keanggotaan"><Button className="tombol3"><i className="fa fa-chevron-left"></i> Kembali </Button></Link>&nbsp;&nbsp;
                  <Button onClick={this.onSubmitPress} className="tombol1" > Simpan</Button>
                  </Col>
                </Form>
              </CardBody>
           </div>

    );
  }
}

export default Forms;
