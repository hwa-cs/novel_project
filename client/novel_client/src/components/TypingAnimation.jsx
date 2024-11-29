import React, { useEffect, useState } from 'react';


const TextTypingAni = ({ text }) => {
    const [sequence, setSequence] = useState("");
    const [textCount, setTextCount] = useState(0);
    const [isTypingPaused, setIsTypingPaused] = useState(false);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (isTypingPaused) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setIsTypingPaused(false);
                    setTextCount(0);
                    setSequence("");
                }, 5000); //몇 초 일시정지할 것인지
                return;
            }

            if (textCount >= text.length) { //text length 초과 시 undefind가 출력되는 것을 방지
                setIsTypingPaused(true);
                return;
            }

            const nextChar = text[textCount];
            setSequence((prevSequence) => prevSequence + nextChar);

            if (nextChar === '\n') {
                setTextCount((prevCount) => prevCount + 2);
            } else {
                setTextCount((prevCount) => prevCount + 1);
            }
        }, 200); // 설정한 초만큼 일정한 간격마다 실행된다

        return () => clearInterval(typingInterval); //컴포넌트가 마운트 해제되거나, 재렌더링 될 때마다 setInterval를 정리하는 함수를 반환함.
    }, [text, textCount, isTypingPaused]); //해당 상태들이 변경될 때마다 useEffect가 다시 실행 됨

    return (
        <p className="landing-p whitespace-pre-line break-normal">
            {sequence}
            <span className='align-top w-0.5 h-[1em] bg-white ml-1'/>
        </p>
    );
};

export default TextTypingAni;