
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function CovidModal(props) {

    const { covid, handleClose } = props;

    return (
        <Paper style={{ height: "80%", width: "80%", margin: 'auto', marginTop: 50, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div />
                <IconButton>
                    <Close onClick={handleClose} />
                </IconButton>
            </div>
            <Box
                display="flex"
                flexDirection="column"
                // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                height="750px" // fixed the height
                style={{
                    overflow: "hidden",
                    overflowY: "scroll" // added scroll
                }}

            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h4">
                        Tình hình Covid-19
                    </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h6">Tất cả</Typography>
                </div>
                <div style={{ width: "70%", margin: "auto", marginBottom: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Tổng ca nhiễm</TableCell>
                                <TableCell>Phục hồi</TableCell>
                                <TableCell>Tử vong</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Thế giới</TableCell>
                                <TableCell>{covid.total.world.cases}</TableCell>
                                <TableCell>{covid.total.world.recovered}</TableCell>
                                <TableCell>{covid.total.world.death}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Việt Nam</TableCell>
                                <TableCell>{covid.total.internal.cases}</TableCell>
                                <TableCell>{covid.total.internal.recovered}</TableCell>
                                <TableCell>{covid.total.internal.death}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h6">Hôm nay</Typography>
                </div>
                <div style={{ width: "70%", margin: "auto", marginBottom: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Tổng ca nhiễm</TableCell>
                                <TableCell>Phục hồi</TableCell>
                                <TableCell>Tử vong</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Thế giới</TableCell>
                                <TableCell>{covid.today.world.cases}</TableCell>
                                <TableCell>{covid.today.world.recovered}</TableCell>
                                <TableCell>{covid.today.world.death}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Việt Nam</TableCell>
                                <TableCell>{covid.today.internal.cases}</TableCell>
                                <TableCell>{covid.today.internal.recovered}</TableCell>
                                <TableCell>{covid.today.internal.death}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h6">Gần đây:</Typography>
                </div>
                <div style={{ width: "70%", margin: "auto", marginBottom: 20 }}>
                    <ResponsiveContainer height={500}>
                        <LineChart
                            width={700}
                            height={500}
                            data={covid.overview}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="cases" stroke="#00f" />
                            <Line type="monotone" dataKey="recovered" stroke="#0f0" />
                            <Line type="monotone" dataKey="death" stroke="#f00" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: "70%", margin: "auto", marginBottom: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày</TableCell>
                                <TableCell>Số ca nhiễm</TableCell>
                                <TableCell>Phục hồi</TableCell>
                                <TableCell>Tử vong</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {covid.overview.map(item =>
                                <TableRow>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.cases}</TableCell>
                                    <TableCell>{item.recovered}</TableCell>
                                    <TableCell>{item.death}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h6">Chi tiết</Typography>
                </div>
                <div style={{ width: "70%", margin: "auto", marginBottom: 20 }}>
                    <Table>
                        <TableHead>


                            <TableRow>
                                <TableCell>Tỉnh</TableCell>
                                <TableCell>Tổng ca nhiễm</TableCell>
                                <TableCell>Ca nhiễm mới</TableCell>
                                <TableCell>Tử vong</TableCell>
                            </TableRow>
                        </TableHead>
                        {covid.locations.map(item =>
                            <TableRow>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.cases}</TableCell>
                                <TableCell>{item.casesToday}</TableCell>
                                <TableCell>{item.death}</TableCell>
                            </TableRow>
                        )}
                    </Table>
                </div>
            </Box>
        </Paper>
    )
}
