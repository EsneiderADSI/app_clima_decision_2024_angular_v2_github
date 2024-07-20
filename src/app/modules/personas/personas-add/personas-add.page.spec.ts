import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonasAddPage } from './personas-add.page';

describe('PersonasAddPage', () => {
  let component: PersonasAddPage;
  let fixture: ComponentFixture<PersonasAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
