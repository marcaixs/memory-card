import Card from "./Card"
import { useState, useEffect } from 'react'

export default function CardsContainer(){
    const [pokemons, setPokemons] = useState([]); //array of random pokemons fetched from api
    const [selectedPokemons, setSelectedPokemons] = useState([]) //array of pokemon ids selected by user
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const promises = []; //store pokemons from the api
                const randomIds = []; //store random ids 

                //create random ids and push into the array only if its unique
                while (randomIds.length < 10){
                    const randomId = Math.floor(Math.random() * 151) + 1;
                    if(randomIds.indexOf(randomId) === -1) randomIds.push(randomId);
                }
                
                //make a call to the api for each random id stored in the array
                randomIds.map(randomId => promises.push(
                    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(res => res.json())
                ));
                
                // await to end all fetches
                const results = await Promise.all(promises);

                // store in the state
                setPokemons(results);
            } catch (error) {
                console.error(error);
            }
        };
        //call the async function
        fetchPokemons();
           
    }, []);

    //function to shuffle an array. Will use on pokemon to render cards in random order
    function shuffle(array) {
       return array.sort(() => Math.random() - 0.5);
    }

    return( 
        <div className="card-container">
            {shuffle(pokemons).map((pokemon)=>
                <Card pokemon={pokemon} selectedPokemons={selectedPokemons} setSelectedPokemons={setSelectedPokemons}/>
            )}
        </div>
    )
}