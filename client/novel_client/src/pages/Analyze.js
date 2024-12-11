import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Analyze = () => {
    const [selectVal, setSelectVal] = useState('');
    const navigate = useNavigate();
    const changeSelectValue = (event) => {
        setSelectVal(event.target.value);
        navigate(`/Analyze/${event.target.value}`);
    };
    console.log('선택 박스 벨류 :', selectVal);
    return (_jsx("div", { className: "h-lvh bg-gradient-to-b from-[#dcddd3] via-[#e2e3dc] to-[#dcddd3] shadow-inner-corner p-24", children: _jsxs("div", { className: "bg-[#434448] p-4 shadow-inner-corner rounded-2xl", children: [_jsx("div", { className: 'bg-slate-50', children: _jsxs("label", { children: ["\uC7A5\uB974 \uC120\uD0DD :", _jsxs("select", { name: "selectedFruit", onChange: changeSelectValue, children: [_jsx("option", { value: "martial", children: "\uBB34\uD611" }, 1), _jsx("option", { value: "fantasy", children: "\uD310\uD0C0\uC9C0" }, 2), _jsx("option", { value: "romanceFantasy", children: "\uB85C\uB9E8\uC2A4 \uD310\uD0C0\uC9C0" }, 3), _jsx("option", { value: "romance", children: "\uB85C\uB9E8\uC2A4" }, 4), _jsx("option", { value: "currentFantasy", children: "\uD604\uB300 \uD310\uD0C0\uC9C0" }, 5)] })] }) }), _jsx("div", { children: _jsx(Outlet, {}) })] }) }));
};
export default Analyze;
