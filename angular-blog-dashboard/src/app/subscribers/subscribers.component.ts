import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { Subscriber } from '../models/subscriber';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css',
})
export class SubscribersComponent implements OnInit {
  subscribers: Subscriber[] = [];

  constructor(
    private subscribersService: SubscribersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscribersService.loadData().subscribe((val) => {
      this.subscribers = val as Subscriber[];
    });
  }

  onDelete(id: string) {
    this.subscribersService.deleteData(id).then(() => {
      this.toastr.success('Subscriber deleted successfully.');
    });
  }
}
