import { useContext } from 'react';
import { AppContext } from '../context/appContext';

export const GoToTopButton = (): JSX.Element => {
  const context = useContext(AppContext);

  return (
    <>
      {context?.showButton && !context.isOnTop && (
        <div
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }
          style={{ position: 'absolute' }}
        >
          <button
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '30px',
              zIndex: '99',
              padding: '15px',
            }}
            className='button is-info'
          >
            Back to top
          </button>
        </div>
      )}
    </>
  );
};
