import React, {useState, useEffect} from 'react';
import {Chart, Cards, CountryPicker} from './components';
import {fetchData} from './services';

import styles from './App.module.css';


const App = () => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading ] = useState(null);
  const [country, setCountry] = useState('');

  const handleCountryChange = async(country) => {
    
    const fetchedData = await fetchData(country);
    
    setData(fetchedData);
    setCountry(country);
  }


  const fetchDataFromApi = async() => {
    const data = await fetchData();
    setData(data);
  };

  useEffect(()=>{
    fetchDataFromApi();
  },[])

  if (!data) return 'Loading...'
  


  return (
    <div className={styles.container}>
      <Cards data={data}/>
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Chart data={data} country={country}/>
      
    </div>
  );
};

export default App;