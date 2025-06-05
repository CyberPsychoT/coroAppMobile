import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { List } from 'src/app/interfaces/list';
import { Song } from 'src/app/interfaces/song';
import { ListSong } from 'src/app/interfaces/list-song';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {
  list: List | undefined;
  sections: any[] = [];
  private routeSub!: Subscription;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params
      .pipe(
        debounceTime(300), // Añade un pequeño retraso para evitar múltiples cargas rápidas
        switchMap((params) => {
          const listId = params['id'];
          return this.firestoreService.getListById(listId);
        })
      )
      .subscribe((list) => {
        this.list = list;
        this.initializeSections(); // Reinicia las secciones para asegurar que están limpias
        if (list.songs && list.songs.length > 0) {
          this.loadSongs(list.songs); // Carga canciones según el nuevo modelo
        }
      });
  }

  ngOnDestroy() {
    if (this.routeSub !== null) {
      this.routeSub.unsubscribe();
    }
  }

  loadListAndSongs(listId: string) {
    this.firestoreService.getListById(listId).subscribe((list) => {
      console.log('List:', list);
      this.list = list;
      this.initializeSections();
      if (list.songs && list.songs.length > 0) {
        this.loadSongs(list.songs);
      }
    });
  }

  initializeSections() {
    this.sections = [
      { name: 'Todas las Canciones', songs: [], open: true },
      { name: 'Entrada', songs: [], open: true },
      { name: 'Canto de Perdón', songs: [], open: true },
      { name: 'Gloria', songs: [], open: true },
      { name: 'Salmo', songs: [], open: true },
      { name: 'Antes del Evangelio', songs: [], open: true },
      { name: 'Después del Evangelio', songs: [], open: true },
      { name: 'Ofertorio', songs: [], open: true },
      { name: 'Santo', songs: [], open: true },
      { name: 'Prefacio', songs: [], open: true },
      { name: 'Padre Nuestro', songs: [], open: true },
      { name: 'Canto de paz', songs: [], open: true },
      { name: 'Cordero', songs: [], open: true },
      { name: 'Comunión', songs: [], open: true },
      { name: 'Canto Final', songs: [], open: true },
    ];
  }

  loadSongs(listSongs: ListSong[]) {
    // Limpiar canciones existentes antes de cargar nuevas para evitar duplicados
    this.sections.forEach((section) => (section.songs = []));

    listSongs.forEach((listSong) => {
      // Verifica que la canción no haya sido ya cargada
      if (
        !this.sections.some((section) =>
          section.songs.some((song: Song) => song.id === listSong.songId)
        )
      ) {
        this.firestoreService
          .getSongById(listSong.songId)
          .subscribe((song: Song) => {
            if (song) {
              const sectionIndex = this.sections.findIndex(
                (sec) => sec.name === listSong.section
              );
              if (sectionIndex !== -1) {
                // Solo añadir si la canción no está ya en la sección
                if (
                  !this.sections[sectionIndex].songs.some(
                    (s: Song) => s.id === song.id
                  )
                ) {
                  this.sections[sectionIndex].songs.push({
                    ...song,
                    section: listSong.section,
                  });
                }
              }
            }
          });
      }
    });
  }

  goToBack() {
    this.location.back();
  }

  openSongPage(songId: string, songs: Song[]) {
    const songIds = songs.map((s) => s.id);
    const index = songIds.indexOf(songId);

    this.router.navigate(['guess/songs/song', songId], {
      queryParams: {
        songIds: songIds.join(','),
        index: index,
      },
    });
  }
}
