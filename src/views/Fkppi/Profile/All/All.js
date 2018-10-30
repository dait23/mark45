import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Table } from 'reactstrap';
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
  }

  
  render() {

     const { store } = this.props;


    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{marginTop:'5%'}}>
              <CardHeader>
              <i className="fa fa-newspaper-o fa-lg "></i>
                 All News
                
              </CardHeader>
              <CardBody>
                    <NewsList />
                
              <Row className="mt-4 text-center">
          
                  <Col className="textcenter" xs="12" sm="12" md="12" lg="12">
                  <Link to="/upload"><Button className="tombol3" ><i className="fa fa-chevron-left"></i> Kembali</Button></Link>
                  <Link to={'/berita/add'} className=""><Button className="tombol1" ><i className="fa fa-plus"></i>&nbsp; Add News</Button></Link>
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
