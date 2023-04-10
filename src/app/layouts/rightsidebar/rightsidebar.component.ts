import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { LAYOUT_WIDTH, SIDEBAR_TYPE, TOPBAR, LAYOUT_MODE } from '../layouts.model';
import { PreferenceService } from 'src/app/core/services/preference.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { payloadPereferences } from 'src/app/core/interfaces/payload-preferences';
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

  width: string;
  sidebartype: string;
  mode: string;
  topbar: string;
  user: any;
  payload: payloadPereferences;

  constructor(private eventService: EventService,
    private PreferencesService: PreferenceService,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.payload = this.localStorageService.get('payload');
    this.width = this.payload.changeWidth ?? LAYOUT_WIDTH;
    this.sidebartype = this.payload.changeSidebartype ?? SIDEBAR_TYPE;
    this.topbar = this.payload.changeTopbar ?? TOPBAR;
    this.mode = this.payload.changeMode ?? LAYOUT_MODE;
    this.user = JSON.parse(this.cookieService.get(environment.sessionCookieStorageKey)).user;
  
    Object.entries(this.payload).forEach(([key, value]) => {
      this.eventService.broadcast(key, value);
    });
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
  changeTopbar(topbar: string) {
    this.topbar = topbar;
    this.eventService.broadcast('changeTopbar', topbar);
    this.PreferencesService.savePreferences('changeTopbar', topbar);
    this.localStorageService.setValue('payload', 'changeTopbar', topbar);
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout) {
    if (layout.target.checked == true) {
      this.eventService.broadcast('changeLayout', 'vertical');
      this.PreferencesService.savePreferences('changeLayout', 'vertical');
      this.localStorageService.setValue('payload', 'changeLayout', 'vertical');
    }
    else {
      this.eventService.broadcast('changeLayout', 'horizontal');
      this.PreferencesService.savePreferences('changeLayout', 'horizontal');
      this.localStorageService.setValue('payload', 'changeLayout', 'horizontal');
    }
  }

  changeWidth(width: string) {
    this.width = width;
    this.eventService.broadcast('changeWidth', width);
    this.PreferencesService.savePreferences('changeWidth', width);
    this.localStorageService.setValue('payload', 'changeWidth', width);
  }

  changeSidebartype(sidebar: string) {
    this.sidebartype = sidebar;
    this.eventService.broadcast('changeSidebartype', sidebar);
    this.PreferencesService.savePreferences('changeSidebartype', sidebar);
    this.localStorageService.setValue('payload', 'changeSidebartype', sidebar);
  }

  changeMode(themeMode: string) {
    this.mode = themeMode;
    this.eventService.broadcast('changeMode', themeMode);
    this.PreferencesService.savePreferences('changeMode', themeMode);
    this.localStorageService.set('payload',{...this.payload,changeMode: themeMode});
  }
}
