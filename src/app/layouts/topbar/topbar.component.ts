import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/interfaces/user';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { PreferenceService } from 'src/app/core/services/preference.service';
import { PayloadPereferences } from 'src/app/core/interfaces/payload-preferences';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit, OnDestroy {

  public element;
  public cookieValue;
  public flagvalue;
  public countryName;
  public valueset;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private authService: AuthService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public cookieService: CookieService,
    private localStorageService: LocalStorageService,
    public preferencesService: PreferenceService
  ) { }

  public listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
  ];

  public openMobileMenu: boolean;

  public user: User;
  public payload: PayloadPereferences;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  private subscriptions = new Subscription();

  public imgBrandLarge: string = `${ environment.urlBackend }/images/companies/prodooh.png`;
  public imgBrandShort: string = `${ environment.urlBackend }/images/companies/prodooh.svg`;

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;
    this.cookieValue = this.cookieService.get('lang');    
    this.user = JSON.parse(this.cookieService.get(environment.sessionCookieStorageKey)).user;
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

    this.payload = this.localStorageService.get('payload');
    let lang = this.listLang[this.listLang.findIndex(list => list.lang == this.payload['lang'])];
    this.setLanguage(lang.text,lang.lang,lang.flag);

    this.loadPageBranding();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadPageBranding() {
    let domain = window.location.hostname;
    if (!domain.includes(environment.mainDomain)) {
      let domianSplit = domain.split('.');
      if (domianSplit[0] === 'www') {
        this.imgBrandLarge = `${ environment.urlBackend }/images/companies/${ domianSplit[1] }.png`;
        this.imgBrandShort = `${ environment.urlBackend }/images/companies/${ domianSplit[1] }.svg`;
      } else {
        this.imgBrandLarge = `${ environment.urlBackend }/images/companies/${ domianSplit[0] }.png`;
        this.imgBrandShort = `${ environment.urlBackend }/images/companies/${ domianSplit[0] }.svg`;
      }
    }
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
    this.payload['lang'] = lang; 
    this.localStorageService.set('payload', this.payload);
    this.preferencesService.savePreferences(this.payload); 
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.subscriptions.add(
      this.authService.logout().subscribe({
        next: () => {
          this.cookieService.delete( environment.sessionCookieStorageKey, '/' );
          this.localStorageService.deleteAll();
        },
        complete: () => {
          this.router.navigate(['/account/login']);
        }
      })
    )
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
