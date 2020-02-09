

xdescribe("Async Testing Example", () => {

    it("Asynchronous test example Jasmine done()", (done: DoneFn) => {

        let test = false;

        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);

    });

});