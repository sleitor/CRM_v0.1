declare var M;

import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() {
  }

  static toast(message: string) {
    M.toast({html: message})
  }

  static floatingActionButton(ref: ElementRef) {
    console.log(ref);
    M.FloatingActionButton.init(ref.nativeElement);
  }
}
