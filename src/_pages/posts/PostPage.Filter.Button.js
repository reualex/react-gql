import React from 'react';

import Button from '@mui/material/Button';
import { toggleOpen } from '_store/modalContext';
import { useDispatch } from 'react-redux';

export const PostPageFilterButton = ({ title = 'Filter', styles, afterClose = () => {} }) => {
  const dispatch = useDispatch();

  const handleCLick = () => {
    dispatch(toggleOpen());
    afterClose();
  };

  return (
    <>
      <Button style={styles} type="button" variant="contained" onClick={handleCLick}>
        {title}
      </Button>
    </>
  );
};
