import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  private translateService = inject(TranslateService);

  constructor(private readonly title: Title) {
    super();
  }

  // Override the updateTitle method to customize the title logic
  override updateTitle(routerState: RouterStateSnapshot): void {
    // Get the title from route data (if defined in the route config)
    const titleKey = this.buildTitle(routerState);

    // Set the document title with a fallback
    if (titleKey) {
      // Translate both the page title and app title
      this.translateService.get([titleKey, 'APP_TITLE_BASE']).subscribe((translations: any) => {
        this.title.setTitle(`${translations['APP_TITLE_BASE']} - ${translations[titleKey]}`);
      });
    } else {
      // Translate only the app title for fallback
      this.translateService.get('APP_TITLE').subscribe((appTitle: string) => {
        this.title.setTitle(appTitle);
      });
    }
  }

  // Optional: Override buildTitle to extract title from route data
  override buildTitle(routerState: RouterStateSnapshot): string | undefined {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data['title'] || undefined;
  }
}