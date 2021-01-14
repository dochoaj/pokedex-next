import { useState } from 'react'
import Axios from 'axios'
import Image from 'next/image'
//import not_found from '../public/not_found.jpg';
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const fetchPokemon = async (name) => {
  if (name === '' || name === null) {
    return {}
  }
  let apiRes = null;
  try {
	name=name.toLowerCase()
    const response = await Axios.get(`${API_URL}${name}`)
	return response.data
  } catch (err) {
    apiRes = err.response;
	if(apiRes.status==404){
		return apiRes.status
	}
  }
}

function ListAttributes({items,attr,attrTitle}) {
  const listItems = items.map((el) =>
	<li key={el[attr].name}>-{el[attr].name}</li>
  );
  return (
		  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			<dt className="text-sm font-medium text-gray-500">
				{attrTitle}
			</dt>
			<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
			  <ul>{listItems}</ul>				  
			</dd>
		  </div>    
  );
}

function ImageWrapper(picture){
	console.log(picture)
	return 	 (<div className="flex flex-row justify-center items-center">
<Image loader={picture.name} width={200} height={200} src="/default.png"/> 
			  </div>)
}
function Information(pokemon) {
    return (
			<div>
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
							<Image src='/logo.png' width={200} height={100} /> 
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
								  setPicture('/not_found.jpg')
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
								<ImageWrapper name={picture}/>
								{pokemon!=404 &&
									<div className="border-t border-gray-200">
										<dl>
											<Information data={pokemon}/>
											<ListAttributes items={pokemon.abilities} attr={'ability'} attrTitle={'Habilidad(es)'} />
											<ListAttributes items={pokemon.types} attr={'type'} attrTitle={'Tipo(s)'} />
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
