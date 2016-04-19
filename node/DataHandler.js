/**  AUTHOR: hbates@northmen.org
 *   VERSION: 1.0.0
 *   CREATED: 3.17.2016
 *   PURPOSE: Library class for handling file I/O
 */

"use strict";

const FS = require('fs');

class DataHandler {
     constructor(columns) {
          this.columns = columns;
          this.finalData = [];
     }

     readData(dataPath) {
          let fileHandle = FS.readFileSync(dataPath, 'utf8');
          let tempArray = fileHandle.split(/\r?\n/); //remove newlines
          for (let i = 0; i < tempArray.length; i++) {
               this.finalData[i] = tempArray[i].split(/,/).slice(0, this.columns);
          }
          return this.finalData;
     }

     writeData(data, newData) {
          let tempFile = __dirname + '/../data/temp.txt';
          for (let i = 0; i < data.length; i++) {
               let line = "";
               for (let j = 0; j < this.columns; j++) {
                    if (j < this.columns - 1) {
                         line = line + data[i][j] + ',';
                    } else {
                         line = line + data[i][j] + '\r\n';
                    }
               }
               FS.appendFileSync(tempFile, line, 'utf8');
               FS.unlinkSync(newData);
               FS.renameSync(tempFile, newData);
          }
     }
}

module.exports = DataHandler;