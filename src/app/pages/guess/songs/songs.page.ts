import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {
  songs: any[] = []; // Inicializa aquí para evitar errores similares
  filteredSongs: any[] = []; // Inicializado como un arreglo vacío
  searchTerm: string = '';

  constructor(
    private router: Router,
    private navbarService: NavBarService,
    public authService: AuthService,
    private fireStore: FirestoreService
  ) {
    this.songs = [
      {
        name: '',
        description: '',
      },
    ];
  }

  ngOnInit() {
    this.navbarService.setTitle('Canciones'); //titulo de la pagina
    this.navbarService.setColor('primary'); //Color del navbar
    this.fireStore.getSongs().subscribe((songs) => {
      this.songs = songs.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredSongs = this.songs; // Asegúrate de que las canciones están siendo copiadas correctamente
    });
  }

  ionViewWillEnter() {
    this.navbarService.setTitle('Canciones');
  }

  //Filtrar canciones
  filterSongs() {
    this.filteredSongs = this.searchTerm
      ? this.songs.filter((song) =>
          song.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.songs;
  }

  //Navegar a la pagina de la cancion con id:
  openSongPage(songId: string) {
    this.router.navigate(['guess/songs/song', songId]);
  }
}
