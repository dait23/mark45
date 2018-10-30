import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import tongsampah from '../../../../assets/img/brand/ic_delete.png';
import penciledit from '../../../../assets/img/brand/ic_edit.png';

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
      <tr className="">
       <td align="center"><img src={this.props.news.image} alt={this.props.news.title} width="40" height="40"/></td>
        <td align="center" >{this.props.news.link}</td>
      <td align="center">{moment(this.props.news.created_at).format('LL')}</td>
      <td align="center"><Link to={`/komunitas/edit/${this.props.news.id}`}><img style={{cursor: 'pointer'}} src={penciledit} alt="tombolkartu" width="15px"/></Link></td>
      <td align="center"><img style={{cursor: 'pointer'}} onClick={this.delete} src={tongsampah} alt="tombolkartu" width="15px"/></td>
      </tr>                                 
     
    );
  }
}

export default Items;
