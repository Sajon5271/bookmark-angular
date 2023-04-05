import { Component } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { Bookmark } from './bookmark.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  bookmarkList: Bookmark[] = [];
  title = 'My-Bookmark';
  constructor(private dataService: DataServiceService) {}
  ngOnInit() {}
}
