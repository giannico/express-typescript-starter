import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'typescript-express-seed-client';

  constructor(private httpClient: HttpClient) {}

  getToken(username: string, password: string) {
    this.httpClient.post('/api/oauth2/token', { username, password })
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
