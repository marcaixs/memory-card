export default function Card({pokemon, selectedPokemons, setSelectedPokemons}){
    
    return(
        <div className="card" key={pokemon.id} onClick={()=> setSelectedPokemons([...selectedPokemons, pokemon.id])}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
        </div>
    )
}