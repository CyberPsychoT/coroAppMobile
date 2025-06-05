import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { Song } from 'src/app/interfaces/song';
import { Location } from '@angular/common';
import { ConfigService } from 'src/app/services/config.service';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  song: Song | undefined;
  sections: any[] = [];

  songIds: string[] = [];
  currentIndex: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navbarService: NavBarService,
    private location: Location,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    // Escuchar cambios en params y queryParams
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ]).subscribe(([params, query]) => {
      const songId = params['id'];
      this.songIds = query['songIds']?.split(',') || [];
      this.currentIndex = +query['index'] || 0;

      this.loadSong(songId);
    });
  }


  loadFromRoute() {
    const songId = this.activatedRoute.snapshot.params['id'];
    const query = this.activatedRoute.snapshot.queryParams;

    this.songIds = query['songIds']?.split(',') || [];
    this.currentIndex = +query['index'] || 0;

    this.loadSong(songId);
  }

  loadSong(songId: string) {
    this.firestoreService.getSongById(songId).subscribe((song) => {
      this.song = song;
      this.navbarService.setTitle(song?.name || '');
      this.initializeSections();
    });
  }

  nextSong() {
    if (this.currentIndex < this.songIds.length - 1) {
      const nextIndex = this.currentIndex + 1;
      this.router.navigate(['guess/songs/song', this.songIds[nextIndex]], {
        queryParams: {
          songIds: this.songIds.join(','),
          index: nextIndex,
        },
      });
    }
  }

  prevSong() {
    if (this.currentIndex > 0) {
      const prevIndex = this.currentIndex - 1;
      this.router.navigate(['guess/songs/song', this.songIds[prevIndex]], {
        queryParams: {
          songIds: this.songIds.join(','),
          index: prevIndex,
        },
      });
    }
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
        { name: 'Vídeo', content: '', open: false }, // Placeholder
      ];
    }
  }

  goToBack() {
    this.location.back();
  }
}
