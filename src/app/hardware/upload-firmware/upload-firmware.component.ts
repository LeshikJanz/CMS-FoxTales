import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../device.service';

/**
 * UploadFirmware details component
 */
@Component({
  selector: 'upload-firmware',
  templateUrl: './upload-firmware.component.html',
  styleUrls: ['upload-firmware.component.scss',
    '../../shared/styles/form-element.scss']
})
export class UploadFirmwareComponent implements OnInit {
  @ViewChild('editModal') public editModal: ModalDirective;

  /**
   * UploadFirmware form
   *
   * @type {FormGroup}
   */
  public uploadFirmwareForm: FormGroup;

  /**
   * Base64 logo
   *
   * @type {string}
   */
  public logoBytes: string;

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder - Form builder
   * @param {ToastrService} toastrService - Toastr service
   * @param {UploadFirmwareService} uploadFirmwareService - UploadFirmware service
   * @returns {void}
   */
  constructor(private formBuilder: FormBuilder,
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
    this.buildUploadFirmwareForm();
  }

  public onImgUploaded(base64) {
    this.logoBytes = base64;
  }

  /**
   * Update uploadFirmware
   *
   * @returns {void}
   */
  public setUploadSoftwareStatus(uploadFirmware: any): void {
    this.deviceService.getUploadUrl(uploadFirmware.version).flatMap((response) => {
      uploadFirmware.url = response.result;
      return this.deviceService.uploadFileToBlob(
        response.result,
        this.logoBytes.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '')
      ).flatMap(() => {
        return this.deviceService
          .setUploadUrl(uploadFirmware)
          .do(() => {
            this.toastrService.success('UploadFirmware has been created successfully.');
            this.editModal.hide();
          });
      });
    }).subscribe();
  }

  /**
   * Build uploadFirmware form
   *
   * @returns {void}
   */
  public buildUploadFirmwareForm(): void {
    this.uploadFirmwareForm = this.formBuilder.group({
      version: ['', [
        Validators.required
      ]],
      releaseNote: [''],
      isCritical: [false]
    });
  }
}
