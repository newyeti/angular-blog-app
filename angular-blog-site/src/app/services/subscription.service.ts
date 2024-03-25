import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  collectionData,
  getDocs,
  doc,
} from '@angular/fire/firestore';
import { Sub } from '../models/sub';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  save(subscription: Sub) {
    return addDoc(collection(this.firestore, '/subscribers'), subscription);
  }

  checkExists(email: string) {
    const queryRef = query(
      collection(this.firestore, `/subscribers`),
      where('email', '==', email)
    );
    return getDocs(queryRef);
  }
}
