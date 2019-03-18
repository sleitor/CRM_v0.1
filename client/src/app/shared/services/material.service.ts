declare var M;

import { ElementRef, Injectable } from '@angular/core';

export interface MaterialInstance {
  open?(): void;

  close?(): void;

  destroy?(): void;
}

export interface MaterialDatePicker extends MaterialInstance {

  date?: Date
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

  static initModal(modal: ElementRef): MaterialInstance {
    return M.Modal.init(modal.nativeElement);
  }

  static initTooltip(tooltip: ElementRef): MaterialInstance {
    return M.Tooltip.init(tooltip.nativeElement);
  }

  static initDatePicker(picker: ElementRef, onClose: () => void): MaterialDatePicker {
    return M.Datepicker.init(picker.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
    });
  }

  static initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement);
  }
}
