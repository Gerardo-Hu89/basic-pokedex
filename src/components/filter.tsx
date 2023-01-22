import { useContext } from 'react';
import { AppContext } from 'context/appContext';
import { getTypes } from 'utils/utils';

export const Filter = (): JSX.Element => {
  const context = useContext(AppContext);

  const changeType = (type: string) => {
    context?.setType(type);
  };

  return (
    <div className='pl-6 columns'>
      <div className='column'>
        <span className='is-size-4'>Filter by:</span>
        <br />
        <div className='select is-rounded'>
          <select onChange={(e) => changeType(e.target.value)}>
            <option value={'nothing'}>- Nothing -</option>
            {getTypes().map((item) => (
              // TODO: Make first letter capital
              <option key={`type-${item}`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <div className='column'>
        <span className='is-size-4'>Sort by:</span>
        <br />
        <div className='select is-rounded'>
          <select onChange={(e) => console.log(e.target.value)}>
            <option value={'nothing'}>- Nothing -</option>
            {getSortBy.map((item) => (
              // TODO: Make first letter capital
              <option key={`type-${item.label}`} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div> */}
      {/* <div className='column'>
        <span className='is-size-4'>Search:</span>
        <br />
        <div className='select is-rounded'>
          <select onChange={(e) => changeType(e.target.value)}>
            <option value={'nothing'}>- Nothing -</option>
            {getTypes().map((item) => (
              // TODO: Make first letter capital
              <option key={`type-${item}`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div> */}
    </div>
  );
};
