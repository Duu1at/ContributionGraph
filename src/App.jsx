import { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell';

function App() {
    const today = new Date()
    const matrix = [];
    const numRows = 51;
    const numColumns = 7;
    const [dateArr, setDateArr] = useState([])
    const dateOfTheWeek = today.getDay() //now.getDay()
    const hiddenDays = 350 + dateOfTheWeek
    const monthArr = ['Янв.', 'Февр.', 'Март.', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.']
    const numMonth = today.getMonth() + 1
    const trueMonthArr = [...monthArr.slice(-(12 - numMonth)), ...monthArr.slice(0, numMonth)]
    const [colorArr, setColorArr] = useState([])

    for (let i = 0; i < numColumns; i++) {
        matrix[i] = [];
        for (let j = 0; j < numRows; j++) {
            matrix[i][j] = j * numColumns + i + 1;
        }
    }

    function createObjectTime() {
        const now = new Date()
        const daysAYear = 365
        const objectTime = {}

        for (let i = 0; i <= daysAYear; i++) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const constructorDate = year + '-' + month + '-' + day
            objectTime[constructorDate] = 0
        }

        return objectTime
    }

    useEffect(() => {
        const objectTime = createObjectTime()
        fetch("https://dpg.gg/test/calendar.json", {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => {
                const updateAllObj = { ...objectTime, ...res }
                setDateArr(Object.keys(updateAllObj).slice(0, hiddenDays +1).reverse())
                setColorArr(Object.values(updateAllObj).slice(0, hiddenDays +1).reverse())
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="App">
            <div className='container__day_of_the_week'>
                <div className='day__of_the_week'>Пн</div>
                <div className='day__of_the_week'>Ср</div>
                <div className='day__of_the_week'>Пт</div>
            </div>
            <div>

                <div className='months'>
                    {
                        trueMonthArr.map((i) => (
                            <div className='month' key={i}>{i}</div>
                        ))
                    }
                </div>
                {matrix.map((row, rowIndex) => (
                    <div className='row' key={rowIndex}>
                        {row.map((cell, columnIndex) => (
                            <Cell
                                key={columnIndex}
                                cellIndex={cell}
                                columnIndex={columnIndex}
                                date={dateArr[cell]}
                                colorCell={colorArr[cell]}
                                dateOfTheWeek={dateOfTheWeek}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default App;
