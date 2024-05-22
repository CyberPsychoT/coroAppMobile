import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { Song } from 'src/app/interfaces/song';
import { Location } from '@angular/common';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  song: Song | undefined;
  //Lista visualizacion
  openSections = {
    introduction: true,
    letter1: true,
    interlude: true,
    letter2: true,
    end: true,
    label: false,
    video: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private navbarService: NavBarService,
    private location: Location,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.navbarService.setTitle(''); //titulo de la pagina
    this.navbarService.setColor('primary'); //Color del navbar
    this.activatedRoute.params.subscribe((params) => {
      const songId = params['id'];
      this.loadSong(songId);
    });
  }

  loadSong(songId: string) {
    this.firestoreService.getSongById(songId).subscribe((song) => {
      this.song = song;
      if (song && song.name) {
        // Asegúrate de que el nombre de la canción esté disponible
        this.navbarService.setTitle(song.name); // Actualiza el título con el nombre de la canción
      } else {
        this.navbarService.setTitle(''); // Título por defecto o de respaldo
      }
    });
  }

  goToBack() {
    this.location.back();
  }
}
