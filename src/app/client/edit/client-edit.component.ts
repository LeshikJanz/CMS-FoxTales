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
import { CustomValidators } from 'ng2-validation';
import { IClient } from '../client.interface';
import { IClientLicense } from '../client-license.interface';
import { ClientService } from '../client.service';

/**
 * Client details component
 */
@Component({
  selector: 'client-edit',
  templateUrl: './client-edit.component.html'
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
    displayName: null,
    email: null,
    address: null,
    phone: null,
    freshBooks: null,
    socialAccounts: null
  };

  /**
   * Client licenses
   *
   * @type {IClientLicense[]}
   */
  public licenses: IClientLicense[];

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
          return this.router.navigate(['/clients']);
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
        Validators.required
      ]],
      displayName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        CustomValidators.email
      ]],
      address: this.addressControl,
      phone: ['', [
        Validators.required
      ]],
      freshBooks: ['', [
        Validators.required
      ]],
      socialAccounts: new FormArray([])
    });

    return this;
  }
}
