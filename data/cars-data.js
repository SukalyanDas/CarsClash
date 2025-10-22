// Main car data file - combines all vehicle types
// This file imports and combines all car data from separate files

// Import all car data
const allCars = [
    ...luxurySedans,
    ...suvs,
    ...economySedans
];

// Export for use in other files
window.cars = allCars;
