import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  name:string='';
  attention:number;
  rest:number;
  errorMessage = '';
  id:number;
  public isDead: boolean=false;
  
  @Output() public onCheckDecay = new EventEmitter();
  constructor(private http: HttpClient,private petService:PetService)
  {
    this.isDead=false;
    this.id=1
    
  }
  ngOnInit(): void {
    interval(3000).subscribe(x => this.getMyPet()); 
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
      if(this.pet.food<=0){ this.isDead =true; 
        this.onCheckDecay.emit(true);
        console.log(this.isDead);
      }
    },error=>{
      console.log(error);
    });

  }

}
  