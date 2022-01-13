import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MetricFilter} from "../model/metricFilter";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterRoutingService {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  filterToRoute(filter: MetricFilter) {
    const queryParams = {
      'count': filter.count,
      'page': filter.page,
      'name': filter.name,
      'type': filter.type,
      'to': filter.to,
      'from': filter.from
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams
      }
    )
  }

  routeToFilter(): Observable<MetricFilter> {
    return this.route.queryParams.pipe<MetricFilter>(map(params => {
      const filter: MetricFilter = {
        name: params['name'],
        type: params['type'],
        from: params['from'],
        to: params['to'],
        page: parseInt(params['page']),
        count: parseInt(params['count']),
      }
      return filter
    }))
  }
}