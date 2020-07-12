import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Province} from '../../../shared/interfaces/province';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ApiService} from '../../../core/services/api.service';
import {catchError, finalize} from 'rxjs/operators';

export class ProvincesDataSource implements DataSource<Province>{

  private provincesSubject = new BehaviorSubject<Province[]>([]);

  public lastPageSubject = new BehaviorSubject<number>(0);

  public totalSubject = new BehaviorSubject<number>(0);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();


  constructor(private apiService: ApiService){}

  loadProvinces(page:number) {

    this.loadingSubject.next(true);

    this.apiService.findAllProvince(page).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(provinces => this.handleRes(provinces));
  }
  handleRes(res){
    this.provincesSubject.next(res.data.provinces.data);
    this.lastPageSubject.next(res.data.provinces.last_page);
    this.totalSubject.next(res.data.provinces.total);
  }

  connect(collectionViewer: CollectionViewer): Observable<Province[]> {
    return this.provincesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.provincesSubject.complete();
    this.loadingSubject.complete();
  }
}
