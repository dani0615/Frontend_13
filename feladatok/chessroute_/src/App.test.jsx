import { describe, test, expect } from "bun:test";
import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // A screen-t most NE importáld itt
import { App } from './App';

describe('App komponens', () => {
  test('ki kellene renderelni a usernév és a jelszó mezőket', () => {
    // A render visszatérési értékéből szedjük ki a keresőket
    const { getByPlaceholderText } = render(<App />);
    
    expect(getByPlaceholderText('felhasználónév')).toBeInTheDocument();
    expect(getByPlaceholderText('jelszo')).toBeInTheDocument();
  });

  test('engedélyeznie kell a űrlapmezők bevitelét', () => {
    const { getByPlaceholderText } = render(<App />);

    const usernameInput = getByPlaceholderText('felhasználónév');
    const passwordInput = getByPlaceholderText('jelszo');

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(usernameInput.value).toBe('user');
    expect(passwordInput.value).toBe('password');
  });
});