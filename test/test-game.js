'use strict';

var game = require("../game.js");
var engine = game.createInstance();

describe('Horizontal win check', function () {
    it('Player 1 (red) wins horizontally', function (done) {
        engine.reset();
        engine.makeMove(1,0);
        engine.makeMove(1,1);
        engine.makeMove(1,2);
        engine.makeMove(1,3);

        var winner = engine.getWinner();
        winner.should.equal(1);

        done();
    });
});

describe('Vertical win check', function () {
    it('Player 2 (black) wins vertically.', function (done) {
        engine.reset();
        engine.makeMove(2,0);
        engine.makeMove(2,0);
        engine.makeMove(2,0);
        engine.makeMove(2,0);

        var winner = engine.getWinner();
        winner.should.equal(2);

        done();
    });
});

describe('Downward right diagonal win check', function () {
    it('Player 2 (black) wins diagonally.', function (done) {
        engine.reset();

        engine.makeMove(1,0);
        engine.makeMove(1,0);
        engine.makeMove(1,0);
        engine.makeMove(1,1);
        engine.makeMove(1,1);
        engine.makeMove(1,2);

        engine.makeMove(2,0);
        engine.makeMove(2,1);
        engine.makeMove(2,2);
        engine.makeMove(2,3);

        var winner = engine.getWinner();
        winner.should.equal(2);

        done();
    });
});

describe('Downward left diagonal win check', function () {
    it('Player 1 (red) wins diagonally.', function (done) {
        engine.reset();

        engine.makeMove(2,3);
        engine.makeMove(2,3);
        engine.makeMove(2,3);
        engine.makeMove(2,2);
        engine.makeMove(2,2);
        engine.makeMove(2,1);

        engine.makeMove(1,0);
        engine.makeMove(1,1);
        engine.makeMove(1,2);
        engine.makeMove(1,3);

        var winner = engine.getWinner();
        winner.should.equal(1);

        done();
    });
});






