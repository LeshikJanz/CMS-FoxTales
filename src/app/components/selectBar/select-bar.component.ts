import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'select-bar',
  templateUrl: 'select-bar.component.html',
  styleUrls: ['select-bar.component.scss']
})

export class SelectBarComponent {
  @Input() public selected: number;

  @Input() public size: number;

  @Output() public deleteSelected: EventEmitter<any> = new EventEmitter();

  @Output() public cloneSelected: EventEmitter<any> = new EventEmitter();

  @Output() public deselectAll: EventEmitter<any> = new EventEmitter();

  public onDeleteSelected() {
    this.deleteSelected.emit();
  }
  public onCloneSelected() {
    this.cloneSelected.emit();
  }
  public onDeselectAll() {
    this.deselectAll.emit();
  }

  @HostListener('window:keydown', ['$event'])
  public keyboardInput(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if(event.keyCode === 27) this.onDeselectAll();
  }
}
