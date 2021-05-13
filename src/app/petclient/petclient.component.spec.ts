import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetclientComponent } from './petclient.component';

describe('PetclientComponent', () => {
  let component: PetclientComponent;
  let fixture: ComponentFixture<PetclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
