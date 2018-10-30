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

import Forms from './Forms';

const newsStore = new NewsStore();

class Edit extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }


  render() {

     const { store } = this.props;


     //console.log(store.);


    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{marginTop:'5%'}}>
              <CardHeader>
              <i className="fa fa-check fa-lg "></i>
                 Detail Anggota
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

export default Edit;
