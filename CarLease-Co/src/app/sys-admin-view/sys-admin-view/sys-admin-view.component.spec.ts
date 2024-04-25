import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdminViewComponent } from './sys-admin-view.component';

describe('SysAdminViewComponent', () => {
  let component: SysAdminViewComponent;
  let fixture: ComponentFixture<SysAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysAdminViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SysAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
