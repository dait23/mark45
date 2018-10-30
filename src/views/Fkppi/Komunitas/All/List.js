import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {toJS } from 'mobx';
import {MainApi, DevApi} from '../../../../views/Api/';
import ReactLoading from 'react-loading';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import { Match, Link, Redirect} from "react-router-dom";
import Items from './Item';

@inject("newsStore")
@observer
class NewsList extends Component {

      constructor(props) {
    super(props);
    this.state = {
    loading: true,
      data:[],
  

    };

   

  }

    componentDidMount() {
     
      setTimeout(() => {
    
       this.getCom();

      }, 2000)


   }

   clearItems(){

  this.setState({
          data:[]
      });

 }

      componentWillUnmount() {
            //this.props.newsStore.clearItems();
             this.clearItems();
        }


////////

getCom(){

    
    this.setState({
          loading: true
      });
      
      //console.log(this.state.myToken)
      
      var url =  DevApi + 'community/index';
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
          console.log(response)
        }).then(function(result) {
          //componentWillUnmount();
          that.setState({ data : result,
                  loading: false
                        });
           //data : this.state.data(result.data),

           console.log(result)

        })
        .catch((error) => { console.error(error); });




   }



  render() {
    const store = this.props.newsStore;
    //console.log(toJS(store.items))


    if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'2%', marginBottom:'2%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px" /></Col>
               </Row>

              )
      }
       else{
    return (
      <div className="overflowtable2">
      <div className="overflowtable">
        <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="text-center">
                    <th>GAMBAR</th>
                    <th>LINK</th>
                    <th>TANGGAL</th>
                    <th>EDIT</th>
                    <th>HAPUS</th>
                  </tr>
                  </thead>
                    <tbody>
                  
       

    {this.state.data.map((post) => (
            <Items
               key={post.id}
               news={post}
               refresh={() => this.props.data.refetch()}
            />
          ))}
           
         </tbody>

        
    </Table>
    </div>
        </div>
    );
  }
}
}

export default NewsList;