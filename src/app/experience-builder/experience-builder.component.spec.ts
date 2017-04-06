import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceBuilderComponent } from './experience-builder.component';

describe('ExperienceBuilderComponent', () => {
  let component: ExperienceBuilderComponent;
  let fixture: ComponentFixture<ExperienceBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
