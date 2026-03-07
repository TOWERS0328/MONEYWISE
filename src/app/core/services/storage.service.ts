import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;
  private _ready: Promise<void>;

  constructor(private storage: Storage) {
    this._ready = this.init();
  }

  private async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  private async ready(): Promise<void> {
    await this._ready;
  }

  async set(key: string, value: any) {
    await this.ready();
    return this._storage!.set(key, value);
  }

  async get(key: string) {
    await this.ready();
    return this._storage!.get(key);
  }

  async remove(key: string) {
    await this.ready();
    return this._storage!.remove(key);
  }

  async clear() {
    await this.ready();
    return this._storage!.clear();
  }
}
