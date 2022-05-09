import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import HelpCard from '../../components/Help/HelpCard';

export default function HelpPage() {
  const { list } = useSelector(state => state.help);

  return (
    <Container style={{ marginTop: 150 }}>
      <Grid container spacing={5}>
        {list.map(item => (
          <Grid item md={4} sm={6} xs={12} key={item._id} id={item._id}>
            <HelpCard help={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
