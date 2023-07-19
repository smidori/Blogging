import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPostPage } from './list-post.page';

describe('ListPostPage', () => {
  let component: ListPostPage;
  let fixture: ComponentFixture<ListPostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
