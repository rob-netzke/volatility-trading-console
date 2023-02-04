import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function VolInfo() {
    const modelList = ["SGJR", "SGARCH", "RGJR", "RGARCH", "NGJR", "NGARCH"]
    const [data, setData] = useState()
    
    useEffect(() => {
        let config = {
            method: 'post',
            url: '/api/vol'
        }
        axios(config).then((response) => {
            setData(response.data)
        }).catch((error) => {
            console.log(error)
            setData({})
        })
    }, [])

    return (
        <div className='pl-8'>
            {
                data ? (
                    <div className='mb-4 flex flex-col'>
                        <h1 className='text-white font-xl font-bold font-punk pt-12'>{data["prediction"]}</h1>
                        {
                            modelList.map((model) => {
                                return (
                                    <h1 className='text-white font-punk text-sm font-bold pt-2'>{data[model]}</h1>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className='mb-4'>
                        <h1 className='text-white font-md font-bold font-punk pt-12'>Awaiting volatility predictions...</h1>
                        {
                            modelList.map((model) => {
                                return (
                                    <div className="animate-pulse rounded-xl bg-slate-200 flex w-20 h-6 mt-2"></div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
