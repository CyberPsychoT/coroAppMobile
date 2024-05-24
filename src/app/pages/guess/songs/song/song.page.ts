import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { Song } from 'src/app/interfaces/song';
import { Location } from '@angular/common';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  song: Song | undefined;
  sections: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navbarService: NavBarService,
    private location: Location,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private configService: ConfigService,
  ) {}

  ngOnInit() {
    this.navbarService.setTitle(''); // Título de la página
    this.navbarService.setColor('primary'); // Color del navbar
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
      this.initializeSections(); // Inicializa las secciones después de cargar la canción
    });
  }

  initializeSections() {
    if (this.song) {
      this.sections = [
        { name: 'Introducción', content: this.song.introduction, open: true },
        { name: 'Letra y acordes', content: this.song.letter1, open: true },
        { name: 'Interludio', content: this.song.interlude, open: true },
        { name: 'Letra y acordes', content: this.song.letter2, open: true },
        { name: 'Final', content: this.song.end, open: true },
        { name: 'Etiqueta', content: this.song.label, open: false },
        { name: 'Vídeo', content: '', open: false }, // Asume que el vídeo está vacío
      ];
    }
  }

  goToBack() {
    this.location.back();
  }
}
