import { Observable, BehaviorSubject } from 'rxjs';
import { mergeMap, reduce, tap } from 'rxjs/operators';

export type LoadBatchFn<T> = (batchIndex: number) => Observable<Array<T>>;

export function batchload<T>(loadBatch: LoadBatchFn<T>, batchSize: number): Observable<Array<T>> {
  let batchIndex = 0;
  const batchObservable = new BehaviorSubject(batchIndex);

  return batchObservable
    .pipe(
      mergeMap(loadBatch, 1),
      tap(processBatch),
      reduce(combine, [])
    );

  function combine(result: Array<T>, batch: Array<T>) {
    result.push(...batch);

    return result;
  }

  function processBatch(batch: Array<T>) {
    if (batch.length < batchSize) {
      batchObservable.complete();
    } else {
      batchObservable.next(++batchIndex);
    }
  }
}
