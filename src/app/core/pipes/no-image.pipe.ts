import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(image: string, type: string): string {
    switch (type) {
      case 'user':
        if (!image || image == '') {
          return  'assets/images/default/user.png';
        } else {
          return `${ environment.urlBackend }/images/users/${ image }`;
        }

      case 'screen':
        if (!image || image === '') {
          return  'assets/images/default/default.png';
        } else {
          return `${ environment.urlBackend }/images/screens/${ image }`;
        }

      default:
        return 'assets/images/default/default.png';
    }
  }
}
