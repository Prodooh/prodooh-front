import { FormGroup, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator() {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('passwordConfirmation');

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}