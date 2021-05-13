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
  public response :{dbpath:''};

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.isCreate = false;
  }
  public title = 'TamagotchiClient';
  public name:string='';
  public petId:string = '1';
  
  public pets: IPets[] = [];

  public returnToCreate = () => {
    this.isCreate = false;
  
  }
  public onCreate =()=>{
    console.log("Name: "+ this.name);
    
    this.http.post('https://localhost:44322/api/Tamagotchi/createpet/'+ this.name,{name:this.name})
    .subscribe(data => {
      this.isCreate = true;
      this.getPets();
     
      },error=>{
        console.log(error);
      }
    );
  }
  private getPets = () => {
    this.http.get('https://localhost:44322/api/Tamagotchi/displaypet/1')
    .subscribe(res => {
      this.pets = res as unknown as IPets[];
      console.log(this.pets);
    },error=>{
      console.log(error);
    });
  }
 


}
