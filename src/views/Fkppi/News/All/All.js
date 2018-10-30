import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer, Provider} from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import {MainApi, DevApi} from '../../../../views/Api/';
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
    this.state = {
    loading: true,
      data:{},
  

    };

   

  }
  ///

  componentDidMount() {
     
     //this.props.hirarkiStore.fetchData();
    // setTimeout(() => {
    
    //    this.getAkses();

    //   }, 2000)

    this.getAkses();


   }

   getAkses(){

    let pathname = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    var path = pathArray[1];
    // this.setState({
    //       loading: true
    //   });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'menu/detail/upload';
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
                  news_add: result.api.news_add,
                  news_edit: result.api.news_edit,
                  news_delete: result.api.news_delete,
                    loading: false
                        });
           //data : this.state.data(result.data),
            localStorage.setItem('news_delete', result.api.news_delete);
            localStorage.setItem('news_edit', result.api.news_edit);
           console.log(result)

        })
        .catch((error) => { console.error(error); });




   }


   renderButtonAdd(){

    if(this.state.news_add == 0){

      return

    }else{

     return(

         <Link to={'/berita/add'} className=""><Button className="tombol1" ><i className="fa fa-plus"></i>&nbsp; Add News</Button></Link>


      )


    }



   }
  
  
  render() {

     const { store } = this.props;


    return (
       <Provider newsStore = {newsStore}>
      <div className="animated fadeIn">
      <ToastContainer autoClose={2000} />
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
                  {this.renderButtonAdd()}
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
