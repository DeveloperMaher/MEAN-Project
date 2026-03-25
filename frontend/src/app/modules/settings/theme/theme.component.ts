import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-theme',
  imports: [NgClass],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ThemeComponent{

   isDark = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDarkMode();
  }

  toggleMode() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDarkMode();
  }

}
