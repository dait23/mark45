// @flow

import { observable, action } from 'mobx';

class store {
  @observable count = 0;

  @action onPlus() {
    this.count += 1;
  }

  @action onMinus() {
    this.count -= 1;
  }

}

export default new store();
