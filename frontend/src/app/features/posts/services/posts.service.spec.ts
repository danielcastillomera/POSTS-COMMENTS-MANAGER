import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { environment } from '../../../../environments/environment';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service  = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('getAll() debe realizar una peticion GET a /posts', () => {
    service.getAll(1, 9).subscribe((res) => {
      expect(res.success).toBeTrue();
    });
    const req = httpMock.expectOne(
      (r) => r.method === 'GET' && r.url.includes('/posts'),
    );
    req.flush({ success: true, message: 'OK', data: [], meta: { total: 0, page: 1, limit: 9, totalPages: 0 } });
  });

  it('create() debe realizar una peticion POST a /posts', () => {
    const payload = { title: 'Test', body: 'Contenido de prueba', author: 'Autor' };
    service.create(payload).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true, message: 'OK', data: { ...payload, _id: '1' } });
  });

  it('remove() debe realizar una peticion DELETE a /posts/:id', () => {
    service.remove('abc123').subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/posts/abc123`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true, message: 'OK', data: null });
  });
});
