import Restaurant from '../models/restaurant.model.js'; // Adjust the path to your Mongoose model

// Function to generate the unique restaurant ID
const generateRestaurantId = async (restaurantName) => {
    // Step 1: Get the first 3 characters of the restaurant name and convert to uppercase
    // const prefix = restaurantName.slice(0, 3).toUpperCase();
    let cleanedName = restaurantName.replace(/\s+/g, '').toUpperCase(); // Remove spaces and convert to uppercase
    let prefix = cleanedName.slice(0, 3).padEnd(3, '0'); // Take the first 3 characters, and pad with zeros if needed



    try {
        // Step 2: Find existing IDs in the database that start with this prefix (e.g., "PZO%")
        const existingIDs = await Restaurant.find({ restaurantId: new RegExp(`^${prefix}`) })
            .sort({ restaurantId: -1 })  // Sort by descending to get the largest number
            .limit(1); // We only need the latest one

        let nextNumber = 1; // Default to 01

        // Step 3: If an ID exists, increment the last two digits
        if (existingIDs.length > 0) {
            const lastID = existingIDs[0].restaurantId;
            const lastNumber = parseInt(lastID.slice(3), 10); // Extract the last two digits
            nextNumber = lastNumber + 1; // Increment the number
        }

        // Step 4: Format the new restaurant ID (e.g., "PZO01")
        const newID = `${prefix}${String(nextNumber).padStart(2, '0')}`;

        return newID; // Return the newly generated ID

    } catch (error) {
        console.error("Error generating restaurant ID:", error);
        throw new Error("Failed to generate restaurant ID");
    }
};

// Export the function
export { generateRestaurantId }
