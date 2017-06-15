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
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import {  } from '@types/googlemaps';
import * as moment from 'moment';
import { IClient } from '../client.interface';
import { IClientLicense } from '../client-license.interface';
import { ClientService } from '../client.service';

@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: [ './client-create.component.scss' ]
})
export class ClientCreateComponent implements OnInit {
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
   * Client licenses
   *
   * @type {IClientLicense[]}
   */
  public licenses: IClientLicense[];

  /**
   * Additional client details
   *
   * @type {any}
   */
  public clientDetails: any = {
    logoBytes: null,
    city: null,
    state: null,
    selectedLicenses: []
  };

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
   * @param {ToastrService} toastrService - Toastr service
   * @param {FormBuilder} formBuilder
   * @param {ClientService} clientService - Client service
   * @returns {void}
   */
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
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
      .buildClientForm()
      .getClientLicenses();
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
   * Add new social account control
   *
   * @returns {void}
   */
  public addSocialAccount(event): void {
    this.socialAccounts.push(new FormControl('', Validators.required));
    event.preventDefault();
  }

  /**
   * Remove social account control
   *
   * @param {number} index - Index
   * @returns {void}
   */
  public removeSocialAccount(index: number): void {
    this.socialAccounts.removeAt(index);
  }

  /**
   * Get client licenses
   *
   * @returns {void}
   */
  public getClientLicenses(): void {
    this.clientService
      .getClientLicenses()
      .subscribe((licenses: IClientLicense[]) => this.licenses = licenses);
  }

  /**
   * Add new client
   *
   * @param {IClient} client - Client
   * @returns {void}
   */
  public addClient(client: IClient): void {
    this.extractLicenses();

    this.clientService
      .addClient({ ...client, ...this.clientDetails })
      .subscribe((response: any) => {
        if (response.success) {
          this.toastrService.success('Client has been created successfully.');
          this.router.navigate(['/admin/clients']);
        } else {
          this.toastrService.error(response.message);
        }
      });
  }

  /**
   * Extract selected licenses
   *
   * @returns {void}
   */
  public extractLicenses(): void {
    this.clientDetails.selectedLicenses = this.licenses
      .filter((license: IClientLicense) => license.checked)
      .map((license: IClientLicense) => license.id);
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
    this.clientDetails.logoBytes = null;
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
          this.clientDetails.city = name;
          break;
        case STATE:
          this.clientDetails.state = name;
          break;
        default:
          break;
      }
    });
  }

  /**
   * Prepare file reader
   *
   * @returns {ClientCreateComponent} - Component
   */
  public initFileReader(): ClientCreateComponent {
    this.fileReader.onload = () => {
      this.clientDetails.logoBytes =
        this.fileReader.result.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
    };

    return this;
  }

  /**
   * Init address autocomplete
   *
   * See: https://developers.google.com/maps/documentation/javascript/places-autocomplete
   *
   * @return {ClientCreateComponent} - Component
   */
  public initAddressSearch(): ClientCreateComponent {
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
   * Receive img in base64
   *
   * @param {string} base64 - string
   * @returns {void}
   */
  public onImgUploaded(base64) {
    this.logoBytes = base64;
    this.clientDetails.logoBytes = base64.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
  }

  /**
   * Build client form
   *
   * @returns {ClientCreateComponent} - Component
   */
  public buildClientForm(): ClientCreateComponent {
    this.clientForm = this.formBuilder.group({
      logoBytes: [''],
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        CustomValidators.email
      ]],
      address: this.addressControl,
      phone: ['', ],
      freshBooks: ['', ],
      socialAccounts: new FormArray([])
    });

    return this;
  }
}
