import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  featuredPosts: Post[] = [];
  loadLatestPostData: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadFeaturedData().subscribe((val) => {
      this.featuredPosts = val;
    });

    this.postService.loadLatestData().subscribe((val) => {
      this.loadLatestPostData = val;
    });
  }
}
