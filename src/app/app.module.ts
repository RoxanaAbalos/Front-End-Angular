import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { EducationComponent } from './education/education.component';
import { ProjectComponent } from './project/project.component';
import { SkillComponent } from './skill/skill.component';
import { WorkedComponent } from './worked/worked.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FotosComponent } from './banner/fotos/fotos.component';
import { LoginComponent } from './users/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NoopInterceptor } from './models/interceptors/noop-interceptor';
import { AuthInterceptor } from './models/interceptors/auth-interceptor';
import { PerfilService } from './services/perfil.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    EducationComponent,
    ProjectComponent,
    SkillComponent,
    WorkedComponent,
    FotosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgCircleProgressModule.forRoot({})

  ],
  providers: [PerfilService,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
