import axios from "axios";



const url = 'https://covid19.mathdro.id/api';
    
export const fetchData = async(country) => {
    
    let changableUrl = url;

    if(country) {
        changableUrl = `${url}/countries/${country}`
    }
    
    try{
        const {data: {confirmed, recovered, deaths,lastUpdate}} = await axios.get(changableUrl);
        return {confirmed, recovered, deaths,lastUpdate}
    }catch(e){console.log(e);}
};


export const fetchDailyData = async() => {
    try {
        const {data} = await axios.get('https://covid19.mathdro.id/api/daily');
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
            recovered: dailyData.recovered.total,
        }))
        
        return modifiedData;

    }catch(e){console.log(e)};
}

export const fetchCountries = async() => {
    try{
        const {data: {countries}} = await axios.get('https://covid19.mathdro.id/api/countries')
        
        return countries.map(item => item.name);
        
    }catch(e){

    }
}