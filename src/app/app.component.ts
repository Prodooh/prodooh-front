import { Component , OnInit} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe( {
      next(langChangeEvent: LangChangeEvent) {
        this.translate.use(langChangeEvent.lang);
      }
    })
  }
}
