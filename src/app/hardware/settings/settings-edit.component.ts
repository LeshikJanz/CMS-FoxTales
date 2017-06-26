import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../device.service';

/**
 * Settings details component
 */
@Component({
  selector: 'settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['settings-edit.component.scss',
    '../../shared/styles/form-element.scss']
})
export class SettingsEditComponent implements OnInit {
  @ViewChild('editModal') public editModal: ModalDirective;

  /**
   * Settings form
   *
   * @type {FormGroup}
   */
  public settingsForm: FormGroup;

  /**
   * Settings
   *
   * @type {ISettings}
   */
  public settings: any = {
    id: null,
    updateType: null,
    logsPerDay: null,
    clientId: null
  };

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder - Form builder
   * @param {ToastrService} toastrService - Toastr service
   * @param {SettingsService} settingsService - Settings service
   * @returns {void}
   */
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private deviceService: DeviceService) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.buildSettingsForm();

    this.getSettings();
  }

  /**
   * Get settings
   *
   * @returns {void}
   */
  public getSettings(): void {
    this.deviceService
      .getSettings()
      .subscribe((settings: any) => {
        if (!settings) {
          this.editModal.hide();
        }
        this.settings = settings;

        this.buildSettingsForm();
      });
  }

  /**
   * Update settings
   *
   * @returns {void}
   */
  public updateSettings(settings: any): void {
    this.deviceService
      .updateSettings(settings)
      .subscribe((data) => {
        this.settings = data;
        this.toastrService.success('Settings has been updated successfully.');
        this.editModal.hide();
      });
  }

  /**
   * Build settings form
   *
   * @returns {void}
   */
  public buildSettingsForm(): void {
    this.settingsForm = this.formBuilder.group({
      updateType: [this.settings.updateType, [
        Validators.required
      ]],
      logsPerDay: [this.settings.logsPerDay, [
        Validators.required
      ]]
    });
  }

  public hide(): void {
    this.buildSettingsForm();
    this.editModal.hide();
  }
}
