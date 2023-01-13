import { PokemonData } from './types';
import PkmList from 'data/pokemon.min.json';

export const getLabelColor = (type: string, name: string): JSX.Element => {
  const formatType = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <button
      key={`${name}-${type}`}
      style={{
        minWidth: '40%',
        maxWidth: '40%',
        cursor: 'default',
        fontWeight: 'bold',
      }}
      className={`button is-small ${type}`}
    >
      {formatType}
    </button>
  );
};

// There's some repeated pokemon names collected from the endpoint: https://www.pokemon.com/us/api/pokedex/kalos
// So if the next object's name is not found in the output array, push the object into the output array
export const pokemons = PkmList.reduce((p: PokemonData[], c) => {
  if (!p.some((el: PokemonData) => el.name === c.name)) {
    p.push(c);
  } else {
    // Set the last repeated pokemon
    p[p.length - 1] = c;
  }
  return p;
}, []);

export const getTypes = (): string[] => {
  let asd: string[] = [];
  pokemons.forEach((item) => item.type.forEach((el) => asd.push(el)));
  return Array.from(new Set([...asd]));
};

export const inchesToFeet = (height: number): string => {
  const [feets, inches] = (height / 12).toFixed(2).split('.');
  return `${feets}' ${inches}"`;
};
