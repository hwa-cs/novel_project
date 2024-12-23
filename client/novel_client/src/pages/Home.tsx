import { useState, ChangeEvent } from 'react';
import MainAnalyze from './Home/MainAnalyze';
import MainCover from './Home/MainCover';
import MainTitle from './Home/MainTitle';

const Home = () =>  {  
    return (
      <div className="">
        <div className="flex h-3/5">
          <div className="w-3/5 bg-books_3-img shadow-inner-corner">
            <MainTitle />
          </div>
          <div className="w-2/5 bg-books-img bg-opacity- p-4 shadow-inner-corner font-['Cafe24ClassicType-Regular']">
            < MainAnalyze />
          </div>
        </div>
        <div className=" bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] h-2/5 shadow-inner-corner ">
          <MainCover />
        </div>
      </div>
  )
}
  
export default Home;