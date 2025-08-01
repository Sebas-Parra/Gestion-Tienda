import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // asegúrate que esto exista
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)  // ✅ esto es lo que provee ActivatedRoute, RouterLink, etc.
  ]
}).catch(err => console.error(err));
