import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';

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
       <td><img src={this.props.news.image} alt={this.props.news.title} width="100"/></td>
       <td>{this.props.news.title}{this.props.news.body.substring(0, 50)}</td>
       <td align="center">{this.props.news.category}</td>
       <td>{this.props.news.publisher}</td>
      <td>{moment(this.props.news.created_at).format('LL')}</td>
      <td align="center">{this.props.news.view}</td>
       <td align="center">{this.props.news.like}</td>
       <td align="center">
       <Link to={`/berita/edit/${this.props.news.id}`}><i className="icon-note icons font-1xl"></i></Link>
       </td>
       <td align="center">
       <i className="icon-trash icons font-1xl d-block" onClick={this.delete} style={{cursor: 'pointer'}}></i>
      </td>
      </tr>                                 
     
    );
  }
}

export default Items;
