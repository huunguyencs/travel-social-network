import React from "react";
import { makeStyles, Container, Typography, Button, Grid, MenuItem, TextField, InputAdornment, Box  } from "@material-ui/core";
import { Icon } from '@iconify/react';
import { DataGrid } from "@mui/x-data-grid";
import { Add, Search } from "@material-ui/icons";
import { posts } from "./blog";

import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        marginTop: 120,
    },
    tableContainer: {
        height: 400,
        margin: 50,
        marginBottom: 100,
    },
    table: {
        backgroundColor: "white",
    },
    chart: {
        margin: 50,
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '20ch',
        },
    },
}))

const currencies = [
    { value: 'latest', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'oldest', label: 'Cũ nhất' }
];

function AdminPosts(props) {
    const classes = useStyles();

    const [currency, setCurrency] = React.useState('latest');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <Container className={classes.container} style={{ marginTop: "160px" }}>
            <Grid direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    100 Bài viết
                </Typography>
                
            </Grid>
            
            <Grid>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <Autocomplete
                            id="highlights-demo"
                            style={{ width: 300 }}
                            options={posts}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tìm kiếm...."
                                    variant="outlined"
                                    margin="normal"
                                />
                            )}
                            renderOption={(option, { inputValue }) => {
                                const matches = match(option.title, inputValue);
                                const parts = parse(option.title, matches);

                                return (
                                    <div>
                                        {parts.map((part, index) => (
                                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                {part.text}
                                            </span>
                                        ))}
                                    </div>
                                );
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            value={currency}
                            onChange={handleChange}
                            variant="outlined"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </form>

            </Grid>

            <Grid>

            </Grid>
            
        </Container>
    );
}

export default AdminPosts;