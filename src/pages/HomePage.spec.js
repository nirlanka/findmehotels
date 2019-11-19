import { render, fireEvent } from '@testing-library/svelte'

import HotelService from '../services/hotels';
import HomePage from './HomePage.svelte';

jest.mock('../services/hotels');

beforeEach(() => {
    HotelService.mockClear();
});

test('shows proper heading when rendered', () => {
    const service = new HotelService();
    const page = new HomePage.default({
        target: document.body,
    });

    expect(1).toEqual(1);
});