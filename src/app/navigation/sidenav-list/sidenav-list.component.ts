import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isLoggedIn = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authEvent.subscribe(nextVal => {
      this.isLoggedIn = nextVal;
    });
  }

  onSideNavClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
