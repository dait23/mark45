import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import {MainApi, DevApi} from '../../../../views/Api/';
import List from './List';
import HirarkiStore from '../Store/hirarki.store';
import 'react-toastify/dist/ReactToastify.min.css';
const hirarkiStore = new HirarkiStore();

class News extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    this.state = {
    loading: true,
      data:{},
  

    };

   

  }
  ///

  componentDidMount() {
     
     //this.props.hirarkiStore.fetchData();
    // setTimeout(() => {
    
    //    this.getAkses();

    //   }, 2000)

    this.getAkses();


   }

   getAkses(){

    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[1];
    // this.setState({
    //       loading: true
    //   });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'menu/detail/' + path;
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
                  access_add: result.api.access_add,
                  access_edit: result.api.access_edit,
                  access_delete: result.api.access_delete,
                    loading: false
                        });
           //data : this.state.data(result.data),
            localStorage.setItem('access_delete', result.api.access_delete);
            localStorage.setItem('access_edit', result.api.access_edit);
           console.log(result)

        })
        .catch((error) => { console.error(error); });




   }


   renderButtonAdd(){

    if(this.state.access_add == 0){

      return

    }else{

     return(

       <a href="hirarki/add" className="btn button-add">Tambah</a>


      )


    }



   }
  
  render() {

     const { store } = this.props;


    return (
       <Provider hirarkiStore = {hirarkiStore}>
      <div className="animated fadeIn">
       <ToastContainer autoClose={2000} />
        <Row>
          <Col>
            <Card style={{marginTop:'5%'}}>
              <CardHeader>
              <i className="fa fa-newspaper-o fa-lg "></i>
                 Semua Hirarki dan Akses
               
              </CardHeader>
              <CardBody>
              
              <List />
               
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">

          <Col md="4" className="d-flex flex-row justify-content-around">
          <a href="/" className="btn button-back">Kembali</a>
           {this.renderButtonAdd()}
            
          </Col>
        </Row>
      </div>
       </Provider>

    );
  }
}

export default News;
