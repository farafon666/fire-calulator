import React from 'react';
import { CategoryT } from '../../types/calculator';
import { Grid, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Entry from '../Entry';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { openModal } from '../../redux/slices/modal';

type CategoryColumnProps = {
  category: CategoryT;
  text: string;
};

export default function CategoryColumn({ category, text }: CategoryColumnProps) {
  const items = useAppSelector(store => store.calculator[category]);
  const dispatch = useAppDispatch();

  return (
    <Grid container>
      <Grid key={`category ${category}`} item xs={12}>
        <Typography variant='h5' >{text}</Typography>
      </Grid>
      {items.map((item) => (
        <Grid sx={{marginBottom: '10px', marginTop: '10px'}} key={item.id} item xs={12}>
          <Entry entry={item} />
        </Grid>
      ))}
      <Grid key={`add ${category}`} item xs={12}>
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => dispatch(openModal(category))}
          edge='end'
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};