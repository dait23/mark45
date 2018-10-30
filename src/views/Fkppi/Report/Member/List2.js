import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import DpDataTable from 'dp-data-table';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import { Match, Link, Redirect} from "react-router-dom";
import Items from './Item';

@inject("newsStore")
@observer
class NewsList extends Component {

    componentDidMount() {
      this.props.newsStore.fetchDataRealAnggota();
   }


      componentWillUnmount() {
            this.props.newsStore.clearItems();
        }


  onEdit(e) {
    alert("Edit item " + e.index + " whose value is \n" + JSON.stringify(e.item.firstname, undefined, 2))
  }
  onDelete(e) {
    alert("Delete item " + e.index + " whose value is \n" + JSON.stringify(e.item, undefined, 2))
  }
   onItemsChange(e) {
    console.info(e.changeReason);
  }

  renderActive(){

     return(
      
       <div>aktive</div>

      )


  }

 

  render() {
    const store = this.props.newsStore;
   const statusx = this.renderActive();
    const header = {idfkppi: 'No Anggota', registered_date: 'Tanggal Daftar', firstname: 'Nama Depan', lastname: 'Nama Belakang', pd: 'PD', pc: 'PC', rayon: 'RAYON', renderActive: 'Status'};
    //console.log(toJS(store.items))
    return (
     

      <DpDataTable
         items={store.items}
         isLoading={false}
         headers={header}
          showFilter={true}
          showSort={true}
          showContextColor={true}
          onEditing={this.onEdit}
          onDeleting={this.onDelete}
          onItemsChange={this.onItemsChange}


         />


        
    );
  }
}

export default NewsList;