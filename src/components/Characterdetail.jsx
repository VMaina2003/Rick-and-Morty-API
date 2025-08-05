// CharacterDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    async function fetchCharacter() {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!res.ok) throw new Error('Failed to fetch character');
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchCharacter();
  }, [id]);

  if (error) return <div className="p-6 text-center text-red-500 font-semibold">Error: {error}</div>;
  if (!character) return <div className="p-6 text-center text-gray-300">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg mt-10">

      <Link to="/" className="text-green-400 hover:underline mb-6 inline-block text-sm font-medium" >
        ← Back to Characters
      </Link>

      <h2 className="text-3xl font-bold text-green-300 mb-4 text-center">{character.name}</h2>

      <img 
        src={character.image} 
        alt={character.name} 
        className="w-full  object-cover  mb-6 shadow-md border-4 rounded-full border-green-600"
      />

      <ul className="space-y-3 text-lg text-gray-300">
        <li><span className="font-semibold text-green-400">Status:</span> {character.status}</li>
        <li><span className="font-semibold text-green-400">Species:</span> {character.species}</li>
        <li><span className="font-semibold text-green-400">Type:</span> {character.type || 'N/A'}</li>
        <li><span className="font-semibold text-green-400">Gender:</span> {character.gender}</li>
        <li><span className="font-semibold text-green-400">Origin:</span> {character.origin?.name}</li>
        <li><span className="font-semibold text-green-400">Location:</span> {character.location?.name}</li>
      </ul>
    </div>
  );
}

export default CharacterDetail;
