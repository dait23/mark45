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
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import NewsStore from '../Store/news.store';
import ReactLoading from 'react-loading';
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
      //data: [],
       loading: true,

    }



  }


  componentDidMount() {
     
      this.setState({
          loading: true
      });
     //this.props.menuStore.fetchData();

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
                 <Col md="1" style={{marginTop:'12%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px"/></Col>
               </Row>

              )
      }else {
        
      
    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{marginTop:'80px'}}>
              <CardHeader>
              <i className="fa fa-user "></i>
                 DAFTAR ANGGOTA
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
