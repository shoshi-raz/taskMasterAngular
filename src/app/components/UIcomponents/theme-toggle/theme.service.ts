// ==========================================
// 🌓 THEME SERVICE - Dark Mode Management
// ==========================================

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal for reactive theme state
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Initialize theme from localStorage or system preference
    this.initializeTheme();
  }

  /**
   * Initialize theme on app startup
   */
  private initializeTheme(): void {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }

    // Apply the theme
    this.applyTheme();

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.isDarkMode.set(e.matches);
          this.applyTheme();
        }
      });
  }

  /**
   * Toggle between light and dark mode
   */
  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * Set specific theme
   */
  setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * Apply theme to document body
   */
  private applyTheme(): void {
    const body = document.body;
    
    if (this.isDarkMode()) {
      body.classList.add('dark-theme');
      body.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      body.classList.remove('dark-theme');
      body.setAttribute('data-theme', 'light');
      document.documentElement.style.colorScheme = 'light';
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveTheme(): void {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }

  /**
   * Get current theme as string
   */
  getCurrentTheme(): 'light' | 'dark' {
    return this.isDarkMode() ? 'dark' : 'light';
  }

  /**
   * Clear saved theme preference (use system default)
   */
  clearSavedTheme(): void {
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(prefersDark);
    this.applyTheme();
  }
}
