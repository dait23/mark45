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
      this.props.newsStore.fetchDataAdmin();
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
                  <tr>
                    <th>Username</th>
                    <th className="text-center">Fullname </th>
                   <th className="text-center">Role </th>
                    <th className="text-center">Nama Member</th>
                    <th className="text-center">Aktifitas</th>

                  </tr>
                  </thead>
                    <tbody>
      
            {store.admins.map((post) => (
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