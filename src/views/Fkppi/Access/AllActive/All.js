import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, FormGroup, Label, Input,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';

import NewsList from './List';
import NewsStore from '../Store/news.store';

const newsStore = new NewsStore();

class News extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  
  render() {

     const { store } = this.props;


    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{marginTop:'80px'}}>
              <CardHeader>
              <Row>
                <Col className="textcenter" xs="6" sm="6" md="6" lg="6">
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle>
                  <i className="fa fa-bars fa-lg "></i>
                  </DropdownToggle>
                  <DropdownMenu>
                  <Link to={'/keanggotaan'} className=""><DropdownItem>Anggota Terdaftar</DropdownItem></Link>
                  <Link to={'/keanggotaan/verify'} className=""><DropdownItem>Verifikasi Anggota</DropdownItem></Link>
                  <Link to={'/keanggotaan/active'} className=""><DropdownItem>Aktivasi Anggota</DropdownItem></Link>
                  </DropdownMenu>
                </ButtonDropdown>
                 </Col>
                 <Col className="textcenter" xs="6" sm="3" md="3" lg="3">

                 </Col>
                 <Col className="textcenter" xs="6" sm="3" md="3" lg="3">
                 <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                    <option>Sort By</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
              </Row>
              </CardHeader>
              <CardBody>
                    <NewsList />
                
          <Row className="mt-4 text-center">
            <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
            <Link to="/"><Button className="tombol3" ><i className="fa fa-chevron-left"></i> KEMBALI</Button></Link>
            <Button className="tombolexcel" ><i className="fa fa-newspaper-o fa-lg "></i> Export Table</Button>
            <Button className="tombolexcel" ><i className="fa fa-newspaper-o fa-lg "></i> Import Table</Button>
            <Link to={'/keanggotaan/add'} className=""><Button className="tombol1" ><i className="fa fa-plus"></i>&nbsp; DAFTAR</Button></Link>
            </Col>
          </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
       </Provider>

    );
  }
}

export default News;
