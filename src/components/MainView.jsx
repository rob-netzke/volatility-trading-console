import React from 'react'
import Calendar from './Calendar'
import IndexInfo from './IndexInfo'
import VolInfo from './VolInfo'
import { RiStockFill, RiStockLine } from 'react-icons/ri'
import PCRatio from './PCRatio'
import IV from './IV'

export default function MainView() {

  return (
    <>
    <div className='xl:hidden block absolute z-[10000] top-[5%] pl-10'>
        <h1 className='text-white font-bold font-punk text-md'>Please expand the screen</h1>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-20 justify-between items-center z-[100] sm:pt-40 pt-10 invisible xl:visible'> 
        <div className='flex justify-center row-span-1'><PCRatio/></div>
        <div className='relative flex flex-row bg-slate-700/75 border shadow-xl shadow-slate-400 rounded-sm'>
          <div className='relative justify-start items-start flex flex-col px-2 py-4 pl-2 pr-2'>
              <IndexInfo/>
              <VolInfo/>
          </div>
          <h1 className="absolute top-20 right-0 pb-12 rotate-90 text-white font-bold font-punk font-xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">Prices & Modeling</h1>
        </div>
        <div className='flex justify-center row-span-1'><Calendar/></div>
        <div className='col-span-3 flex flex-col justify-center items-center'>
          <IV/>
        </div>
    </div>
    </>
  )
}
