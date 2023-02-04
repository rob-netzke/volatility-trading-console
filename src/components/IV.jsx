import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiLoaderAlt } from 'react-icons/bi'

export default function IV() {
    const stockList = ["SPX", "RUT"] // "RUT", "DIJA", "NDX", "BTC"
    const [IV, setIV] = useState()

    useEffect(() => {
        let config = {
            method: 'post',
            url: '/api/iv'
        }
        axios(config).then((response) => {
            setIV(response.data)
        }).catch((error) => {
            setIV({})
        })
    },[])


    return (
        <div className='flex flex-col'>
           <h1 className='font-bold font-punk font-xl uppercase font-bold pb-4 text-white'>Current Implied Volatility</h1>
            {
                IV ? (
                    <div className='flex flex-row'>
                        {
                            stockList.map((stock) => {
                                return (
                                    <>
                                        <h1 className='text-white font-bold font-punk pr-1'>
                                            {stock}
                                        </h1>
                                        <h1 className='text-white font-punk pr-2'>
                                            {IV[stock]}
                                        </h1>
                                    </>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className='flex flex-col justify-center'>
                        <BiLoaderAlt className='animate-pulse animate-spin text-slate-400 flex justify-center items-center' size={20}/>
                    </div>
                )
            }
        </div>
    )
}
