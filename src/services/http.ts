const API_URL = 'http://localhost:3000'
export async function fetchAvailableFiles() {
    try {
        const response = await fetch(`${API_URL}/sets`)
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export async function fetchSelectedFile(filename: string) {
    try {
        const response = await fetch(`${API_URL}/sets/${filename}`)
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}