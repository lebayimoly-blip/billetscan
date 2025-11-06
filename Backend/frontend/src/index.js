// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/global.css'; // style global
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// 📦 Active le service worker pour le mode hors ligne
serviceWorkerRegistration.register();
