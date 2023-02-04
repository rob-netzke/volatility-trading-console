import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function IndexInfo() {
    const stockList = ["SPX", "RUT", "NDX", "VIX"] // "RUT", "DIJA", "NDX", "BTC"
    const [prices, setPrices] = useState({})

    useEffect(() => {
        let config = {
            method: 'post',
            url: '/api/prices'
        }
        axios(config).then((response) => {
            setPrices(response.data)
        }).catch((error) => {
            setPrices({})
        })
    }, [])

    return (
        <div className='pl-8 pt-5'>
            {
                prices  ? (
                    <div className='grid grid-cols-2 gap-x-12 gap-y-2'>
                        {stockList.map((stock) => {
                            return (
                                <div className='grid justify-center items-center'>
                                    <h1 className='text-white font-bold font-punk pr-2'>{stock}</h1>
                                        {
                                            prices[stock.toUpperCase()] === "ERROR" || prices[stock.toUpperCase()] === "NaN" || prices[stock.toUpperCase()] === undefined ? (
                                                <div className="animate-pulse rounded-xl bg-slate-200 flex w-10 h-4"></div>
                                            ) : (
                                                 <div className="flex flex-row font-punk w-10 text-white">{prices[stock.toUpperCase()]}</div>
                                            )
                                        }
                                </div> 
                            )
                        })}
                    </div>
                ) : (
                    <div className='grid grid-cols-2'>
                        {stockList.map((stock) => {
                            return (
                                <div className='grid grid-cols-2 justify-center items-center'>
                                    <h1 className='text-white font-bold font-punk'>{stock}</h1>
                                    <div className="animate-pulse rounded-xl bg-slate-200 flex w-10 h-4"></div>
                                </div> 
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}
