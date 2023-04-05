import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';

@NgModule({
  declarations: [AppComponent, AddBookmarkComponent, BookmarkListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
