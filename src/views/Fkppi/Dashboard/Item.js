import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

@inject("menuStore")
class Items extends Component {

  static propTypes = {
    menu: PropTypes.object,
  }
  
  
   constructor(props) {
    super(props);
  }

 

 

  
  render() {


    return (
    
    <Col xs="6" sm="6" lg="4">
                    <Link to={`/${this.props.menu.path}`} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src={this.props.menu.icon} alt={this.props.menu.name} style={{width:'auto'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>{this.props.menu.name}</div>
                        </div>
                        
                      </div>
                    </div>
                    </Link>
                  </Col>

                           

    );
  }
}

export default Items;
