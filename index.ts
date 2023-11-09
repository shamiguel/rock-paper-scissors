import * as p from "@clack/prompts";
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';

interface Person {
    name?: string,
    winstreak?: Result[]
}

enum Hand {
    Rock = "Rock", 
    Paper = "Paper",
    Scissor = "Scissor"
}

enum Result {
    Win = "Win", 
    Lose = "Lose",
    Draw = "Draw"
}

class User implements Person{
    name: string; 
    winstreak: Result[];

    constructor(){
        this.name = "";
        this.winstreak = [];  
    }

    play<T>(enumValues: T[]): T{
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex]
    }
    //so a hand is a hand, right? 
    throw<T>(hand: T):string{
        const enumValues = Object.keys(Hand);
        const computer = this.play(enumValues);

        if(hand === Hand.Rock){
           if(computer === Hand.Rock ){
            this.winstreak.push(Result.Draw)
            return "It's a Draw."
           }else if(computer === Hand.Paper){
            this.winstreak.push(Result.Lose)
            return("You Lose :(")
           }else{
            this.winstreak.push(Result.Win)
            return("You Win!!!")
           }
        }else if(hand === Hand.Paper){
            if(computer === Hand.Rock ){
             this.winstreak.push(Result.Win)
             return("You Win!!!")
            }else if(computer === Hand.Paper){
             this.winstreak.push(Result.Draw)
             return("Looks like a Draw.")
            }else{
             this.winstreak.push(Result.Lose)
             return("You Lose...")
            }
         }else{ //Hand.Scissors
            if(computer === Hand.Rock ){
                this.winstreak.push(Result.Lose)
                return("You Lose ;___; ")
               }else if(computer === Hand.Paper){
                this.winstreak.push(Result.Win)
                return("You Win!!!")
               }else{
                this.winstreak.push(Result.Draw)
                return("It's a draw")
               }
         }
    }

    winnings():string{
        const winnings = {};
        for(const result of this.winstreak){
            winnings[result] = winnings[result] ? winnings[result] + 1 : 1;
        }
        return `You've won: ${winnings['Win'] ? winnings['Win'] : "0"}, lost: ${winnings['Lose'] ? winnings['Lose'] : "0"}, and tied: ${winnings['Draw'] ? winnings['Draw'] : "0"}`
    }
}

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

        p.outro(`${color.bgMagenta(color.black(' Goodbye! '))}`)
    }else{
        p.outro(`${color.bgMagenta(color.black(' Goodbye! '))}`);
    }
}

main()
