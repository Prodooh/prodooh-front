import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { LAYOUT_WIDTH, SIDEBAR_TYPE, TOPBAR, LAYOUT_MODE, LAYOUT_HORIZONTAL } from '../layouts.model';
import { PreferenceService } from 'src/app/core/services/preference.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { PayloadPereferences } from 'src/app/core/interfaces/payload-preferences';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})

/**
 * Rightsidebar component
 */
export class RightsidebarComponent implements OnInit {

  isVisible: string;
  attribute: string;
  user: any;
  payload: PayloadPereferences;

  constructor (
    private eventService: EventService,
    private preferencesService: PreferenceService,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService
  ) { 
      this.payload = {
        width: LAYOUT_WIDTH,
        mode: LAYOUT_MODE,
        sidebartype: SIDEBAR_TYPE,
        layout: LAYOUT_HORIZONTAL,
        topbar: TOPBAR,
        lang: 'es'
      };
      if(this.localStorageService.get('payload') == null){
        this.localStorageService.set('payload',this.payload);
      } else {
        this.payload = this.localStorageService.get('payload');
      }
    }

  ngOnInit() {
    this.user = JSON.parse(this.cookieService.get(environment.sessionCookieStorageKey)).user;

    Object.entries(this.payload).forEach(([key, value]) => {
      if (key !== 'width') {
        this.eventService.broadcast(key, value);
      }
    });

    this.eventService.broadcast('width', this.payload['width']);

    /**
     * horizontal-vertical layput set
     */
    this.attribute = document.body.getAttribute('data-layout');
    const vertical = document.getElementById('is-layout');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (this.attribute == 'horizontal') {
      vertical.removeAttribute('checked');
    }
  }

  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }

  /**
   * Change Topbar
   */
  changePreference(type: string, value: string| boolean) {
    if(typeof value == "boolean"){
      value = value ? 'vertical' : 'horizontal';
      this.attribute = value;
    }
    this.eventService.broadcast(type, value);
    this.payload[type] = value; 
    this.localStorageService.set('payload', this.payload);
    this.preferencesService.savePreferences(this.payload); 
  }
}
