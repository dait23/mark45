import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import { Match, Link, Redirect} from "react-router-dom";
import Items from './Item';

@inject("newsStore")
@observer
class NewsList extends Component {

    componentDidMount() {
     
     this.props.newsStore.fetchData();

   }


      componentWillUnmount() {
            this.props.newsStore.clearItems();
        }


  render() {
    const store = this.props.newsStore;
    //console.log(toJS(store.items))
    return (
      <div className="overflowtable2">
      <div className="overflowtable">
        <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="text-center">
                    <th>NO</th>
                    <th>NOMOR ANGGOTA </th>
                    <th>TANGGAL DAFTAR</th>
                    <th>NAMA ANGGOTA</th>
                    <th>PD</th>
                    <th>PC</th>
                    <th>RAYON</th>
                    <th>JABATAN</th>
                    <th>PENDAFATARAN MELALUI</th>
                    <th>STATUS</th>
                    <th colspan="3"></th>
                  </tr>
                  </thead>
                    <tbody>
                  
       

    {store.items.map((post) => (
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

export default NewsList;