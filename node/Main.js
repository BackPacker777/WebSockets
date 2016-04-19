

"use strict";

const DATAHANDLER = require('./DataHandler');

class Main {
     constructor() {
          this.data = undefined;
     }

     getData() {
          this.data = new DATAHANDLER(3).readData('../data/data.csv');
          return this.data;
     }

     writeData(data) {
          new DATAHANDLER(3).writeData(data, '../data/data.csv');
     }
}

module.exports = Main;