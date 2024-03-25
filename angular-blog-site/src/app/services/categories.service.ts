import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  loadData() {
    const docRef = collection(this.firestore, 'categories');
    return collectionData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        return data as Category[];
      })
    );
  }
}
