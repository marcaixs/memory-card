export default function Card({pokemon, selectedPokemons, setSelectedPokemons, currentScore, setCurrentScore, gameOver, setGameOver}){
    
    return(
        <div className="card" key={pokemon.id} onClick={()=>{
            const found = selectedPokemons.find((element)=> element == pokemon.id)
            if(!found){
                setSelectedPokemons([...selectedPokemons, pokemon.id]);
                setCurrentScore(currentScore + 1);
            } else {
                alert('Game Over!')
                setCurrentScore(0);
                setGameOver(!gameOver);
            }
           
        }}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
        </div>
    )
}