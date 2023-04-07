import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomControlsComponent } from '../zoom-controls/zoom-controls.component';
import { DynamicComponentsStoreService } from '../../services/dynamic-components-store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ZoomControlsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private readonly store: DynamicComponentsStoreService) {}

  save(): void {
    this.store.showResult();
  }

}
