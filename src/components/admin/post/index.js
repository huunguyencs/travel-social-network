import React from "react";
import { makeStyles, Container, Button } from "@material-ui/core";


//Table
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";

import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

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
        minWidth: 750,
    },
    chart: {
        margin: 50,
    },
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

function createData(id, name, email, phone, action) {
    return { id, name, email, phone, action };
}

const rows = [
    createData('Cupcake', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Donut', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Eclair', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Frozen yoghurt', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Gingerbread', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Honeycomb', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Ice cream sandwich', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Jelly Bean', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('KitKat', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Lollipop', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Marshmallow', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Nougat', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
    createData('Oreo', 'Triệu Tấn Hùng', 'test@gmail.com', '0376608773'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Tên Tài khoản' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Họ và tên' },
    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: true, label: 'Số điện thoại' },
    { id: 'action', numeric: false, disablePadding: true, label: '  ' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const [value, setValue] = React.useState(null);
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                // <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                //     Nutrition
                // </Typography>
                <Autocomplete
                    className={classes.title}
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue({
                                title: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                title: newValue.inputValue,
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                title: `Add "${params.inputValue}"`,
                            });
                        }

                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={rows}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.id;
                    }}
                    renderOption={(option) => option.id}
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Tìm kiếm tên tài khoản" variant="outlined" />
                    )}
                />
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};



function AdminPosts(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Container className={classes.container} style={{ marginTop: "160px" }}>
            <div className={classes.appBarSpacer} />

            <div className={classes.admin_location_header}
                style={{
                    display: "flex",
                    paddingLeft: "50px",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    100 Người dùng
                </Typography>
            </div>

            <div className={classes.admin_location_body}>
                <div className={classes.tableContainer}>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <EnhancedTableToolbar numSelected={selected.length} />
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                    aria-label="enhanced table"
                                >
                                    <EnhancedTableHead
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                                            {row.id}
                                                        </TableCell>
                                                        <TableCell align="left">{row.name}</TableCell>
                                                        <TableCell align="left">{row.email}</TableCell>
                                                        <TableCell align="left">{row.phone}</TableCell>
                                                        <TableCell align="left"><Button component={Link} to="/"><Edit></Edit></Button></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default AdminPosts;