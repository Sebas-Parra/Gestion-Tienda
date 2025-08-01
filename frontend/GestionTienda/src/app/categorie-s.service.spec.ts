import { TestBed } from '@angular/core/testing';

import { CategorieSService } from './categorie-s.service';

describe('CategorieSService', () => {
  let service: CategorieSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
