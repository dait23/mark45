import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import NewsStore from '../Store/news.store';

import Forms from './Forms';

const newsStore = new NewsStore();

class Edit extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
    loading: true,
  

    };

   

  }

   componentDidMount() {

    this.setState({
          loading: true
      });
     
     //this.props.hirarkiStore.fetchData();
    setTimeout(() => {
    
      this.setState({
          loading: false
      });

      }, 2000)


   }


  render() {

     const { store } = this.props;


     //console.log(store.);
if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'12%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px" /></Col>
               </Row>

              )
      }else{

    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{marginTop:'5%'}}>
              <CardHeader>
              <i className="fa fa-question fa-lg "></i>
                 TAMBAH FAQ
              </CardHeader>
               <Forms />
            </Card>
          </Col>
        </Row>
      </div>
       </Provider>

    );
  }
}
}

export default Edit;
