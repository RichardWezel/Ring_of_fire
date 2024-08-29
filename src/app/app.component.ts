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
export class AppComponent implements OnInit{
  title = 'ringoffire';

  timer = new BehaviorSubject<number>(0);

  ngOnInit() {
    this.timer
    .pipe(throttle(val => interval(2000)))
    .subscribe((timepassed) => {
      console.log(timepassed);

    });

   setInterval(() => {
    let newValue = this.timer.value + 1000;
    this.timer.next(newValue)
   }, 100)
  }
}
