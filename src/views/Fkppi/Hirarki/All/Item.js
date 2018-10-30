import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

@inject("hirarkiStore")
class Items extends Component {

  static propTypes = {
    hirarki: PropTypes.object,
  }
  
  
   constructor(props) {
    super(props);
  }

  delete = () => {
    this.props.hirarkiStore.deleteData(this.props.hirarki.position_id)
 }


 renderVerifikasi(){

  if(this.props.hirarki.access.member_verify == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }
 ////

 renderAktifasi(){

  if(this.props.hirarki.access.member_activate == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }

 renderEdit(){

  if(this.props.hirarki.access.member_edit == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }

///
renderDelete(){

  if(this.props.hirarki.access.member_delete == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }

 ////

 renderSend(){

  if(this.props.hirarki.access.message_send == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }
 ////


 renderReport(){

  if(this.props.hirarki.access.report_read == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }


///

renderNewsAdd(){

  if(this.props.hirarki.access.news_add == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }

 renderNewsEdit(){

  if(this.props.hirarki.access.news_edit == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }
////

renderNewsDelete(){

  if(this.props.hirarki.access.news_delete == 0){

     return(

         <td align="center">Tidak Bisa</td>

      )

  }else{

    return(

         <td align="center">Bisa</td>

      )
  }


 }
 


renderButtonEdit(){

  const buttonEdit = localStorage.getItem('access_edit');

if(buttonEdit == 0){

  return

}else{

  return(

     <span><a href={`hirarki/edit/${this.props.hirarki.position_id}`} > <img src="assets/img/ic_edit.png"/></a></span>

    )

}
  



}

renderButtonDelete(){

  const buttonDel = localStorage.getItem('access_delete');

if(buttonDel == 0){

  return

}else{

  return(

      <span><img src="assets/img/ic_delete.png" onClick={this.delete} style={{cursor: 'pointer'}}/></span>

    )

}
  



}


  
  render() {


    return (
      <tr>
       <td align="center" width="300" valign="bottom">{this.props.hirarki.position}</td>
       <td align="center">{this.props.hirarki.position_scope}</td>
       {this.renderVerifikasi()}
       {this.renderAktifasi()}
       {this.renderEdit()}
       {this.renderDelete()}
       {this.renderSend()}
       {this.renderNewsAdd()}
       {this.renderNewsEdit()}
       {this.renderNewsDelete()}
       <td align="center">

       <div className="d-flex d-flex justify-content-around">
   
        {this.renderButtonEdit()}
        {this.renderButtonDelete()}
          
       </div>
       
     
    

      </td>

      </tr>                                 

    );
  }
}

export default Items;
