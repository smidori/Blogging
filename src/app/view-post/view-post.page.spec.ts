import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPostPage } from './view-post.page';

describe('ViewPostPage', () => {
  let component: ViewPostPage;
  let fixture: ComponentFixture<ViewPostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
