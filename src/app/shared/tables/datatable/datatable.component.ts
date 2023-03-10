import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatatableService } from '../../../core/services/datatable.service';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  @Input() serviceType!: string;
  @Input() columns!: any;

  dtOptions = undefined;
  data: any;

  constructor(
    private dataService: DatatableService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    setTimeout(()=> this.loadOptionsDatatable(), 650);
    setTimeout(() => this.loadConfigFooterDatatable(), 700); 
  }

  loadOptionsDatatable(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: this.translate.instant('DATATABLES'),
      ajax: (dataTablesParameters: any, callback: any) => {
        
        this.dataService.getData(dataTablesParameters, this.serviceType).subscribe((resp: any) => {
          this.data = resp.data
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data.map((item: any) => ({
              ...item, 'botones': null
            }))
          })
          $("tr.odd")?.hide();
          $("tr.even")?.hide();
          if (resp.data.length != 0) {
            document.querySelector(".odd")?.remove();
          }
        })
        
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
          exportOptions: {
            columns: Array.from(Array(this.columns.length).keys())
          }
        }
      ]
    };
  }

  loadConfigFooterDatatable(): void {
    $( ".dataTables_filter label" ).addClass( "d-inline-flex align-items-center" );
    $( "input" ).addClass( "form-control" );
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
