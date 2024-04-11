import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export abstract class ListComponent<T> implements OnInit {
  items: T[] = [];

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.getService()
      .getAll()
      .subscribe({
        next: (items) => {
          this.items = items;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  deleteItem(id: string) {
    this.getService()
      .delete(id)
      .subscribe({
        next: () => {
          this.loadItems();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  abstract getService(): {
    getAll: () => Observable<T[]>;
    delete: (id: string) => Observable<void>;
  };
}
