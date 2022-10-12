class Game {
    constructor () {
        this.frames = []
        this.current = 0
        for (let i = 0; i < 9; i++) {
            this.frames.push([0,0])  //preventing out of range / undefined
        }
    }

    addFrame (first, second = 0) {
        if (first + second > 10) throw("Max score is 10")
        else this.frames[this.current] = [first, second]
        this.current++
    }

    addFinalFrame (first, second, third = 0) {
        if (first + second > 20) throw("Error")
        this.frames.push([first, second, third])
    }

    frameTotal (index) {
        return this.frames[index].reduce((a, b) => (a + b))
    }

    isSpare (index) {
        return this.frameTotal(index) === 10
    }

    isStrike (index) {
        return this.frames[index][0] === 10
    }

    strikeBonus (index) {
        if (this.isStrike(index + 1)) {
            if (index === 8) {
                return 10 + this.frames[index + 1][1]
            } else {
                return this.frameTotal(index + 1) + this.frames[index + 2][0];
            }
        }
        return this.frameTotal(index + 1)
    }

    spareBonus (index) {
        return this.frames[index + 1][0]
    }

    score (framesPlayed) {
        let score = 0

        for ( let i = 0; i < framesPlayed;  i++) {
            if (i === 9) {
                score += this.frameTotal(i)
            }
            else {
                if (this.isStrike(i)) {
                    score += 10 + this.strikeBonus(i) 
                } 
                else if (this.isSpare(i)) {
                    score += 10 + this.spareBonus(i)
                }
                else {
                    score += this.frameTotal(i)
                }
            }
            console.log(score)

        }
        return score;
    }
}

module.exports = Game