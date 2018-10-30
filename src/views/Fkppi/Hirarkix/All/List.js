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
                    <th>JABATAN</th>
                    <th>WILAYAH JABATAN</th>
                    <th>VERIFIKASI</th>
                    <th>AKTIFASI</th>
                    <th>EDIT</th>
                    <th>HAPUS</th>
                    <th>KIRIM PESAN</th>
                    <th>AKSES LAPORAN</th>
                    <th>AKSES ORGANISASI</th>
                    <th>AKSES HIRARKI</th>
                    <th>AKSES UNGGAH/ EDIT BERITA</th>
                    <th colSpan="2"></th>
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