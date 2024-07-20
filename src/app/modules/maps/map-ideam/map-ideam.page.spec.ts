import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapIdeamPage } from './map-ideam.page';

describe('MapIdeamPage', () => {
  let component: MapIdeamPage;
  let fixture: ComponentFixture<MapIdeamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIdeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
