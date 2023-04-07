import { debounceTime, filter, Observable, Subject } from 'rxjs';

export const fromIntersectionObserver = (
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce: number = 0
) =>
  new Observable<Element>(subscriber => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserver;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach(entry => {
          if (isIntersecting(entry)) {
            subject$.next({ entry, observer });
          }
        });
      },
      config
    );

    subject$
      .pipe(
        debounceTime(debounce),
        filter(Boolean)
      )
      .subscribe(async ({ entry, observer }) => {
        const isEntryVisible = await isVisible(entry.target as HTMLElement);

        if (isEntryVisible) {
          subscriber.next(entry.target);
        }
      });

    intersectionObserver.observe(element);

    return {
      unsubscribe() {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      }
    };
  });

async function isVisible(element: HTMLElement) {
  return new Promise(resolve => {
    const observer = new IntersectionObserver(([entry]) => {
      resolve(entry.isIntersecting);
      observer.disconnect();
    });

    observer.observe(element);
  });
}

function isIntersecting(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}
