import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { List } from 'src/app/interfaces/list'; // Asegúrate que esta interfaz exista y tenga 'name' y opcionalmente 'id' y 'createdAt'
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-week',
  templateUrl: './list-week.page.html',
  styleUrls: ['./list-week.page.scss'],
})
export class ListWeekPage implements OnInit {
  allLists: List[] = []; // Almacena todas las listas obtenidas de Firestore
  latestList: List | null = null; // Almacenará solo la lista más reciente
  filteredLists: List[] = []; // Para el *ngFor, contendrá 0 o 1 elemento (la latestList si cumple el filtro)
  searchTerm: string = '';

  constructor(
    private router: Router,
    private firestore: FirestoreService,
    public authService: AuthService,
    private navbarService: NavBarService
  ) { }

  ngOnInit() {
    this.navbarService.setTitle('Última Lista Semanal'); // Título ajustado
    this.navbarService.setColor('primary');

    this.firestore.getLists().subscribe((listsFromDB) => {
      if (!listsFromDB || listsFromDB.length === 0) {
        this.allLists = [];
        this.latestList = null;
        this.filterLists(); // Actualiza filteredLists a un array vacío
        return;
      }

      this.allLists = listsFromDB;

      // --- Lógica para determinar la "última lista creada" ---
      // Idealmente, deberías tener un campo como 'createdAt' (Timestamp de Firebase) en tus objetos List.
      // Ejemplo: list.createdAt.toDate() para comparar fechas.
      // Si no tienes 'createdAt', esta ordenación por nombre no garantiza la "última creada".
      // En ese caso, la "última" será la última en el array después de esta ordenación por nombre,
      // o podrías tomar listsFromDB[listsFromDB.length - 1] ANTES de cualquier ordenación si confías en el orden de llegada.

      // Intentar ordenar por 'createdAt' si existe.
      // Esto es una suposición de cómo podría ser tu campo 'createdAt'. Ajusta según tu estructura de datos.
      const sortedLists = [...this.allLists].sort((a, b) => {
        const dateA = this.getDateFromListItem(a);
        const dateB = this.getDateFromListItem(b);

        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime(); // Descendente, la más reciente primero
        }
        if (dateA) return -1; // a tiene fecha, b no, a va primero (más reciente)
        if (dateB) return 1;  // b tiene fecha, a no, b va primero

        // Fallback: si no hay fechas, ordena por nombre o mantén el orden actual
        const nameA = typeof a.name === 'string' ? a.name.toLowerCase() : '';
        const nameB = typeof b.name === 'string' ? b.name.toLowerCase() : '';
        return nameB.localeCompare(nameA); // O como prefieras ordenarlas si no hay fecha
      });

      this.latestList = sortedLists.length > 0 ? sortedLists[0] : null;
      // --- Fin de la lógica para determinar la última lista ---

      this.filterLists(); // Aplicar filtro inicial (mostrar la última lista si existe)
    });
  }

  /**
   * Helper para obtener un objeto Date desde un item de lista.
   * Asume que 'createdAt' puede ser un Timestamp de Firestore, un string de fecha o un objeto Date.
   */
  private getDateFromListItem(list: List): Date | null {
    const createdAt = list.createdAt;

    if (!createdAt) return null;

    if (createdAt instanceof Date) return createdAt;

    if (
      typeof createdAt === 'object' &&
      createdAt !== null &&
      typeof (createdAt as any).toDate === 'function'
    ) {
      return (createdAt as any).toDate();
    }

    if (typeof createdAt === 'string') {
      const date = new Date(createdAt);
      return isNaN(date.getTime()) ? null : date;
    }

    return null;
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
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    normalized = normalized.replace(/[^a-z0-9\s]/gi, '');
    return normalized.trim();
  }

  filterLists() {
    if (!this.latestList) {
      this.filteredLists = [];
      return;
    }

    const normalizedSearchTerm = this.normalizeSearchTerm(this.searchTerm);
    const latestListName = typeof this.latestList.name === 'string' ? this.latestList.name : '';
    const normalizedLatestListName = this.normalizeSearchTerm(latestListName);

    if (normalizedSearchTerm === '') {
      // Si no hay término de búsqueda, muestra la última lista
      this.filteredLists = [this.latestList];
    } else if (normalizedLatestListName.includes(normalizedSearchTerm)) {
      // Si hay término de búsqueda y la última lista coincide, muéstrala
      this.filteredLists = [this.latestList];
    } else {
      // Si no coincide, no muestra nada
      this.filteredLists = [];
    }
  }

  openListPage(listId: string | undefined) {
    if (listId) {
      this.router.navigate(['guess/list-week/list', listId]);
    } else {
      console.error('Error: List ID is undefined. Cannot navigate.');
      // Podrías mostrar un toast o alerta al usuario aquí si es apropiado
    }
  }
}