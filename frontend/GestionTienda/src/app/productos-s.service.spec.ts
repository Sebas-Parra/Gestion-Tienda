import { TestBed } from '@angular/core/testing';

import { ProductosSService } from './productos-s.service';

describe('ProductosSService', () => {
  let service: ProductosSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
