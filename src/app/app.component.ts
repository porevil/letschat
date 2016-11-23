import { Component, ViewChild } from "@angular/core";
import { Facebook } from 'ionic-native';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { Data } from '../providers/data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = HomePage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  homePage: any = HomePage;
  aboutPage: any = AboutPage;
  // https://6c9ec0f0-311e-4779-8f3c-ed0522b3dcfc-bluemix.cloudant.com/letschatdb/_all_docs?limit=100
  constructor(public platform: Platform, public dataService: Data, public menu: MenuController) {
    console.log('MyApp constructor')
    platform.ready().then(() => {

    });
  }

  openPage(page): void {
    console.log('openPage')
    this.menu.close();
    this.nav.setRoot(page);
  }

  logout(): void {
    console.log('logout')
    this.menu.close();
    this.menu.enable(false);
    this.nav.setRoot(LoginPage);
    this.dataService.fbid = null;
    this.dataService.username = null;
    this.dataService.picture = null;
    Facebook.logout();
  }

}
