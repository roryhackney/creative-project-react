import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

//check that the App renders child components/content
test('renders App component', () => {
  render(<App/>);
  expect(document.querySelector('main')).toBeInTheDocument();
  expect(document.querySelector('header')).toBeInTheDocument();
  expect(document.querySelector('footer')).toBeInTheDocument();
});
