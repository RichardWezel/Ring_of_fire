import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router) {
   
   
  }

  newGame() {
    // Start game
    this.router.navigateByUrl('/game');
  }
}


