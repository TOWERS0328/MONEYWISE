import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { StorageService } from './storage';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private storage: StorageService) {
    this.loadSession();
  }

  private loadSession(): void {
    const user = this.storage.getItem<User>(SESSION_KEY);
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  register(user: User): boolean {
    const users = this.storage.getItem<User[]>(USERS_KEY) || [];

    const exists = users.find(u => u.email === user.email);
    if (exists) return false;

    users.push(user);
    this.storage.setItem(USERS_KEY, users);

    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.storage.getItem<User[]>(USERS_KEY) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return false;

    this.storage.setItem(SESSION_KEY, user);
    this.currentUserSubject.next(user);

    return true;
  }

  logout(): void {
    this.storage.removeItem(SESSION_KEY);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
