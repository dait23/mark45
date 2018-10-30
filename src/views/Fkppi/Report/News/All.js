import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, FormGroup, Label, Input,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody,  ModalFooter, ModalHeader  } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from "axios";
import { inject, observer, Provider} from 'mobx-react';
import {MainApi, DevApi} from '../../../Api/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import MDSpinner from "react-md-spinner";
import Menu from '../Menu/Menu';
import NewsList from './List';
import NewsStore from '../Store/news.store';

const newsStore = new NewsStore();

class News extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      loading:false,
    };
    this.toggleLoading = this.toggleLoading.bind(this);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  ///

  toggleLoading() {

    this.setState({
      loading: !this.state.loading,
    });
     
     
      setTimeout(() => {
    
      this.getExport();
      // this.setState({
      //   loading: false,
      // });

      }, 2000)
    
  }

  ////////
componentDidMount() {
     
     //this.getMenu();
     //this.props.menuStore.fetchData();

   }

 getExport(){

   var url =  DevApi + 'export/member/all';
    var that = this;

    // return fetch(url,{
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //             'Access-Control-Allow-Origin': '*',
    //             'Authorization': localStorage.getItem('Token')
      
    //           }
    //     }).then((response) => {

    //             console.log(response.status);

    //             if (response.status == '403') {

                   // toast.error("Export Gagal", {
                   //    autoClose: 2000
                   //  });

                   // this.setState({
                   //    loading: false,
                   //  });

    //                 console.log('Gagal export');
    //             }
                // if (response.status == '200') {

                //      this.setState({
                //         loading: false,
                //       });
                //      toast.success("Export Sukses", {
                //         autoClose: 2000
                //       });
                //             }
    //         });


    axios({
        url: url,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {

      

         if (response.status == '200') {

                     this.setState({
                        loading: false,
                      });
                     toast.success("Export Sukses", {
                        autoClose: 2000
                      });
                     const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', 'member_all.xlsx'); //or any other extension
         document.body.appendChild(link);
         link.click();
                            }
                            else{

                                             toast.error("Export Gagal", {
                      autoClose: 2000
                    });

                   this.setState({
                      loading: false,
                    });


                            }



        // this.setState({
        //                 loading: false,
        //               });
        //  const url = window.URL.createObjectURL(new Blob([response.data]));
        //  const link = document.createElement('a');
        //  link.href = url;
        //  link.setAttribute('download', 'member_all.xlsx'); //or any other extension
        //  document.body.appendChild(link);
        //  link.click();
      });




 }

 //////

 getMenu() {
      // Set loading to true to display a Spinner
      // this.setState({
      //     loader: true
      // });
      

      //console.log(this.state.myToken)
      
      //var ID = this.props.memberID ;

      var url =  DevApi + 'menu/index' ;
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

          //const title1 = toJs(result.title1)
          that.setState({
            data: result,
            member_activate: result[0].api.member_activate,
            member_verify: result[0].api.member_verify,



            loader: false
         });

          localStorage.setItem('member_activate', result[0].name)

          //console.log(result)

        })
        .catch((error) => { });
  }


renderActive(){

  
   if(this.state.member_activate == 0){

    return

   }else{

     return(

        <Link to={'/keanggotaan/active'} className=""><DropdownItem>Aktivasi Anggota</DropdownItem></Link>

      )

   }





}


renderVerify(){

  
   if(this.state.member_verify == 0){

    return

   }else{

     return(

       <Link to={'/keanggotaan/verify'} className=""><DropdownItem>Verifikasi Anggota</DropdownItem></Link>

      )

   }





}


  ////
  
  render() {

     const { store } = this.props;


    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
       <ToastContainer autoClose={2000} />
        <Row>
          <Col>
            <Card style={{marginTop:'80px'}}>
              <CardHeader>
              <Row>
                <Col className="widthkurang textcenter" xs="1" sm="1" md="1" lg="1" >
                  <Menu />
                 </Col>
                 <Col className="textcenter" xs="4" sm="3" md="2" lg="3">
                 
                 </Col>
                 <Col className="textcenter" xs="4" sm="5" md="5" lg="5">
                 </Col>
                 <Col className="textcenter" xs="2" sm="3" md="3" lg="3">
                 <FormGroup>
               
                </FormGroup>
              </Col>
              </Row>
              </CardHeader>
              <CardBody>
                    <NewsList />
                
          <Row className="mt-4 text-center">
            <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
            <Link to="/"><Button className="tombol3" ><i className="fa fa-chevron-left"></i> KEMBALI</Button></Link>
            
            </Col>
          </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.loading} toggle={this.toggleLoading} className={this.props.className} style={{marginTop:'20%'}}>

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
       </Provider>

    );
  }
}

export default News;
