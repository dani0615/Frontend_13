import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'bun:test';
import { App } from './App';

describe('App komponens teszt', () => {
    test('Megjelenik-e a Bejelentkezés felirat', () => {
        render(<App />);
        const headingElement = screen.getByRole('heading', { level: 1, name: /Bejelentkezés/i });
        expect(headingElement).toBeInTheDocument();
    });

    test('Felhasználónév mező változásának tesztelése', () => {
        render(<App />);
        const usernameInput = screen.getByPlaceholderText(/felhasználónév/i);
        expect(usernameInput).toBeInTheDocument();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
    });

    test('Jelszó mező változásának tesztelése', () => {
        render(<App />);
        const passwordInput = screen.getByPlaceholderText(/jelszó/i);
        expect(passwordInput).toBeInTheDocument();

        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        expect(passwordInput.value).toBe('testpassword');
    });

    test('Megjelenik-e a Bejelentkezés gomb', () => {
        render(<App />);
        const buttonElement = screen.getByRole('button', { name: /Bejelentkezés/i });
        expect(buttonElement).toBeInTheDocument();
    });
});
