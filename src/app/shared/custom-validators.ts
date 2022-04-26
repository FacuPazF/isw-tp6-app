import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import {ValidatorFn} from '@angular/forms';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function isEmpty(value: any): boolean {
  return isNullOrUndefined(value)
    || (typeof value === 'string' && value === '');
}

export class CustomValidators {

  static fromDate(fromDate?: Date): ValidatorFn {
    return (control) => {
      if (isEmpty(control.value) || isEmpty(fromDate)) {
        return null;
      }
      fromDate.setHours(0, 0, 0, 0);

      return (fromDate > control.value) ?
        {
          fromDate: {
            requiredValue: fromDate.toLocaleDateString(),
            actualValue: control.value,
            textValue: 'Debe ser mayor o igual a la fecha'
          }
        } : null;
    };
  }
}
