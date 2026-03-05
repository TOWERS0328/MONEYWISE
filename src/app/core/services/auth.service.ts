import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private STORAGE_KEY = 'moneywise_user';

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {
    this.loadUser();
  }

  async loadUser() {
    const user = await this.storageService.get(this.STORAGE_KEY);
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  // REGISTER
  async register(nombre: string, email: string, password: string): Promise<boolean> {

    const user: User = {
      id: Date.now().toString(),
      nombre,
      email,
      password
    };

    await this.storageService.set(this.STORAGE_KEY, user);
    this.currentUserSubject.next(user);

    return true;
  }

  // LOGIN
  async login(email: string, password: string): Promise<boolean> {

    const storedUser = await this.storageService.get(this.STORAGE_KEY);

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      this.currentUserSubject.next(storedUser);
      return true;
    }

    return false;
  }

  async logout() {
    await this.storageService.remove(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

}
