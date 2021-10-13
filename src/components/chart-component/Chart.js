import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../services';
import {Bar, Line} from 'react-chartjs-2';

import styles from './Chart.module.css';

export const Chart = ({data, country}) => {

    const [dailyData, setDailyData] = useState([]);

    const getDailyData = async() => {
        const dailyData = await fetchDailyData();
        setDailyData(dailyData);
    }

 

    useEffect(() => {
        getDailyData();
                
    }, []);

    const lineChart = (
        dailyData[0] ? (
            <Line
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(0, 0, 255 , 0.5)',
                    fill: true
                }, {
                    data: dailyData.map(({revcovered})=> revcovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    fill: true,
                }]
            }}
        />
        ) : null
    );

    const barChart = (
        data.confirmed 
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: ['People'],  
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false},
                    title: { display: true, text: `Current state in ${country}`}, 
                }}
            />
        ) : null
    );
    
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart} 
        </div>
    )
}