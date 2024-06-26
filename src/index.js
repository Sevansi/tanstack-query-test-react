import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Providers from './Providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>
);
