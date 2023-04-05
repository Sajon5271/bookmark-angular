import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Bookmark } from '../../bookmark.interface';
import { isUri } from 'valid-url';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css'],
})
export class AddBookmarkComponent {
  errorMessage = '';
  allAvailableCategories: { id: number; name: string }[] = [];
  addNewCategory = false;
  @Output() newCategory = new EventEmitter<Bookmark>();
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataServiceService
  ) {
    this.dataService
      .getCategory()
      .subscribe((res) => (this.allAvailableCategories = res));
  }

  bookmarkForm = this.formBuilder.group(
    {
      title: ['', Validators.required],
      url: ['', [Validators.required, this.checkURL()]],
      categoryId: [null, Validators.required],
      categoryName: [''],
    },
    { validators: [this.checkCategoryName()] }
  );

  ngOnInit() {
    this.bookmarkForm.controls.categoryId.valueChanges.subscribe((val) => {
      if (val === 9000) this.addNewCategory = true;
      else this.addNewCategory = false;
    });
    this.bookmarkForm.valueChanges.subscribe(() => (this.errorMessage = ''));
  }

  checkCategoryName(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const selectionValue = group.value.categoryId;
      if (selectionValue === 9000 && !group.value.categoryName)
        return { needsAField: true };
      else return null;
    };
  }
  checkURL(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const url = control.value;
      if (control.touched && !isUri(url)) return { invalidURL: true };
      else return null;
    };
  }

  addBookmark() {
    console.log(this.bookmarkForm);
    if (this.bookmarkForm.valid) {
      if (this.bookmarkForm.controls.categoryId.value === 9000) {
        this.dataService
          .addCategory(this.bookmarkForm.controls.categoryName.value || '')
          .subscribe((res) => {
            const { title, url } = this.bookmarkForm.value;
            if (title && url)
              this.dataService
                .create({ title, url, categoryId: res.id })
                .subscribe((res) => {
                  this.newCategory.emit(res);
                });
          });
      } else {
        const { title, url, categoryId } = this.bookmarkForm.value;
        console.log(title, url, categoryId);
        if (title && url)
          this.dataService
            .create({ title, url, categoryId: categoryId || 0 })
            .subscribe((res) => {
              this.newCategory.emit(res);
            });
      }
    } else {
      if (this.bookmarkForm.controls.url.hasError('invalidURL'))
        this.errorMessage = 'Invalid URL. Please provide valid URL';
      else if (this.bookmarkForm.hasError('needsAField'))
        this.errorMessage = 'Please add a name for the new category';
      else this.errorMessage = 'Please fill in the required fields';
    }
  }
}
