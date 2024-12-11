import { useRouteError } from 'react-router-dom';

interface RouteError extends Error {
  statusText?: string;
  message: string;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div id="error-page">
      <h1>🔥에러 페이지!!</h1>
      <p>죄송합니다. 에러 페이지입니다.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
