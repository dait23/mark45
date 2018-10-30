import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import tongsampah from '../../../../assets/img/brand/ic_delete.png';

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

 //  delete = () => {
 //    this.props.newsStore.deleteData(this.props.news.id)
 // }


//  renderVerif(){
    
//     //console.log(store)
//      if(this.props.news.is_activated == 1){
//       return(
//         <div className="text-center ProcessMember2">
//           AKTIF
//         </div>
//       )
//     }else {
//       return(
//         <div className="text-center ProcessMember">
//           PROSES
//         </div>
//       )
//     }
//   }

// renderRegisterFrom(){
    
//     //console.log(store)
//     if(this.props.news.register_from_pd == '0' && this.props.news.register_from_pc == '0' && this.props.news.register_from_rayon == '0'){
//       return(
//         <div className="text-center">
//           MOBILE
//         </div>
//       )
//     }
//     else {
//       return(
//         <div className="text-center">
//           WEB ADMIN
//         </div>
//       )
//     }
//   }


  render() {


    return (
      <tr>
       <td className="text-left">{this.props.news.admin_username}</td>
       <td className="text-center">{this.props.news.admin_fullname}</td>
       <td className="text-center">{this.props.news.admin_position}</td>
       <td className="text-center">{this.props.news.member_name}</td>
       <td className="text-center">{this.props.news.activity}</td>
    
       
      
      </tr>                              
     
    );
  }
}





export default Items;
