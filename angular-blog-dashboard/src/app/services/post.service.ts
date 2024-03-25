import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  UploadTask,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTaskSnapshot,
  deleteObject,
} from '@angular/fire/storage';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly storage: Storage = inject(Storage);
  private basepath = '/uploads';

  constructor(private toastr: ToastrService, private router: Router) {}

  save(selectedImage: File, postData: Post, formStatus: string, id: string) {
    if (!selectedImage) return;

    const filePath = `${this.basepath}/${postData.category.name}/${Date.now()}`;
    const storageRef = ref(this.storage, filePath);

    const uploadTask: UploadTask = uploadBytesResumable(
      storageRef,
      selectedImage
    );

    uploadTask.then((snapshot: UploadTaskSnapshot) => {
      getDownloadURL(storageRef).then((url) => {
        postData.postImgPath = url;
        if (formStatus === 'edit') {
          this.updateData(id, postData);
        } else {
          this.insert(postData);
        }
      });
    });
  }

  insert(data: Post) {
    const postCollection = collection(this.firestore, 'posts');
    addDoc(postCollection, data)
      .then((docRef) => {
        this.toastr.success('Data insert successful.');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    const docRef = collection(this.firestore, 'posts');
    return collectionData(docRef, { idField: 'id' }).pipe(
      map((data) => {
        console.log(data);
        return data as Post[];
      })
    );
  }

  loadOne(id: string) {
    return getDoc(doc(this.firestore, `/posts/${id}`));
  }

  updateData(id: string, data: Post) {
    updateDoc(doc(this.firestore, `/posts/${id}`), {
      title: data.title,
      permalink: data.permalink,
      category: {
        id: data.category.id,
        name: data.category.name,
      },
      postImgPath: data.postImgPath,
      excerpt: data.excerpt,
      content: data.content,
      isFeatured: data.isFeatured,
      views: data.views,
      status: data.status,
      createdAt: data.createdAt,
    }).then(() => {
      this.toastr.success('Data updated successfully');
      this.router.navigate(['/posts']);
    });
  }

  deleteImage(postImagePath: string, id: string) {
    const storageRef = ref(this.storage, postImagePath);
    deleteObject(storageRef).then((val) => {
      console.log(val);
      this.deleteData(id);
    });
  }

  deleteData(id: string) {
    deleteDoc(doc(this.firestore, `/posts/${id}`)).then(() => {
      this.toastr.success('Data deleted successfully.');
    });
  }

  markFeatured(id: string, isFeatured: boolean) {
    updateDoc(doc(this.firestore, `/posts/${id}`), {
      isFeatured: isFeatured,
    }).then(() => {
      this.toastr.success('Featured updated successfully.');
      this.router.navigate(['/posts']);
    });
  }
}
