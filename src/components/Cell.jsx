import React, {useState} from 'react';

const Cell = (props) => {
    const {
        cellIndex,
        date,
        colorCell,
        dateOfTheWeek
    } = props

    const [show, setShow] = useState(false)

    let className =
        colorCell > 29
            ? 'square__cell-12'
            : colorCell > 19
                ? 'square__cell-9'
                : colorCell > 10
                    ? 'square__cell-6'
                    : colorCell > 0
                        ? 'square__cell-3'
                        : 'square__cell';
    let day = ''
    const daysOfWeek = [
        "Sunday",
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    day = daysOfWeek[cellIndex % 7];


    function showMonth(date) {
        const monthNames = {
            '01': 'January',
            '02': 'February',
            '03': 'March',
            '04': 'April',
            '05': 'May',
            '06': 'June',
            '07': 'July',
            '08': 'August',
            '09': 'September',
            '10': 'October',
            '11': 'November',
            '12': 'December',
        };

        const month = date.slice(5, 7);
        return monthNames[month];
    }

    if (cellIndex <= 350 + dateOfTheWeek) {
        return (
            <span
                className={className}
                onClick={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {show ?
                    <span className='cell__visible'
                          onMouseEnter={() => setShowToolpit(false)}
                    >
                        {colorCell} contributions <br/>
                        <div className='cell__visible_date'>
                            {`${day}, ${showMonth(date)} ${date.slice(-2)}, ${date.slice(0, 4)}`}
                        </div>
                    </span>
                    :
                    null
                }
            </span>

        );
    }
};

export default Cell;
