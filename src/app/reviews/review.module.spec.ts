import { ReviewModule } from './review.module';

describe('ReviewModule', () => {
  let reviewModule: ReviewModule;

  beforeEach(() => {
    reviewModule = new ReviewModule();
  });

  it('should create an instance', () => {
    expect(reviewModule).toBeTruthy();
  });
});
