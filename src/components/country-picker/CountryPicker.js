import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../services';

import styles from './CountryPicker.module.css';

export const CountryPicker = ({handleCountryChange}) => {

    const [fetchedCountries, setCountries] = useState([]);

    const getCountries = async() => {
        const resp = await fetchCountries();
        setCountries(resp);
    } 

    useEffect(() => {
        getCountries();
    }, []);

    // if (fetchedCountries !== true) {return 'loading...'} 

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
                <option value='global'>Global</option>
                {fetchedCountries && fetchedCountries.map((item, index) => <option key={index} value={item}>{item}</option> )}
            </NativeSelect>
        </FormControl>
    )
}