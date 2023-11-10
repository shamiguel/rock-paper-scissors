
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
    throw<T>(hand:T):string{
    //throw(hand:Hand):string{
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

export {User};