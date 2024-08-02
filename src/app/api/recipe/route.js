import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'src', 'app', 'data', 'recipeData.json');

async function readRecipeData() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading recipe data:', error);
        return [];
    }
}

async function writeRecipeData(data) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing recipe data:', error);
    }
}

export async function GET() {
    try {
        const results = await readRecipeData();
        return NextResponse.json({ results });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }
}

export async function POST(req) {
    
    
    const formData = await req.formData();
    
    // Extract data from FormData
    const name = formData.get('name');
    const ingredientString = formData.get('ingredient');
    const calorie = formData.get('calorie');

    // Parse the ingredient string back into an object
    const ingredient = JSON.parse(ingredientString);

   

    try {  
        // Read existing data
        const recipeData = await readRecipeData();

        // Generate new ID
        let newId;
        if (recipeData.length === 0) {
            newId = 1;
        } else {
            const maxId = Math.max(...recipeData.map(recipe => recipe.id));
            newId = maxId + 1;
        }

        const newRecipe = {
            id: newId,
            name,
            ingredient,
            calorie: parseInt(calorie, 10) // Convert to number if needed
        };
        
        recipeData.push(newRecipe);
        

        // Write updated data back to file
        await writeRecipeData(recipeData);

        return NextResponse.json({ success: true, recipe: newRecipe });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

