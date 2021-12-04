import React, { useEffect, useState } from 'react'
import { Backdrop, Button, Card, Modal, Paper, Typography } from '@material-ui/core';

import * as utils from './utils';
import './style.css';


function Cell({ lunarDate, solarDate, solarMonth, solarYear, setContent, setDetail }) {
    var cellClass = "ngaythang",
        solarClass = "t2t6",
        lunarClass = "am",
        title = '',
        tmp = '',
        dow = (lunarDate.jd + 1) % 7;
    if (dow === 0) {
        solarClass = "cn";
    } else if (dow === 6) {
        solarClass = "t7";
    }
    var today = new Date();
    if (solarDate === today.getDate() && solarMonth === today.getMonth() + 1 && solarYear === today.getFullYear()) {
        cellClass = "homnay";
    }
    tmp = utils.checkHolidayLunar(lunarDate.day, lunarDate.month);
    if (tmp !== '') {
        cellClass = 'leam';
        title = tmp;
    }
    tmp = utils.checkHolidaySolar(solarDate, solarMonth);
    if (tmp !== '') {
        cellClass = 'leduong';
        title = (title === '' ? tmp : title + ', ' + tmp);
    }
    title = (title === '' ? utils.getDayName(lunarDate) : title);
    if (lunarDate.day === 1 && lunarDate.month === 1) {
        cellClass = "tet";
    }
    if (lunarDate.leap === 1) {
        lunarClass = "am2";
    }
    var lunar = lunarDate.day;
    if (solarDate === 1 || lunar === 1) {
        lunar = lunarDate.day + '/' + lunarDate.month + (lunarDate.leap === 1 ? '<sup>N</sup>' : '');
    }
    var args = lunarDate.day + "," + lunarDate.month + "," + lunarDate.year + "," + lunarDate.leap;
    args += "," + lunarDate.jd + "," + solarDate + "," + solarMonth + "," + solarYear;

    return (
        <td
            className={cellClass}
            title={lunarDate && title}
            onClick={() => {
                setDetail(true);
                setContent(args);
            }}
        >
            <div className={solarClass}>
                {solarDate}
            </div>
            <div className={lunarClass}>
                {lunar}
            </div>
        </td>
    )

}



function PrevMonthLink({ month, year, setMonth, setYear }) {
    var mm = month > 1 ? month - 1 : 12;
    var yy = month > 1 ? year : year - 1;

    return (
        <span className="prev-month" onClick={() => {
            setMonth(mm);
            setYear(yy);
        }}>&nbsp;&lsaquo;&nbsp;</span>
    )
}

function PrevYearLink({ year, setYear }) {
    return <span className="prev-year" onClick={() => {
        setYear(year - 1);
    }}>&lsaquo;&lsaquo;</span>;
}

function NextMonthLink({ month, year, setMonth, setYear }) {
    var mm = month < 12 ? month + 1 : 1;
    var yy = month < 12 ? year : year + 1;
    return <span className="next-month" onClick={() => {
        setMonth(mm);
        setYear(yy);
    }}>&nbsp;&rsaquo;&nbsp;</span>
}

function NextYearLink({ month, year, setYear }) {
    return <span className="next-year" onClick={() => {
        setYear(year + 1);
    }}>&rsaquo;&rsaquo;</span>
}

function Head({ month, year, setMonth, setYear }) {

    return (
        <>
            <tr>
                <td colSpan="2" className="navi-l">
                    <PrevYearLink year={year} setYear={setYear} />
                    <PrevMonthLink month={month} year={year} setMonth={setMonth} setYear={setYear} />
                </td>
                <td colSpan="3" className="tenthang">
                    {month + "/" + year}
                </td>
                <td colSpan="2" className="navi-r">
                    <NextMonthLink month={month} year={year} setMonth={setMonth} setYear={setYear} />
                    <NextYearLink year={year} setYear={setYear} />
                </td>
            </tr>
            {/* {utils.LOOP7.map((i) => <col width="50px" key={i} />)} */}
            <tr>
                {utils.LOOP7.map((i) => (
                    <td className="ngaytuan" key={i}>{utils.DAYNAMES[i]}</td>
                ))}
            </tr>
        </>
    )

}

function ShowDetail({ content, setDetail, setContent }) {

    const [state, setState] = useState(null);
    useEffect(() => {
        let res = utils.cellClick(content);
        setState(res);
    }, [setState, content])

    return (
        <Paper
            style={{
                width: 500,
                backgroundColor: "#fff",
                borderRadius: "15px",
                padding: 30,
                margin: "auto",
            }}
        >
            {state &&
                <div style={{ margin: 'auto' }}>
                    <Typography>
                        {state.lunarDate}
                    </Typography>
                    <Typography>
                        {state.solarDate}
                    </Typography>
                    <Typography>
                        {state.startHour}
                    </Typography>
                    <Typography>
                        {state.tietKhi}
                    </Typography>
                    <Typography>
                        {state.hoangDao}
                    </Typography>
                    <Typography>
                        {state.holiday}
                    </Typography>
                </div>}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                <Button
                    onClick={() => {
                        setDetail(false);
                        setContent('');
                    }}
                    style={{
                        padding: 10,
                        paddingInline: 30,
                        backgroundColor: "#A5DEC8"
                    }}
                >
                    Đóng
                </Button>
            </div>
        </Paper>
    )
}


function Table({ setContent, setDetail }) {

    const today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const [currentMonth, setCurrentMonth] = useState([]);
    const [emptyCells, setEmptyCells] = useState(null);

    var k, solar, ld1;

    useEffect(() => {
        var currentMonth, ld1, emptyCells;
        currentMonth = utils.getMonth(month, year);
        setCurrentMonth(currentMonth);
        if (currentMonth.length !== 0) {
            ld1 = currentMonth[0];
            emptyCells = (ld1.jd + 1) % 7;
            setEmptyCells(emptyCells);
        }

    }, [setCurrentMonth, setEmptyCells, month, year])

    return (
        <>
            {currentMonth && currentMonth.length !== 0 &&
                <table className="amlich" border="0" cellPadding="0" cellSpacing="0" width="100px">
                    {utils.LOOP7.map((i) => <col width="50px" key={i} />)}
                    <tbody>
                        <Head month={month} year={year} setMonth={setMonth} setYear={setYear} />
                        {utils.LOOP6.map((i) => (
                            <tr key={i}>
                                {utils.LOOP7.map((j) => {
                                    k = 7 * i + j;
                                    if (k < emptyCells || k >= emptyCells + currentMonth.length) {
                                        return (
                                            <td className="ngaythang" key={i + '' + j}>
                                                <div className="cn">&nbsp;</div>
                                                <div className="am">&nbsp;</div>
                                            </td>
                                        )
                                    }
                                    else {
                                        solar = k - emptyCells + 1;
                                        ld1 = currentMonth[k - emptyCells]
                                        return (
                                            <Cell
                                                key={i + '' + j}
                                                lunarDate={ld1}
                                                solarDate={solar}
                                                solarMonth={month}
                                                solarYear={year}
                                                setContent={setContent}
                                                setDetail={setDetail}
                                            />
                                        )
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default function Calendar() {

    const [detail, setDetail] = useState(false);
    const [content, setContent] = useState('');

    return (
        <div>
            <Card style={{
                backgroundColor: 'white',
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                paddingTop: 20,
                paddingBottom: 20,
            }}>
                <Table setContent={setContent} setDetail={setDetail} />
            </Card>
            <Modal
                open={detail}
                onClose={() => setDetail(false)}
                aria-labelledby="calendar-detail"
                aria-describedby="calendar-detail-description"
                style={{
                    display: 'flex',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <ShowDetail content={content} setDetail={setDetail} setContent={setContent} />
            </Modal>
        </div>
    )
}
