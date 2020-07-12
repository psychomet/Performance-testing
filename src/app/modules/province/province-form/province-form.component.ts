import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {AppService} from '../../../core/services/app.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-province-form',
  templateUrl: './province-form.component.html',
  styleUrls: ['./province-form.component.scss']
})
export class ProvinceFormComponent implements OnInit {

  @Output() private provinceUpdated = new EventEmitter();

  isEdit: boolean = false;
  isLoading: boolean;
  stFormGroup: FormGroup;

  constructor(
    private apiService: ApiService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    appService.loadingStatus.subscribe(value => this.isLoading = value);
  }

  ngOnInit() {
    this.stFormGroup = this.formBuilder.group({
      title: this.formBuilder.group({
        fa: ['', Validators.required],
        en: ['', Validators.required]
      }),
      country_id: ['', Validators.required]
    });
    this.activatedRoute.params.subscribe(params => {
      if (params.id){
        // this.isEdit = true;
        this.appService.nextLoading(true);
        this.apiService.findOneProvince(params.id).subscribe(
          res => this.handleResById(res),
          err => this.handleErr(err)
        );
      }
    });
  }
  handleResById(res){
    this.appService.nextLoading(false);
    const countryId = this.stFormGroup.get('country_id');
    countryId.clearValidators();
    countryId.disable();
    this.stFormGroup.addControl('is_active', new FormControl(res.data.province.is_active, Validators.required));
    this.isEdit = true;
    // this.stFormGroup.get('is_active').setValue(res.data.province.is_active);
    this.stFormGroup.get('title.fa').setValue(res.data.province.title.fa);
    this.stFormGroup.get('title.en').setValue(res.data.province.title.en);

  }

  onSubmit(){
    const params = this.activatedRoute.snapshot.params;
    const form = this.stFormGroup.value;
    this.isLoading = true;
    if (this.isEdit){
      this.apiService.updateProvince(params.id, form).subscribe(
        res => this.handleResSubmit(res),
        err => this.handleErr(err)
      )
    }else {
      this.apiService.saveProvince(form).subscribe(
        res => this.handleResSubmit(res),
        err =>this.handleErr(err)
      )
    }
  }
  handleResSubmit(res){
    this.appService.nextLoading(false);
    // this.app.handleResponse(res.message);
    this.provinceUpdated.emit(true);
    this.onReset();
  }

  onReset(){
    this.isEdit = false;
    this.stFormGroup.reset();
    this.stFormGroup.removeControl('is_active');
    const countryId = this.stFormGroup.get('country_id');
    countryId.enable();
    countryId.setValidators([Validators.required]);
    this.router.navigateByUrl('/province');
  }
  handleErr(err){
    this.appService.nextLoading(false);
    console.log(err.error);
    this.appService.handleError(err.error.message);
  }

}
