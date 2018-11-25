import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { of, concat } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const s1$ = of(1, 2, 3);
    const s2$ = of(4, 5, 6);
    const s3$ = of(7, 8, 9);

    const result$ = concat(s1$, s2$, s3$);

    result$.subscribe((r) => {
      console.log(r);
    });
  }

}
