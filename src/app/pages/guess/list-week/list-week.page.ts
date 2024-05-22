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
  lists: List[] = [];
  filteredLists: List[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private firestore: FirestoreService,
    public authService: AuthService,
    private navbarService: NavBarService
  ) {}

  ngOnInit() {
    this.navbarService.setTitle('Lista semanal'); //titulo de la pagina
    this.navbarService.setColor('primary'); //Color del navbar
    //Listas
    this.firestore.getLists().subscribe((lists) => {
      this.lists = lists.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredLists = this.lists;
    });
  }

  //Filtrar canciones
  filterLists() {
    this.filteredLists = this.searchTerm
      ? this.lists.filter((list) =>
          list.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.lists;
  }

  //Navegar a la pagina de la cancion con id:
  openListPage(listId: string | undefined) {
    if (listId) {
      this.router.navigate(['guess/list-week/list', listId]);
    } else {
      console.log('Error: List ID is undefined');
    }
  }
}
