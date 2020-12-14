import { useState } from 'react'
import Axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const fetchPokemon = async (name) => {
  if (name === '' || name === null) {
    return {}
  }

  const response = await Axios.get(`${API_URL}${name}`)
  return response.data
}

export default function Home() {
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')

  return (
    <div className='flex flex-col p-20'>
      <div className='flex flex-row justify-center items-center'>
        <input
          value={name}
          className='p-2 border border-grey-200'
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              const pokemonData = await fetchPokemon(name)
              setPicture(pokemonData.sprites.front_default)
            }
          }}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex flex-row justify-center items-center mt-8'>
        <div>
          { picture && <img src={picture} /> }
          { !picture && <h1>Busca un pokémon y presiona Enter</h1> }
        </div>
      </div>
    </div>
  )
}
