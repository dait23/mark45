import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import {toJS } from 'mobx';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Match, Link, Redirect} from "react-router-dom";
import Items from './Item';
import ReactLoading from 'react-loading';
import {MainApi, DevApi} from '../../Api/';
@inject("menuStore")
@observer
class List extends Component {

  constructor(props) {
    super(props);
     this.state = {
      data: [],
       loading: true,

    }



  }

    componentDidMount() {
     
     
     //this.props.menuStore.fetchData();

     setTimeout(() => {
    
       this.getMenu();

      }, 2000)

   }

   getMenu() {
      // Set loading to true to display a Spinner
      // this.setState({
      //     loader: true
      // });
      

      this.setState({
          loading: true
      });

      //console.log(this.state.myToken)
      
      //var ID = this.props.memberID ;

      var url =  DevApi + 'menu/index' ;
      var that = this;
      return fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Token') 
              }
        })
        .then(function(response) {
          return response.json();
        }).then(function(result) {

          //const title1 = toJs(result.title1)
          that.setState({
            data: result,
            member_activate: result[0].api.member_activate,
            loading: false
         });

          localStorage.setItem('member_activate', result[0].name)

          //console.log(result)

        })
        .catch((error) => { });
  }


      componentWillUnmount() {
            this.props.menuStore.clearItems();
        }


  render() {
    const store = this.props.menuStore;
    //localStorage.setItem('member_activate', this.state.member_activate)
    
    //const ax = 
    //const member_activate = localStorage.setItem('member_activate', store.items[0].api.member_activate)
    // console.log(toJS(store.items[0]))

    if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="2" style={{marginTop:'12%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px"/></Col>
               </Row>

              )
      }else{
    return (
        
                <Row>
                {this.state.data.map((menu) => (
                  <Items
                     key={menu.id}
                     menu={menu}
                     refresh={() => this.props.data.refetch()}
                  />
                ))}
                  
                </Row>

    );
  }
}
}

export default List;