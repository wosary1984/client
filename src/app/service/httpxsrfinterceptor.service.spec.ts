import { TestBed, inject } from '@angular/core/testing';

import { HttpxsrfinterceptorService } from './httpxsrfinterceptor.service';

describe('HttpxsrfinterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpxsrfinterceptorService]
    });
  });

  it('should be created', inject([HttpxsrfinterceptorService], (service: HttpxsrfinterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
