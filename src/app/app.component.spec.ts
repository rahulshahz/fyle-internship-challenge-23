import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],  // Add HttpClientTestingModule to imports
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    // Spy on the methods after obtaining an instance of the actual service
    spyOn(apiService, 'getUserDetails').and.returnValue(of({ name: 'Test User' }));
    spyOn(apiService, 'getUserRepos').and.returnValue(of([{ name: 'Repo1' }, { name: 'Repo2' }]));
    // Remove the previous spy on 'getUserRepos' and set it up again
    apiService.getRepoLanguages = jasmine.createSpy('getRepoLanguages').and.returnValue(of({}));
  });

  it('should call getUserDetails and fetchRepositories when search is called', () => {
    // Arrange
    component.username = 'testuser';

    // Act
    component.search();

    // Assert
    expect(apiService.getUserDetails).toHaveBeenCalledWith('testuser');
    expect(apiService.getUserRepos).toHaveBeenCalledWith('testuser', 1, 10);
    expect(apiService.getRepoLanguages).toHaveBeenCalled();
    expect(component.user).toEqual({ name: 'Test User' });
    expect(component.repos).toEqual([{ name: 'Repo1' }, { name: 'Repo2' }]);
    expect(component.loading).toBe(false);
  });

  it('should change the page and fetch repositories accordingly', () => {
    // Arrange
    component.username = 'testuser';
    component.page = 1;

    // Act
    component.changePage(3);

    // Assert
    expect(component.page).toBe(3);
    expect(apiService.getUserRepos).toHaveBeenCalledWith('testuser', 3, 10);
    // Add additional assertions if needed
  });
  it('should fetch repositories when the page changes', () => {
    // Arrange
    component.username = 'testuser';
  
    // Act
    component.changePage(2);
  
    // Assert
    expect(apiService.getUserRepos).toHaveBeenCalledWith('testuser', 2, 10);
    // Add additional assertions if needed
  });
  
  it('should fetch repo languages for each repository', () => {
    // Arrange
    component.username = 'testuser';
  
    // Act
    component.search();
  
    // Assert
    component.repos.forEach(repo => {
      expect(apiService.getRepoLanguages).toHaveBeenCalledWith('testuser', repo.name);
    });
    // Add additional assertions if needed
  });
  it('should change repositories per page and reset page to 1 when changing repositories per page', () => {
    // Arrange
    component.username = 'testuser';
    component.perPage = 10;
    component.page = 2;
  
    // Act
    component.changePerPage(5);
  
    // Assert
    expect(component.perPage).toBe(5);
    expect(component.page).toBe(1);
    expect(apiService.getUserRepos).toHaveBeenCalledWith('testuser', 1, 5);
    // Add additional assertions if needed
  });
  
});
