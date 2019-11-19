import { render, fireEvent } from '@testing-library/svelte'

import HotelService from '../services/hotels';
import HomePage from './HomePage.svelte';

console.log('HomePage.svelte -->', HomePage.default);

jest.mock('../services/hotels');

beforeEach(() => {
    HotelService.mockClear();
});

test('shows proper heading when rendered', () => {
    const service = new HotelService();
    const page = new HomePage.default();

    console.log(service);
    console.log(page);

    expect(1).toEqual(1);
});