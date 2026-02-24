import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http = inject(HttpClient)
  public readonly title = 'Dating App';
  protected members= signal<any>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    // this.http.get('https://localhost:5001/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.log(error),
    //   complete: () => console.log('Complated')
      
    // })
  }

  async getMembers(){
    try {
      return await lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
