import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, addDoc, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule, 
    PlayerComponent, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, 
    DialogAddPlayerComponent, 
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  firestore: Firestore = inject(Firestore);
  
  // items$: Observable<any[]>;
  pickCardAnimation:boolean =  false;
  currentCard: string = '';
  game: Game = new Game(); // Initialisiere ein leeres Spiel
  currentDocId: string = '';
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.currentDocId = params['id'];
      collectionData(this.getRef(), { idField: 'id' })
      .subscribe(
        (data: any) => { 
          if (data.length > 0) {
            const gameData = data[0];
            this.game.currentPlayer = gameData.currentPlayer || 0;
            this.game.playedCards = gameData.playedCards || [];
            this.game.players = gameData.players || [];
            this.game.stack = gameData.stack || [];
          }
        },
        (error: any) => {
          console.error('Fehler beim Abrufen der Spieldaten:', error);
        }
      );
    });
  }

  getRef() {
    return collection(this.firestore, 'games');
  }

  newGame() {
    this.game = new Game();
    // this.create(this.game.toJson());
    // console.log(doc(this.getRef(), 'game'));
  }

  async addGame() {
    setDoc(doc(this.getRef()), this.game.toJson());
  }

  create(data: any) {
    return addDoc(this.getRef(), data)
  }

  takeCard() {
    if(!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      console.log('New card: ' + this.currentCard);
      console.log('Game is', this.game);

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false
    }, 1100)
  }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name)
      }
    });
  }
}
