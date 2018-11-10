import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewService } from './review.service';
import { Review } from './types/review-model';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
})
export class ReviewListComponent implements OnInit {

  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.route.paramMap.subscribe(_params => {
      let searchParams = new HttpParams();

      if (_params.get('id')) {
        searchParams = searchParams.set('game', _params.get('id'));
      }

      this.reviewService.getReviews(searchParams).subscribe(_reviews => {
        this.reviews = _reviews['results'];
      });
    });
  }

  toGame(id: number) {
    this.router.navigate(['games', id]);
  }
}
