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
    constructor() {
        this.name = "";
        this.winstreak = [];
    }
    play(enumValues) {
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex];
    }
    //so a hand is a hand, right? 
    //throw<T>(hand:T):string{
    throw(hand) {
        const enumValues = Object.keys(Hand);
        const computer = this.play(enumValues);
        if (hand === Hand.Rock) {
            if (computer === Hand.Rock) {
                this.winstreak.push(Result.Draw);
                return "It's a Draw.";
            }
            else if (computer === Hand.Paper) {
                this.winstreak.push(Result.Lose);
                return ("You Lose :(");
            }
            else {
                this.winstreak.push(Result.Win);
                return ("You Win!!!");
            }
        }
        else if (hand === Hand.Paper) {
            if (computer === Hand.Rock) {
                this.winstreak.push(Result.Win);
                return ("You Win!!!");
            }
            else if (computer === Hand.Paper) {
                this.winstreak.push(Result.Draw);
                return ("Looks like a Draw.");
            }
            else {
                this.winstreak.push(Result.Lose);
                return ("You Lose...");
            }
        }
        else { //Hand.Scissors
            if (computer === Hand.Rock) {
                this.winstreak.push(Result.Lose);
                return ("You Lose ;___; ");
            }
            else if (computer === Hand.Paper) {
                this.winstreak.push(Result.Win);
                return ("You Win!!!");
            }
            else {
                this.winstreak.push(Result.Draw);
                return ("It's a draw");
            }
        }
    }
    winnings() {
        const winnings = {};
        for (const result of this.winstreak) {
            winnings[result] = winnings[result] ? winnings[result] + 1 : 1;
        }
        return `You've won: ${winnings['Win'] ? winnings['Win'] : "0"}, lost: ${winnings['Lose'] ? winnings['Lose'] : "0"}, and tied: ${winnings['Draw'] ? winnings['Draw'] : "0"}`;
    }
}
export { User };
