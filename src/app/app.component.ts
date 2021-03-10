import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tablet';
  num:number = 1;
  Brokendata:any = {}; // raw data
  correctdata :any = [];// extracted array of object from raw data
  keylist :any =[];// header keys 
  prlink :any ;
  msng:string= ""; // messanger output
  oldpasslink =""; // comparing variable
  oldlink  = " https://";
  linkval:string =" ";
  constructor( public http :HttpClient) { 
 
  }

  gettable() { //THIS function will take the object data give us the array of objects
    
    this.getData(this.prlink).subscribe(Brokendata=>{    
      console.warn(Brokendata),  //getdata() function will give the data from href.
      this.Brokendata = Brokendata; //Broken data is our the entire object file example in reqres data (userfile ) 
      this.correctdata = this.Brokendata.data; //now this will help to clean from broken data and get the array of objects

      for(var i in this.correctdata [0]) // this function helps to get the keyword of objects
      {
          var sub_key = i ;
          var sub_val =this.correctdata[0][i];
          console.log(sub_key);
          this.keylist.push(sub_key);
      }
      this.num = this.keylist.length; // this will help us to get the number of keys
    
    })
  }

  getData(link:any){
    return this.http.get(link);
  }
  getlnk(passlink:any) // this function helps to get the data (json link) input from user and run the function 
  {
    if(passlink == "") // blank input type 
    {
      this.msng = " Please Enter the json link" ; // ping message 
    }
    if( passlink==this.oldlink ) //duplicate link if used again for the creation of table
    {
      if(this.correctdata.length == 0 && this.keylist.length == 0) // this will check the clear button executed or not if used it will ceate another tables
      {
        this.oldlink = passlink;  
        this.prlink = passlink;
      }
      else
      {
      this.msng = "PLEASE ENTER NEWLINK "; //ping message //if  clear button not used then the table is there no need to render it agian
      this.prlink = ""; 
      }
    
    }
    if( passlink != this.oldlink) //condition :the used link and the new link must be different 
    {
      this.oldlink = passlink;
      this.prlink = passlink;
    }
    
  }
   destrytable(passlink:any){
    if( passlink==this.oldlink ) //duplicate link if used again this will help to null the url so no table will be created again
    {
      this.correctdata = [];
      this.keylist = [];
   }
   }

  


  }
