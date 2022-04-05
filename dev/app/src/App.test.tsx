import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello, World!', () => {
    render(<App />);
    const helloWorld = screen.getByText(/Hello, World!/i);
    expect(helloWorld).toBeInTheDocument();
});

test('renders foo bar', () => {
    render(<App />);
    const foo = screen.getByText(/foo bar/i);
    expect(foo).toBeInTheDocument();
});
