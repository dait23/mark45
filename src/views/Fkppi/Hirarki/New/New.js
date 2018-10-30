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
import HirarkiStore from '../Store/hirarki.store';

import Forms from './Forms';

const hirarkiStore = new HirarkiStore();

class New extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }


  render() {

     const { store } = this.props;


     //console.log(store.);


    return (
       <Provider hirarkiStore = {hirarkiStore}>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{marginTop:'5%'}}>
              <CardHeader>
              <i className="fa fa-newspaper-o fa-lg "></i>
                 Tambah Hirarki
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

export default New;
