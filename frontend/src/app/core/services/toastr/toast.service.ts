import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

 constructor(private toaster : ToastrService) { }

  showInfoMsg(msg: string) {
    this.toaster.info(msg, 'Info');
  }
  
  showsSuccessMsg(msg: string) {
    this.toaster.success(msg, 'Success');
  }

  showsErrorMsg(msg: string) {
    this.toaster.error(msg, 'Error');
  }

  showsWarningMsg(msg: string, title: string = 'Warning', opts: Partial<IndividualConfig> = {}) : ActiveToast<any>{
    return this.toaster.warning(msg, title,{
      enableHtml: true,   
      ...opts
    });
  }
}
