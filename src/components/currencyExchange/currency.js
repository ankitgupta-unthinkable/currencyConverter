import React, { useEffect, useState } from 'react';
import InputBox from '../Inputs/inputBox';
import { googleLogout } from '@react-oauth/google';
import './currency.css';
import { getCurrencies, getExchangeRates } from '../../services/repository';

export default function CurrencyUIInterface({ profile, setProfile }) {
    const [currencyOne, changeCurrencyOne] = useState('Indian Rupee');
    const [currencyTwo, changeCurrencyTwo] = useState('US Dollar');
    const [currencyOneValue, setCurrencyOneValue] = useState(1);
    const [currencyTwoValue, setCurrencyTwoValue] = useState(1);

    const [currencies, setCurrencies] = useState(null);
    const [value, changeValue] = useState(null);

    useEffect(
        () => {
            const callAPI = async () => {
                let apiResponse = await getCurrencies();
                if (apiResponse !== null) {
                    let data = Object.values(apiResponse?.data);
                    let object = {};
                    data.map((obj) => (object[obj.name] = obj.code));
                    setCurrencies(object);
                }
            }

            callAPI();
        }
        , []);

    useEffect(() => {
        const callExchangeAPI = async () => {
            let baseCurrency = currencies[currencyOne];
            let conversionCurrency = currencies[currencyTwo];
            let apiResponse = await getExchangeRates(baseCurrency, conversionCurrency);

            if (apiResponse !== null && apiResponse?.data !== null) {
                let value = Object.values(apiResponse?.data)[0].value;
                changeValue(value);
                setCurrencyTwoValue(getPreciseValue(currencyOneValue * value));
            }
        }
        if (currencies !== null) {
            callExchangeAPI();
        }
    }, [currencies, currencyOne, currencyTwo]);
    //     const callExchangeAPI = async () => {
    //         let baseCurrency = currencies[currencyOne];
    //         let conversionCurrency = currencies[currencyTwo];
    //         let apiResponse = await getExchangeRates(baseCurrency, conversionCurrency);

    //         if (apiResponse !== null && apiResponse?.data !== null) {
    //             let value = Object.values(apiResponse?.data)[0].value;
    //             changeValue(value);
    //             setCurrencyTwoValue(getPreciseValue(currencyOneValue * value));
    //         }
    //     }

    //     if (currencies !== null) {
    //         callExchangeAPI();
    //     }
    // }, [currencyTwo]);

    const logout = () => {
        googleLogout();
        setProfile(null);
    }

    function onFirstInputChanges(event) {
        setCurrencyOneValue(event.target.value);
        setCurrencyTwoValue(getPreciseValue(value * event.target.value));
    }

    function onSecondInputChanges(event) {
        setCurrencyTwoValue(event.target.value);
        setCurrencyOneValue(getPreciseValue(event.target.value / value));
    }

    function getPreciseValue(value) {
        return parseFloat(value).toFixed(3);
    }

    return <>
        <h1 className='heading'> Welcome, {profile.name}!</h1>
        <hr className='line' />
        <h3 style={{ color: '#70757a' }}>{currencyOneValue} {currencyOne} equals</h3>
        <h1>{currencyTwoValue} {currencyTwo}</h1>
        <InputBox currencyName={currencyOne} currencyValue={currencyOneValue} onCurrencyChange={changeCurrencyOne} onInputChange={onFirstInputChanges} currencies={currencies} />
        <InputBox currencyName={currencyTwo} currencyValue={currencyTwoValue} onCurrencyChange={changeCurrencyTwo} onInputChange={onSecondInputChanges} currencies={currencies} />
        <button className='button' onClick={logout}> Logout </button>
    </>;
}