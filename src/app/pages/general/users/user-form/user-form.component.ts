import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { User } from 'src/app/core/interfaces/user';
import { UserProfileService } from 'src/app/core/services/user.service';
import { User as UserModel } from 'src/app/core/models/auth.models';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/core/services/base.service';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  type: string = 'component';

  @Input() typeAction: string;

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  // Subscribers
  private subscriptions = new Subscription();

  userForm: FormGroup;
  submitted = false;

  companies: [];
  countries: [];
  roles: any[];

  authenticatedUser: User;

  files: File[] = [];
  config: DropzoneConfigInterface;

  loadedImageName: string;

  newUser: UserModel;
  userToUpdate: User;
  userToUpdateImage: string;

  constructor(
    private usersService: UserProfileService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private alertsService: SweetAlertService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.authenticatedUser = JSON.parse(this.cookieService.get(environment.sessionCookieStorageKey)).user;
    
    this.config = {
      url: `${environment.urlBackend}/uploads/users`,
      maxFilesize: 100,
      acceptedFiles: 'image/*',
      maxFiles: 1,
      // headers: {
      //   Authorization: `${ this.authenticatedUser?.token_type } ${ this.authenticatedUser?.access_token }`
      // },
    };
    this.userForm = this.formBuilder.group({
      company: ['',],
      country: ['',],
      name: ['', [Validators.required, Validators.minLength(2)]],
      surnames: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required, Validators.min(1)]],
    });

    //this.getCompanies();
    //this.getCountries();
    this.loadRoles();

    //   if (this.typeAction === 'update') {
    //     this.subscriptions.add(this.store.select( 'user' ).subscribe( ({selectedUser}) => {
    //       if (selectedUser) {
    //         this.userToUpdate = selectedUser;
    //         this.setUser();
    //         this.userForm.get('password').setValidators([Validators.minLength(8)]);
    //         this.userForm.get('password').updateValueAndValidity();
    //       } else {
    //         this.router.navigateByUrl('/directory');
    //       }
    //     }));
    //   }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  // getCompanies() {
  //   this.subscriptions.add(this.companiesService.getAllCompanies().subscribe( companies => this.companies = companies));
  // }

  // getCountries() {
  //   this.subscriptions.add(this.countriesService.getCountries().subscribe( countries => this.countries = countries ));
  // }

  loadedImage(event) {
    console.log("entro");
    console.log(event);
    this.loadedImageName = event[1];
    console.log(this.loadedImageName);
    
  }

  loadRoles() {
    switch (this.authenticatedUser.roles[0].name) {
      case 'superadministrator':
        this.roles = [
          { id: 1, value: 'superadministrator' },
          { id: 2, value: 'administrator' },
          { id: 3, value: 'salesmanager' },
          { id: 4, value: 'administratorprovider' },
          { id: 5, value: 'sellercosts' },
          { id: 6, value: 'seller' },
          { id: 7, value: 'customercosts' },
          { id: 8, value: 'customer' },
          { id: 9, value: 'suspended' },
        ];
        break;
      case 'administrator':
        this.roles = [
          { id: 2, value: 'administrator' },
          { id: 3, value: 'salesmanager' },
          { id: 4, value: 'administratorprovider' },
          { id: 5, value: 'sellercosts' },
          { id: 6, value: 'seller' },
          { id: 7, value: 'customercosts' },
          { id: 8, value: 'customer' },
          { id: 9, value: 'suspended' },
        ];
        break;
      case 'salesmanager':
        this.roles = [
          { id: 5, value: 'sellercosts' },
          { id: 6, value: 'seller' },
          { id: 7, value: 'customercosts' },
          { id: 8, value: 'customer' },
          { id: 9, value: 'suspended' },
        ];
        break;
      case 'sellercosts':
        this.roles = [
          { id: 7, value: 'customercosts' },
          { id: 8, value: 'customer' },
          { id: 9, value: 'suspended' },
        ];
        break;
      case 'seller':
        this.roles = [
          { id: 8, value: 'customer' },
          { id: 9, value: 'suspended' },
        ];
        break;
      default:
        this.roles = [
          { id: 8, value: 'customer' },
          { id: 9, value: 'suspended' },
        ];
        break;
    }
  }
  /*
    deleteImage() {
      if ( this.loadedImageName ) {
        this.subscriptions.add(this.usersService.deleteImage( this.loadedImageName ).subscribe( () => {
          if (this.type === 'directive' && this.directiveRef) {
            this.directiveRef.reset();
          } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
            this.componentRef.directiveRef.reset();
          }
          this.loadedImageName = undefined;
          this.files = [];
        }));
      }
    }*/

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) { return; }

    this.newUser = new UserModel(
      this.f.country.value || undefined,
      this.f.name.value,
      this.f.surnames.value,
      this.f.email.value,
      this.f.role.value,
      this.f.company.value
    );

    if (this.loadedImageName) {
      this.newUser.image = this.loadedImageName;
    }

    this.subscriptions.add(this.usersService.addUser(this.newUser).subscribe(resp => {
      this.alertsService.alert(
        this.translate.instant('user.userCreated'),
        this.translate.instant('user.userCreatedSuccessfully'),
        'success'
      );
      this.userForm.reset();
      this.submitted = false;
      this.loadedImageName = undefined;
      if (this.type === 'directive' && this.directiveRef) {
        this.directiveRef.reset();
      } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
        this.componentRef.directiveRef.reset();
      }
      this.files = [];
    }, (error => {
      if (error.error.errors.email) {
        this.alertsService.alert(
          this.translate.instant('errors.invalidEmail'),
          this.translate.instant('errors.emailInUse'),
          'error'
        );
      } else {
        this.alertsService.alert(
          this.translate.instant('Error'),
          this.translate.instant('Error'),
          'error'
        );
      }
    })));
  }

}

  // deleteImageUser() {
  //   this.subscriptions.add(this.usersService.deleteImageUser( this.userToUpdate.id ).subscribe( () => {
  //     this.userToUpdateImage = null;
  //   }));
  // }




