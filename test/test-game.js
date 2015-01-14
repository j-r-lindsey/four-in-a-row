'use strict';

describe('Win check', function () {
    it('Player 1 (red) should be a winner', function (done) {
        var engine = require("../game.js");

        engine.makeMove(1,0);
        engine.makeMove(1,1);
        engine.makeMove(1,2);
        engine.makeMove(1,3);

        var winner = engine.getWinner();
        winner.should.equal(1);

        done();
    });
});




