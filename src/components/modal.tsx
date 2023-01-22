import { useState } from 'react';
import { PokemonData } from 'utils/types';
import { getLabelColor, inchesToFeet } from 'utils/utils';

interface Props {
  isVisible: boolean;
  pokemon?: PokemonData;
  setIsVisible: () => void;
}

interface LabelProps {
  name: string;
  label: string;
  text: string | string[];
}

const Labels = ({ name, label, text }: LabelProps): JSX.Element => (
  <div className='column labels'>
    <span className='has-text-weight-bold'>{label}</span>
    <br />
    <span className='is-size-4 has-text-black'>
      {typeof text === 'string'
        ? text
        : text.map((item) => (
            <span key={`${name}-${item}`}>
              {item} <br />
            </span>
          ))}
    </span>
  </div>
);

const GetCategories = ({
  categories,
  label,
}: {
  label: string;
  categories: JSX.Element[];
}): JSX.Element => (
  <div className='column is-half'>
    <span className='is-size-6 has-text-weight-bold'>{label}</span>
    <div className='buttons mt-3'>{categories}</div>
  </div>
);

export const Modal = ({ isVisible, setIsVisible, pokemon }: Props): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {pokemon && (
        <div className={`modal ${isVisible ? 'is-active' : ''}`}>
          <div className='modal-background' onClick={setIsVisible} />
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>
                {pokemon.name} #{pokemon.number}
              </p>
              <button className='delete' aria-label='close' onClick={setIsVisible}></button>
            </header>
            <section className='modal-card-body'>
              <div className='rows'>
                <div className='row'>
                  <div className='columns is-desktop is-vcentered'>
                    <div className='has-text-centered column is-full-mobile is-full-tablet is-two-fifths-desktop'>
                      {!isLoaded && (
                        <div
                          style={{ width: '100px', height: '100px', margin: '50px 0 50px 50px' }}
                          className='loader is-loading'
                        />
                      )}
                      <img
                        src={pokemon.ThumbnailImage}
                        alt={pokemon.ThumbnailAltText}
                        onLoad={() => setIsLoaded(true)}
                      />
                    </div>
                    <div className='column is-full-mobile is-full-tablet is-three-fifths-desktop'>
                      <div
                        className='notification'
                        style={{ minHeight: '100%', background: '#30a7d7' }}
                      >
                        <div className='rows'>
                          <div className='row is-full'>
                            <div className='columns'>
                              <Labels
                                label='Height'
                                name={pokemon.name}
                                text={inchesToFeet(pokemon.height)}
                              />
                              <Labels
                                label='Weight'
                                name={pokemon.name}
                                text={`${pokemon.weight} lbs`}
                              />
                            </div>
                          </div>
                          {!!pokemon.abilities.length && (
                            <div className='row is-full'>
                              <div className='columns'>
                                <Labels
                                  label='Abilities'
                                  name={pokemon.name}
                                  text={pokemon.abilities.map((item) => item)}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='rows'>
                <div className='row'>
                  <div className='columns'>
                    <GetCategories
                      label='Type'
                      categories={pokemon.type.map((item) => getLabelColor(item, pokemon.name))}
                    />
                    <GetCategories
                      label='Weaknesses'
                      categories={pokemon.weakness.map((item) =>
                        getLabelColor(item.toLowerCase(), pokemon.name),
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>
            <footer className='modal-card-foot'>
              <button className='button is-danger' onClick={setIsVisible}>
                Close
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
