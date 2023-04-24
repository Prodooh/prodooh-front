import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: string[] = ['en', 'es'];

  constructor(public translate: TranslateService, private cookieService: CookieService) {
    let browserLang;
    this.translate.addLangs(this.languages);
    if (this.cookieService.check('lang')) {
      browserLang = this.cookieService.get('lang');
    }
    else {
      this.setLanguage('es');
      browserLang = translate.getBrowserLang();
    }
    translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  public setLanguage(lang) {
    this.translate.use(lang);
    this.cookieService.set('lang', lang,15,'/');
  }

}
