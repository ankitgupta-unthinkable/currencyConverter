import axios from "axios";

const baseUrl = 'https://api.currencyapi.com/v3/';
const currencyEndPoint = 'currencies';
const conversionAPIEndPoint = 'latest'
const headers = {
    'apiKey': 'RwOBGpx9pO7gRhzMY7wX6OM1ra9x7A96HIDo8OoE'
    }

async function getCurrencies(){
    try{
        const response = await axios.get(baseUrl+currencyEndPoint,{
            headers: headers
        });
        return response.data;
    }catch (error){
        console.log(error);
        return null;
    }
}

async function getExchangeRates(baseCurrency, conversionCurrency){
    try{
        const response = await axios.get(baseUrl + conversionAPIEndPoint, {
            headers: headers,
            params: {
                base_currency: baseCurrency,
                currencies: conversionCurrency
            }
        });
        return response.data;
    }catch (error){
        console.log(error);
        return null;
    }
}


async function getUserData(accessToken){
    try{
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        });

        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}

export {getCurrencies, getExchangeRates, getUserData}