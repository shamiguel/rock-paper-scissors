var Hand;
(function (Hand) {
    Hand["Rock"] = "Rock";
    Hand["Paper"] = "Paper";
    Hand["Scissor"] = "Scissor";
})(Hand || (Hand = {}));
var Result;
(function (Result) {
    Result["Win"] = "Win";
    Result["Lose"] = "Lose";
    Result["Draw"] = "Draw";
})(Result || (Result = {}));
class User {
    constructor(name, age, email, winstreak) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.winstreak = [];
    }
    play(enumValues) {
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex];
    }
    throw(hand) {
        const enumValues = Object.keys(Hand);
        const computer = this.play(enumValues);
        if (hand === Hand.Rock) {
            if (computer === Hand.Rock) {
                this.winstreak.push(Result.Draw);
                console.log("Draw");
            }
            else if (computer === Hand.Paper) {
                this.winstreak.push(Result.Lose);
                console.log("You Lose :(");
            }
            else {
                this.winstreak.push(Result.Win);
                console.log("You Win!!!");
            }
        }
        else if (hand === Hand.Paper) {
            if (computer === Hand.Rock) {
                this.winstreak.push(Result.Win);
                console.log("You Win!!!");
            }
            else if (computer === Hand.Paper) {
                this.winstreak.push(Result.Draw);
                console.log("Draw");
            }
            else {
                this.winstreak.push(Result.Lose);
                console.log("You Lose :(");
            }
        }
        else { //Hand.Scissors
            if (computer === Hand.Rock) {
                this.winstreak.push(Result.Lose);
                console.log("You Lose!!!");
            }
            else if (computer === Hand.Paper) {
                this.winstreak.push(Result.Win);
                console.log("You Win!!!");
            }
            else {
                this.winstreak.push(Result.Draw);
                console.log("Draw");
            }
        }
    }
    winnings() {
        const winnings = {};
        for (const result of this.winstreak) {
            winnings[result] = winnings[result] ? winnings[result] + 1 : 1;
        }
        console.log("Here are Your Results: ");
        for (const result in winnings) {
            console.log(result, winnings[result]);
        }
    }
}
const user = new User("shami", 28, "shami@google.com", []);
user.throw(Hand.Rock);
user.throw(Hand.Rock);
user.throw(Hand.Rock);
user.winnings();
