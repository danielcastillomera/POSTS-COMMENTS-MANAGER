import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { I18nService } from './core/services/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, ToastComponent],
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col">
      <app-navbar />
      <main class="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <router-outlet />
      </main>
      <app-toast />
    </div>
  `,
})
export class AppComponent {}
