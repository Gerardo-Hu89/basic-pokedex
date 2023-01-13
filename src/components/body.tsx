import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/appContext';
import { PokemonData } from '../utils/types';
import { getLabelColor, pokemons } from '../utils/utils';
import { Modal } from './modal';
import './styles.css';

export const Body = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [startInifinite, setStartInfinite] = useState(false);
  const [data, setData] = useState<Array<PokemonData>>(pokemons.slice(0, 12));
  const [pokemonData, setPokemonData] = useState<PokemonData | undefined>(undefined);
  const observerElement = useRef(null);
  const context = useContext(AppContext);

  const getNext = useCallback((): void => {
    const getNextPokemons = pokemons.slice(data.length, data.length + 12);
    const mergePokemons = [...data, ...getNextPokemons];
    setData(mergePokemons);
  }, [data]);

  const hideButton = (): void => {
    context?.setShowButton(true);
    setStartInfinite(true);
    getNext();
  };

  const setModalVisibility = (pokemon?: PokemonData): void => {
    !isVisible ? setPokemonData(pokemon) : setPokemonData(undefined);
    setIsVisible(!isVisible);
  };

  const handleObserver = useCallback(
    (entries: any): void => {
      const isEnd = data.length !== pokemons.length;
      const [target] = entries as [Record<string, string>];
      if (target.isIntersecting && startInifinite && isEnd) {
        getNext();
      }
    },
    [data.length, getNext, startInifinite],
  );

  useEffect(() => {
    const option = { threshold: 0 };
    const element = observerElement.current;
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element as unknown as Element);

    return () => observer.unobserve(element as unknown as Element);
  }, [handleObserver]);

  return (
    <div className='section'>
      {isVisible && (
        <Modal isVisible={isVisible} setIsVisible={setModalVisibility} pokemon={pokemonData} />
      )}
      <div className='columns is-multiline'>
        {data.map((item: PokemonData) => {
          return (
            <div
              key={`${item.name}`}
              className='swing column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen'
            >
              <div
                onClick={() => setModalVisibility(item)}
                className='has-text-centered'
                style={{ background: '#f2f2f2', cursor: 'pointer' }}
              >
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
        <div ref={observerElement} className='column is-half has-text-centered'>
          {!startInifinite && (
            <button onClick={hideButton} className='button is-dark'>
              See more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
