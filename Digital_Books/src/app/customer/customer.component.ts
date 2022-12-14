import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.model';

@Component({
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

  ngOnInit(): void {
   this.GetDataFromServer();
   }

  Success(input:any){
    this.CustomerModels=input;
  }
  constructor(private http:HttpClient) {

  }

  GetDataFromServer(){
    this.http.get("http://localhost:3000/customers").subscribe(res=>this.Success(res),res=>console.log(res));
 
  }
  title = 'sample-project';
  imageURL = "././assets/image.jpg";
  isEdit=false;

  CustomerModel: Customer = new Customer();
  CustomerModels: Array<Customer> = new Array<Customer>();
  Add() {
    debugger;
    // console.log('HI');
    // alert('HI');

   // this.CustomerModels.push(this.CustomerModel);
   // console.log(this.CustomerModels);
if(this.isEdit){
  this.http.put("http://localhost:3000/customers",this.CustomerModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
}
else{
  this.http.post("http://localhost:3000/customers",this.CustomerModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
}
   
    this.CustomerModel = new Customer();
  }
  PostSuccess(input:any){
    this.GetDataFromServer();
  }
  EditCustomer(input: any) {
    debugger;
    this.isEdit=true;
    this.CustomerModel = input;
  }
  DeleteCustomer(input:any){
    debugger;
    this.http.delete("http://localhost:3000/customers/1").subscribe(res=>console.log(res),res=>console.log(res));
    this.CustomerModel=input;
  }
}