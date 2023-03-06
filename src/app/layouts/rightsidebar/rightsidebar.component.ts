import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { LAYOUT_WIDTH, SIDEBAR_TYPE, TOPBAR, LAYOUT_MODE } from '../layouts.model';
import { PreferenceService } from 'src/app/core/services/preference.service';

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

  constructor(private eventService: EventService,
    private PreferencesService: PreferenceService) { }

  ngOnInit() {
    this.width = LAYOUT_WIDTH;
    this.sidebartype = SIDEBAR_TYPE;
    this.topbar = TOPBAR;
    this.mode = LAYOUT_MODE;

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
    this.PreferencesService.savePreferences('topbar',topbar);
    }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout) {
    if (layout.target.checked == true) {
      this.eventService.broadcast('changeLayout', 'vertical');
      this.PreferencesService.savePreferences('layout','vertical');
    }
    else {
      this.eventService.broadcast('changeLayout', 'horizontal');
      this.PreferencesService.savePreferences('layout','horizontal');
    }
  }

  changeWidth(width: string) {
    this.width = width;
    this.eventService.broadcast('changeWidth', width);
    this.PreferencesService.savePreferences('width',width);
  }

  changeSidebartype(sidebar: string) {
    this.sidebartype = sidebar;
    this.eventService.broadcast('changeSidebartype', sidebar);
    this.PreferencesService.savePreferences('sidebar',sidebar);
  }

  changeMode(themeMode: string) {
    this.mode = themeMode;
    this.eventService.broadcast('changeMode', themeMode);
    this.PreferencesService.savePreferences('themeMode',themeMode);
  }
}
