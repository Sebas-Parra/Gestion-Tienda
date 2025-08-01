import { NgClass, NgIf } from '@angular/common';
import { Component} from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgClass, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
menuAbierto: boolean = false;

toggleMenu(): void {
  this.menuAbierto = !this.menuAbierto;
}


}
