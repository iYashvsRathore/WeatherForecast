import { Component, Renderer2, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SkyTheme, SkyThemeMode, SkyThemeService, SkyThemeSettings } from '@skyux/theme';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavBarComponent],
  providers: [SkyThemeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  protected currentTheme: SkyTheme = SkyTheme.presets.modern;
  protected currentThemeMode : SkyThemeMode = SkyThemeMode.presets.light;

  constructor(private renderer: Renderer2, private themeSvc: SkyThemeService) {
    this.changeTheme();
  }

  private changeTheme(): void {
    this.themeSvc.init(
      document.body,
      this.renderer,
      new SkyThemeSettings(
        this.currentTheme,
        this.currentThemeMode
      )
    );
  }
  protected onThemeChange(newTheme: SkyTheme): void{
    this.currentTheme = newTheme;
    this.changeTheme();
  }

  protected onThemeModeChange(newThemeMode: SkyThemeMode): void{
    this.currentThemeMode = newThemeMode;
    this.changeTheme();
  }

}
