import { describe, test, expect } from "bun:test";
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChessSinglePage } from './ChessSinglePage';

describe('ChessSinglePage komponens', () => {
    test('ki kellene renderelni a betöltő spinnert induláskor', () => {
        const { container } = render(
            <MemoryRouter>
                <ChessSinglePage />
            </MemoryRouter>
        );

        // Kezdetben nincs még adat, ezért a spinnernek kell megjelennie
        expect(container.querySelector('.spinner-border')).toBeInTheDocument();
    });
});
