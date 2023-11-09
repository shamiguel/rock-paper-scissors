var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as p from "@clack/prompts";
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const newPlayer = new User();
        yield setTimeout(1000);
        p.intro(`${color.bgMagenta(color.black(' Welcome to Rock Paper Scissors! '))}`);
        const name = yield p.text({
            message: "First, whats your name?",
            initialValue: "",
            validate(value) {
                if (value.length === 0) {
                    return "Name is required";
                }
                else {
                    newPlayer.name = value;
                }
            }
        });
        const greeting = p.text({
            message: `Welcome ${newPlayer.name}`
        });
        const ready = yield p.select({
            message: `Are you ready to play?`,
            options: [
                { value: "y", label: "Yes!" },
                { value: "n", label: "No." }
            ]
        });
        if (ready === "y") {
            const start = p.text({
                message: `Lets Play 3 Rounds`
            });
            const round1 = yield p.select({
                message: `Choose your hand:`,
                options: [
                    { value: "Paper", label: "Paper" },
                    { value: "Rock", label: "Rock" },
                    { value: "Scissor", label: "Scissors" }
                ],
            });
            const round1Result = newPlayer.throw(round1);
            const round2 = yield p.select({
                message: `${round1Result} Next Hand: `,
                options: [
                    { value: "Paper", label: "Paper" },
                    { value: "Rock", label: "Rock" },
                    { value: "Scissor", label: "Scissors" }
                ],
            });
            const round2Result = newPlayer.throw(round2);
            const round3 = yield p.select({
                message: `${round2Result} Next Hand: `,
                options: [
                    { value: "Paper", label: "Paper" },
                    { value: "Rock", label: "Rock" },
                    { value: "Scissor", label: "Scissors" }
                ],
            });
            const round3Result = newPlayer.throw(round3);
            const lastRoundMessage = p.text({
                message: `${round3Result}`
            });
            const end = yield p.text({
                message: `Match Done! Here's how you did: ${newPlayer.winnings()} `,
            });
            p.outro(`${color.bgMagenta(color.black(' Goodbye! '))}`);
        }
        else {
            p.outro(`${color.bgMagenta(color.black(' Goodbye! '))}`);
        }
    });
}
main();
