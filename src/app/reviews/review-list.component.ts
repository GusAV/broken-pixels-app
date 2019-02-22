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
  page = 1;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.page = 0;
    this.updateList();
  }

  updateList(page = null) {
    this.route.paramMap.subscribe(_params => {
      let searchParams = new HttpParams();

      if (_params.get('id')) {
        searchParams = searchParams.set('game', _params.get('id'));
      }

      if (page) {
        this.page += 1;
        searchParams = searchParams.set('page', this.page.toString());
      }

      this.reviewService.getReviews(searchParams).subscribe(_reviews => {
        if (this.page > 1) {
          for (const re of _reviews['results']) {
            this.reviews.push(re);
          }
        } else {
          this.reviews = _reviews['results'];
        }
      });
    });
  }

  toGame(id: number) {
    this.router.navigate(['games', id]);
  }

  getMoreReviews() {
    this.updateList(1);
  }
}
