import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeClimaPage } from './home-clima.page';

describe('HomeClimaPage', () => {
  let component: HomeClimaPage;
  let fixture: ComponentFixture<HomeClimaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeClimaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
