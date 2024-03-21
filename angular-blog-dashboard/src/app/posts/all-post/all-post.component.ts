import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css',
})
export class AllPostComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      this.posts = val;
    });
  }

  onDelete(postImgPath: string, id: string) {
    this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id: string, isFeatured: boolean) {
    this.postService.markFeatured(id, isFeatured);
  }
}
