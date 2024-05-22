import { ListSong } from './list-song';

export interface List {
  id?: string;
  name: string;
  description?: string;
  songs: ListSong[]; // Utiliza ListSong para manejar canciones y secciones
  createdAt?: Date;
  selected?: boolean;
}
