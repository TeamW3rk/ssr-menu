import Menu from './src/components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';


const element = document.getElementById('menu');
const initState = JSON.parse(element.getAttribute('data-menu'));
console.log(initState)
ReactDOM.hydrate(<Menu {...initState}/>, element);

