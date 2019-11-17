const apiBaseUrl = 'https://5c08f37bea3172001389ccbd.mockapi.io'

export async function getHotelsList() {
    const url = `${apiBaseUrl}/hotels/en`;
    return (await fetch(url)).json();
}