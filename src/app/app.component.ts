import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = '';
  user: any;
  repos: any[] = [];
  page = 1;
  perPage = 10;
  loading = false;
  repoLanguages: { [key: string]: string[] } = {};
  constructor(
    private apiService: ApiService
  ) {}
  search() {
    this.loading = true;
    this.page=1
    this.perPage=10
    // Fetch user details
    this.apiService.getUserDetails(this.username)
      .subscribe(user => {
        this.user = user;
      });

    // Fetch user repositories with pagination
    this.fetchRepositories();
  }

  fetchRepositories() {
    this.apiService.getUserRepos(this.username, this.page, this.perPage)
      .subscribe(repos => {
        this.repos = repos;
        this.loading = false;
        this.fetchRepoLanguages();
      });
  }
  fetchRepoLanguages() {
    // Fetch languages for each repository
    this.repos.forEach(repo => {
      this.apiService.getRepoLanguages(this.username, repo.name)
        .subscribe(languages => {
          this.repoLanguages[repo.name] = Object.keys(languages);
        });
    });
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.fetchRepositories();
  }

  changePerPage(newPerPage: number) {
    this.perPage = newPerPage;
    this.page = 1; // Reset page to 1 when changing repositories per page
    this.fetchRepositories();
  }
  totalPages(): number[] {
    const total = Math.ceil(this.user.public_repos / this.perPage);
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  show(n: number): Array<number> { 
    return Array(n); 
  } 
}
