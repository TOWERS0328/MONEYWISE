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

    // Al registrarse, inicializamos el último ingreso con el momento actual
    const newUser: User = {
      ...user,
      ultimoIngreso: Date.now()
    };

    users.push(newUser);
    this.storage.setItem(USERS_KEY, users);

    return true;
  }
login(email: string, password: string): boolean {
    const users = this.storage.getItem<User[]>(USERS_KEY) || [];

    // Buscamos el índice para poder actualizar el usuario en la lista global
    const userIndex = users.findIndex(u => u.email === email && u.password === password);

    if (userIndex === -1) return false;

    // 1. Actualizamos el timestamp de último ingreso
    users[userIndex].ultimoIngreso = Date.now();

    // 2. Guardamos la lista de usuarios actualizada (para que persista el cambio)
    this.storage.setItem(USERS_KEY, users);

    // 3. Guardamos el usuario en la sesión activa
    const loggedUser = users[userIndex];
    this.storage.setItem(SESSION_KEY, loggedUser);

    // 4. Notificamos al resto de la app
    this.currentUserSubject.next(loggedUser);

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

  updateUserProfile(data: Partial<User>): void {
  const currentUser = this.getCurrentUser();
  if (!currentUser) return;

  const updatedUser = { ...currentUser, ...data };

  // 1. Actualiza la lista global de usuarios (para cuando vuelvas a loguear)
  const users = this.storage.getItem<User[]>(USERS_KEY) || [];
  const index = users.findIndex(u => u.email === updatedUser.email);

  if (index !== -1) {
    users[index] = updatedUser;
    this.storage.setItem(USERS_KEY, users);

    // 2. Actualiza la sesión activa (para que no se quite al recargar)
    this.storage.setItem(SESSION_KEY, updatedUser);

    // 3. Notifica el cambio a toda la app
    this.currentUserSubject.next(updatedUser);
  }
}

}

