import React, { useEffect, useState } from 'react'
import Img from '../assets/backgrounds/cyber1.jpeg'

export default function BackgroundImg() {
    const [backgroundImg, setBackgroundImg] = useState("")
    
    useEffect(() => {
        setBackgroundImg(Img)
    }, [])

    return (
        <img className="absolute top-0 left-0 z-[-99] w-full h-screen object-cover" src={backgroundImg} alt={""}></img>
    )
}
