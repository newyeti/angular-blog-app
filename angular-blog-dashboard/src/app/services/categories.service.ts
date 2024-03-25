import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  firestore: Firestore = inject(Firestore);

  constructor(private toastr: ToastrService) {}

  saveData(data: Category) {
    const categoriesCollection = collection(this.firestore, 'categories');
    addDoc(categoriesCollection, data)
      .then((docRef) => {
        this.toastr.success('Data insert successful.');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    const docRef = collection(this.firestore, 'categories');
    // return collectionSnapshots(docRef).pipe(
    //   map((snapshots) => {
    //     return snapshots.map((snapshot) => {
    //       return { ...snapshot.data(), id: snapshot.id };
    //     });
    //   })
    // );

    return collectionData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        return data as Category[];
      })
    );
  }

  updateData(id: string, editData: string) {
    const docRef = collection(this.firestore, `categories`);
    updateDoc(doc(this.firestore, `/categories/${id}`), {
      category: editData,
    }).then((docRef) => {
      this.toastr.success('Data updated successfully.');
    });
  }

  deleteData(id: string) {
    deleteDoc(doc(this.firestore, `/categories/${id}`)).then((docRef) => {
      this.toastr.success('Data deleted successfully.');
    });
  }
}
