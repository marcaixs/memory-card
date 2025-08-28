import Card from "./Card"
import { useState, useEffect } from 'react'

export default function CardsContainer(){
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        
        fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then(response => response.json())
        .then(json => setPokemons([...pokemons, json]))
        .catch(error => console.error(error));
        
    }, []);


    return(
        <div className="card-container">
            {pokemons.map((pokemon)=>
                <Card pokemon={pokemon}/>
            )}
        </div>
    )
}