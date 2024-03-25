import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent implements OnInit {
  @Input() postData!: Post;

  ngOnInit(): void {
    if (this.postData) {
      this.postData.excerpt = this.postData.excerpt.substring(0, 150);
    }
  }
}
