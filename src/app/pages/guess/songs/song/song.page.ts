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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  song: Song | undefined;
  sections: any[] = [];
  isLoading: boolean = true;

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
    private sanitizer: DomSanitizer
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

      console.log('SongPage loaded. IDs:', this.songIds, 'Current Index:', this.currentIndex);

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
    this.isLoading = true;
    this.firestoreService.getSongById(songId).subscribe((song) => {
      this.song = song;
      this.navbarService.setTitle(song?.name || '');
      this.initializeSections();
      this.isLoading = false;
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
        replaceUrl: true,
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
        replaceUrl: true,
      });
    }
  }

  initializeSections() {
    if (this.song) {
      this.sections = [
        { name: 'Introducción',    content: this.song.introduction, parsedContent: this.parseChords(this.song.introduction), open: !!this.song.introduction?.trim() },
        { name: 'Letra y acordes', content: this.song.letter1,      parsedContent: this.parseChords(this.song.letter1),      open: !!this.song.letter1?.trim() },
        { name: 'Interludio',      content: this.song.interlude,    parsedContent: this.parseChords(this.song.interlude),    open: !!this.song.interlude?.trim() },
        { name: 'Letra y acordes', content: this.song.letter2,      parsedContent: this.parseChords(this.song.letter2),      open: !!this.song.letter2?.trim() },
        { name: 'Final',           content: this.song.end,          parsedContent: this.parseChords(this.song.end),          open: !!this.song.end?.trim() },
        { name: 'Etiqueta',        content: this.song.label,        parsedContent: this.parseChords(this.song.label),        open: false },
        { name: 'Vídeo',           content: '',                     parsedContent: null,                                     open: false },
      ];
    }
  }

  parseChords(text: string | undefined): SafeHtml {
    if (!text) return this.sanitizer.bypassSecurityTrustHtml('');
    const lines = text.split('\n');
    let htmlOutput = '';

    lines.forEach(line => {
      if (line.trim() === '') {
        htmlOutput += '<br>';
        return;
      }

      let parsedLine = line.replace(/\[(.*?)\]([^\[]*)/g, (match, chord, lyric) => {
        return `<span class="chord-wrapper"><span class="chord">${chord}</span><span class="lyric">${lyric}</span></span>`;
      });

      if (!line.startsWith('[')) {
        const firstPart = line.split('[')[0];
        parsedLine = `<span class="lyric">${firstPart}</span>` + parsedLine.substring(firstPart.length);
      }

      htmlOutput += `<div class="lyric-line">${parsedLine}</div>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(htmlOutput);
  }

  goToBack() {
    this.location.back();
  }
}
