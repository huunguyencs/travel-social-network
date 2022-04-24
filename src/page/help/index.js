import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HelpCard from '../../components/Help/HelpCard';

export default function HelpPage() {

    const { search } = useLocation();
    const { id } = queryString.parse(search);

    const { list } = useSelector(state => state.help);

    useEffect(() => {
        if (!id) return;
        const violation = document.getElementById(id);
        if (!violation) return;
        window.scrollTo({
            top: violation.offsetTop,
            behavior: "smooth"
        });
    }, [id])

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
    )
}
