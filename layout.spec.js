(function(context, $) {

    describe("Layout", function() {
        var layout, cardLayout, testOpts;

        beforeEach(function() {
            layout = new context.JK.Layout();
        });

        describe("Construct", function() {
            describe("defaults", function() {
                it("headerHeight should be 75", function() {
                    expect(layout.getOpts().headerHeight).toEqual(75);
                });
                it("sidebarWidth should be 300", function() {
                    expect(layout.getOpts().sidebarWidth).toEqual(300);
                });
                it("gutter should be 60", function() {
                    expect(layout.getOpts().gutter).toEqual(60);
                });
            });
            describe("override one default", function() {
                it("headerHeight should be 300", function() {
                    testOpts = {
                        allowBodyOverflow: true,
                        headerHeight: 300
                    };
                    layout.initialize(testOpts);
                    expect(layout.getOpts().headerHeight).toEqual(300);
                });
                it("sidebarWidth should be 300", function() {
                    expect(layout.getOpts().sidebarWidth).toEqual(300);
                });
            });

        });

        describe("getScreenDimensions", function() {
            describe("Description", function() {

            });
        });

        describe("CardLayout", function() {
            describe("One cell, zero margins", function() {
                it("should fill space", function() {
                    testOpts = { allowBodyOverflow:true, gridOuterMargin: 0, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 1, 1, 0, 0, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:100,height:100});
                });
            });

            describe("Two columns, zero margins", function() {
                it("should be half width each", function() {
                    testOpts = { allowBodyOverflow:true, gridOuterMargin: 0, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 1, 2, 0, 0, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:50,height:100});

                    cardLayout = layout.getCardLayout(100, 100, 1, 2, 0, 1, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:50,width:50,height:100});
                });
            });

            describe("Two rows, zero margins", function() {
                it("should be half height each", function() {
                    testOpts = { allowBodyOverflow:true, gridOuterMargin: 0, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 2, 1, 0, 0, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:100,height:50});

                    cardLayout = layout.getCardLayout(100, 100, 2, 1, 1, 0, 1, 1);
                    expect(cardLayout).toEqual({top:50,left:0,width:100,height:50});
                });
            });

            describe("two cols, colspan 2, zero margins", function() {
                it("should fill width", function() {
                    testOpts = { allowBodyOverflow: true, gridOuterMargin: 0, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 1, 2, 0, 0, 1, 2);
                    expect(cardLayout).toEqual({top:0,left:0,width:100,height:100});
                });
            });

            describe("two rows, rowspan 2, zero margins", function() {
                it("should fill height", function() {
                    testOpts = { allowBodyOverflow: true, gridOuterMargin: 0, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 2, 1, 0, 0, 2, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:100,height:100});
                });
            });

            describe("4x4, zero margins, row 1, col 1, rowspan 2, colspan 2", function() {
                it("should fill middle 4 cells", function() {
                    testOpts = { allowBodyOverflow: true, gridOuterMargin: 0, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 4, 4, 1, 1, 2, 2);
                    expect(cardLayout).toEqual({top:25,left:25,width:50,height:50});
                });
            });

            // Outer margins
            describe("1x1, 100x100, outermargin 10", function() {
                it("should be at 0x0, 80x80", function() {
                    testOpts = { allowBodyOverflow: true, gridOuterMargin: 10, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 1, 1, 0, 0, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:80,height:80});
                });
            });
            describe("2x2, 100x100, outermargin 10", function() {
                it("should be at 0x0, 40x40", function() {
                    testOpts = { allowBodyOverflow: true, gridOuterMargin: 10, gridPadding: 0};
                    layout.initialize(testOpts);
                    cardLayout = layout.getCardLayout(100, 100, 2, 2, 0, 0, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:40,height:40});
                });
            });

            // Inner margins
            describe("2x2, 100x100, padding 10", function() {
                it("10 pixels in and 10 pixel gutters", function() {
                    testOpts = { allowBodyOverflow: true, gridOuterMargin: 0, gridPadding: 10};
                    layout.initialize(testOpts);
                    // upper left
                    cardLayout = layout.getCardLayout(100, 100, 2, 2, 0, 0, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:45,height:45});
                    // upper right
                    cardLayout = layout.getCardLayout(100, 100, 2, 2, 0, 1, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:65,width:45,height:45});
                });
            });

            // 5 block test like starting home.
            describe("home page test", function() {
                it("5 blocks", function() {
                    testOpts = { allowBodyOverflow: true, gridOuterMargin: 10, gridPadding: 10};
                    layout.initialize(testOpts);
                    // Cell 1
                    cardLayout = layout.getCardLayout(1000, 1000, 2, 4, 0, 0, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:0,width:232,height:485});
                    // Cell 2
                    cardLayout = layout.getCardLayout(1000, 1000, 2, 4, 0, 1, 1, 1);
                    expect(cardLayout).toEqual({top:0,left:252,width:232,height:485});
                    // Cell 3
                    cardLayout = layout.getCardLayout(1000, 1000, 2, 4, 0, 2, 1, 2);
                    expect(cardLayout).toEqual({top:0,left:504,width:484,height:485});
                    // Cell 4
                    cardLayout = layout.getCardLayout(1000, 1000, 2, 4, 1, 0, 1, 2);
                    expect(cardLayout).toEqual({top:505,left:0,width:484,height:485});
                    // Cell 5
                    cardLayout = layout.getCardLayout(1000, 1000, 2, 4, 1, 2, 1, 2);
                    expect(cardLayout).toEqual({top:505,left:504,width:484,height:485});
                });
            });

        });
    });
}(window, jQuery));