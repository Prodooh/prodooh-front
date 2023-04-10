import { Component , OnInit} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { EventService } from './core/services/event.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    private eventService: EventService

  ) {}

  ngOnInit() {
    let user = JSON.parse(this.cookieService.get(environment.sessionCookieStorageKey)).user;
    let payload = user.payload;
    localStorage.setItem('payload', JSON.stringify(payload));
    this.translate.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.translate.use(langChangeEvent.lang);
    })
  }
}
