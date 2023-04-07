import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zoom',
  standalone: true
})
export class ZoomPipe implements PipeTransform {

  transform(value: number): number {
    return value * 100;
  }
}
