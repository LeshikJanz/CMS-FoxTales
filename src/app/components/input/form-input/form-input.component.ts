import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { ICol } from '../../../shared/table/col.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  templateUrl: 'form-input.component.html',
  styleUrls: ['form-input.component.scss']
})

export class FormInputComponent implements OnChanges {
  @Input() public form: FormGroup;

  @Input() public name: string;

  @Input() public title: string;

  public ngOnChanges() {
    console.log('this.form');
    console.log(this.form);

    console.log('this.form.get(name)');
    console.log(this.form.get('name'));
  }
}
