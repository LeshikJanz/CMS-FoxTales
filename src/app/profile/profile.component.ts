import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProfile } from './profile.interface';
import { ProfileService } from './profile.service';

/**
 * Auth component
 */
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  /**
   * Profile data
   *
   * @type {IProfile}
   */
  public profileData: IProfile;

  /**
   * Logo
   *
   * @type {string}
   */
  public logo: string;

  /**
   * Constructor
   *
   * @param {ToastrService} toastrService - Toastr
   * @param {ProfileService} profile - Profile service
   * @returns {void}
   */
  constructor(private toastrService: ToastrService, private profile: ProfileService) {
  }

  /**
   * On init
   *
   * @return {void}
   */
  public ngOnInit(): void {
    this.getProfile();
  }

  /**
   * Get profile data
   *
   * @return {void}
   */
  public getProfile(): void {
    this.profile
      .getProfile()
      .subscribe((data: IProfile) => this.profileData = data);
  }

  /**
   * Update profile
   *
   * @returns {void}
   */
  public updateProfile(): void {
    let logo = null;

    if (this.logo) {
      logo = this.logo.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
    }

    this.profile
      .updateProfile(logo)
      .subscribe(() => {
        this.toastrService.success('User profile has been updated successfully.');
      });
  }

  /**
   * Receive img in base64
   *
   * @param {string} base64 - string
   * @returns {void}
   */
  public onImgUploaded(base64) {
    this.logo = base64;
  }

  /**
   * Remove logo
   *
   * @return {void}
   */
  public removeLogo(): void {
    this.profileData.profileImagePath = null;
    this.logo = null;
  }
}
