import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css',
})
export class SingleCategoryComponent implements OnInit {
  categoryPosts: Post[] = [];
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((category) => {
      this.categoryName = category['name'];
      this.postService.loadCategoryPosts(category['id']).subscribe((posts) => {
        this.categoryPosts = posts;
      });
    });
  }
}
