import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Directive({selector: '[isLast]'})
export class LastDirective{
  
   @Input() isLast:boolean;
   @Output() lastDone:EventEmitter<boolean> = new EventEmitter<boolean>();
   ngOnInit() {
     if(this.isLast) {
       this.lastDone.emit(true);
     }
   }
}