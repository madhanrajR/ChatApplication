import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../core/auth.service';
import { CometChat } from '@cometchat-pro/chat';
import { ChatService } from './chat.service';
declare var jquery:any;
declare var $ :any;
const listenerId = 'ChatScreenListener';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedUser: CometChat.UserObj;
  messages: CometChat.TextMessage[] | null = null;
  currentuser:unknown;
  selectedFile: File = null;
  fd = new FormData();
  imgsrc:any; 
  constructor(
    public authService: AuthService,
    public chatService: ChatService
  ) {
    //this.imgsrc=this.authService.baseurl+''
    this.authService.loginname();
    this.currentuser=localStorage.getItem('username');
    console.log('chat',this.currentuser);
    
  }

  ngOnInit() {
    
    this.chatService.listenForMessages(listenerId, msg => {
      console.log('New message: ', msg);
      this.messages = [...this.messages, msg];
    });
    $("#myphoto").click(function(){
      //  alert("hai")
       $("#changedp").trigger('click');
      // changedp
      })
  }

  ngOnDestroy() {
    this.chatService.removeMessageListener(listenerId);
  }

  async onUserSelected(usr: CometChat.UserObj) {
    this.selectedUser = usr;
    const messages = await this.chatService.getPreviousMessages(usr.uid);
    console.log('Previous messages', messages);

    this.messages = (messages as any[]).filter(msg => msg.type === 'text');
  }

  async onSendMessage(message: string) {
    console.log('sending message: ', message);
    const sentMessage = await this.chatService.sendMessage(
      this.selectedUser.uid,
      message
    );

    console.log({ sentMessage });

    if (sentMessage) {
      this.messages = [...this.messages, sentMessage as any];
    }
  }
  photo(event){
    console.log(event,"srirampt=hto")
    console.log(event.target.files[0])
    console.log(event.target.files[0].name)
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('avatar', this.selectedFile, this.selectedFile.name);
    // this.project.images(this.fd)
    // location.reload();

}
photosubmit()
{
  this.authService.photoapi(this.fd).then(res =>{
 console.log(res);
 this.getprofile()
  }).catch(e =>{
console.log(e);

  })
}

getprofile()
{
  this.authService.allphoto().then(res =>{
    console.log(res);
    location.reload();
     }).catch(e =>{
   console.log(e);
   
     })
}
}
