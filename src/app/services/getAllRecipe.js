export async function getAllRecipe() {
    try {
        const res = await fetch(`api/recipe`, {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(
                `Failed to fetch data. Status: ${res.status} ${res.statusText}`
            );
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}