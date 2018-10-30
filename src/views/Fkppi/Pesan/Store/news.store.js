import { observable, computed, action } from "mobx";
import axios from "axios";
import fetch from 'better-fetch';
import { ToastContainer, toast } from 'react-toastify';
import {MainApi, DevApi} from '../../../Api/';


//axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';


export default class NewsStore {
     @observable groceries = [];
      @observable items;
      @observable item;
      @observable itemCat;
      @observable itemJabatan;
      @observable itemPD;


    constructor() {
        this.items = [];
        this.item = {};
        this.itemCat = [];
        this.itemPD = [];
        this.itemJabatan = [];
      }
   /////////////////////
    
  //   async fetchData() {
  //   let { data } = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts`
  //   );
  //   console.log(data.json);
  //   data.length > 0 ? this.setData(data) : this.setSingle(data);
  // }

  async fetchPD() {
    let { data } = await axios.get(
      DevApi + 'list/pd'
   
    );
    //console.log(data);
    this.setPD(data);
  }

  async fetchData() {
    let { data } = await axios.get(
      DevApi + 'message/sent'
    );
    console.log(data);
    this.setData(data);
  }

  async fetchJabatan() {
    let { data } = await axios.get(
      DevApi + 'list/position'
    );
    //console.log(data);
    this.setJabatan(data);
  }


  // async fetchSingle() {
  //   let { data } = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/4`
  //   );
  //   //console.log('xxx'+ data);
  //   this.setSingle(data);
  // }

  ////////////////

  async deleteData(id) {
    let { data } = await axios.delete(
       DevApi + `message/delete/${id}`
    );
    //console.log(data);
    //this.setSingle(data);
     toast.success("Sukses Di Hapus !", {
            autoClose: 2000
          }, setTimeout("window.location.reload();", 2000));
  }

   ///////////////

   
  ////////////////

  async viewData(id) {
    let { data } = await axios.delete(
       DevApi + `message/inbox/${id}`
    );
    //console.log(data);
    //this.setSingle(data);
    window.location.reload();
  }

   ///////////////

   async fetchCategory() {
    let { data } = await axios.get(
      DevApi + 'message/inbox'
    );
    console.log(data);
    this.setCategory(data)
  }


   //////////
    @action
    add(g) {
        this.groceries.push(g);
    }

    @action
    delete(name) {
        this.groceries.remove(name)
    }

    @action setPD(data) {
      this.itemPD = data;
     }


    @computed 
    get numOfGroceries() {
        return this.groceries.length;
    }

    @action setData(data) {
    this.items = data;
    }

    @action setJabatan(data) {
      this.itemJabatan = data;
      }

    @action setCategory(data) {
     this.itemCat = data;
    }

    @action setSingle(data) {
      this.item = data;
    }


    @action clearItems() {
      this.items = [];
      this.itemCat = [];
      this.item = {};
    }
}