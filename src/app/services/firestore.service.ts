import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Song } from '../interfaces/song';
import { List } from '../interfaces/list';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private fireStore: Firestore) {}

  //Trae todas las canciones para agregarla al dashboard
  getSongs(): Observable<Song[]> {
    const songRef = collection(this.fireStore, 'songs');
    return collectionData(songRef, { idField: 'id' }) as Observable<Song[]>;
  }

  // Método para obtener una canción específica por ID para la pagina song
  getSongById(songId: string): Observable<Song> {
    const songDocRef = doc(this.fireStore, `songs/${songId}`);
    return docData(songDocRef, { idField: 'id' }) as Observable<Song>;
  }

  //Trae todas las listas
  getLists(): Observable<List[]> {
    const listRef = collection(this.fireStore, 'lists');
    return collectionData(listRef, { idField: 'id' }) as Observable<List[]>;
  }

  // Método para obtener una canción específica por ID para la pagina song
  getListById(listId: string): Observable<List> {
    const listRef = doc(this.fireStore, `lists/${listId}`);
    return docData(listRef, { idField: 'id' }) as Observable<List>;
  }
}
