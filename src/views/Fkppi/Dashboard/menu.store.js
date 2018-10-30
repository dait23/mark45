import { observable, computed, action } from "mobx";
import axios from "axios";
import fetch from 'better-fetch';
import { ToastContainer, toast } from 'react-toastify';
import {MainApi, DevApi} from '../../Api/';


//axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';


export default class MenuStore {
      @observable items;
      


    constructor() {
        this.items = [];
       
      }
   /////////

  async fetchData() {
    let { data } = await axios.get(
      DevApi + 'menu/index'
    );
    console.log(data);
    this.setData(data);
  }



  
   //////////


    @action setData(data) {
    this.items = data;
    }

    

    @action clearItems() {
      this.items = [];
    }
}