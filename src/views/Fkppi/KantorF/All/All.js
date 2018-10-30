import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, FormGroup, Label, Input,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
 } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import NewsList from './List';
import NewsStore from '../Store/news.store';
import kantor from '../../../../assets/img/brand/kantor.png';
import kantor1 from '../../../../assets/img/brand/kantor1.png';
import histori from '../../../../assets/img/brand/histori.png';
import histori1 from '../../../../assets/img/brand/histori1.png';
import bendera from '../../../../assets/img/brand/bendera.png';
import bendera1 from '../../../../assets/img/brand/bendera1.png';
import tenda from '../../../../assets/img/brand/tenda.png';
import tenda1 from '../../../../assets/img/brand/tenda1.png';
import target from '../../../../assets/img/brand/target.png';
import target1 from '../../../../assets/img/brand/target1.png';
import buku from '../../../../assets/img/brand/buku.png';
import buku1 from '../../../../assets/img/brand/buku1.png';
import topi from '../../../../assets/img/brand/topi.png';
import topi1 from '../../../../assets/img/brand/topi1.png';
import gantungan from '../../../../assets/img/brand/gantungan.png';
import gantungan1 from '../../../../assets/img/brand/gantungan1.png';

const newsStore = new NewsStore();

class News extends Component {
    static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
  }

  
  render() {

     const { store } = this.props;


    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
          <ToastContainer autoClose={2000} />
        
{/*           
        <Col style={{marginTop:'80px'}} xs="1" sm="2" md="1" lg="1">
          <div className="brand-card-header">
            <img src={kantor1} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          <div className="brand-card-header">
            <img src={histori} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          <div className="brand-card-header">
            <img src={tenda} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          <div className="brand-card-header">
            <img src={target} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          <div className="brand-card-header">
            <img src={buku} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          <div className="brand-card-header">
            <img src={topi} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          <div className="brand-card-header">
            <img src={gantungan} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          <div className="brand-card-header">
            <img src={bendera} alt="logo Keanggotaan" style={{width:'100'}}/>
          </div>
          </Col>  <i className="fa fa-newspaper-o fa-lg "></i>
          <Col xs="11" sm="10" md="11" lg="11">*/}
            <Card style={{marginTop:'80px'}}>
              <CardHeader>
              <i className="fa fa-shield fa-lg "></i>
                 <strong>KB-FKPPI</strong>
                {/* <Row>
                 <Col className="textcenter" xs="4" sm="4" md="3" lg="4">
                 <Input type="search" name="search" id="exampleSearch" placeholder="Search" />
                 </Col>
                 <Col className="textcenter" xs="5" sm="5" md="5" lg="5">
                 </Col>
                 <Col className="textcenter" xs="2" sm="3" md="3" lg="3">
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
              </Row> */}
              </CardHeader>
              <CardBody>
                    <NewsList />
                
              <Row className="mt-4 text-center">
          
                  <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
                  <Link to="/"><Button className="tombol3" ><i className="fa fa-chevron-left"></i>&nbsp;Kembali</Button></Link>
                  <Link to={'/kantorfkppi/add'} className=""><Button className="tombol1" ><i className="fa fa-plus"></i>&nbsp; KB-FKPPI</Button></Link>
                   <Link to={'/office'} className=""><Button style={{background:'green', color:'#fff'}} ><i className="fa fa-building-o"></i>&nbsp; List Kantor FKPPI</Button></Link>
                  </Col>
                
              </Row>
               
              </CardBody>
            </Card>
        
      </div>
       </Provider>

    );
  }
}

export default News;
