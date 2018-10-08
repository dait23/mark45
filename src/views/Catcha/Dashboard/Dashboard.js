import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
import Widget03 from '../Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { inject, observer, Provider} from 'mobx-react';


import GroceryStore from './groceries.store';
import Add from './add.component';
import GroceriesList from './groceriesList.component';

const groceryStore = new GroceryStore();



const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};








//@inject('store') @observer
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {
   const { store } = this.props;
    return (
      <div className="animated fadeIn"> 
   
      <div className="flex-row align-items-center" style={{paddingTop:'5%'}}>
       
       <Container>


         <Row className="justify-content-center">
            <Col md="8">
                <Row>
                  <Col xs="6" sm="6" lg="4">
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ico_executor.png" alt="logo executor"/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Executor </div>
                        </div>
                        
                      </div>
                    </div>
                  </Col>

                  <Col xs="6" sm="6" lg="4">
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ico_premise.png" alt="logo premise"/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Premise</div>
                        </div>
                        
                      </div>
                    </div>
                  </Col>

                 <Col xs="6" sm="6" lg="4">
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ico_task.png" alt="logo task"/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Task</div>
                        </div>
                        
                      </div>
                    </div>
                  </Col>

                  <Col xs="6" sm="6" lg="4">
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ico_report.png" alt="logo report"/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Report</div>
                        </div>
                        
                      </div>
                    </div>
                  </Col>
                 <Col xs="6" sm="6" lg="4">
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ico_dashboard.png" alt="logo dashboard"/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Dashboard</div>
                        </div>
                        
                      </div>
                    </div>
                  </Col>
                  <Col xs="6" sm="6" lg="4">
                    <div className="brand-card">
                      <div className="brand-card-header" style={{height:150, padding:30}}>
                        <img src="assets/img/ico_display.png" alt="logo display"/>
                        
                      </div>
                      <div className="brand-card-body" style={{borderTop:'1px solid #dce1e4'}}>
                        <div>
                          <div className="text-uppercase" style={{color:'#2d2a26', fontWeight:600, fontFamily:'Roboto'}}>Display</div>
                        </div>
                        
                      </div>
                    </div>
                  </Col>
                </Row>

            </Col>
        </Row>

      </Container>


      </div>




        
     
      </div>
    );
  }
}

export default Dashboard;
