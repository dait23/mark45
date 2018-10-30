import { observable, computed, action } from "mobx";
import axios from "axios";
import fetch from 'better-fetch';

import {MainApi, DevApi} from '../../../Api/';


//axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';


export default class NewsStore {
     @observable groceries = [];
      @observable members;
       @observable admins;
       @observable news;
        @observable messages;
     

    constructor() {
        this.members = [];
        this.admins = [];
        this.news = [];
        this.messages = [];

      }
   /////////////////////
    
  //   async fetchData() {
  //   let { data } = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts`
  //   );
  //   console.log(data.json);
  //   data.length > 0 ? this.setData(data) : this.setSingle(data);
  // }


  

  async fetchDataMember() {
    let { data } = await axios.get(
      DevApi + 'report/member'
    );
    //console.log(data);
    this.setMember(data) 
  }


  async fetchDataAdmin() {
    let { data } = await axios.get(
      DevApi + 'report/admin'
    );
    //console.log(data);
    this.setAdmin(data) 
  }

  async fetchDataNews() {
    let { data } = await axios.get(
      DevApi + 'report/news'
    );
    //console.log(data);
    this.setNews(data) 
  }
  
   async fetchDataMessage() {
    let { data } = await axios.get(
      DevApi + 'report/message'
    );
    //console.log(data);
    this.setMessage(data) 
  }


////////////////////////////////// 


    @action setMember(data) {
    this.members = data;
    }

    @action setAdmin(data) {
    this.admins = data;
    }

     @action setNews(data) {
    this.news = data;
    }
      @action setMessage(data) {
    this.messages = data;
    }

    
    

    @action clearItems() {
       this.members = [];
        this.admins = [];
        this.news = [];
        this.messages = [];
    }
}