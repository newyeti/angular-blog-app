import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Subscriber } from '../models/subscriber';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  loadData() {
    const docRef = collection(this.firestore, 'subscribers');
    return collectionData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        return data as Subscriber[];
      })
    );
  }

  deleteData(docId: string) {
    return deleteDoc(doc(this.firestore, `/subscribers/${docId}`));
  }
}
