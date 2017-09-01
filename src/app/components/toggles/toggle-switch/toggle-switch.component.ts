import { Component, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const UI_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UiSwitchComponent),
  multi: true
};

@Component({
  selector: 'ui-switch',
  templateUrl: 'toggle-switch.component.html',
  styleUrls: ['toggle-switch.component.scss'],
  providers: [UI_SWITCH_CONTROL_VALUE_ACCESSOR]
})
export class UiSwitchComponent implements ControlValueAccessor {
  private onTouchedCallback = (v: any) => {
    console.log('onTouchedCallback');
  }
  private onChangeCallback = (v: any) => {
    console.log('onChangeCallback');
  }

  private _checked: boolean;
  private _disabled: boolean;
  private _reverse: boolean;

  @Input()
  public set checked(v: boolean) {
    this._checked = v !== false;
  }

  public get checked() {
    return this._checked;
  }

  @Input()
  public set disabled(v: boolean) {
    this._disabled = v !== false;
  };

  public get disabled() {
    return this._disabled;
  }

  @Input()
  public set reverse(v: boolean) {
    this._reverse = v !== false;
  };

  public get reverse() {
    return this._reverse;
  }

  @Input() public size: string = 'medium';
  @Output() public change = new EventEmitter<boolean>();
  @Input() public color: string = 'rgb(100, 189, 99)';
  @Input() public switchOffColor: string = '';
  @Input() public switchColor: string = '#fff';
  public defaultBgColor: string = '#fff';
  public defaultBoColor: string = '#dfdfdf';

  public getColor(flag) {
    if (flag === 'borderColor') {
      return this.defaultBoColor;
    }
    if (flag === 'switchColor') {
      if (this.reverse) {
        return !this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
      }
      return this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
    }
    if (this.reverse) {
      return !this.checked ? this.color : this.defaultBgColor;
    }
    return this.checked ? this.color : this.defaultBgColor;
  };

  @HostListener('click')
  public onToggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.change.emit(this.checked);
    this.onChangeCallback(this.checked);
    this.onTouchedCallback(this.checked);
  }

  public writeValue(obj: any): void {
    if (obj !== this.checked) {
      this.checked = !!obj;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}