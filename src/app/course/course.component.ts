import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput') input: ElementRef;

    public course$: Observable<Course>;
    public lessons$: Observable<Lesson[]>;
    private courseId: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.courseId = this.route.snapshot.params.id;
        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
        this.lessons$ = this.loadLessons() ;
    }

    ngAfterViewInit() {
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          map((event) => event.target.value),
          tap((val) => console.log(val))
        )
        .subscribe();
    }

    private loadLessons() {
      return createHttpObservable(`/api/lessons/?courseId=${this.courseId}&pageSize=100`)
        .pipe(
          map((res) => res['payload'])
        );
    }
}
