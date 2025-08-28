export default function Card({pokemon, selectedPokemons, setSelectedPokemons, currentScore, setCurrentScore, gameOver, setGameOver}){
    //function that executes on onClick card listener
    function cardClick(pokemon, selectedPokemons, setSelectedPokemons, currentScore, setCurrentScore, gameOver, setGameOver){
        const found = selectedPokemons.find((element)=> element == pokemon.id) //check if the pokemon is already selected
            if(!found){ //if not, add to the selected pokemons array
                setSelectedPokemons([...selectedPokemons, pokemon.id]);
                setCurrentScore(currentScore + 1); //and increments score
                if(currentScore == 15) { //if score reach maximum pokemons
                    setSelectedPokemons([]); //clean array of selected pokemons
                    alert('You Win!') //display game over alert
                    setGameOver(!gameOver) //update game over state
                }
            } else { //if the pokemon has already been selected
                alert('Game Over!') //display game over alert
                setCurrentScore(0); //set current score to 0
                setSelectedPokemons([]); //clean array of selected pokemons
                setGameOver(!gameOver); //update the gameOver state
            }
    }

    return(
        <div className="card" key={pokemon.id} onClick={()=>
            cardClick(pokemon, selectedPokemons, setSelectedPokemons, currentScore, setCurrentScore, gameOver, setGameOver)}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
        </div>
    )
}