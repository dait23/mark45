import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, FormGroup, Label, Input,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody,  ModalFooter, ModalHeader  } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from "axios";
import { inject, observer, Provider} from 'mobx-react';
import {MainApi, DevApi} from '../../../Api/';

import NewsStore from '../Store/news.store';

const newsStore = new NewsStore();

class Menu extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      loading:false,
       data:{},
    };
    
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  ///

  ////////
componentDidMount() {
     
     this.getAkses();
     //this.props.menuStore.fetchData();

   }

   //


getAkses(){

    // let pathname = window.location.pathname;
    // var pathArray = window.location.pathname.split( '/' );
    // var path = pathArray[1];
    // this.setState({
    //       loading: true
    //   });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'menu/detail/report';
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
          //componentWillUnmount();
          that.setState({ data : result,
                          report_admin: result.api.report_admin,
                          report_news: result.api.report_news,
                          report_member: result.api.report_member,
                          report_message: result.api.report_message,
                    loading: false
                        });
           //data : this.state.data(result.data),
            // localStorage.setItem('news_delete', result.api.news_delete);
            // localStorage.setItem('news_edit', result.api.news_edit);
           //console.log(result)

        })
        .catch((error) => { });




   }



 

renderAdmin(){

  
   if(this.state.report_admin == 0){

    return

   }else{

     return(

        <Link to={'/report/admin'} className=""><DropdownItem>Report Admin</DropdownItem></Link>

      )

   }





}


renderNews(){

  
   if(this.state.report_news == 0){

    return

   }else{

     return(

       <Link to={'/report/news'} className=""><DropdownItem>Report News</DropdownItem></Link>

      )

   }





}


renderMessage(){

  
   if(this.state.report_message == 0){

    return

   }else{

     return(

        <Link to={'/report/message'} className=""><DropdownItem>Report Message</DropdownItem></Link>

      )

   }





}


  ////
  
  render() {

     const { store } = this.props;


    return (
       <Provider newsStore = {newsStore}>
  
                  <ButtonDropdown className="tombolmember" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle>
                  <i className="fa fa-bars fa-lg "></i>
                  </DropdownToggle>
                  <DropdownMenu>
                  <Link to={'/report'} className=""><DropdownItem>Report Member</DropdownItem></Link>
                  {this.renderAdmin()}
                  {this.renderNews()}
                  {this.renderMessage()}
                
                  </DropdownMenu>
                </ButtonDropdown>
              
       </Provider>

    );
  }
}

export default Menu;
