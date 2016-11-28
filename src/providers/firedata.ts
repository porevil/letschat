import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import PouchDB from 'pouchdb';

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

@Injectable()
export class FireData {
    letchats: FirebaseListObservable<any>;
    //af: AngularFire;
    fbid: number;
    username: string;
    picture: string;
    db: any;
    data: any;
    cloudantUsername: string;
    cloudantPassword: string;
    remote: string;

    constructor(public af: AngularFire) {

        console.log('prepare to list data from firebase')
        this.letchats = af.database.list('/letchats');

    }


    getDocuments() {
        return new Promise(resolve => {
            this.af.database.list('/letchats').subscribe(data => {
                console.log('data' + data)
                this.data = data;
                resolve(this.data);
            });
        });
    }

    addDocument(message) {
        this.letchats.push(message);
    }

}
