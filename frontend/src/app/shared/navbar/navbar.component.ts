import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUsuario: string = '';
  rol: string = '';
  menuItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuarioJson = localStorage.getItem('usuario');
    if(usuarioJson){
      try{
        const usuario = JSON.parse(usuarioJson);
        this.nombreUsuario = usuario.nombre;
        this.rol = usuario.rol;
      } catch {
        this.nombreUsuario = 'Usuario';
        this.rol = '';
      }
    }

    this.menuItems = [
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
