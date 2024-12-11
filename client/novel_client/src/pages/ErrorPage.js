import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouteError } from 'react-router-dom';
function ErrorPage() {
    const error = useRouteError();
    return (_jsxs("div", { id: "error-page", children: [_jsx("h1", { children: "\uD83D\uDD25\uC5D0\uB7EC \uD398\uC774\uC9C0!!" }), _jsx("p", { children: "\uC8C4\uC1A1\uD569\uB2C8\uB2E4. \uC5D0\uB7EC \uD398\uC774\uC9C0\uC785\uB2C8\uB2E4." }), _jsx("p", { children: _jsx("i", { children: error.statusText || error.message }) })] }));
}
export default ErrorPage;
