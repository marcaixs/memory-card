export default function Card({pokemon}){
    console.log(pokemon)
    return(
    <div className="card" key={pokemon.id}>
        <img src={pokemon.sprites.front_default} alt="" />
        <p>{pokemon.name}</p>
    </div>
    )
}