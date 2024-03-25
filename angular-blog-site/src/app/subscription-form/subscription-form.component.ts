import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Sub } from '../models/sub';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css',
})
export class SubscriptionFormComponent {
  isSubscribed: boolean = false;
  isEmailExists: boolean = false;

  constructor(private subsService: SubscriptionService) {}

  onSubmit(formVal: any) {
    const subData: Sub = {
      name: formVal.name as string,
      email: formVal.email as string,
    };

    this.subsService.checkExists(subData.email).then((val) => {
      if (val.empty) {
        this.subsService.save(subData);
        this.isSubscribed = true;
        this.isEmailExists = false;
      } else {
        this.isEmailExists = true;
        this.isSubscribed = false;
      }
    });
  }
}
