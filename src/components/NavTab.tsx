import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBicycle,
  faRoute,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';

const NavTab = () => {
  const navigation = useNavigate();
  const [value, setValue] = useState('station');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigation({ pathname: newValue });
  };

  return (
    <Tabs
      value={value}
      variant="fullWidth"
      TabIndicatorProps={{ style: { height: '3px' } }}
      onChange={handleChange}
    >
      <Tab
        icon={<FontAwesomeIcon icon={faBicycle} />}
        label="自行車租借站"
        value="station"
      />
      <Tab
        icon={<FontAwesomeIcon icon={faRoute} />}
        label="自行車路線"
        value="bike"
      />
      <Tab
        icon={<FontAwesomeIcon icon={faUmbrellaBeach} />}
        label="景點"
        value="attraction"
      />
    </Tabs>
  );
};

export default NavTab;
