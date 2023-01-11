import { useCallback, useEffect, useRef, useState } from 'react';
import { PokemonData } from '../utils/types';
import { getLabelColor, pokemons } from '../utils/utils';
import './styles.css';

export const Body = (): JSX.Element => {
  const [startInifinite, setStartInfinite] = useState(false);
  const [data, setData] = useState<Array<PokemonData>>(pokemons.slice(0, 12));
  const observerElement = useRef(null);

  const getNext = useCallback(() => {
    const getNextPokemons = pokemons.slice(data.length, data.length + 12);
    const mergePokemons = [...data, ...getNextPokemons];
    setData(mergePokemons);
  }, [data]);

  const hideButton = () => {
    setStartInfinite(true);
    getNext();
  };

  console.log(data.length, pokemons.length);
  // mobile, tablet, desktop, widescreen, fullhd

  const handleObserver = useCallback(
    (entries: any) => {
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
      <div className='columns is-multiline'>
        {data.map((item: PokemonData) => {
          return (
            <div
              key={`${item.name}`}
              className='swing column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen'
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
