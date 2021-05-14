import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { PetService } from '../pet.service';
import { IPets } from '../_interfaces/pet.model';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
 
  public pets: IPets[]=[];
  pet:IPets;
  public name:string='';
  public attention:string='';
  public rest:string='';
  errorMessage = '';
  id:number;
  
  constructor(private http: HttpClient,private petService:PetService)
  {
    this.id=1
    
  }
  ngOnInit(): void {
    interval(9000).subscribe(x => this.getMyPet()); 
  }

  getPet(id: number): void {
    this.petService.getPet(id).subscribe(res =>{
      this.pet= res as unknown as IPets;
      console.log(this.pet);
    
    });
  }

  runPetDecay=()=>{
    this.http.get('https://localhost:44322/api/Tamagotchi/decay')
    .subscribe(data => {
      console.log(data);
      },error=>{
        console.log(error);
      }
    );
  }
   getMyPet = () => {
    this.http.get<IPets>('https://localhost:44322/api/Tamagotchi/displaypet/1')
    .subscribe(res => {
      this.pet = res as IPets;
      this.runPetDecay();

    },error=>{
      console.log(error);
    });

  }

}
  