import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiLoaderAlt } from 'react-icons/bi'

export default function Calendar() {
    const [annoucements, setAnnoucements] = useState()
    const [times, setTimes] = useState()

    useEffect(() => {
        let config = {
            method: 'post',
            url: '/api/calendar'
        }
        axios(config).then((response) => {
            setAnnoucements(response.data.a)
            setTimes(response.data.t)
        }).catch((error) => {
            console.log(error)
            setAnnoucements({})
            setTimes({})
        })
    }, [])

    return (
        <div className='flex flex-col'>
            <h1 className='font-bold font-punk font-xl uppercase font-bold pb-4 text-white'>Announcement Calendar</h1>
            {
                annoucements ? (
                    <div className='flex flex-col justify-start items-start overflow-y-scroll w-35 h-40 mr-2'>
                        {
                            annoucements.map((ann, index) => {
                                return (
                                    <div className='flex flex-row pt-2'>
                                        <h1 className='text-sm text-white pr-4'>
                                            {times[index]}
                                        </h1>
                                        <h1 className='text-sm text-white font-bold uppercase'>
                                            {ann.replace("Release", "")}
                                        </h1>
                                    </div>
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
