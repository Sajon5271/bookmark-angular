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
  categoryList: { id: number; name: string }[] = [];
  addNewBookmark = false;
  constructor(private dataService: DataServiceService) {}
  ngOnInit() {
    this.dataService
      .getCategory()
      .subscribe((res) => (this.categoryList = res));
    this.dataService.getBookmarks().subscribe((res) => {
      this.bookmarkList = res;
    });
  }
  addBookmark(newBookmark: Bookmark) {
    this.bookmarkList.push(newBookmark);
    this.addNewBookmark = false;
  }
  deleteBookmark(id: number | undefined) {
    if (id) {
      this.dataService.deleteBookmarks(id).subscribe((res) => {
        console.log(res);
        this.bookmarkList = this.bookmarkList.filter((el) => el.id !== id);
      });
    }
  }

  addCategory(newCategory: { id: number; name: string }) {
    this.categoryList.push(newCategory);
  }

  categorizedBookmarks(categoryId: number) {
    return this.bookmarkList.filter((el) => el.categoryId === categoryId);
  }
}
