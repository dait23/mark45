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

 renderButtonEdit(){

  const buttonEdit = localStorage.getItem('news_edit');

if(buttonEdit == 0){

  return(

     <a><img style={{cursor: 'pointer'}} src={penciledit} alt="tombolkartu" width="15px"/></a>

    )

}else{

  return(

    <Link to={`/berita/edit/${this.props.news.id}`}><img style={{cursor: 'pointer'}} src={penciledit} alt="tombolkartu" width="15px"/></Link>

    )

}
  



}

renderButtonDelete(){

  const buttonDel = localStorage.getItem('news_delete');

if(buttonDel == 0){

  return(
     <img style={{cursor: 'pointer'}} src={tongsampah} alt="tombolkartu" width="15px"/>
  )

}else{

  return(

     <img style={{cursor: 'pointer'}} onClick={this.delete} src={tongsampah} alt="tombolkartu" width="15px"/>

    )

}
  



}

  
  render() {


    return (
      <tr className="text-center">
       <td><img src={this.props.news.image} alt={this.props.news.title} width="100" height="62"/></td>
       <td>{this.props.news.title}{this.props.news.body.substring(0, 50)}</td>
       <td align="center">{this.props.news.news_category}</td>
       <td>{this.props.news.publisher}</td>
      <td>{moment(this.props.news.created_at).format('LL')}</td>
      <td align="center">{this.props.news.view}</td>
       <td align="center">{this.props.news.likes}</td>
       <td align="center">
       {this.renderButtonEdit()}
       </td>
       <td align="center">
        {this.renderButtonDelete()}
      </td>
      </tr>                                 
     
    );
  }
}

export default Items;
