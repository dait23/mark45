import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import {toJS } from 'mobx';
import ReactLoading from 'react-loading';
import {MainApi, DevApi} from '../../../../views/Api/';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Match, Link, Redirect} from "react-router-dom";
import Items from './Item';

@inject("hirarkiStore")
@observer
class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
    loading: true,
      data:[],
  

    };

   

  }

    componentDidMount() {
     
     //this.props.hirarkiStore.fetchData();
    setTimeout(() => {
    
       this.getHirarki();

      }, 2000)


   }

   getHirarki(){

    
    this.setState({
          loading: true
      });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'access/index';
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
                  avatar: result.avatar,
                  loading: false
                        });
           //data : this.state.data(result.data),

           console.log(result)

        })
        .catch((error) => {  });




   }


      componentWillUnmount() {
            this.props.hirarkiStore.clearItems();
        }


  render() {
    const store = this.props.hirarkiStore;
    //console.log(toJS(store.items))

    if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px" /></Col>
               </Row>

              )
      }else{
    return (
        <Table hover bordered striped responsive size="sm">
        
                  <thead>
                  <tr align="center">
                    <th>Jabatan</th>
                    <th>Wilayah Jabatan</th>
                    <th>Verifikasi</th>
                    <th>Aktifasi</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                    <th>Kirim Pesan</th>
                    <th>News Add</th>
                    <th>News Edit</th>
                    <th>News Delete</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                    <tbody>
                  
       

    {this.state.data.map((post) => (
            <Items
               key={post.position_id}
               hirarki={post}
               refresh={() => this.props.data.refetch()}
            />
          ))}
           
         </tbody>

    </Table>

    );
  }
}
}

export default List;