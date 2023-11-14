import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user details from the API', () => {
    const username = 'testuser';
    const mockUserDetails = { login: username, name: 'Test User' };

    service.getUserDetails(username).subscribe(userDetails => {
      expect(userDetails).toEqual(mockUserDetails);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockUserDetails);
  });

  it('should retrieve user repos from the API', () => {
    const username = 'testuser';
    const page = 1;
    const perPage = 10;
    const mockUserRepos = [{ name: 'Repo1' }, { name: 'Repo2' }];

    service.getUserRepos(username, page, perPage).subscribe(userRepos => {
      expect(userRepos).toEqual(mockUserRepos);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockUserRepos);
  });

  it('should handle errors when retrieving user details', () => {
    const username = 'nonexistentuser';

    service.getUserDetails(username).subscribe(
      () => fail('Expected an error, but received successful response'),
      error => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toEqual('GET');

    req.flush('User not found', { status: 404, statusText: 'Not Found' });
  });

  it('should handle errors when retrieving user repos', () => {
    const username = 'testuser';
    const page = 1;
    const perPage = 10;

    service.getUserRepos(username, page, perPage).subscribe(
      () => fail('Expected an error, but received successful response'),
      error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    expect(req.request.method).toEqual('GET');

    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle network errors when retrieving user details', () => {
    const username = 'testuser';

    service.getUserDetails(username).subscribe(
      () => fail('Expected an error, but received successful response'),
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('Network error'));
  });

  it('should handle network errors when retrieving user repos', () => {
    const username = 'testuser';
    const page = 1;
    const perPage = 10;

    service.getUserRepos(username, page, perPage).subscribe(
      () => fail('Expected an error, but received successful response'),
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('Network error'));
  });
  it('should retrieve repository languages from the API', () => {
    const username = 'testuser';
    const repoName = 'testrepo';
    const mockRepoLanguages = { typescript: 100, javascript: 50 };
  
    service.getRepoLanguages(username, repoName).subscribe(repoLanguages => {
      expect(repoLanguages).toEqual(mockRepoLanguages);
    });
  
    const req = httpTestingController.expectOne(`https://api.github.com/repos/${username}/${repoName}/languages`);
    expect(req.request.method).toEqual('GET');
  
    req.flush(mockRepoLanguages);
  });

  

  

  
});
