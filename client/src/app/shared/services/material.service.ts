declare var M;

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() {
  }

  static toast(message: string) {
    M.toast({html: message})
  }
}
