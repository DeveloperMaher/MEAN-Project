import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivTaskComponent } from './archiv-task.component';

describe('ArchivTaskComponent', () => {
  let component: ArchivTaskComponent;
  let fixture: ComponentFixture<ArchivTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
