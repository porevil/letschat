import { Component, ViewChild } from '@angular/core';
//import { Data } from '../../providers/data';
import { FireData } from '../../providers/firedata';
import { LastDirective } from 'LastDirective';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('chat') chat: any;

  chatMessage: string = '';
  messages: any = [];

  constructor(public dataService: FireData) {
    this.dataService.getDocuments().then((data) => {
      this.messages = data;
      console.log('return message ' + this.messages);
    });
  }

  sendMessage(): void {
    let message = {
      '_id': new Date().toJSON(),
      'fbid': this.dataService.fbid,
      'username': this.dataService.username,
      'picture': this.dataService.picture,
      'message': this.chatMessage
    };
    this.messages.push(message);

    this.dataService.addDocument(message);
    this.chatMessage = '';

  }
  scrolldown() {
    console.log('scrolldown');
    this.chat.scrollToBottom(300).then(() => {
      console.log('scroll success')
    }, (err) => {
      console.log('scroll fail')
    }
    );
  }
}
