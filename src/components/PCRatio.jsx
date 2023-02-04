import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

export default function PCRatio() {
    const[data, setData] = useState()
    const categories = ["Total", "Index", "Equity"]
    
    useEffect(() => {
        let config = {
            method: 'post',
            url: '/api/pc'
        }
        axios(config).then((response) => {
            setData(response.data.Total)
        }).catch((error) => {
            console.log(error)
            setData({})
        })
    }, [])


    return (
        <div className='flex flex-col pl-5'>
            <h1 className='font-bold font-punk font-xl uppercase font-bold pb-4 text-white'>Index Put/Call Ratios</h1>
            {
                data ? (
                    <div className='flex flex-col justify-start items-start overflow-y-scroll w-80 h-40'>
                        {data.map((row, index) => {
                            if (index === 0) {
                                return (
                                    <h1 className='text-sm text-white font-bold uppercase pt-3'>
                                        {row}
                                    </h1>
                                )   
                            } else {
                                return (
                                    <h1 className='text-xs text-white font-bold uppercase pt-3'>
                                        {row}
                                    </h1>
                                )   
                            }
                            
                        })}
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
