import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Container,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import ReactLoading from 'react-loading';
import FAQ from '../../../assets/img/brand/FAQ_FKPPI.png';
import {MainApi, DevApi} from '../../Api/';



class Upload extends Component {
  constructor(props) {
    super(props);
    this. state = {
      data: [],
      banner_add:'',
      loading: true,
      //banner_add2:'',
    }
  }


componentDidMount() {
     
     

     setTimeout(() => {
    
       this.getMenu();
    this.getMenu2();
    this.getMenu3();
    this.getMenu4();
    this.getMenu5();
      }, 2000)
    // this.getMenu5();
     //this.props.menuStore.fetchData();

   }

  getMenu() {
      // Set loading to true to display a Spinner
      this.setState({
          loading: true
      });
      

      //console.log(this.state.myToken)
      
      //var ID = this.props.memberID ;

      var url =  DevApi + 'menu/index' ;
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

          //const title1 = toJs(result.title1)
          that.setState({
            data: result,
            banner_add: result[4].api.banner_add,
            community_add: result[4].api.community_add,
            faq_add: result[4].api.faq_add,
            news_add: result[4].api.news_add,
            loading:false,

         });

          //localStorage.setItem('member_activate', result[0].name)

          //console.log(that.state.banner_add)

        })
        .catch((error) => { console.error(error); });
  }

getMenu2() {
      // Set loading to true to display a Spinner
     this.setState({
          loading: true
      });
      

      //console.log(this.state.myToken)
      
      //var ID = this.props.memberID ;

      var url =  DevApi + 'menu/index' ;
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

          //const title1 = toJs(result.title1)
          that.setState({
            data: result,
            banner_add3: result[3].api.banner_add,
            community_add3: result[3].api.community_add,
            faq_add3: result[3].api.faq_add,
            news_add3: result[3].api.news_add,
            loading:false,

         });

          //localStorage.setItem('member_activate', result[0].name)

          console.log(that.state.banner_add)

        })
        .catch((error) => { console.error(error); });
  }

getMenu3() {
      // Set loading to true to display a Spinner
      this.setState({
          loading: true
      });
      

      //console.log(this.state.myToken)
      
      //var ID = this.props.memberID ;

      var url =  DevApi + 'menu/index' ;
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

          //const title1 = toJs(result.title1)
          that.setState({
            data: result,
            banner_add2: result[2].api.banner_add,
            community_add2: result[2].api.community_add,
            faq_add2: result[2].api.faq_add,
            news_add2: result[2].api.news_add,
            loading:false

         });

          //localStorage.setItem('member_activate', result[0].name)

          console.log(that.state.banner_add2)

        })
        .catch((error) => { console.error(error); });
  }

  ///

  getMenu4() {
      // Set loading to true to display a Spinner
      this.setState({
          loading: true
      });
      

      //console.log(this.state.myToken)
      
      //var ID = this.props.memberID ;

      var url =  DevApi + 'menu/index' ;
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

          //const title1 = toJs(result.title1)
          that.setState({
            data: result,
            banner_add1: result[1].api.banner_add,
            community_add1: result[1].api.community_add,
            faq_add1: result[1].api.faq_add,
            news_add1: result[1].api.news_add,
            loading:false

         });

          //localStorage.setItem('member_activate', result[0].name)

          //console.log(that.state.banner_add)

        })
        .catch((error) => { console.error(error); });
  }


getMenu5() {
      // Set loading to true to display a Spinner
      this.setState({
          loading: true
      });
      

      //console.log(this.state.myToken)
      
      //var ID = this.props.memberID ;

      var url =  DevApi + 'menu/index' ;
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

          //const title1 = toJs(result.title1)
          that.setState({
            data: result,
            banner_add0: result[0].api.banner_add,
            community_add0: result[0].api.community_add,
            faq_add0: result[0].api.faq_add,
            news_add0: result[0].api.news_add,
            loading:false,

         });

          //localStorage.setItem('member_activate', result[0].name)

          //console.log(that.state.banner_add)

        })
        .catch((error) => { console.error(error); });
  }



renderMultiBanner(){

   return(

      <Col xs="6" sm="6" lg="3">
      {this.renderBanner()}
      {this.renderBanner2()}
       {this.renderBanner3()}
       {this.renderBanner4()}
  

    </Col>
    )


}

renderMultiCommunity(){

 return(

      <Col xs="6" sm="6" lg="3">
      {this.renderComunity()}
      {this.renderComunity2()}
      {this.renderComunity3()}
      {this.renderComunity4()}
      {this.renderComunity5()}

  

    </Col>
    )

}


renderMultiFaq(){

 return(

      <Col xs="6" sm="6" lg="3">
      {this.renderFaq()}
      {this.renderFaq2()}
      {this.renderFaq3()}
      {this.renderFaq4()}
      {this.renderFaq5()}


  

    </Col>
    )

}

renderMultiNews(){

 return(

      <Col xs="6" sm="6" lg="3">
      {this.renderNews()}
      {this.renderNews2()}
      {this.renderNews3()}
      {this.renderNews4()}
      {this.renderNews5()}



  

    </Col>
    )

}


//////


renderBanner2(){

  
  if(this.state.banner_add2 == 0 ){

     return

    }
    else if(this.state.banner_add2 == undefined ){

     return


    }
    
    else {

     return(

     
                  <Link to={'/banner'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_banner.png" alt="logo banner" style={{width:'60%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Banner</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                  


      )

    }
   

   


}
renderBanner3(){

  
  if(this.state.banner_add3 == 0 ){

     return

    }
    else if(this.state.banner_add3 == undefined ){

     return


    }
    
    else {

     return(

      
                  <Link to={'/banner'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_banner.png" alt="logo banner" style={{width:'60%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Banner</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
               


      )

    }
   

   


}
renderBanner4(){

  
  if(this.state.banner_add1 == 0 ){

     return

    }
    else if(this.state.banner_add1 == undefined ){

     return


    }
    
    else {

     return(

      
                  <Link to={'/banner'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_banner.png" alt="logo banner" style={{width:'60%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Banner</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                  


      )

    }
   

   


}
renderBanner(){

  
  if(this.state.banner_add == 0 ){

     return


    }
     else if(this.state.banner_add == undefined ){

     return


    }
    
    else {

     return(

      
                  <Link to={'/banner'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_banner.png" alt="logo banner" style={{width:'60%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Banner</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                


      )

    }
   

   


}



renderNews(){

  if(this.state.news_add == 0 ){

     return


    }
    else if(this.state.news_add == undefined ){

     return


    }
    else {

     return(

                  <Link to={'/berita'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_berita.png" alt="logo berita" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Berita</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
              

      )


    }



}
//////

renderNews2(){

  if(this.state.news_add2 == 0 ){

     return


    }
    else if(this.state.news_add2 == undefined ){

     return


    }
    else {

     return(

                  <Link to={'/berita'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_berita.png" alt="logo berita" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Berita</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
              

      )


    }



}
///

renderNews3(){

  if(this.state.news_add3 == 0 ){

     return


    }
    else if(this.state.news_add3 == undefined ){

     return


    }
    else {

     return(

                  <Link to={'/berita'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_berita.png" alt="logo berita" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Berita</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
              

      )


    }



}

renderNews4(){

  if(this.state.news_add1 == 0 ){

     return


    }
    else if(this.state.news_add1 == undefined ){

     return


    }
    else {

     return(

                  <Link to={'/berita'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_berita.png" alt="logo berita" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Berita</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
              

      )


    }



}

renderNews5(){

  if(this.state.news_add0 == 0 ){

     return


    }
    else if(this.state.news_add0 == undefined ){

     return


    }
    else {

     return(

                  <Link to={'/berita'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_berita.png" alt="logo berita" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Berita</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
              

      )


    }



}


renderComunity(){

  if(this.state.community_add == 0 ){

     return


    }
    else if(this.state.community_add == undefined ){

     return


    }
    else{

     return(


                  <Link to={'/komunitas'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_komunitas.png" alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Komunitas</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
            


      )

    }


}
///

renderComunity2(){

  if(this.state.community_add2 == 0 ){

     return


    }
    else if(this.state.community_add2 == undefined ){

     return


    }
    else{

     return(


                  <Link to={'/komunitas'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_komunitas.png" alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Komunitas</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
            


      )

    }


}

renderComunity3(){

  if(this.state.community_add3 == 0 ){

     return


    }
    else if(this.state.community_add3 == undefined ){

     return


    }
    else{

     return(


                  <Link to={'/komunitas'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_komunitas.png" alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Komunitas</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
            


      )

    }


}
renderComunity4(){

  if(this.state.community_add1 == 0 ){

     return


    }
    else if(this.state.community_add1 == undefined ){

     return


    }
    else{

     return(


                  <Link to={'/komunitas'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_komunitas.png" alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Komunitas</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
            


      )

    }


}

renderComunity5(){

  if(this.state.community_add5 == 0 ){

     return


    }
    else if(this.state.community_add5 == undefined ){

     return


    }
    else{

     return(


                  <Link to={'/komunitas'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ic_menu_komunitas.png" alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload Komunitas</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
            


      )

    }


}


renderFaq(){

  if(this.state.faq_add == 0){

     return


    }
     else if(this.state.faq_add == undefined ){

     return


    }
    else{

     return(

       
                  <Link to={'/faq'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src={FAQ} alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload FAQ</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                  


      )

    }


}
renderFaq2(){

  if(this.state.faq_add2 == 0){

     return


    }
     else if(this.state.faq_add2 == undefined ){

     return


    }
    else{

     return(

       
                  <Link to={'/faq'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src={FAQ} alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload FAQ</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                  


      )

    }


}
renderFaq3(){

  if(this.state.faq_add3 == 0){

     return


    }
     else if(this.state.faq_add3 == undefined ){

     return


    }
    else{

     return(

       
                  <Link to={'/faq'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src={FAQ} alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload FAQ</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                  


      )

    }


}
renderFaq4(){

  if(this.state.faq_add1 == 0){

     return


    }
     else if(this.state.faq_add1 == undefined ){

     return


    }
    else{

     return(

       
                  <Link to={'/faq'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src={FAQ} alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload FAQ</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                  


      )

    }


}
renderFaq5(){

  if(this.state.faq_add0 == 0){

     return


    }
     else if(this.state.faq_add0 == undefined ){

     return


    }
    else{

     return(

       
                  <Link to={'/faq'} >
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src={FAQ} alt="logo komunitas" style={{width:'50%'}}/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Upload FAQ</div>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                  


      )

    }


}
  render() {

     if (this.state.loading) {
      return (
               <Row className="flex-row justify-content-center">
                 <Col md="1" style={{marginTop:'12%'}}><ReactLoading type='spin' color="#404f3d" width="40px" height="40px"/></Col>
               </Row>

              )
      }else{
    return (
      <div className="animated fadeIn"> 
   
      <div className="flex-row align-items-center" style={{paddingTop:'15%'}}>
       
       <Container>


         <Row className="justify-content-center">
            <Col xs="12" sm="12" lg="10" md="12">
                <Row>
                  
                    {this.renderMultiBanner()}
                    {this.renderMultiNews()}
                    {this.renderMultiCommunity()}
                    {this.renderMultiFaq()}
                

                 
                </Row>

            </Col>
        </Row>

      </Container>


      </div>




        
     
      </div>
    );
  }
}
}

export default Upload;
