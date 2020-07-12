import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProvincesDataSource} from './services/provinces.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../core/services/api.service';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {AppService} from '../../core/services/app.service';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: ProvincesDataSource;
  displayedColumns= ["position", "en", "fa","created_at","ctrl"];

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              public appService: AppService) {}

  ngOnInit() {
    this.dataSource = new ProvincesDataSource(this.apiService);
    this.dataSource.loadProvinces(this.paginator.pageIndex + 1);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadProvincesPage())
      )
      .subscribe();
  }

  loadProvincesPage() {
    if (this.dataSource.lastPageSubject.getValue() > this.paginator.pageIndex)
    this.dataSource.loadProvinces(this.paginator.pageIndex + 1);
  }

}
