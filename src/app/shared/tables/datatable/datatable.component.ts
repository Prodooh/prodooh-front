import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatatableService } from '../../../core/services/datatable.service';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  @Input() serviceType!: string;
  @Input() columns!: any;

  dtOptions = undefined;
  data: any;
  private subscriptions = new Subscription();

  constructor(
    private dataService: DatatableService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => this.loadOptionsDatatable(), 650);
    setTimeout(() => this.loadConfigFooterDatatable(), 700);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeState(){
    window.location.reload();
  }

  loadOptionsDatatable(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      stateSave: true,
      stateDuration: 600,
      stateRestore: true,
      language: this.translate.instant('DATATABLES'),
      ajax: (dataTablesParameters: any, callback: any) => {

        this.subscriptions.add(this.dataService.getData(dataTablesParameters, this.serviceType).subscribe((resp: any) => {
          this.data = resp.data
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data.map((item: any) => ({
              ...item, 'buttons': null
            }))
          })
          $("tr.odd")?.hide();
          $("tr.even")?.hide();
          if (resp.data.length != 0) {
            document.querySelector(".odd")?.remove();
          }
        }));

      },
      columns: this.columns.map(
        (column: any) => ({ data: column })
      ),
      dom: 'lBfrtip',
      buttons: [
        {
          extend: 'copy',
          className: 'btn btn-outline-primary'
        },
        {
          extend: 'excel',
          className: 'btn btn-outline-primary',
          title: `Export_${this.serviceType}_${Date.now()}`,
          exportOptions: {
            columns: Array.from(Array(this.columns.length).keys())
          }
        }
      ]
    };
  }

  loadConfigFooterDatatable(): void {
    $(".dataTables_filter label").addClass("d-inline-flex align-items-center");
    $(".dataTables_filter input").addClass("form-control");
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).keyup(function (e) {
          if (e.keyCode == 13) {
            $(this).trigger("enterKey");
            let test: string = this['value' as keyof HTMLElement]?.toString() ?? '';
            if (that.search() !== test) {
              that
                .search(test)
                .draw();
            }
          }
        });
      });
    });
  }

}
