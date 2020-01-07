import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

import { ContactsService } from './contacts.service';
import { CometChat } from '@cometchat-pro/chat';
import { AuthService } from 'src/app/core/auth.service';
import {HttpClient} from '@angular/common/http';

const listenerId = 'ContactsListListner';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  @Output() userSelected = new EventEmitter<CometChat.User>();

  activeUser: CometChat.User;
   user:any=[];
   activeUser_id:any;
   senderid :any;
  constructor(readonly contactsService: ContactsService,private auth:AuthService,private http:HttpClient) {
    this.senderid = localStorage.getItem('userid');
    this.auth.loginname();
    this.http.get(this.auth.baseurl + 'listusers').subscribe((res:any[]) => {
      console.log(res)
 
      res.forEach((element,value) => {
        // console.log(element,value);
         console.log(this.senderid,element._id,this.senderid!=element._id);
        
        if(this.senderid!=element._id)
        {
          this.user.push(element);
        }
        
      });
     
    })
  }

  async ngOnInit() {
    await this.contactsService.getContacts();
    await this.contactsService.trackOnlineStatus(listenerId);

    this.selectFirstContact();
  }

  private selectFirstContact() {
    if (
      this.contactsService.contacts &&
      this.contactsService.contacts.length !== 0
    ) {
      this.onUserSelected(this.contactsService.contacts[0] as any);
    }
  }

  ngOnDestroy(): void {
    this.contactsService.destroy(listenerId);
  }

  onUserSelected(user) {
    this.activeUser_id = user._id;
    localStorage.setItem("receiverid", user._id);
    this.senderid = localStorage.getItem('userid');
    this.auth.conversation(user);
    //this.userSelected.emit(user);
  }
}
