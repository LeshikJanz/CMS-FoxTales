import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '../user.interface';
import { User } from '../user';
import { UserService } from '../user.service';

/**
 * User details component
 */
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  /**
   * User
   *
   * @type {User}
   */
  public user: User;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {UserService} userService
   * @returns {void}
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      this.getUser(id);
    });
  }

  /**
   * Get user by id
   *
   * @returns {void}
   */
  public getUser(id: string): void {
    this.userService
      .getUser(id)
      .subscribe((user: IUser) => {
        if (!user) {
          return this.router.navigate(['/users']);
        }

        this.user = user;
      });
  }
}
