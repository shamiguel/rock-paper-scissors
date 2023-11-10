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
import { User } from './user.js';
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
            p.outro(`${color.bgMagenta(color.black('Thanks for playing! Goodbye! '))}`);
        }
        else {
            p.outro(`${color.bgMagenta(color.black('Okie Goodbye! '))}`);
        }
    });
}
main();
