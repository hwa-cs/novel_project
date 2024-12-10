import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
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
