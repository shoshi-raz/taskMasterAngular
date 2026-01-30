import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loading-icon',
  imports: [MatIconModule],
  templateUrl: './loading-icon.component.html',
  styleUrl: './loading-icon.component.css',
})
export class LoadingIconComponent {
  isLoading=input.required<boolean>();

  iconName=input<string>('refresh')

}
