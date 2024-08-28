import React from 'react'
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'

const BackBtnE = ({destination='/employee/salary/main'}) => {
  return (
    <div className='flex'>
        <Link
         to={destination}
         className='bg-blue-950 text-white px-4 py-3 rounded-lg w-fit mt-14 fixed '
        >
            <BsArrowLeft className='text-2xl'></BsArrowLeft>
        </Link>
    </div>
  )
}
export default BackBtnE;