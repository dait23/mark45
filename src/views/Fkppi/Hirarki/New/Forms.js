import React, { Component } from 'react';
import { Link} from 'react-router-dom';
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
import ReactLoading from 'react-loading';
//import Select from 'react-select-plus';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import {MainApi, DevApi} from '../../../Api/';
import MDSpinner from "react-md-spinner";
import 'react-toastify/dist/ReactToastify.min.css';





@inject("hirarkiStore")
@observer

class Forms extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
     this.state = {
     loading:false,
     loader: true, 
     data:[],
     position_id:'',
     position_scope: '',
     member_verify:'',
     member_activate:'',
     member_edit:'',
     member_delete:'',
     message_send:'',
     news_add:'',
     news_edit:'',
     news_delete:'',
     access_add:'',
     access_index:'',
     access_edit:'',
     access_delete:'',
     mabes_add:'',
     banner_add:'',
     community_add:'',
     faq_add:'',
     report_member:'',
     report_admin:'',
     report_news:'',
     report_message:'',
     scope:[
            {
              "scope": "Pusat"
            },
            {
              "scope": "PD"
            },
            {
              "scope": "PC"
            },
            {
              "scope": "Rayon"
            }
          ],

     access:[
  {
    "id": 1,
    "name": "member_verify",
    "title": "Verifikasi Anggota",
    "api": "api/member/verify"
  },
  {
    "id": 2,
    "name": "member_activate",
    "title": "Aktifasi Member",
    "api": "api/member/activate"
  },
  {
    "id": 3,
    "name": "member_edit",
    "title": "Edit Member",
    "api": "api/member/edit"
  },
  {
    "id": 4,
    "name": "member_delete",
    "title": "Hapus Berita",
    "api": "api/member/delete"
  },
  {
    "id": 5,
    "name": "message_send",
    "title": "Kirim Pesan",
    "api": "api/message/send"
  },
  {
    "id": 6,
    "name": "report_read",
    "title": "Akses Laporan",
    "api": "api/report/read"
  },
  {
    "id": 7,
    "name": "news_add",
    "title": "Tambah Berita",
    "api": "api/news/add"
  },
  {
    "id": 8,
    "name": "news_edit",
    "title": "Edit Berita",
    "api": "api/news/update"
  },
  {
    "id": 9,
    "name": "news_delete",
    "title": "Hapus Berita",
    "api": "api/news/delete"
  }
],
 active:[

       {

        "id":"0",
        "name":"Tidak Bisa"
       },

       {

        "id":"1",
        "name":"Bisa"
       },

     ]

     }

    //this.handleChange = this.handleChange.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
    this.handleChangez = this.handleChangez.bind(this);
    this.handleChangeScope = this.handleChangeScope.bind(this);
    this.handleChangeMemberVer = this.handleChangeMemberVer.bind(this);
    this.handleChangeMemberAct = this.handleChangeMemberAct.bind(this);
    this.handleChangeMemberEdit = this.handleChangeMemberEdit.bind(this);
    this.handleChangeMemberDelete = this.handleChangeMemberDelete.bind(this);
    this.handleChangeMessageSend = this.handleChangeMessageSend.bind(this);
    this.handleChangeReport = this.handleChangeReport.bind(this);
    this.handleChangeNewsAdd = this.handleChangeNewsAdd.bind(this);
    this.handleChangeNewsEdit = this.handleChangeNewsEdit.bind(this);
    this.handleChangeNewsDelete = this.handleChangeNewsDelete.bind(this);
    this.handleChangeAccessAdd = this.handleChangeAccessAdd.bind(this);
    this.handleChangeAccessIndex = this.handleChangeAccessIndex.bind(this);
    this.handleChangeAccessEdit = this.handleChangeAccessEdit.bind(this);
    this.handleChangeAccessDelete = this.handleChangeAccessDelete.bind(this);
    this.handleChangeMabesAdd = this.handleChangeMabesAdd.bind(this);
    this.handleChangeBanner_add = this.handleChangeBanner_add.bind(this);
    this.handleChangeCommunity_add = this.handleChangeCommunity_add.bind(this);
    this.handleChangeFaq_add = this.handleChangeFaq_add.bind(this);
    this.handleChangeReportMember = this.handleChangeReportMember.bind(this);
    this.handleChangeReportAdmin = this.handleChangeReportAdmin.bind(this);
    this.handleChangeReportNews = this.handleChangeReportNews.bind(this);
    this.handleChangeReportMessage = this.handleChangeReportMessage.bind(this);
     this.toggleLoading = this.toggleLoading.bind(this);

  }

  
  handleChangez = (position_id) => {
        this.setState({ 
          position_id:position_id.value
        });
        console.log(`Jabatan: ${position_id.value}`);
      }
/////////////////////
handleChangeScope = (position_scope) => {
        this.setState({ 
          position_scope: position_scope.value,
        });
        this.getJabatan(position_scope.value);
        console.log(`Wilayah: ${position_scope.value}`);
      }
///////


handleChangeMemberVer = (member_verify) => {
        this.setState({ 
          member_verify:member_verify.value
        });
        console.log(`member_verify: ${member_verify.label}`);
      }
//////

handleChangeMemberAct = (member_activate) => {
        this.setState({ 
          member_activate:member_activate.value
        });
        console.log(`member_activate: ${member_activate.label}`);
      }

  handleChangeMemberEdit = (member_edit) => {
        this.setState({ 
          member_edit:member_edit.value
        });
        console.log(`member_edit: ${member_edit.label}`);
      }
      ///
   handleChangeMemberDelete = (member_delete) => {
        this.setState({ 
          member_delete:member_delete.value
        });
        console.log(`member_delete: ${member_delete.label}`);
      }
  ////////

   handleChangeMessageSend = (message_send) => {
        this.setState({ 
          message_send:message_send.value
        });
        console.log(`message_send: ${message_send.label}`);
      }
  /////////

    handleChangeReport = (report_read) => {
        this.setState({ 
          report_read:report_read.value
        });
        console.log(`report_read: ${report_read.label}`);
      }

////////////
  handleChangeNewsAdd = (news_add) => {
        this.setState({ 
          news_add:news_add.value
        });
        console.log(`news_add: ${news_add.label}`);
      }

  ///////

   handleChangeNewsEdit = (news_edit) => {
        this.setState({ 
          news_edit:news_edit.value
        });
        console.log(`news_edit: ${news_edit.label}`);
      }
  /////////

   handleChangeNewsDelete = (news_delete) => {
        this.setState({ 
          news_delete:news_delete.value
        });
        console.log(`news_delete: ${news_delete.label}`);
      }

  ///////////////////////

   handleChangeAccessAdd = (access_add) => {
        this.setState({ 
          access_add:access_add.value
        });
        console.log(`access_add: ${access_add.label}`);
      }
   //
     handleChangeAccessIndex = (access_index) => {
        this.setState({ 
          access_index: access_index.value
        });
        console.log(`access_index: ${access_index.label}`);
      }

  ///////

   handleChangeAccessEdit = (access_edit) => {
        this.setState({ 
          access_edit: access_edit.value
        });
        console.log(`access_edit: ${access_edit.label}`);
      }
  ////
   handleChangeAccessDelete = (access_delete) => {
        this.setState({ 
          access_delete: access_delete.value
        });
        console.log(`access_delete: ${access_delete.label}`);
      }

  ////

   handleChangeMabesAdd = (mabes_add) => {
        this.setState({ 
          mabes_add: mabes_add.value
        });
        console.log(`mabes_add: ${mabes_add.label}`);
      }

  ///////

  handleChangeBanner_add = (banner_add) => {
        this.setState({ 
          banner_add: banner_add.value
        });
        console.log(`banner_add: ${banner_add.label}`);
      }
/////////

  handleChangeCommunity_add = (community_add) => {
        this.setState({ 
          community_add: community_add.value
        });
        console.log(`community_add: ${community_add.label}`);
      }
 //////////////
  handleChangeFaq_add = (faq_add) => {
        this.setState({ 
          faq_add: faq_add.value
        });
        console.log(`faq_add: ${faq_add.label}`);
      }

  //////////////

   handleChangeReportMember = (report_member) => {
        this.setState({ 
          report_member: report_member.value
        });
        console.log(`report_member: ${report_member.label}`);
      }
  ////////////


   handleChangeReportAdmin = (report_admin) => {
        this.setState({ 
          report_admin: report_admin.value
        });
        console.log(`report_admin: ${report_admin.label}`);
      }
   /////////////////


   handleChangeReportNews = (report_news) => {
        this.setState({ 
          report_news: report_news.value
        });
        console.log(`report_news: ${report_news.label}`);
      }
  ///////////
    handleChangeReportMessage = (report_message) => {
        this.setState({ 
          report_message: report_message.value
        });
        console.log(`report_message: ${report_message.label}`);
      }

////////////////////////
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

  componentDidMount() {

    this.setState({
          loader: true
      });
     
     this.props.hirarkiStore.fetchJabatan();
     this.props.hirarkiStore.fetchAccess();
     this.props.hirarkiStore.fetchRegion();

      setTimeout(() => {
    
      this.setState({
          loader: false
      });

      }, 3000)


   }

  ///////////

  toggleLoading() {

    this.setState({
      loading: !this.state.loading,
    });
     
     
      setTimeout(() => {
    
       this.onSubmitPress();

      }, 2000)
    
  }


  //////

  getJabatan(value){
 
     var url =  DevApi + 'list/position/' + value;
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
                  //avatar: result.avatar,
                  loading: false
                        });
           //data : this.state.data(result.data),

           console.log(result)

        })
        .catch((error) => { console.error(error); });

  }


   //////

   onSubmitPress() {

  //evt.preventDefault()
   //var url =  DevApi + 'news/add';


   if(this.state.position_id == ''){

       //toast("YOLO", { autoClose: 15000 });
       this.setState({
                      loading: false,
                    });
        toast.warn("Jabatan Harus Diisi !", {
        autoClose: 2000
      });
   }
   else if(this.state.position_scope == ''){
       this.setState({
                      loading: false,
                    });
        toast.warn("Jabatan Wilayah Harus Diisi !", {
        autoClose: 2000
      });

    }
    else if(this.state.member_verify == ''){
        this.setState({
                      loading: false,
                    });
        toast.warn("Member Verify Harus Diisi !", {
        autoClose: 2000
      });

    }else{


   axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
   axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
   axios.defaults.headers.post['Authorization'] = localStorage.getItem('Token') ;
   var url =  DevApi + 'access/add';

    const data = new FormData()
    data.append('position_id', this.state.position_id)
    data.append('position_scope', this.state.position_scope)
    data.append('member_verify', this.state.member_verify);
    data.append('member_activate', this.state.member_activate);
    data.append('member_edit', this.state.member_edit);
    data.append('member_delete', this.state.member_delete);
    data.append('message_send', this.state.message_send);
    data.append('news_add', this.state.news_add);
    data.append('news_edit', this.state.news_edit);
    data.append('news_delete', this.state.news_delete);
    data.append('access_add', this.state.access_add);
    data.append('access_index', this.state.access_index);
    data.append('access_edit', this.state.access_edit);
    data.append('access_delete', this.state.access_delete);
    data.append('mabes_add', this.state.mabes_add);
    data.append('banner_add', this.state.banner_add);
    data.append('community_add', this.state.community_add);
    data.append('faq_add', this.state.faq_add);
    data.append('report_member', this.state.report_member);
    data.append('report_admin', this.state.report_admin);
    data.append('report_news', this.state.report_news);
    data.append('report_message', this.state.report_message);
    axios.post(url, data).then((response) => {

      if(response.status == 200){
           
           this.setState({
                      loading: false,
                    });
           toast.success("Sukses Di Tambah !", {
            autoClose: 2000
          }, setTimeout("location.href = '/hirarki';", 2000));

           console.log('ok')

      }else{
        this.setState({
                      loading: false,
                    });
        toast.error("Gagal Di Tambah !", {
            autoClose: 2000
          });

      }
      console.log(response.status)
    })
   }
}




  /////


  renderAktifitas(){

    const store = this.props.hirarkiStore;
   <div>
   
   {store.access.map((akses) => (
         <Input key={akses.id}
          disabled
                      type="text" 
                      placeholder={akses.title} />
                       

                       ))}   


   </div>



  }
  
  render() {

  const Jabatan = [
  { value: '1', label: 'Ketua Umum' },
  { value: '2', label: 'Ketua PD' },
  { value: '3', label: 'Ketua PC' }
]
    
const store = this.props.hirarkiStore;

     //console.log(store.);
   if (this.state.loader) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px" /></Col>
               </Row>

              )
      }else{

    return (
             <div>
             <ToastContainer autoClose={2000} />
              <CardBody>
                <Row>
                  
                  <Col md="6">
                   
                    <Form className="form-horizontal">
                    <FormGroup row>
                      <Col md="12" style={{marginTop:10, marginBottom:10}}>
                      <Label htmlFor="text-input"><strong>Wilayah Jabatan</strong></Label>
                      </Col>
                      <Col md="12" style={{marginTop:10, marginBottom:10}}>
                      
                      
                      <Select
                        name="position_scope"
                        placeholder="Pilih wilayah jabatan"
                        onChange={this.handleChangeScope}
                        options={store.regions.map((scope) => (
                           
                           {value: scope.scope, label: scope.scope}


                          ))}
                      />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                     <Col md="12">
                      <Label htmlFor="text-input"><strong>Aktifitas Diizinkan</strong></Label>
                      </Col>
                      <Col md="12" style={{marginTop:10, marginBottom:10}}>
                     {store.access.map((akses) => (
         <Input key={akses.id}
          disabled
          style={{marginBottom:20}}
                      type="text" 
                      placeholder={akses.title} />
                       

                       ))}   
                     </Col>


                    </FormGroup>

                    </Form>

                  </Col>
                  <Col md="6">
                   
                   <Form className="form-horizontal">
                    <FormGroup row>
                      <Col md="12" style={{marginTop:10, marginBottom:10}}>
                      <Label htmlFor="text-input"><strong>Jabatan</strong></Label>
                      </Col>
                      <Col md="12" style={{marginTop:10, marginBottom:10}}>
                      
                      <Select
                        name="position_id"
                        placeholder="Pilih jabatan"
                        onChange={this.handleChangez}
                        options={this.state.data.map((jabatan) => (
                           
                           {value: jabatan.id, label: jabatan.position}


                          ))}
                      />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                     <Col md="12" style={{marginTop:0, marginBottom:10}}>
                      <Label htmlFor="text-input"><strong>Wilayah Aktifitas</strong></Label>
                      </Col>
                      <Col md="12" style={{marginTop:0, marginBottom:10}}>
                        <div style={{marginBottom:16}}>
                        <Select
                        name="member_verify"
                        placeholder="Pilih"
                        onChange={this.handleChangeMemberVer}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                     <div style={{marginBottom:18}}>
                        <Select
                        name="member_activate"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeMemberAct}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:16}}>
                        <Select
                        name="member_edit"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeMemberEdit}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:16}}>
                        <Select
                        name="member_delete"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeMemberDelete}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                       <div style={{marginBottom:18}}>
                        <Select
                        name="message_send"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeMessageSend}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                      

                       <div style={{marginBottom:18}}>
                        <Select
                        name="news_add"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeNewsAdd}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                       <div style={{marginBottom:18}}>
                        <Select
                        name="news_edit"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeNewsEdit}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                       <div style={{marginBottom:17}}>
                        <Select
                        name="news_delete"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeNewsDelete}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                       <div style={{marginBottom:17}}>
                        <Select
                        name="access_add"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeAccessAdd}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                       <div style={{marginBottom:17}}>
                        <Select
                        name="access_index"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeAccessIndex}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:17}}>
                        <Select
                        name="access_edit"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeAccessEdit}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:17}}>
                        <Select
                        name="access_delete"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeAccessDelete}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                      <div style={{marginBottom:17}}>
                        <Select
                        name="mabes_add"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeMabesAdd}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:17}}>
                        <Select
                        name="banner_add"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeBanner_add}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                       <div style={{marginBottom:17}}>
                        <Select
                        name="community_add"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeCommunity_add}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                      <div style={{marginBottom:17}}>
                        <Select
                        name="faq_add"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeFaq_add}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:17}}>
                        <Select
                        name="report_member"
                       
                        placeholder="Pilih"
                        onChange={this.handleChangeReportMember}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:17}}>
                        <Select
                        name="report_admin"
                        placeholder="Pilih"
                        onChange={this.handleChangeReportAdmin}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                       <div style={{marginBottom:17}}>
                        <Select
                        name="report_news"
                        placeholder="Pilih"
                        onChange={this.handleChangeReportNews}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>
                      <div style={{marginBottom:17}}>
                        <Select
                        name="report_message"
                        placeholder="Pilih"
                        onChange={this.handleChangeReportMessage}
                        options={this.state.active.map((aktif) => (
                           
                           {value: aktif.id, label: aktif.name}


                          ))}
                      />
                      </div>

                     </Col>


                    </FormGroup>

                    </Form>

                  </Col>

                </Row>
              </CardBody>
              <CardFooter>
               <Row className="justify-content-center mt-3">

          <Col md="4" className="d-flex flex-row justify-content-around">
          <a href="/hirarki" className="btn button-back">Kembali</a>

          <Button onClick={this.toggleLoading} className="btn button-save"><i className="fa fa-dot-circle-o"></i> Save</Button>
            
          </Col>
        </Row>
              </CardFooter>
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
}

export default Forms;
