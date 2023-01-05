import PkmList from '../data/pokemon.min.json';

export const Body = (): JSX.Element => {
  return (
    <div className='section'>
      <div className='columns is-multiline'>
        <Pokemons />
      </div>
    </div>
  );
};

type PokemonData = {
  id: number;
  name: string;
  slug: string;
  type: string[];
  height: number;
  number: string;
  weight: number;
  featured: string;
  weakness: string[];
  abilities: string[];
  detailPageURL: string;
  ThumbnailImage: string;
  ThumbnailAltText: string;
  collectibles_slug: string;
};

const Pokemons = (): JSX.Element => {
  return (
    <>
      {PkmList.map((item: PokemonData) => {
        return (
          <div key={`${item.name}`} className='column is-one-quarter'>
            {item.name}
          </div>
        );
      })}
    </>
  );
};
