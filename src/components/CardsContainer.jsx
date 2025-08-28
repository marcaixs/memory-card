import Card from "./Card"
import { useState, useEffect } from 'react'

export default function CardsContainer(){
    const [pokemons, setPokemons] = useState([]); //array of random pokemons fetched from api
    const [selectedPokemons, setSelectedPokemons] = useState([]) //array of pokemon ids selected by user
    const [currentScore, setCurrentScore] = useState(0); //current score of the play
    const [maxScore, setMaxScore] = useState(0); //historical max score
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const promises = []; //store pokemons from the api
                const randomIds = []; //store random ids 

                //create random ids and push into the array only if its unique
                while (randomIds.length < 15){
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
           
    }, [gameOver]); //run effect every time game ends

    //function to shuffle an array. Will use on pokemon to render cards in random order
    function shuffle(array) {
       return array.sort(() => Math.random() - 0.5);
    }
    //calculate if current store is bigger than maxScore. If true, sets new max score
    function maxScoreCalculation(currentScore, maxScore, setMaxScore){
        if (currentScore > maxScore ) setMaxScore(currentScore)
    }
    //call the function
    maxScoreCalculation(currentScore, maxScore, setMaxScore)

    return(
        <>
            <p>Score: {currentScore}</p>
            <p>Max Score: {maxScore}</p>

            <div className="card-container">
                {shuffle(pokemons).map((pokemon)=>
                    <Card pokemon={pokemon} selectedPokemons={selectedPokemons} setSelectedPokemons={setSelectedPokemons} currentScore={currentScore}
                    setCurrentScore={setCurrentScore} gameOver={gameOver} setGameOver={setGameOver}/>
                )}
            </div>
        </> 
       
    )
}