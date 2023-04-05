import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bookmark } from 'src/app/bookmark.interface';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css'],
})
export class BookmarkListComponent {
  @Input() bookmark!: Bookmark;
  @Output() delete = new EventEmitter();
}
