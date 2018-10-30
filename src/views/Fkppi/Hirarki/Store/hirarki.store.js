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


export default class HirarkiStore {
      @observable items;
      @observable jabatans;
      @observable regions;
      @observable access;
      @observable activitis;
      @observable item;



    constructor() {
        this.items = [];
        this.jabatans = [];
        this.regions = [];
        this.activitis = [];
        this.access = [];
        this.item = {};
      }
   /////////////////////
    
  //   async fetchData() {
  //   let { data } = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts`
  //   );
  //   console.log(data.json);
  //   data.length > 0 ? this.setData(data) : this.setSingle(data);
  // }


  async fetchData() {
    let { data } = await axios.get(
      DevApi + 'access/index'
    );
    console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }



   ///////////////

   async fetchJabatan() {
    let { data } = await axios.get(
      DevApi + 'list/position'
    );
    console.log(data);
    this.setJabatan(data)
  }

  /////


  async fetchRegion() {
    let { data } = await axios.get(
      DevApi + 'list/positionscope'
    );
    console.log(data);
    this.setRegion(data)
  }
  ///

 async fetchAccess() {
    let { data } = await axios.get(
      DevApi + 'list/access'
    );
    console.log(data);
    this.setAccess(data)
  }

  ///////

   async deleteData(id) {
    let { data } = await axios.delete(
       DevApi + `access/delete/${id}`
    );
    //console.log(data);
    //this.setSingle(data);
    toast.success("Sukses Di Hapus !", {
            autoClose: 2000
          }, setTimeout("window.location.reload();", 2000));

  }

   //////////


    @action setData(data) {
    this.items = data;
    }

    @action setCategory(data) {
     this.itemCat = data;
    }


    @action setJabatan(data) {
     this.jabatans = data;
    }

    @action setRegion(data) {
     this.regions = data;
    }


    @action setAccess(data) {
     this.access = data;
    }


    @action setSingle(data) {
      this.item = data;
    }


    @action clearItems() {
      this.items = [];
      this.item = {};
    }
}