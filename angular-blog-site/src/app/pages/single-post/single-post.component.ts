import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    CommentFormComponent,
    CommentListComponent,
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  post!: Post;
  similarPosts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postService.loadSinglePost(params['id']).then((post) => {
        this.post = post.data() as Post;
        this.postService.countView(params['id']);
        this.postService
          .loadSimilarPosts(this.post.category.id)
          .subscribe((posts) => {
            this.similarPosts = posts;
          });
      });
    });
  }
}
