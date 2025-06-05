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
  songs: any[] = []; // Inicializado como un arreglo vacío
  filteredSongs: any[] = []; // Inicializado como un arreglo vacío
  searchTerm: string = '';

  constructor(
    private router: Router,
    private navbarService: NavBarService,
    public authService: AuthService,
    private fireStore: FirestoreService
  ) {
    // No es necesario inicializar con un objeto vacío aquí si se carga en ngOnInit
  }

  ngOnInit() {
    this.navbarService.setTitle('Canciones'); //titulo de la pagina
    this.navbarService.setColor('primary'); //Color del navbar
    this.fireStore.getSongs().subscribe((songs) => {
      // Ordena las canciones por nombre
      this.songs = songs.sort((a, b) => {
        // Manejo de casos donde 'name' podría no estar definido o no ser un string
        const nameA = typeof a.name === 'string' ? a.name : '';
        const nameB = typeof b.name === 'string' ? b.name : '';
        return nameA.localeCompare(nameB);
      });
      // Inicialmente, filteredSongs es igual a todas las canciones
      this.filterSongs(); // Llama a filterSongs para aplicar el filtro inicial (o mostrar todo si searchTerm está vacío)
    });
  }

  ionViewWillEnter() {
    this.navbarService.setTitle('Canciones');
    // Si deseas que la lista se actualice o se filtre cada vez que se entra a la vista
    // podrías llamar a this.filterSongs() aquí también,
    // especialmente si el searchTerm podría persistir de alguna manera.
  }

  /**
   * Normaliza un string para la búsqueda:
   * - Convierte a minúsculas.
   * - Elimina acentos.
   * - Elimina caracteres especiales no alfanuméricos (excepto espacios).
   * @param term El string a normalizar.
   * @returns El string normalizado.
   */
  private normalizeSearchTerm(term: string): string {
    if (!term) return '';
    let normalized = term.toLowerCase();
    // Descompone los caracteres acentuados en su forma base + diacrítico
    // y luego elimina los diacríticos (acentos).
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Elimina caracteres que no sean letras (a-z), números (0-9) o espacios.
    // Puedes ajustar esta expresión regular si necesitas conservar otros caracteres.
    normalized = normalized.replace(/[^a-z0-9\s]/gi, '');
    return normalized.trim(); // Elimina espacios al inicio y al final
  }

  //Filtrar canciones
  filterSongs() {
    const normalizedSearchTerm = this.normalizeSearchTerm(this.searchTerm);

    if (!normalizedSearchTerm) {
      // Si el término de búsqueda está vacío o se vuelve vacío después de normalizar,
      // muestra todas las canciones. Hacemos una copia para evitar mutaciones directas.
      this.filteredSongs = [...this.songs];
      return;
    }

    this.filteredSongs = this.songs.filter((song) => {
      // Asegúrate de que song.name existe y es un string antes de normalizarlo
      const songName = typeof song.name === 'string' ? song.name : '';
      const normalizedSongName = this.normalizeSearchTerm(songName);
      return normalizedSongName.includes(normalizedSearchTerm);
    });
  }

  //Navegar a la pagina de la cancion con id:
  openSongPage(songId: string) {
    this.router.navigate(['guess/songs/song', songId]);
  }
}
