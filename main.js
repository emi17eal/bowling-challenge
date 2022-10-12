
document.addEventListener('DOMContentLoaded', () => {
    let game = new Game()

    let framesPlayed = 0
    let currFrame = []

    const rolls = document.getElementById("rolls").children
    
    const updateScore = () => {
        const scores = document.getElementById("scores").children
        for (let i = 1; i <= framesPlayed; i++) {
            frame = scores[i] 
            frame.innerHTML = game.score(i)
        }
    }

    const updateButtons = () => {
        if (framesPlayed == 9) {
            if ((currFrame[0] + currFrame[1]) % 10 === 0) {
                spare.disabled = true
                strike.disabled = false
            }
            for (let i = 1; i < 10; i++) {
                const button = document.getElementById(`${i}`)
                if (currFrame.length == 1) {
                    button.disabled = currFrame[0] + i > 9 ? true : false
                    if (currFrame[0] !== 10) spare.disabled = false
                }
                else if (currFrame.length == 2) {
                    button.disabled = 10 - ((currFrame[0] + currFrame[1]) % 10) < i ? true : false
                }
            }

        }
        else {
            strike.disabled = currFrame.length > 0 ? true : false
            spare.disabled = currFrame.length == 1 ? false : true
            for (let i = 1; i < 10; i++) {
                const button = document.getElementById(`${i}`)
                button.disabled = currFrame.length > 0 && currFrame[0] + i > 9 ? true : false
            }
        }
    }
    
    for (let i = 1; i < 10; i++) {
        const button = document.getElementById(`${i}`)
        button.addEventListener("click", () => {
            currFrame.push(i)
            rolls[2 * framesPlayed + currFrame.length].innerHTML = i
            if (framesPlayed === 9) {
                if (currFrame.length == 2 && currFrame.reduce((a, b) => (a + b)) < 10) {
                    game.addFinalFrame(currFrame[0], currFrame[1])
                    framesPlayed++
                }
                else if (currFrame.length == 3) {
                    game.addFinalFrame(currFrame[0], currFrame[1], currFrame[2])
                    framesPlayed++
                }
            }
            
            else if (currFrame.length > 1) {
                game.addFrame(currFrame[0], currFrame[1])
                currFrame = []
                framesPlayed++
            }
            updateScore()
            updateButtons()
        })
    }

    const strike = document.getElementById("X")

    strike.addEventListener("click", () => {
        if (framesPlayed === 9) {
            currFrame.push(10)
            rolls[2 * (framesPlayed) + currFrame.length].innerHTML = "X"
            if (currFrame.length == 3) {
                game.addFinalFrame(currFrame[0], currFrame[1], currFrame[2])
                framesPlayed++
                updateScore()
            }
        }
        else if (currFrame.length > 0) throw("Can only strike on first roll")
        else if (currFrame.length == 0) {
            rolls[2 * (1 + framesPlayed)].innerHTML = "X"
            game.addFrame(10)
            framesPlayed++
            updateScore()
        }
        updateButtons()
    })

    const spare = document.getElementById("/")

    spare.addEventListener("click", () => {
        rolls[2 * (1 + framesPlayed)].innerHTML = "/"
        if (framesPlayed === 9) {
            currFrame.push(10 - currFrame[0])
        }
        else if (currFrame.length == 2 || 0) throw("Can only spare on second roll")
        else {
            game.addFrame(currFrame[0], 10 - currFrame[0])
            currFrame = []
            framesPlayed++
            updateScore()
        }
        updateButtons()
    })
    
    
})

