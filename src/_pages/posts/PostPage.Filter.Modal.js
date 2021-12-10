import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { changeStatuses, cahngeFirstModalRender, isRefetch } from '_store/modalContext';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_LIST_ITEMS } from '_constants';
import { tagsSelector } from '_layers/dataSelectors';
import { useTagsList } from '_layers/gql/hooks';
import { CenterLayout } from '_layers/ui/layouts';

import { PostPageFilterButton } from './PostPage.Filter.Button';

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'blue',
};

const buttonStyles = {
  backgroundColor: 'inherit',
  boxShadow: 'none',
  color: '#fff',
  fontWeight: '600',
};

export const PostPageFilterModal = ({ title = 'Filter' }) => {
  const dispatch = useDispatch();
  const { data, loading } = useTagsList({
    variables: {
      first: LOAD_LIST_ITEMS,
    },
  });
  const tagsList = tagsSelector.getList(data);
  const label = { inputProps: { 'aria-label': 'select filter' } };
  const initCheckBoxes = useSelector(state => state.modal.checkBoxes);
  const firstLoad = useSelector(state => state.modal.firstModalRender);
  const [checkBoxes, setCheckBoxes] = useState(initCheckBoxes);
  useEffect(() => {
    if (!loading && firstLoad) {
      const newCheckboxes = JSON.parse(JSON.stringify(tagsList));
      // eslint-disable-next-line no-return-assign
      newCheckboxes.map(el => (el.status = false));
      setCheckBoxes(newCheckboxes);
      dispatch(cahngeFirstModalRender());
    }
  }, [dispatch, firstLoad, loading, tagsList]);

  const handleChange = (event, index) => {
    // event.preventDefault();
    const newCheckboxes = checkBoxes?.length ? JSON.parse(JSON.stringify(checkBoxes)) : [];
    const checkbox = { ...newCheckboxes[index], status: event.target.checked };
    newCheckboxes.splice(index, 1, checkbox);
    setCheckBoxes(newCheckboxes);
  };

  const afterClose = () => {
    dispatch(changeStatuses(initCheckBoxes));
  };

  const handleApply = () => {
    dispatch(changeStatuses(checkBoxes));
    dispatch(isRefetch(true));
  };

  return (
    <>
      <header style={modalHeaderStyle}>
        <PostPageFilterButton title="X" styles={buttonStyles} afterClose={afterClose} />
        <p>{title}</p>
        <PostPageFilterButton title="apply" styles={buttonStyles} afterClose={handleApply} />
      </header>

      {loading ? (
        <CenterLayout>
          <CircularProgress />
        </CenterLayout>
      ) : (
        <FormGroup>
          {checkBoxes?.map((tag, index) => (
            <FormControlLabel
              key={tag.name}
              control={
                <Checkbox {...label} onChange={e => handleChange(e, index)} checked={tag.status} />
              }
              label={tag.name}
            />
          ))}
        </FormGroup>
      )}
    </>
  );
};
