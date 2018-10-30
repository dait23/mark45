import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Container,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';


import { inject, observer, Provider} from 'mobx-react';
import MenuStore from './menu.store';
import List from './List';

const menuStore = new MenuStore();

//@inject('store') @observer
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this. state = {
      data: [],
      
    }
  }




  render() {
    return (
     <Provider menuStore = {menuStore}>
      <div className="animated fadeIn"> 
   
      <div className="flex-row align-items-center" style={{paddingTop:'8%'}}>
       
       <Container>


         <Row className="justify-content-center">
            <Col md="8">
                <List />

            </Col>
        </Row>

      </Container>


      </div>




        
     
      </div>
           </Provider>
    );
  }
}

export default Dashboard;
