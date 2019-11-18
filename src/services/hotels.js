import Env from '../env';

export default class HotelService {
    async getHotelsList() {
        const url = `${Env.apiBaseUrl}/hotels/en`;
        return (await fetch(url)).json();
    }
}