import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  fbid: number;
  username: string;
  picture: string;
  db: any;
  data: any;
  cloudantUsername: string;
  cloudantPassword: string;
  remote: string;

  constructor() {
    console.log('prepare to connect db')
    this.db = new PouchDB('letschatdb');
    this.cloudantUsername = 'furphispureaselymewerser';
    this.cloudantPassword = 'c368eecb59dc10f7c1d316f2b16b5b8587f70af4';
    this.remote = 'https://6c9ec0f0-311e-4779-8f3c-ed0522b3dcfc-bluemix.cloudant.com/letschatdb/';
    //             https://6c9ec0f0-311e-4779-8f3c-ed0522b3dcfc-bluemix.cloudant.com/letschatdb/
    //Key:allinuthopeartedgemplais
    //Password:b18f5bdec163c15552711a506714c7d4793414a0
    //Please make a note of the password. For security reasons, we will not store it for you to retrieve in the future.

    //Set up PouchDB
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.cloudantUsername,
        password: this.cloudantPassword
      }
    };
    console.log('prepare to syn db')
    let synresult = this.db.sync(this.remote, options);
    console.log('synresult ['+synresult+']')

  }
  
  getDocuments() {

    return new Promise(resolve => {
      this.db.allDocs({
        // all the data in our documents are returned (message, picture etc.).
        include_docs: true,
        limit: 30,
        descending: true
      }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
        this.data.reverse();
        resolve(this.data);
        this.db.changes({
          live: true, since: 'now', include_docs:
          true
        }).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {
        console.log(error);
      });
    });

  }
  
  addDocument(message) {
    this.db.put(message);
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;
    this.data.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });
    //A document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    }
    else {
      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }
      //A document was added
      else {
        this.data.push(change.doc);
      }
    }
  }

}
