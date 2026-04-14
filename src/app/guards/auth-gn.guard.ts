import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

export const authGuardFn: CanActivateFn = () => {
    const utilSer = inject(UtilsService);
    const router = inject(Router);

    const user = utilSer.get('user');
    if (!user) {
        router.navigate(['/login']);
        return false;
    }
    return true;
}