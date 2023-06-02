import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { antdTheme, createColorStyle } from './styles/colors';
import App from './components/App/App';
import './styles/index.scss';

createColorStyle();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <ConfigProvider
        theme={antdTheme}
    >
        <App />
    </ConfigProvider>,
);
