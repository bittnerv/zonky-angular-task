import { Observable, BehaviorSubject, of } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';

export function batchload<T>(loadBatch: (batchIndex: number) => Observable<Array<T>>, batchSize: number): Observable<Array<T>> {
  let batchIndex = 0;
  const batchObservable = new BehaviorSubject(batchIndex);

  return batchObservable
    .pipe(
      mergeMap(() => loadBatch(batchIndex)),
      mergeMap(processBatch),
      reduce(combine, [])
    );

  function combine(result, batch) {
    result.push(...batch);

    return result;
  }

  function processBatch(batch) {
    if (batch.length < batchSize) {
      batchObservable.complete();
    } else {
      batchObservable.next(++batchIndex);
    }

    return of(batch);
  }
}
