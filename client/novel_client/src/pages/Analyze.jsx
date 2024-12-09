import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Fantasy from './Genre/Fantasy';
import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Analyze = () => {
    const [selectVal,setSelectVal] = useState('');
    const navigate = useNavigate()

    const changeSelectValue = (event) =>{
        setSelectVal(event.target.value)
        navigate(`/Analyze/${event.target.value}`)
    };
    console.log('선택 박스 벨류 :', selectVal)

    

    return (
        <div className="h-lvh bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24">
            <div className="bg-[#434448] p-4 shadow-inner-corner rounded-2xl">
                <div className='bg-slate-50'>
                    <label>
                    장르 선택 :
                        <select 
                        name="selectedFruit"
                        onChange={changeSelectValue}>
                            <option key={1} value="martial">무협</option>
                            <option key={2} value="fantasy">판타지</option>
                            <option key={3} value="romanceFantasy">로맨스 판타지</option>
                            <option key={4} value="romance">로맨스</option>
                            <option key={5} value="currentFantasy">현대 판타지</option>
                        </select>
                    </label>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Analyze;
