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



 renderVerif(){
    
    //console.log(store)
     if(this.props.news.is_activated == 1){
      return(
        <div className="">
          TERVERIFIKASI
        </div>
      )
    }else {
      return(
        <div className="text-center ProcessMember">
          PROSES
        </div>
      )
    }
  }

  render() {
     
  

    return (
      <tr>
       <td className="text-center"><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.id}</Link></td>
       <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.idfkppi}</Link></td>
        <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{/*{moment(this.props.news.created_at).format('LL')}*/}{this.props.news.registered_date}</Link></td> 
      <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.firstname}{this.props.news.lastname}</Link></td>
      <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.pd}</Link></td>
      <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.pc}</Link></td>
      <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.rayon}</Link></td>
      <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.position}</Link></td>
      <td><Link className="isi-table" to={`/keanggotaan/View/${this.props.news.id}`}>{this.props.news.register_from_pd}{this.props.news.register_from_pc}{this.props.news.register_from_rayon}</Link></td>
      <td>{this.renderVerif()}</td>
      {/*<td>{this.props.news.is_activated}</td>*/}
       {/*<td>
      <Link to={`/keanggotaan/verify/${this.props.news.id}`}><i className="icon-check icons font-1xl"></i></Link>
      </td> 
       <td>
      <Link to={`/keanggotaan/active/${this.props.news.id}`}><i className="icon-check icons font-1xl"></i></Link>
      </td> 
      <td>
      <i className="icon-eye icons font-1xl d-block" style={{cursor: 'pointer'}}></i>
      </td>*/}
      
      <td>
      <i className="icon-trash icons font-1xl d-block" onClick={this.delete} style={{cursor: 'pointer'}}></i>
      </td>
      </tr>                              
     
    );
  }
}



// if(this.props.news.is_verified == 1){
//   return(
//     <div className="">
//     </div>
//   )
// }else {
//   return(
//     <tr>
//    <td>{this.props.news.id}</td>
//    <td>{this.props.news.idfkppi}</td>
//     <td>{/*{moment(this.props.news.created_at).format('LL')}*/}{this.props.news.registered_date}</td> 
//   <td>{this.props.news.firstname}{this.props.news.lastname}</td>
//   <td>{this.props.news.pd}</td>
//   <td>{this.props.news.pc}</td>
//   <td>{this.props.news.rayon}</td>
//   <td>{this.props.news.position}</td>
//   <td>{this.props.news.register_from_pd}{this.props.news.register_from_pc}{this.props.news.register_from_rayon}</td>
//   <td className="text-center"><div className="ProcessMember">Process</div></td>
//   <td>{this.props.news.is_activated}</td>
//   <td>
//   <Link to={`/keanggotaan/edit/${this.props.news.id}`}><i className="icon-note icons font-1xl"></i></Link>
//   </td>
//   <td>
//   <Link to={`/keanggotaan/active/${this.props.news.id}`}><i className="icon-check icons font-1xl"></i></Link>
//   </td>
//   <td>
//   <Link to={`/keanggotaan/View/${this.props.news.id}`}><i className="icon-eye icons font-1xl d-block" style={{cursor: 'pointer'}}></i></Link>
//   </td>
//   <td>
//   <i className="icon-trash icons font-1xl d-block" onClick={this.delete} style={{cursor: 'pointer'}}></i>
//   </td>
//   </tr> 
//   )
// }


export default Items;
