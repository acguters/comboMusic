import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSongsComponent } from './your-songs.component';

describe('YourSongsComponent', () => {
  let component: YourSongsComponent;
  let fixture: ComponentFixture<YourSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
