import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const BASE_URL = 'https://rickandmortyapi.com/api/character'

function Rick() {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [ search, setSearch] = useState('');

    useEffect(() => {
        let aborted = false
        async function fetchAllChars() {
            try {
                let allCharacters = [];
                let nextUrl = BASE_URL;

                while (nextUrl) {
                    const res = await fetch(nextUrl);
                    if (!res.ok) throw new Error(`Failed with status ${res.status}`);

                    const data = await res.json();
                    allCharacters = allCharacters.concat(data.results);
                    nextUrl = data.info.next;

                    if (aborted) break;

                }

                if (!aborted) {
                    console.log("Characters fetched: ", allCharacters);
                    setCharacters(allCharacters);
                }

            } catch (err) {
                if (!aborted) setError(err.message);
                console.log('Error fetching all data:', err )
            }
        }
        fetchAllChars();

        return () => {
            aborted = true;
        };
    }, [])



// search

 const handleSearch = (event) =>{
        setSearch(event.target.value)
    }

    const filteredChars = characters.filter(character => 
        character.name.toLowerCase().includes(search.toLowerCase()) 
    );



    function Delete (idTODelete)  {
        const currentchars = characters.filter( chars => chars.id !== idTODelete)
         setCharacters(currentchars);

    }


    if (error) return <div className='p-4 text-red-600'>Error: {error} </div>
  return (
    <div className='p-4'>
        <h2 className='font-semibold mb-4 text-center'>Rick and Morty characters ({characters.length})</h2>
          
          <input className='border-1 rounded py-1 ' onChange={handleSearch} type="search" name='search' placeholder='SEARCH .....'/>


        <div className='mt-6'>
            {filteredChars.map((char) => (
                <div class= "display:inline-block space-x-8" key={char.id}>
                    <Link to={`/character/${char.id}`}> 

                    <img class = "space-x-2 "src={char.image} /> 
                    <h3>{char.name}</h3>
                    </Link>
                     <button class = "bg-blue-600 px-3 rounded hover:text-white mt-3  " onClick={() => Delete (char.id)} > DELETE ME </button>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default Rick