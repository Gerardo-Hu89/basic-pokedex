import { useState } from 'react';
import { PokemonData } from '../utils/types';
import { getLabelColor, pokemons } from '../utils/utils';
import './styles.css';

export const Body = (): JSX.Element => {
  const [data, setData] = useState<Array<PokemonData>>(pokemons.slice(0, 12));

  const getNext = (): void => {
    const getNextPokemons = pokemons.slice(data.length, data.length + 12);
    const mergePokemons = [...data, ...getNextPokemons];
    setData(mergePokemons);
  };

  console.log(data);
  // mobile, tablet, desktop, widescreen, fullhd

  return (
    <div className='section'>
      <div className='columns is-multiline'>
        {data.map((item: PokemonData) => {
          return (
            <div
              key={`${item.name}`}
              className='swing column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen'
            >
              <div className='has-text-centered' style={{ background: '#f2f2f2' }}>
                <img src={item.ThumbnailImage} alt={item.ThumbnailAltText} />
              </div>
              <span style={{ color: '#919191', fontSize: '80%', paddingTop: '2px' }}>
                #{item.number}
              </span>
              <h5 className='title is-5'>{item.name}</h5>
              <div className='buttons'>
                {item.type.map((type) => getLabelColor(type, item.name))}
              </div>
            </div>
          );
        })}
      </div>
      <div className='columns is-mobile is-multiline is-centered'>
        <div className='column is-half has-text-centered'>
          <button onClick={getNext} className='button is-dark'>
            See more
          </button>
        </div>
      </div>
    </div>
  );
};
