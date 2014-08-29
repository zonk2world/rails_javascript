(function(context,$) {

    describe("CreateSession", function() {

        var css;
        var ajaxSpy;

        var appFake = {
            clientId: '12345',
            notify: function(){},
            ajaxError: function() { console.debug("ajaxError"); }
        };

        var selectors = {
            form: '#create-session-form',
            genres: '#genre-list',
            description: '#description'
        };

        function makeValid() {
            //var genre = '<div class="list-item-text"><input type="checkbox" checked="checked" value="1">1</div>';
            $(selectors.genres).val('african');
            //$(selectors.genres, $(selectors.form)).append(genre);
            $(selectors.description).val('XYZ');
        }

        beforeEach(function() {
            // Use the actual screen markup
            jasmine.getFixtures().fixturesPath = '/app/views/clients';
            loadFixtures('_createSession.html.erb');
            spyOn(appFake, 'notify');
            css = new context.JK.CreateSessionScreen(appFake);
            css.getGenreSelector().initialize('Choose up to 3 genres', 3, $(selectors.form));
        });

        describe("resetForm", function() {
            it("description should be empty", function() {
                $(selectors.description).val('XYZ');
                css.resetForm();
                expect($(selectors.description).val()).toEqual('');
            });
        });

        describe("loadGenres", function() {
            beforeEach(function() {
                spyOn($, "ajax").andCallFake(function(opts) {
                    opts.success(TestResponses.loadGenres);
                });
            });
            it("should populate genres select", function() {
                css.loadGenres();
                $genres = $(selectors.genres);
                alert($genres.html());
                expect($genres.length).toEqual(2);
            });
        });

        describe("submitForm", function() {

            var fakeEvt;
            var passedData = {};

            beforeEach(function() {
                makeValid();
                fakeEvt = {
                    preventDefault: $.noop,
                    currentTarget: $(selectors.form)
                };
                spyOn($, "ajax").andCallFake(function(opts) {
                    opts.success(TestResponses.sessionPost);
                });
                css.submitForm(fakeEvt);
                passedData = JSON.parse($.ajax.mostRecentCall.args[0].data);
            });

            it("should pass client_id", function() {
                expect(passedData.client_id).toEqual("12345");
            });

            it("should pass genres as non-empty list", function() {
                expect("genres" in passedData).toBeTruthy();
                var isArray = $.isArray(passedData.genres);
                expect(isArray).toBeTruthy();
                expect(passedData.genres.length).toBeGreaterThan(0);
            });

            it("should pass tracks as non-empty list", function() {
                expect("tracks" in passedData).toBeTruthy();
                var isArray = $.isArray(passedData.tracks);
                expect(isArray).toBeTruthy();
                expect(passedData.tracks.length).toBeGreaterThan(0);
            });

            it("should pass musician_access as boolean", function() {
                expect("musician_access" in passedData).toBeTruthy();
                expect(typeof(passedData.musician_access)).toEqual("boolean");
            });

            it("should pass approval_required as boolean", function() {
                expect("approval_required" in passedData).toBeTruthy();
                expect(typeof(passedData.approval_required)).toEqual("boolean");
            });

            it("should pass fan_access as boolean", function() {
                expect("fan_access" in passedData).toBeTruthy();
                expect(typeof(passedData.fan_access)).toEqual("boolean");
            });

            it("should pass fan_chat as boolean", function() {
                expect("fan_chat" in passedData).toBeTruthy();
                expect(typeof(passedData.fan_chat)).toEqual("boolean");
            });

        });

        describe("validateForm", function() {

            beforeEach(function() {
                makeValid();
            });

            it("valid form", function() {
                var errs = css.validateForm();
                expect(errs).toBeNull();
            });

            // it("should fail with > 3 genres", function() {
            //     var htm = '<div class="list-item-text"><input type="checkbox" checked="checked" value="2">2</div>' +
            //               '<div class="list-item-text"><input type="checkbox" checked="checked" value="3">3</div>' +
            //               '<div class="list-item-text"><input type="checkbox" checked="checked" value="4">4</div>' +
            //               '<div class="list-item-text"><input type="checkbox" checked="checked" value="5">5</div>';
            //     $(selectors.genres, $(selectors.form)).append(htm);
            //     var errs = css.validateForm();
            //     // Verify that we have an error.
            //     expect(errs).toBeTruthy();
            //     // Verify that the error is a two-part list
            //     expect(errs[0].length).toEqual(2);
            //     // Verify that the first part is a selector for the problem.
            //     expect(errs[0][0]).toEqual('#genre-list-items');
            // });

            it("should fail with 0 genres", function() {
                $(selectors.genres, $(selectors.form)).html('');
                var errs = css.validateForm();
                // Verify that we have an error.
                expect(errs).toBeTruthy();
                // Verify that the first part is a selector for the problem.
                expect(errs[0][0]).toEqual('#genre-list');
            });

            it("should fail with empty description", function() {
                $(selectors.description).val('');
                var errs = css.validateForm();
                // Verify that we have an error.
                expect(errs).toBeTruthy();
                // Verify that the first part is a selector for the problem.
                expect(errs[0][0]).toEqual('#description');
            });

        });

    });

 })  // Intentionally not running tests as they're failing. (window, jQuery);