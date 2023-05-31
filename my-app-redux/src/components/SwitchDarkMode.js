import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from '../hooks/useDarkMode';
import { toggleDarkMode } from '../redux-toolkit/globalSlice';

const SwitchDarkMode = () => {
  const darkMode = useSelector(state => state.global.darkMode);
  const [enabled, setEnabledState] = useDarkMode();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDarkMode(enabled));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleToggleDarkMode = () => {
    setEnabledState(!enabled);
    dispatch(toggleDarkMode(enabled));
  };
  return (
    <div>
      <button
        onClick={handleToggleDarkMode}
        className="block p-4 font-semibold text-center text-white bg-blue-500 card-details rounded-2xl mt-2 m-auto">
        Toggle DarkMode
      </button>
    </div>
  );
};

export default SwitchDarkMode;
