const { beforeEach } = require("mocha");
const Game = require("../src/game.js")
const assert = require("assert");

/* test cases 
spare scoring
strike scoring
regular scoring
gutter game
all strikes
*/

describe("Game", () => {
    let game;

    beforeEach(() => {
        game = new Game()
    })

    it("Spare scoring", () => {
        game.addFrame(7, 3)
        game.addFrame(5, 3)
        assert.equal(game.score(1), 15)
    })

    it("Strike scoring", () => {
        game.addFrame(10)
        assert.equal(game.score(1), 10)
        game.addFrame(5, 2)
        assert.equal(game.score(1), 17)
        assert.equal(game.score(2), 24)

    })

    it("All 1s", () => {
        for (let i = 0; i < 9; i++) game.addFrame(1, 1)
        game.addFinalFrame(1,1)
        assert.equal(game.score(10), 20)
    })

    it("All 0s", () => {
        for (let i = 0; i < 9; i++) game.addFrame(0, 0)
        game.addFinalFrame(0,0)
        assert.equal(game.score(10), 0)
    })

    it("All strikes", () => {
        for (let i = 0; i < 9; i++) game.addFrame(10)
        game.addFinalFrame(10, 10, 10)
        assert.equal(game.score(10), 300)
    })
})