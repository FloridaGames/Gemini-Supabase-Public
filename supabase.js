// File: supabase.js
// This module handles the connection and data fetching from Supabase.

// The Supabase client library (loaded in the HTML) creates a global 'supabase' object.
// We can destructure the 'createClient' function from it.
const { createClient } = supabase;

// --- Configuration ---
// In a real-world application, you should store these in environment variables
// and not directly in the code for better security.
const SUPABASE_URL = 'secret';
const SUPABASE_KEY = 'secret';

// --- Initialize and export the client ---
// This single client instance can be imported and used anywhere in your app.
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Fetches a single random item by calling a Supabase RPC function.
 * This function is "exported", meaning it can be imported and used by other files.
 * @param {string} rpcName - The name of the RPC function (e.g., 'get_random_question').
 * @returns {Promise<object>} The first item from the data array.
 * @throws {Error} If the RPC call fails or returns no data.
 */
export async function fetchRandomItem(rpcName) {
    const { data, error } = await supabaseClient.rpc(rpcName);

    if (error) {
        console.error(`Error calling RPC function '${rpcName}':`, error);
        // Re-throw the error so the part of the code that called this function can handle it.
        throw error;
    }

    if (!data || data.length === 0) {
        throw new Error(`No data returned from the '${rpcName}' function. Make sure the function exists and the table has data.`);
    }

    // The RPC function returns an array, so we return the first element.
    return data[0];
}
