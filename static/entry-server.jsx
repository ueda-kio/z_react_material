import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

export const render = () => ReactDOMServer.renderToString(<App />);
