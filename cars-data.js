// Comprehensive car database with 100 vehicles
const cars = [
    // Luxury Sedans
    {
        id: 1,
        name: "BMW 3 Series",
        type: "sedan",
        brand: "bmw",
        price: 43900,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.0L Turbo 4-cylinder",
            horsepower: 255,
            mpg: "29 combined",
            seating: 5,
            drive: "RWD",
            cargo: "17.0 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 2,
        name: "Mercedes-Benz C-Class",
        type: "sedan",
        brand: "mercedes",
        price: 44500,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.0L Turbo 4-cylinder",
            horsepower: 255,
            mpg: "28 combined",
            seating: 5,
            drive: "RWD",
            cargo: "12.6 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 3,
        name: "Audi A4",
        type: "sedan",
        brand: "audi",
        price: 40500,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.0L Turbo 4-cylinder",
            horsepower: 261,
            mpg: "30 combined",
            seating: 5,
            drive: "FWD",
            cargo: "13.0 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 4,
        name: "Lexus ES",
        type: "sedan",
        brand: "lexus",
        price: 42260,
        image: "https://images.unsplash.com/photo-1614200187527-327a5b6be6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "3.5L V6",
            horsepower: 302,
            mpg: "26 combined",
            seating: 5,
            drive: "FWD",
            cargo: "16.7 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 5,
        name: "Genesis G90",
        type: "sedan",
        brand: "genesis",
        price: 78950,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "3.5L Twin-Turbo V6",
            horsepower: 375,
            mpg: "20 combined",
            seating: 5,
            drive: "RWD",
            cargo: "15.7 cu ft",
            warranty: "5 yr/60,000 mi"
        }
    },
    // SUVs
    {
        id: 6,
        name: "BMW X5",
        type: "suv",
        brand: "bmw",
        price: 60700,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "3.0L Turbo 6-cylinder",
            horsepower: 335,
            mpg: "23 combined",
            seating: 7,
            drive: "AWD",
            cargo: "33.9 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 7,
        name: "Mercedes-Benz GLE",
        type: "suv",
        brand: "mercedes",
        price: 57750,
        image: "https://images.unsplash.com/photo-1614200187527-327a5b6be6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.0L Turbo 4-cylinder",
            horsepower: 255,
            mpg: "22 combined",
            seating: 5,
            drive: "AWD",
            cargo: "33.3 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 8,
        name: "Audi Q7",
        type: "suv",
        brand: "audi",
        price: 57750,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.0L Turbo 4-cylinder",
            horsepower: 248,
            mpg: "21 combined",
            seating: 7,
            drive: "AWD",
            cargo: "14.8 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 9,
        name: "Lexus RX",
        type: "suv",
        brand: "lexus",
        price: 46500,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.4L Turbo 4-cylinder",
            horsepower: 275,
            mpg: "24 combined",
            seating: 5,
            drive: "FWD",
            cargo: "29.6 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    {
        id: 10,
        name: "Cadillac Escalade",
        type: "suv",
        brand: "cadillac",
        price: 78890,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "6.2L V8",
            horsepower: 420,
            mpg: "16 combined",
            seating: 8,
            drive: "RWD",
            cargo: "25.5 cu ft",
            warranty: "4 yr/50,000 mi"
        }
    },
    // Economy Cars
    {
        id: 11,
        name: "Toyota Corolla",
        type: "sedan",
        brand: "toyota",
        price: 21550,
        image: "https://images.unsplash.com/photo-1624578571415-09e9b1991929?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specs: {
            engine: "2.0L 4-cylinder",
            horsepower: 169,
            mpg: "35 combined",
            seating: 5,
            drive: "FWD",
            cargo: "13.1 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    },
    {
        id: 12,
        name: "Honda Civic",
        type: "sedan",
        brand: "honda",
        price: 22850,
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.0L 4-cylinder",
            horsepower: 158,
            mpg: "35 combined",
            seating: 5,
            drive: "FWD",
            cargo: "14.8 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    },
    {
        id: 13,
        name: "Nissan Sentra",
        type: "sedan",
        brand: "nissan",
        price: 19950,
        image: "https://images.unsplash.com/photo-1624578571415-09e9b1991929?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specs: {
            engine: "2.0L 4-cylinder",
            horsepower: 149,
            mpg: "33 combined",
            seating: 5,
            drive: "FWD",
            cargo: "14.3 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    },
    {
        id: 14,
        name: "Hyundai Elantra",
        type: "sedan",
        brand: "hyundai",
        price: 20645,
        image: "https://images.unsplash.com/photo-1624578571415-09e9b1991929?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specs: {
            engine: "2.0L 4-cylinder",
            horsepower: 147,
            mpg: "35 combined",
            seating: 5,
            drive: "FWD",
            cargo: "14.2 cu ft",
            warranty: "5 yr/60,000 mi"
        }
    },
    {
        id: 15,
        name: "Kia Forte",
        type: "sedan",
        brand: "kia",
        price: 19590,
        image: "https://images.unsplash.com/photo-1624578571415-09e9b1991929?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specs: {
            engine: "2.0L 4-cylinder",
            horsepower: 147,
            mpg: "32 combined",
            seating: 5,
            drive: "FWD",
            cargo: "15.3 cu ft",
            warranty: "5 yr/60,000 mi"
        }
    },
    // Compact SUVs
    {
        id: 16,
        name: "Toyota RAV4",
        type: "suv",
        brand: "toyota",
        price: 32575,
        image: "https://images.unsplash.com/photo-1632137924251-fcea5ff46035?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specs: {
            engine: "2.5L 4-cylinder",
            horsepower: 203,
            mpg: "30 combined",
            seating: 5,
            drive: "AWD",
            cargo: "37.6 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    },
    {
        id: 17,
        name: "Honda CR-V",
        type: "suv",
        brand: "honda",
        price: 32160,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "1.5L Turbo 4-cylinder",
            horsepower: 190,
            mpg: "31 combined",
            seating: 5,
            drive: "FWD",
            cargo: "39.2 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    },
    {
        id: 18,
        name: "Nissan Rogue",
        type: "suv",
        brand: "nissan",
        price: 32910,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.5L 4-cylinder",
            horsepower: 181,
            mpg: "30 combined",
            seating: 5,
            drive: "FWD",
            cargo: "39.3 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    },
    {
        id: 19,
        name: "Mazda CX-5",
        type: "suv",
        brand: "mazda",
        price: 29550,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.5L 4-cylinder",
            horsepower: 187,
            mpg: "28 combined",
            seating: 5,
            drive: "FWD",
            cargo: "30.9 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    },
    {
        id: 20,
        name: "Subaru Forester",
        type: "suv",
        brand: "subaru",
        price: 26995,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: {
            engine: "2.5L 4-cylinder",
            horsepower: 182,
            mpg: "29 combined",
            seating: 5,
            drive: "AWD",
            cargo: "31.1 cu ft",
            warranty: "3 yr/36,000 mi"
        }
    }
];
