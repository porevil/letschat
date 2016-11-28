import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
//import { Data } from '../providers/data';
import { FireData } from '../providers/firedata';
import { LastDirective } from '../pages/home/LastDirective';
// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings

export const firebaseConfig = {
  apiKey: "AIzaSyBJWjtLS2CfXCt-7IsTTCDfclqqbir_Fho",
  authDomain: "letschat-1518c.firebaseapp.com",
  databaseURL: "https://letschat-1518c.firebaseio.com",
  storageBucket: "letschat-1518c.appspot.com",
  messagingSenderId: "855879848553"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AboutPage,
    LastDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AboutPage
  ],
  providers: [FireData]
})
export class AppModule { }
