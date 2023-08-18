import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  setItem(key: string, value: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error while storing '${key}' in session storage:`, error);
    }
  }

  getItem(key: string): any {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(
        `Error while retrieving '${key}' from session storage:`,
        error
      );
      return null;
    }
  }

  removeItem(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error while removing '${key}' from session storage:`,
        error
      );
    }
  }
}
