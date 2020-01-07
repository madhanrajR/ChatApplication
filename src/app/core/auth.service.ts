import { Injectable } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { MatSnackBar } from '@angular/material';

import { environment } from '../../environments/environment';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import{ Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: unknown;
  currentusername:any;
  current_msg_len:number=0;
  selectedUserName:any;
  conversationid:any;
  messages:any=[];
  msgstatus:boolean;
  public httpOptions:any;
  

  isLoggedIn:boolean = false;
   public baseurl:string="https://chatbackend2.herokuapp.com/"
  //  public baseurl:string="https://chatbackend1.herokuapp.com/"

  //public baseurl:string="http://10.10.0.142:3000/"

 // public Socket= io(this.baseurl)
  constructor(public http:HttpClient,public route:Router) {
    this.messages=[];
   this.currentusername=localStorage.getItem('username');
    // this.httpOptions = {
    //   headers: new HttpHeaders({      
    //     'user':localStorage.getItem('username')
    // })

    // }
 
   }

  connstatus(){
    this.http.get(this.baseurl).subscribe(res =>{
      console.log(res)
    })
  }


  getmst(){   
    console.log("get mst fun")     
    this.http.get(this.baseurl ).subscribe(
      data => {
       console.log(data);
       
      }, err => {
        console.log(err);
      
      });
 

}

public async conversationdetails(conv_id):Promise<any>{
  return new Promise((resolve,reject)=>{
    var data={
      "conversationid":conv_id
    }
  this.http.post(this.baseurl+'conversationdet',data)
  .subscribe(res =>{
  resolve(res);
  },err=>{
    resolve(err)
  })
  })
}

public async sendmsg(data):Promise<any>{
  return new Promise((resolve,reject)=>{
     this.http.post(this.baseurl+'chat',data).subscribe(res =>{
    
      let conversationid;
      conversationid=localStorage.getItem('conversationid')
      console.log(conversationid,conversationid == 'undefined');
      
      
      if(conversationid == 'undefined')
      {
      let data1 = {
        "senderid": localStorage.getItem('userid'),
        "receiverid": localStorage.getItem('receiverid'),
      }
      console.log('data1', data1);
      
      this.http.post(this.baseurl + 'conversation', data1).subscribe(res => {
        console.log(res)
        this.conversationid = res['id'];
        localStorage.setItem('conversationid',res['id'])
         console.log('send');
         
            this.rendermsg();
       
     
      })  
    }
     else
      {
        console.log(conversationid);
        
        setInterval(() => {
          this.rendermsg1();
        }, 1000)
      }
    resolve(res)    
    },err =>{
      resolve(err)
    })
    
})
}


signup(data)
{
 
  // this.Socket.emit('reg',data);

  // this.Socket.on('regstatus',(data:any)=>{
  //   console.log(data);  
  //   if(data.status==="success")
  //   {
  //     this.route.navigate(['home']);
  //   }
  // })
 

  this.http.post(this.baseurl+'reg',data).subscribe(res =>{
    console.log(res);
    
    if(res['status']==="success")
      {
        this.route.navigate(['login']);
      }
  })
}
public async login(a,b):Promise<any>
{
  return new Promise((resolve,reject)=>{
  console.log(a,b);
  
  var data={
    "username":a,
    "password":b
  }
  this.http.post(this.baseurl+'login',data).subscribe(res =>{
    console.log(res)
    if(res['_id'])
      {
        this.currentUser=res;
        localStorage.setItem('userid',res['_id'])
        localStorage.setItem('username',res['username'])
        this.currentusername=localStorage.getItem('username');
        this.route.navigate(['/login']);
      }
      resolve(res)      
    },err =>{
      resolve(err)
    })
 
})
  // this.Socket.emit('logindet',data);
  // this.Socket.on('loginstatus',(data:any)=>{
  //   console.log(data);  
  //   if(data.user)
  //   {
  //     localStorage.setItem('userid',data.data[0]._id)
  //     this.route.navigate(['home']);
  //   }
  // })
}

loginname()
{
  this.currentusername=localStorage.getItem('username');
}
conversation(data)
{
this.selectedUserName=data.username;
//this.currentUser=localStorage.getItem('userid');
let data1 = {
  "senderid": localStorage.getItem('userid'),
  "receiverid": localStorage.getItem('receiverid'),
}
console.log('data1', data1);

this.http.post(this.baseurl + 'conversation', data1).subscribe(res => {
  console.log(res)
  this.conversationid = res['id'];
  localStorage.setItem('conversationid',res['id'])
  if (this.conversationid != undefined) {
    this.rendermsg();
    setInterval(() => {
      this.rendermsg1();
    }, 1000);
  }
  else {
  //  this.messages.length =0;
    console.log('res',this.messages)
    this.messages = [];
    this.msgstatus = false;
  }
})

}

rendermsg() {
  console.log('89render', this.conversationid);

  this.messages = [];
  // console.log("render",this.conversationid);

  this.conversationdetails(this.conversationid).then(res => {
    this.current_msg_len=res['data'].length;
    console.log('render', res, this.conversationid,this.currentUser);
    if(res['bool'])
    {
    // this.msg1 = res;
    res['data'].forEach(async (items) => {
      this.messages.push(items)
      

    })
    this.msgstatus = true;
  }

  })
}


rendermsg1() {
  //console.log('898render', this.conversationid);

  // this.msg1 = [];
  // console.log("render",this.conversationid);
    let conversationid;
    conversationid=localStorage.getItem('conversationid')
    if(conversationid!=undefined)
    {
  this.conversationdetails(conversationid).then(res => {
   // console.log('render', res, this.conversationid);
    if(res['bool'])
    {
    // this.msg1 = res;
    //console.log('render', this.current_msg_len,res['data'].length);
    if(this.current_msg_len==0){
      this.current_msg_len =  res['data'].length;
    res['data'].forEach(async (items) => 
    {
      console.log('1');
      
      this.messages.push(items);
    })
  }
  else
  {

    if(this.current_msg_len<res['data'].length)
    {
   //   console.log('render2', this.current_msg_len,res['data'].length);
     
      for(var i=this.current_msg_len;i<res['data'].length;i++)
      {
        this.current_msg_len =  res['data'].length;
   //     console.log('render1',res['data'][i], this.conversationid);
    console.log('2');
        this.messages.push(res['data'][i]);
      }
      
    }
  }
    // this.msgstatus = true;
  }

  })
}
}
authentication()
{
  if(localStorage.getItem('userid')!=undefined)
  {
    console.log('true');
    
    return true;
  }
  else{
    console.log('false');
    return false;
  }
}
photoapi(data):Promise<any>
{
  // var httpHeaders = new HttpHeaders ({
  //   'user':localStorage.getItem('username')
  // });
  this.httpOptions = {
    headers: new HttpHeaders({      
      'user':localStorage.getItem('username')
  })

  }
  return new Promise((resolve,reject)=>{
  
    
    this.http.post(this.baseurl+'profile',data,this.httpOptions).subscribe(res =>{
      resolve(res)
    },err =>{
      resolve(err)
    })
  })
}
allphoto():Promise<any>
{
  return new Promise((resolve,reject)=>{
    this.http.get(this.baseurl+'getprofile/surya').subscribe(res =>{
      resolve(res)
    },err =>{
      resolve(err)
    })
  })
}
logout()
{
  localStorage.clear();
  this.route.navigate(['login']);
}
}
