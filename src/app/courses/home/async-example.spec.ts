import { fakeAsync, tick, flush, flushMicrotasks } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";


describe("Async Testing Example", () => {

    it("Asynchronous test example Jasmine done()", (done: DoneFn) => {

        let test = false;

        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);

    });

    it("Asynchronous text example - setTimeout()", fakeAsync(() => {

        let test = false;

        setTimeout(() => {});
        setTimeout(() => {
            console.log('running assertions setTimeOut()');
            test = true;
        }, 1000);
        //tick(1000); moves time forward
        flush();
        expect(test).toBeTruthy();
    }));

    it("Asynchronous text example - plain Promise", fakeAsync(() => {

        let test = false;
        console.log('Creating promise');

        Promise.resolve().then(() => {
            console.log('Promise first then() evaluated successfully');
            test = true;
            return Promise.resolve();
        })
        .then(() => {
            console.log('Promise second then() evaluated successfully');
        });
        flushMicrotasks();

        console.log('Running test assertions');
        expect(test).toBeTruthy();
    }));

    it("Asynchronous text example - Promies + setTimeout()", fakeAsync(() => {
        let counter = 0;
        Promise.resolve()
            .then(() => {
                counter+=10;

                setTimeout(() => {
                    counter += 1;
                }, 1000);
            });
        expect(counter).toBe(0); 
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(10); 
        tick(500);
        expect(counter).toBe(11);
    }));

    it("Asynchronous text example - Observables", fakeAsync(() => {
        let test = false;

        console.log('Creating Observable');
        const test$ = of(test).pipe(delay(1000));

        test$.subscribe(() => {
            test = true;
        });
        tick(1000);
        console.log('Running Test Assertions');
        expect(test).toBe(true);

    }));
});