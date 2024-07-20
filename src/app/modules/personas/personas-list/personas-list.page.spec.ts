import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonasListPage } from './personas-list.page';

describe('PersonasListPage', () => {
  let component: PersonasListPage;
  let fixture: ComponentFixture<PersonasListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
