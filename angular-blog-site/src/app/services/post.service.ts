import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  limit,
  orderBy,
  getDoc,
  doc,
  updateDoc,
  increment,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  loadFeaturedData() {
    const docRef = collection(this.firestore, 'posts');
    const queryRef = query(docRef, where('isFeatured', '==', true), limit(4));

    return collectionData(queryRef, { idField: 'id' }).pipe(
      map((data) => {
        return data as Post[];
      })
    );
  }

  loadLatestData() {
    const docRef = collection(this.firestore, 'posts');
    const queryRef = query(docRef, orderBy('createdAt'));

    return collectionData(queryRef, { idField: 'id' }).pipe(
      map((data) => {
        return data as Post[];
      })
    );
  }

  loadCategoryPosts(id: string) {
    const docRef = collection(this.firestore, 'posts');
    const queryRef = query(docRef, where('category.id', '==', id));

    return collectionData(queryRef, { idField: 'id' }).pipe(
      map((data) => {
        return data as Post[];
      })
    );
  }

  loadSinglePost(postId: string) {
    return getDoc(doc(this.firestore, `/posts/${postId}`));
  }

  loadSimilarPosts(categoryId: string) {
    const docRef = collection(this.firestore, 'posts');
    const queryRef = query(
      docRef,
      where('category.id', '==', categoryId),
      limit(4)
    );

    return collectionData(queryRef, { idField: 'id' }).pipe(
      map((data) => {
        return data as Post[];
      })
    );
  }

  countView(postId: string) {
    updateDoc(doc(this.firestore, `/posts/${postId}`), {
      views: increment(1),
    });
  }
}
