import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreenComponent } from "./start-screen/start-screen.component";
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, interval, throttle } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartScreenComponent, MatButtonModule, MatIconButton, MatIconModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{




  
  }

