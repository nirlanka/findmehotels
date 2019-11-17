import Env from '../env';

export async function getHotelsList() {
    const url = `${Env.apiBaseUrl}/hotels/en`;
    return (await fetch(url)).json();
}