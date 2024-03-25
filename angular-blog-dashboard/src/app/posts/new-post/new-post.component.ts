import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { enableDebugTools } from '@angular/platform-browser';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImage: any;
  categories: Category[] = [];

  postForm!: FormGroup;
  post!: Post;
  formStatus: string = 'Add New';
  postId: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.postId = param['id'];

      if (this.postId) {
        this.postService.loadOne(this.postId).then((val) => {
          this.post = val.data() as Post;
          this.postForm = this.fb.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [
              this.post.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.post.category.id}-${this.post.category.name}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });

          this.imgSrc = this.post.postImgPath;
          this.permalink = this.post.permalink;
          this.formStatus = 'Edit';
        });
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
    });
  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChange($event: any) {
    const title = $event.target.value;
    this.permalink = title?.replace(/\s/g, '-').toLowerCase();
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit() {
    let categoryArray: string[] = this.postForm.value.category.split('-');
    let categoryId = '';
    let categoryName = '';
    if (categoryArray.length >= 2) {
      categoryId = categoryArray[0];
      categoryName = categoryArray[1];
    }

    const postData: Post = {
      id: '',
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        id: categoryId,
        name: categoryName,
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: Timestamp.now(),
    };

    this.postService.save(
      this.selectedImage,
      postData,
      this.formStatus,
      this.postId
    );
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
