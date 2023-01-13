import { useContext } from 'react';
import { getTypes } from 'utils/utils';
import { AppContext } from 'context/appContext';

export const Filter = (): JSX.Element => {
  const context = useContext(AppContext);

  const changeType = (type: string) => {
    context?.setType(type);
  };

  return (
    <div className='section'>
      <div className='select'>
        <span className='is-size-4'>Filter by:</span>
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
  );
};
