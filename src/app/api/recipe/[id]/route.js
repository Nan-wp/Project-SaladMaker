import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

export async function GET(req, { params }) {
    const { id } = params;
    

    try {
        const recipes = await readRecipeData();
        const results = recipes.find(r => r.id === parseInt(id, 10));

        if (!results) {
            return NextResponse.json(
                { error: 'Recipe not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            results,
            
        });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return NextResponse.json(
            { error: 'Failed to fetch recipe' },
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    const { id } = params;
    try {
        const formData = await req.formData();
        const name = formData.get('name');
        const ingredientString = formData.get('ingredient');
        const calorie = formData.get('calorie');
    
        // Parse the ingredient string back into an object
        const ingredient = JSON.parse(ingredientString);
    
        // Read the current data from the JSON file
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        let recipes = JSON.parse(fileContents);
        
        // Find the recipe with the matching id and update it
        let updatedRecipe = null;
        recipes = recipes.map(recipe => {
            if (recipe.id === parseInt(id)) {
                updatedRecipe = {
                    ...recipe,
                    name,
                    ingredient,
                    calorie
                };
                return updatedRecipe;
            }
            return recipe;
        });
        
        if (!updatedRecipe) {
            return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
        }
        
        // Write the updated data back to the JSON file
        await fs.writeFile(dataFilePath, JSON.stringify(recipes, null, 2));
        
        return NextResponse.json({
            message: 'Recipe updated successfully',
            data: updatedRecipe,
        });
    } catch (error) {
        console.error('Error updating recipe:', error);
        return NextResponse.json(
            { message: error?.message || 'An error occurred while updating the recipe' },
            { status: 500 }
        );
    }}

    export async function DELETE(req, { params }) {
        const { id } = params;
    
        try {
            // Read the current data from the JSON file
            const fileContents = await fs.readFile(dataFilePath, 'utf8');
            let recipes = JSON.parse(fileContents);
    
            // Find the index of the recipe with the matching id
            const recipeIndex = recipes.findIndex(recipe => recipe.id === parseInt(id));
    
            if (recipeIndex === -1) {
                return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
            }
    
            // Remove the recipe from the array
            recipes.splice(recipeIndex, 1);
    
            // Write the updated data back to the JSON file
            await fs.writeFile(dataFilePath, JSON.stringify(recipes, null, 2));
    
            return NextResponse.json({
                message: 'Recipe deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting recipe:', error);
            return NextResponse.json(
                { message: error?.message || 'An error occurred while deleting the recipe' },
                { status: 500 }
            );
        }
    }   