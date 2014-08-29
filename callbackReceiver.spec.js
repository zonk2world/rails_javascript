v(function(context, $) {
    describe("Callbacks", function() {
        describe("makeStatic", function() {
            it("should create static function which invokes instance function", function() {
                var MyObj = function() {
                    this.hey = function() { return "hey"; };
                };
                var myInst = new MyObj();

                context.JK.Callbacks.makeStatic("callHey", myInst.hey);
                var result = context.JK.Callbacks.callHey();
                expect(result).toEqual("hey");
            });
        });

        describe("invocation", function() {
            it("should pass arguments", function() {
                var MyObj = function() {
                    this.addTwo = function(input) { return input+2; };
                };
                var myInst = new MyObj();

                context.JK.Callbacks.makeStatic("addTwo", myInst.addTwo);
                var result = context.JK.Callbacks.addTwo(5);
                expect(result).toEqual(7);

            });
        });

        describe("context", function() {
            it("should set 'this' to provided context", function() {
                var MyObj = function() {
                    this.counter = 0;
                    this.addToCounter = function(incAmount) {
                        this.counter += incAmount;
                    };
                };
                var myInst = new MyObj();

                context.JK.Callbacks.makeStatic("incInstanceCounter", myInst.addToCounter, myInst);
                context.JK.Callbacks.incInstanceCounter(2);
                context.JK.Callbacks.incInstanceCounter(3);
                expect(myInst.counter).toEqual(5);
            });
        });

    });
 })(window, jQuery);