import { LoginCheckContext } from "../context/LoginCheck";
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { getNovelApi } from '../api/novelApi';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Analyze = () => {
    return (
        <div className="h-lvh bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
        <div className='bg-[#434448] p-4 shadow-inner-corner rounded-2xl'>
            분석
        </div>
        </div>
    )
}

export default Analyze;