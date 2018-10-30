import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import tongsampah from '../../../../assets/img/brand/ic_delete.png';
import liatpesan from '../../../../assets/img/brand/ic_email.png';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

@inject("newsStore")
class Items extends Component {

  static propTypes = {
    news: PropTypes.object,
  }
  
  
   constructor(props) {
    super(props);
  }

  delete = () => {
    this.props.newsStore.deleteData(this.props.news.id)
 }

  
  render() {


    return (
      <tr>
       <td>{this.props.news.title}</td>
       <td>{this.props.news.pd}</td>
        <td>{this.props.news.pc}</td>
        <td>{this.props.news.rayon}</td>

        <td>{this.props.news.address}</td>
        <td>{this.props.news.phone}</td>
        <td>{this.props.news.email}</td>
      
      <td align="center"><img style={{cursor: 'pointer'}} onClick={this.delete} src={tongsampah} alt="tombolkartu" width="15px"/></td>
       <td align="center">
       <Link to={`/office/edit/${this.props.news.id}`}><img style={{cursor: 'pointer'}} src="assets/img/ic_edit.png" alt="tombolkartu" width="15px"/></Link>
      </td>
      
      </tr>                                 
     
    );
  }
}

export default Items;
