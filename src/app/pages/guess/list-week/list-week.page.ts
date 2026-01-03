import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { List } from 'src/app/interfaces/list';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-week',
  templateUrl: './list-week.page.html',
  styleUrls: ['./list-week.page.scss'],
})
export class ListWeekPage implements OnInit {

  // --- CAMBIOS AQUÍ ---
  allLists: List[] = []; // Almacena TODAS las listas obtenidas de Firestore
  // latestList: List | null = null; // <-- ELIMINADO: Ya no necesitamos esta variable
  filteredLists: List[] = []; // Para el *ngFor, contendrá LAS LISTAS FILTRADAS
  // --- FIN DE CAMBIOS ---

  searchTerm: string = '';

  constructor(
    private router: Router,
    private firestore: FirestoreService,
    public authService: AuthService,
    private navbarService: NavBarService
  ) { }

  ngOnInit() {
    // --- CAMBIO DE TÍTULO ---
    this.navbarService.setTitle('Listas Semanales'); // Título más general
    this.navbarService.setColor('primary');

    this.firestore.getLists().subscribe((listsFromDB) => {
      if (!listsFromDB || listsFromDB.length === 0) {
        this.allLists = [];
        // this.latestList = null; // <-- ELIMINADO
        this.filterLists(); // Actualiza filteredLists a un array vacío
        return;
      }

      // --- Lógica de ordenación (tu lógica es buena, la mantenemos) ---
      const sortedLists = [...listsFromDB].sort((a, b) => {
        const dateA = this.getDateFromListItem(a);
        const dateB = this.getDateFromListItem(b);

        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime(); // Descendente, la más reciente primero
        }
        if (dateA) return -1;
        if (dateB) return 1;

        const nameA = typeof a.name === 'string' ? a.name.toLowerCase() : '';
        const nameB = typeof b.name === 'string' ? b.name.toLowerCase() : '';
        return nameB.localeCompare(nameA);
      });
      // --- Fin de la lógica de ordenación ---


      // --- CAMBIOS AQUÍ ---
      // Guardamos TODAS las listas ordenadas, no solo la primera
      // FILTRO: Solo mostramos las listas que tengan status === true (o undefined si asumimos true por defecto, pero el usuario dijo "si es false no se debe mostrar")
      // Asumiremos que si no tiene status, se muestra (o se puede ajustar según requerimiento estricto).
      // El usuario dijo: "si el campo status de la lista es true se debe mostrar, si es false no se debe mostrar".
      // Vamos a filtrar estrictamente por true, o permitir undefined si es legacy?
      // "ahora las listas tienen el campo 'status'". Asumiremos que si existe, se respeta.
      // Si el usuario dice "tengo una lista en false", implica que el campo existe.
      // Para seguridad, filtraremos: list.status === true.
      // PERO, si es un campo nuevo, las viejas podrían no tenerlo.
      // Revisando el requerimiento: "si el campo status de la lista es true se debe mostrar, si es false no se debe mostrar".
      // Voy a asumir que status === true es la condición.
      
      this.allLists = sortedLists.filter(list => list.status === true);
      // this.latestList = sortedLists.length > 0 ? sortedLists[0] : null; // <-- ELIMINADO
      // --- FIN DE CAMBIOS ---

      this.filterLists(); // Aplicar filtro inicial (mostrará todas las listas)
    });
  }

  /**
   * Helper para obtener un objeto Date (esto no cambia, está bien)
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
   * Normaliza un string para la búsqueda (esto no cambia, está bien)
   */
  private normalizeSearchTerm(term: string): string {
    if (!term) return '';
    let normalized = term.toLowerCase();
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    normalized = normalized.replace(/[^a-z0-9\s]/gi, '');
    return normalized.trim();
  }

  // --- ¡CAMBIO IMPORTANTE AQUÍ! ---
  /**
   * Filtra la lista COMPLETA (allLists) basado en el searchTerm.
   */
  filterLists() {
    const normalizedSearchTerm = this.normalizeSearchTerm(this.searchTerm);

    if (normalizedSearchTerm === '') {
      // Si no hay término de búsqueda, muestra TODAS las listas
      this.filteredLists = [...this.allLists]; // Usamos 'allLists'
    } else {
      // Si hay término de búsqueda, filtra 'allLists'
      this.filteredLists = this.allLists.filter(list => {
        const listName = typeof list.name === 'string' ? list.name : '';
        const normalizedListName = this.normalizeSearchTerm(listName);

        // Devuelve true si el nombre de la lista incluye el término de búsqueda
        return normalizedListName.includes(normalizedSearchTerm);
      });
    }
  }
  // --- FIN DEL CAMBIO IMPORTANTE ---


  openListPage(listId: string | undefined) {
    if (listId) {
      this.router.navigate(['guess/list-week/list', listId]);
    } else {
      console.error('Error: List ID is undefined. Cannot navigate.');
    }
  }
}