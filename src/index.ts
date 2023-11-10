import * as p from "@clack/prompts";
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import {User} from './user.js'

async function main(){
    console.clear();
    const newPlayer = new User();
    await setTimeout(1000);
   
    p.intro(`${color.bgMagenta(color.black(' Welcome to Rock Paper Scissors! '))}`);

    const name = await p.text({
		message: "First, whats your name?",
		initialValue: "",
        validate(value){
            if (value.length === 0){
                return "Name is required"
            }else{
                newPlayer.name = value;
            }
        }
	});

    const greeting = p.text({
        message: `Welcome ${newPlayer.name!}`
    })
    
    const ready = await p.select({
        message: `Are you ready to play?`,
        options: [
            {value: "y", label: "Yes!"},
            {value: "n", label: "No."}
        ]
    })

    if(ready === "y"){

        const start = p.text({
            message: `Lets Play 3 Rounds`
        })

        const round1 = await p.select({
            message: `Choose your hand:`,
            options: [
                {value: "Paper", label: "Paper"},
                {value: "Rock", label: "Rock"},
                {value: "Scissor", label: "Scissors"}
            ],
        })

        const round1Result = newPlayer.throw(round1);

        const round2 = await p.select({
            message: `${round1Result} Next Hand: `,
            options: [
                {value: "Paper", label: "Paper"},
                {value: "Rock", label: "Rock"},
                {value: "Scissor", label: "Scissors"}
            ],
        })

        const round2Result = newPlayer.throw(round2);

        const round3 = await p.select({
            message: `${round2Result} Next Hand: `,
            options: [
                {value: "Paper", label: "Paper"},
                {value: "Rock", label: "Rock"},
                {value: "Scissor", label: "Scissors"}
            ],
        })

        const round3Result = newPlayer.throw(round3);

        const lastRoundMessage = p.text({
            message: `${round3Result}`
        })

        const end = await p.text({
            message: `Match Done! Here's how you did: ${newPlayer.winnings()} `,
            
        })

        p.outro(`${color.bgMagenta(color.black('Thanks for playing! Goodbye! '))}`)
    }else{
        p.outro(`${color.bgMagenta(color.black('Okie Goodbye! '))}`);
    }
}

main()
