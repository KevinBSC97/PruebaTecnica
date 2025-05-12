import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const usuario = localStorage.getItem('usuario');

  if(token && usuario){
    const parsed = JSON.parse(usuario);
    const rol = parsed?.rol;

    const redirectTo = rol === 'ANALISTA' ? '/analista' : '/solicitante';

    const router = inject(Router);
    router.navigate([redirectTo]);
    return false;
  }
  return true;
};
