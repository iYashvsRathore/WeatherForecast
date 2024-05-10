import { Component, EventEmitter, Input, OnDestroy, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkyToggleSwitchModule } from '@skyux/forms';
import { SkyNavbarModule } from '@skyux/navbar';
import { SkyDropdownModule } from '@skyux/popovers';
import { SkyTheme, SkyThemeMode } from '@skyux/theme';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, SkyNavbarModule, SkyDropdownModule, SkyToggleSwitchModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent implements OnDestroy {
  @Input() SkyTheme!: SkyTheme;
  @Input() SkyThemeMode!: SkyThemeMode;
  @Output() onThemeChange = new EventEmitter<SkyTheme>;
  @Output() onThemeModeChange = new EventEmitter<SkyThemeMode>;

  dropdownMenuText: string = 'Show Menu';
  dropDownState: boolean = false;

  protected formGroup: FormGroup<{
    theme: FormControl<boolean | null>,
    darkMode: FormControl<boolean | null>
  }>;
  #ngUnsubscribe = new Subject<void>();

  constructor() {
    this.formGroup = inject(FormBuilder).group({
      theme: new FormControl(true),
      darkMode: new FormControl(false),
    });

    this.formGroup.get('theme')
      ?.valueChanges.pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe((value) => {
        if (value) {
          this.SkyTheme = SkyTheme.presets.modern;
        } else {
          this.SkyTheme = SkyTheme.presets.default;
        }
        this.onThemeChange.emit(this.SkyTheme);
      });

      this.formGroup.get('darkMode')
      ?.valueChanges.pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe((value) => {
        if (value) {
          this.SkyThemeMode = SkyThemeMode.presets.dark;
        } else {
          this.SkyThemeMode = SkyThemeMode.presets.light;
        }
        this.onThemeModeChange.emit(this.SkyThemeMode);
      });
  }
  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }

  protected onDropdownItemClick(buttonText: string): void {
    alert(buttonText + ' button clicked from Dropdown Menu!');
  }

  protected onMenuClick(): void {
    if (this.dropDownState) {
      this.dropdownMenuText = 'Hide Menu';
    }
    else {
      this.dropdownMenuText = 'Show Menu';
    }
  }
}
