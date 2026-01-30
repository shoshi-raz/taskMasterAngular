import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigateComponent } from './page-navigate.component';

describe('PageNavigateComponent', () => {
  let component: PageNavigateComponent;
  let fixture: ComponentFixture<PageNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNavigateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
