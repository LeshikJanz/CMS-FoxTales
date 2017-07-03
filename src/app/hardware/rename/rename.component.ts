import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Rename component
 */
@Component({
  selector: 'device-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['rename.component.scss']
})
export class DeviceRenameComponent implements OnInit, OnChanges {
  @Input() public name: string;

  @Output() public onRename: EventEmitter<any> = new EventEmitter();

  public editing: boolean = false;

  /**
   * Rename form
   *
   * @type {FormGroup}
   */
  public renameForm: FormGroup;

  /**
   * Constructor
   *
   * @param {FormBuilder} formBuilder - Form builder
   * @returns {void}
   */
  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.buildRenameForm();
  }

  /**
   * Lifecycle hook
   *
   * @returns {void}
   */
  public ngOnChanges(): void {
    this.buildRenameForm();
  }

  /**
   * Update rename
   *
   * @returns {void}
   */
  public rename(rename: any): void {
    this.toggleEdit();
    this.onRename.emit(rename);
  }

  /**
   * Build rename form
   *
   * @returns {void}
   */
  public buildRenameForm(): void {
    this.renameForm = this.formBuilder.group({
      name: [this.name, [
        Validators.required
      ]]
    });
  }

  public toggleEdit(): void {
    this.editing = !this.editing;
  }
}
