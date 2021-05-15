import { Component, OnInit } from '@angular/core';
import { IPets } from './_interfaces/pet.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public isCreate: boolean;
  public isDead:boolean;
  public response :{dbpath:''};
  url='https://localhost:44322/'

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.isCreate = false;
    this.isDead=false;
  }
  public title = 'TamagotchiClient';
  public name:string='';
  public petId:string = '1';
  
  public pets: IPets[] = [];

  public returnToCreate = (event:boolean) => {
    this.isCreate = event;
    this.name="Thank you for playing!!!";
    this.isDead=true;
  
  }
 
  public onCreate =()=>{
    console.log("Name: "+ this.name);
    
    this.http.post(this.url+'api/Tamagotchi/createpet/'+ this.name,{name:this.name})
    .subscribe(data => {
      this.isCreate = true;
      this.getPets();
     
      },error=>{
        console.log(error);
      }
    );
  }
  private getPets = () => {
    this.http.get(this.url+'api/Tamagotchi/displaypet/1')
    .subscribe(res => {
      this.pets = res as unknown as IPets[];
      console.log(this.pets);
    },error=>{
      console.log(error);
    });
  }
 


}
