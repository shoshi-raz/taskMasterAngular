import { Component, input, output } from '@angular/core';
import { Breadcrumb } from '../../models/navigation.model';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingIconComponent } from '../UIcomponents/loading-icon/loading-icon.component';

@Component({
  selector: 'app-page-navigate',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, LoadingIconComponent],
  templateUrl: './page-navigate.component.html',
  styleUrl: './page-navigate.component.css',
})
export class PageNavigateComponent {
breadcrumbs = input.required<Breadcrumb[]>();
  isLoading = input<boolean>(false);
  refresh = output<void>();

  onRefresh(): void {
    this.refresh.emit();
  }
}
