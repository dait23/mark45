import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import ReactLoading from 'react-loading';
import { DataTable } from 'react-data-components';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import { Match, Link, Redirect} from "react-router-dom";
import Items from './Item';

@inject("newsStore")
@observer
class NewsList extends Component {

   constructor(props) {
    super(props);
    this.state = {
    loading: true,
  

    };

   

  }

    componentDidMount() {

   
      setTimeout(() => {
         this.setState({
          loading: false
      });

    
      this.props.newsStore.fetchDataMember();

      }, 2000)

      //this.props.newsStore.fetchDataMember();
   }


      componentWillUnmount() {
            this.props.newsStore.clearItems();
        }


  render() {
    const store = this.props.newsStore;
    //console.log(toJS(store.items))

    if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px" /></Col>
               </Row>

              )
      }else{
    return (
      <div className="overflowtable2">
      <div className="overflowtable">
        <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>PD</th>
                    <th className="text-center">Register by Admin </th>
                   <th className="text-center">Register by Mobile </th>
                    <th className="text-center">Aktif Anggota</th>
                    <th className="text-center">Pending Anggota</th>
                    <th className="text-center">Jumlah Anggota</th>

                  </tr>
                  </thead>
                    <tbody>
                  
         {store.members.map((post) => (
            <Items
               key={post.id}
               news={post}
               refresh={() => this.props.data.refetch()}
            />
          ))}
           

           
         </tbody>

         
    </Table>
        </div>
        </div>
    );
  }
}
}

export default NewsList;