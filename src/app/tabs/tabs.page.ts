import { Component, OnInit } from '@angular/core';
import { Auth } from '../core/services/auth.service';
import { User } from '../core/model/user.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  userName: string = '';

  constructor(private auth: Auth) {}

  ngOnInit() {

    this.auth.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.nombre;
      }

    });

  }

}
