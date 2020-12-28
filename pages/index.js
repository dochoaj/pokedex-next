import { useState } from 'react'
import Axios from 'axios'
//import not_found from '../public/not_found.jpg';
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const not_found='https://ih1.redbubble.net/image.731955034.9007/flat,375x500,075,f.u3.jpg'
const logo= 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png'

const fetchPokemon = async (name) => {
  if (name === '' || name === null) {
    return {}
  }
  let apiRes = null;
  try {
    const response = await Axios.get(`${API_URL}${name}`)
	return response.data
  } catch (err) {
    apiRes = err.response;
	if(apiRes.status==404){
		return apiRes.status
	}
  }
}
function Abilities(data) {
  const abilities = data.abilities;
  const listItems = abilities.map((ability) =>
    <li>-{ability.ability.name}</li>
  );
  return (
		  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			<dt className="text-sm font-medium text-gray-500">
			  Habilidad(es):
			</dt>
			<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
			  <ul>{listItems}</ul>				  
			</dd>
		  </div>    
  );
}
function Image(picture){
	return 	 (<div className="flex flex-row justify-center items-center">
				<img src={picture.name}/> 
			  </div>)
}
function Information(pokemon) {
    return (
			<div>
			  <div className="bg-gray-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500">
					Tipo:
				</dt>
				<dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
				  {pokemon.data.types[0].type.name}
				</dd>
			  </div>
			  <div className="bg-white px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500">
				  Altura:
				</dt>
				<dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
				  {pokemon.data.height}
				</dd>
			  </div>
			  <div className="bg-gray-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500">
				  Peso:
				</dt>
				<dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
				  {pokemon.data.weight}
				</dd>
			  </div>
			</div>
  );
}


export default function Home() {
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')
  const [pokemon, setPokemon] = useState('')
  
  return (
		<div className='flex flex-col p-5'>
		  <div className='flex flex-row'>

		        <div className="justify-left items-left flex-1">
						<div>
							<img src={logo} height='180' width='180'/> 
						</div>
						<input
						  value={name}
						  className='p-2 border border-grey-200'
						  onKeyDown={async (e) => {
							if (e.key === 'Enter') {
							  const pokemonData = await fetchPokemon(name)
							  
							  {!!pokemonData && pokemonData!=404			  &&
								  setPicture(pokemonData.sprites.front_default)
								  setPokemon(pokemonData)
							  }
							  { pokemonData==404 && 
								  setPicture(not_found)
							  }
							}
						  }}
						  onChange={(e) => setName(e.target.value)}
						/>
					
					
					 <div className="text-s text-black text flex-1">Busca un pokémon y presiona Enter</div>
					{!!pokemon && pokemon==404 && <div className="text-s text-red-500 flex-1">Pokémon '{name}' no existe. Por favor intente nuevamente</div>}
					
				</div>
				<div>
					<div className='flex flex-row justify-center items-center'>	
					  { picture && pokemon &&		    			
							<div className="bg-white shadow overflow-hidden sm:rounded-lg">
								<Image name={picture}/>
								{pokemon!=404 &&
									<div className="border-t border-gray-200">
										<dl>
											<Information data={pokemon}/>
											<Abilities abilities={pokemon.abilities} />
										</dl>
									</div>  
								}
							</div>			
					  }
					</div>
				</div>
		  </div>
		</div>


  )
}
