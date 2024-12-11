import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const Title = () => {
    return (_jsx(Link, { to: '/', className: 'text-yellow-200 text-xl font-bold font-["Cafe24ClassicType-Regular"]', children: "KOIMANG" })
    // text-xl 폰트 크기
    // font-bold 폰트 굵기
    );
};
export default Title;
