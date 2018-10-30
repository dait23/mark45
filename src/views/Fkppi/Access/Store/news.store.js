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
      @observable items;
      @observable item;
      @observable itemCat;
      @observable itemMiliter;
      @observable itemMiliterUO;
      @observable itemAgama;
      @observable itemDarah;
      @observable itemMembers;
      @observable itemPD;
      @observable itemGelar;
      @observable itemPekerjaan;
      @observable itemGender;
      @observable itemKawin;
      @observable itemListMember;

    constructor() {
        this.items = [];
        this.item = {};
        this.itemCat = [];
        this.itemKota = [];
        this.itemMiliter = [];
        this.itemMiliterUO = [];
        this.itemAgama = [];
        this.itemDarah = [];
        this.itemMembers = [];
        this.itemPD = [];
        this.itemGelar = [];
        this.itemPekerjaan = [];
        this.itemGender = [];
        this.itemKawin = [];
        this.itemGelar1 = [];
        this.itemListMember = [];
        this.itemGelar2 = [];
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


  async fetchViewMember(id) {
    let { data } = await axios.get(
      DevApi + `member/profile/${id}`
    );
    
    data.length > 0 ? this.setData(data) : this.setSingle(data);
    console.log(data);
  }

  async fetchData() {
    let { data } = await axios.get(
      DevApi + 'access/index'
    );
    //console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
    this.setListMember(data);
  }

  async fetchDataVer() {
    let { data } = await axios.get(
      DevApi + 'member/index/unverified'
    );
    //console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  async fetchDataAct() {
    let { data } = await axios.get(
      DevApi + 'member/index/unactivated'
    );
    //console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  async fetchDataRealAnggota() {
    let { data } = await axios.get(
      DevApi + 'member/index/activated'
    );
    //console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }


  async fetchSingle() {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/4`
    );
    //console.log('xxx'+ data);
    this.setSingle(data);
  }

  ////////////////

  async deleteData(id) {
    let { data } = await axios.delete(
       DevApi + `news/delete/${id}`
    );
    //console.log(data);
    //this.setSingle(data);
    window.location.reload();
  }


///////////////////////////////////////////////
async fetchProv() {
  let { data } = await axios.get(
    DevApi + 'list/province'
 
  );
  //console.log(data);
  this.setCategory(data);
}


   ///////////////

   async fetchCategory() {
    let { data } = await axios.get(
      DevApi + 'list/province'
   
    );
    //console.log(data);
    this.setCategory(data);
  }

  async fetchGelar1() {
    let { data } = await axios.get(
      DevApi + 'list/title/first'
   
    );
    //console.log(data);
    this.setGelar1(data);
  }

  async fetchGelar2() {
    let { data } = await axios.get(
      DevApi + 'list/title/last'
    );
    //console.log(data);
    this.setGelar2(data);
  }

  async fetchJabatan() {
    let { data } = await axios.get(
      DevApi + 'list/position'
    );
    //console.log(data);
    this.setJabatan(data);
  }


  async fetchKawin() {
    let { data } = await axios.get(
      DevApi + 'list/maritalstatus'
   
    );
    //console.log(data);
    this.setKawin(data);
  }

  async fetchAgama() {
    let { data } = await axios.get(
      DevApi + 'list/religion'
   
    );
    console.log(data);
    this.setAgama(data);
    
  }

  async fetchDarah() {
    let { data } = await axios.get(
      DevApi + 'list/kinship'
   
    );
    //console.log(data);
    this.setDarah(data);
    
  }
  
  async fetchKota(id) {
    let { data } = await axios.get(
      DevApi + `list/regency/${id}`
    );
    //console.log(data);
    this.setKota(data);
  }

  async fetchGender() {
    let { data } = await axios.get(
      DevApi + `list/gender`
    );
    //console.log(data);
    this.setGender(data);
  }

  async fetchMiliter() {
    let { data } = await axios.get(
      DevApi + 'list/militarystatus'
    );
    //console.log(data);
    this.setMiliter(data);
  }

  async fetchPekerjaan() {
    let { data } = await axios.get(
      DevApi + 'list/occupation'
    );
    //console.log(data);
    this.setPekerjaan(data);
  }

  async fetchMiliterUO() {
    let { data } = await axios.get(
      DevApi + 'list/militaryuo'
   
    );
    //console.log(data);
    this.setMiliterUO(data);
  }

  async ViewEditmember(id) {
    let { data } = await axios.get(
       DevApi + `member/profile/${id}`
    );
    console.log(data);
    //this.setSingle(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  async fetchPD() {
    let { data } = await axios.get(
      DevApi + 'list/pd'
   
    );
    //console.log(data);
    this.setPD(data);
  }

  async fetchGelar() {
    let { data } = await axios.get(
      DevApi + 'list/degree'
   
    );
    //console.log(data);
    this.setGelar(data);
  }

  async fetchMembers() {
    let { data } = await axios.get(
      DevApi + 'list/membershipstatus'
   
    );
    //console.log(data);
    this.setMembers(data);
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

    @computed 
    get numOfGroceries() {
        return this.groceries.length;
    }

    @action setData(data) {
    this.items = data;
    }

    @action setPekerjaan(data) {
      this.itemPekerjaan = data;
     }

    @action setCategory(data) {
     this.itemCat = data;
    }

    @action setGelar(data) {
      this.itemGelar = data;
     }

     @action setGelar1(data) {
      this.itemGelar1 = data;
     }

     @action setGelar2(data) {
      this.itemGelar2 = data;
     }
     @action setKawin(data) {
      this.itemKawin = data;
     }

    @action setAgama(data) {
      this.itemAgama = data;
     }

    @action setKota(data) {
      this.itemKota = data;
     }

     @action setGender(data) {
      this.itemGender = data;
     }

     @action setDarah(data) {
      this.itemDarah = data;
     }

     @action setMembers(data) {
      this.itemMembers = data;
     }

     @action setMiliter(data) {
      this.itemMiliter = data;
     }

     @action setMiliterUO(data) {
      this.itemMiliterUO = data;
     }

     @action setPD(data) {
      this.itemPD = data;
     }

    @action setSingle(data) {
      this.item = data;
    }

    @action setListMember(data) {
      this.itemListMember = data;
    }

    @action setJabatan(data) {
      this.itemJabatan = data;
    }

    @action clearItems() {
      this.items = [];
      this.itemCat = [];
      this.item = {};
    }
}