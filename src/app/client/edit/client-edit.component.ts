import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import {  } from '@types/googlemaps';
import hello from 'hellojs';
import { CustomValidators } from 'ng2-validation';
import { IClient, IClientSocial } from '../client.interface';
import { IClientLicense } from '../client-license.interface';
import { ClientService } from '../client.service';

/**
 * Client details component
 */
@Component({
  selector: 'client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: [ './client-edit.component.scss',
    '../../shared/styles/form-element.scss']
})
export class ClientEditComponent implements OnInit {
  /**
   * Client form
   *
   * @type {FormGroup}
   */
  public clientForm: FormGroup;

  /**
   * Address field
   *
   * @type {FormControl}
   */
  public addressControl: FormControl = new FormControl();

  /**
   * Address element ref
   *
   * @type {ElementRef}
   */
  @ViewChild('address')
  public addressElementRef: ElementRef;

  /**
   * Client
   *
   * @type {IClient}
   */
  public client: IClient = {
    logo: null,
    logoBytes: null,
    name: null,
    email: null,
    address: null,
    phone: null,
    freshBooks: null,
    socialAccounts: null
  };

  /**
   * Base64 logo
   *
   * @type {string}
   */
  public logoBytes: string;

  /**
   * Client licenses
   *
   * @type {IClientLicense[]}
   */
  public licenses: IClientLicense[];

  public socialIntegrations: IClientSocial[] = [
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Twitter' },
    { id: 5, name: 'Tumblr' }
  ];

  /**
   * File reader
   *
   * @type {FileReader}
   */
  private fileReader: FileReader = new FileReader();

  /**
   * Constructor
   *
   * @param {MapsAPILoader} mapsAPILoader - Maps API loader
   * @param {NgZone} ngZone - Zone
   * @param {Router} router - Router
   * @param {ActivatedRoute} route - Activated route
   * @param {FormBuilder} formBuilder - Form builder
   * @param {ToastrService} toastrService - Toastr service
   * @param {ClientService} clientService - Client service
   * @returns {void}
   */
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private clientService: ClientService
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this
      .initFileReader()
      .initAddressSearch()
      .buildClientForm();

    this.route.params.subscribe((params: any) => {
      this.getClient(params['id']);
    });
  }

  /**
   * Get social account controls
   *
   * @returns {FormArray} - Array of controls
   */
  get socialAccounts(): FormArray {
    return this.clientForm.get('socialAccounts') as FormArray;
  }

  /**
   * Recieve img in base64
   *
   * @param {string} base64 - string
   * @returns {void}
   */
  public onImgUploaded(base64) {
    this.logoBytes = base64;
    this.client.logoBytes = base64.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
  }

  /**
   * Add new social account control
   *
   * @param {string} url - Account url
   * @returns {void}
   */
  public addSocialAccount(url?: string): void {
    const accountUrl = url || '';
    this.socialAccounts.push(new FormControl(accountUrl, Validators.required));
  }

  /**
   * Remove social account control
   *
   * @param {number} index - Index
   * @returns {void}
   */
  public removeSocialAccount(index: number): void {
    this.client.socialAccounts.splice(index, 1);
    this.socialAccounts.removeAt(index);
  }

  /**
   * Add client social accounts
   *
   * @param {IClient} client - Client
   * @returns {void}
   */
  public addSocialAccounts(client: IClient): void {
    client.socialAccounts.forEach((url: string) => {
      this.addSocialAccount(url);
    });
  }

  /**
   * Get client by id
   *
   * @param {string} id - Client id
   * @returns {void|Promise<boolean>}
   */
  public getClient(id: string): void|Promise<boolean> {
    this.clientService
      .getClient(id)
      .subscribe((client: IClient) => {
        // Redirect to the client list if no client
        if (!client) {
          return this.router.navigate(['/admin/clients']);
        }

        this.client = client;

        this.addSocialAccounts(client);
        this.getLicenses();
      });
  }

  /**
   * Update licenses
   *
   * @returns {void}
   */
  public getLicenses(): void {
    this.clientService
      .getClientLicenses()
      .subscribe((licenses: IClientLicense[]) => {
        // Check selected licenses
        if (this.client.selectedLicenses) {
          licenses.forEach((license: IClientLicense) => {
            license.checked = -1 !== this.client.selectedLicenses.indexOf(license.id);
          });
        }

        this.licenses = licenses;
      });
  }

  /**
   * Update client
   *
   * @returns {void}
   */
  public updateClient(): void {
    this.extractLicenses();

    this.clientService
      .updateClient(this.client)
      .subscribe(() => {
        this.toastrService.success('Client has been updated successfully.');
        this.router.navigate(['/admin/clients']);
      });
  }

  /**
   * Extract selected licenses
   *
   * @returns {void}
   */
  public extractLicenses(): void {
    this.client.selectedLicenses =  this.licenses
      .filter((license: IClientLicense) => license.checked)
      .map((license: IClientLicense) => license.id);
  }

  /**
   * Select license
   *
   * @param {number} index - Index
   * @param {boolean} state - Is checked?
   * @returns {void}
   */
  public selectLicense(index: number, state: boolean): void {
    this.licenses[index].checked = state;
  }

  /**
   * Extract logo base64 encoded
   *
   * @param {Event} event - Event
   * @return {void}
   */
  public extractLogo(event: Event): void {
    const files: FileList = event.target['files'];

    if (!files.length) {
      return;
    }

    this.fileReader.readAsDataURL(files.item(0));
  }

  /**
   * Remove logo
   *
   * @return {void}
   */
  public removeLogo(): void {
    this.logoBytes = null;
    this.client.logo = null;
    this.client.logoBytes = null;
  }

  /**
   * Extract location details
   *
   * @param {google.maps.places.PlaceResult} place - Place results
   * @returns {void}
   */
  public extractLocation(place: google.maps.places.PlaceResult): void {
    const CITY = 'locality';
    const STATE = 'administrative_area_level_1';

    this.addressControl.patchValue(place.formatted_address);

    place.address_components.forEach((component: google.maps.GeocoderAddressComponent) => {
      const type: string = component.types.shift();
      const name: string = component.long_name;

      switch (type) {
        case CITY:
          this.client.city = name;
          break;
        case STATE:
          this.client.state = name;
          break;
        default:
          break;
      }
    });
  }

  /**
   * Prepare file reader
   *
   * @returns {ClientEditComponent} - Component
   */
  public initFileReader(): ClientEditComponent {
    this.fileReader.onload = () => {
      const result = this.fileReader.result;

      if (result) {
        this.client.logoBytes = this.fileReader.result;
      }
    };

    return this;
  }

  /**
   * Init address autocomplete
   *
   * See: https://developers.google.com/maps/documentation/javascript/places-autocomplete
   *
   * @return {ClientEditComponent} - Component
   */
  public initAddressSearch(): ClientEditComponent {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (undefined === place.geometry || null === place.geometry) {
            return;
          }

          this.extractLocation(place);
        });
      });
    });

    return this;
  }

  /**
   * Build client form
   *
   * @returns {ClientEditComponent} - Component
   */
  public buildClientForm(): ClientEditComponent {
    this.clientForm = this.formBuilder.group({
      logoBytes: [''],
      name: ['', [
        Validators.required,
        Validators.pattern('^\\S*')
      ]],
      email: ['', [
        Validators.required,
        CustomValidators.email
      ]],
      address: this.addressControl,
      phone: ['', [
        Validators.required,
        Validators.pattern('^\\S*')
      ]],
      freshBooks: ['', [
        Validators.required,
        Validators.pattern('^\\S*')
      ]],
      socialAccounts: new FormArray([])
    });

    return this;
  }

  /**
   * Social auth
   *
   * @param {IClientSocial} social - Social account
   * @returns {void}
   */
  public auth(social: IClientSocial): void {
    const name: string = social.name.toLocaleLowerCase();

    hello(name)
      .login({ scope: 'publish, photos' }, () => {
        const response = hello(name).getAuthResponse();

        if (!response) {
          return;
        }

        this.clientService
          .addSocialIntegration(social.id, name, JSON.stringify(response))
          .subscribe(() => {
            this.toastrService.success('Social auth has been updated successfully.');
          });
      });
  }

  public cancelAuth(social: IClientSocial): void {
    const name: string = social.name.toLocaleLowerCase();

    hello.logout(name, { force: true }, () => {
      this.clientService
        .addSocialIntegration(social.id, name, null)
        .subscribe(() => {
          this.toastrService.success('Social auth has been removed successfully.');
        });
    });
  }
}
