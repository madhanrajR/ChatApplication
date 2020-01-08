import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CometChat } from '@cometchat-pro/chat';
import { timer } from 'rxjs';

@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.scss']
})
export class MessagesViewComponent implements OnChanges {
  @Input() messages: CometChat.TextMessage[] | null;
  @Input() selectedUserName: string;

  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('scrollMe', { static: false })
  messagesContainer: ElementRef<HTMLDivElement>;
  activeUser_id:any;
  selectedUserName1:any;
  constructor(public authService: AuthService) {
    this.activeUser_id = localStorage.getItem('userid');
    this.selectedUserName1=localStorage.getItem('receiverid');
    this.authService.loginname();
  }

  onSendMessage(message: string) {
    this.sendMessage.emit(message);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes',changes.messages);
    
    if (changes.messages) {
      timer(10).subscribe(() => this.scrollIntoView());
    }
  }

  public scrollIntoView() {
    console.log('changes1');
    if (this.messagesContainer) {
      const { nativeElement } = this.messagesContainer;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }

  }
  conversationid:any;
  sendmsg(msg) {
    console.log('send',msg)
    var data = {
      "senderid": localStorage.getItem('userid'),
      "receiverid": localStorage.getItem('receiverid'),
      "sendername":localStorage.getItem('username'),
      "message": msg
    }
    this.authService.sendmsg(data).then(res => {
      this.conversationid = res['data'];
    }).then(() => {
    //  setTimeout(() => {
        this.authService.rendermsg1();
   //   }, 4000);
     
    })

  }
 
}
