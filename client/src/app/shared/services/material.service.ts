declare var M;

import { ElementRef, Injectable } from '@angular/core';

export interface MaterialModalInstance {
  open?(): void;

  close?(): void;

  destroy?(): void;
}

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
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateForm() {
    M.updateTextFields();
  }

  static initModal(modal: ElementRef): MaterialModalInstance {
    return M.Modal.init(modal.nativeElement);
  }
}
