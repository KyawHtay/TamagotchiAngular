import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetService } from '../pet.service';
import { IPets } from '../_interfaces/pet.model';

@Component({
  selector: 'app-petclient',
  templateUrl: './petclient.component.html',
  styleUrls: ['./petclient.component.css']
})
export class PetclientComponent implements OnInit {
  @Input() pets: IPets;
   name:string='';
   attention:string='';
   food:string='';
   rest:string='';
   id:number;
   pet: IPets | undefined;
   errorMessage = '';
   url ='https://localhost:44322';

 
  constructor(private http: HttpClient,private petService: PetService) { }

  ngOnInit(): void {
    this.id=1;
  }

  onFeed =()=>{
    this.httpget(this.url+'/api/Tamagotchi/addfood/1');
  
  }
  //  onFeed =()=>{
  //   this.petService.getPet(this.id).subscribe({
  //     next: pet => this.pet = pet,
  //     error: err => this.errorMessage = err
  //   });
  // }
  private httpget(api:string){
    this.http.get<IPets>(api)
    .subscribe(res => {
      this.pet = res as IPets;
      console.log(this.pet);
    },error=>{
      console.log(error);
    });
  }
  onPlay =()=>{
  this.httpget(this.url+'/api/Tamagotchi/addattention/1');
  }

  onRest =()=>{
    this.httpget(this.url+'/api/Tamagotchi/addrest/1');
    }
}
