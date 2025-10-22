// Car filtering and browsing functionality
class CarBrowser {
    constructor() {
        this.carsContainer = document.getElementById('cars-container');
        this.typeFilter = document.getElementById('type-filter');
        this.priceFilter = document.getElementById('price-filter');
        this.brandFilter = document.getElementById('brand-filter');
        this.compareButton = document.getElementById('compare-button');
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderCars(cars);
    }

    bindEvents() {
        this.typeFilter.addEventListener('change', () => this.filterCars());
        this.priceFilter.addEventListener('change', () => this.filterCars());
        this.brandFilter.addEventListener('change', () => this.filterCars());
        this.compareButton.addEventListener('click', () => this.compareCars());
    }

    renderCars(carsToRender) {
        this.carsContainer.innerHTML = '';
        
        if (carsToRender.length === 0) {
            this.carsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 1.2rem;">No cars match your selected filters. Please try different criteria.</p>';
            return;
        }
        
        carsToRender.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.innerHTML = `
                <div class="car-badge">${car.type.toUpperCase()}</div>
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}">
                </div>
                <div class="car-details">
                    <div class="car-title">
                        <h2>${car.name}</h2>
                        <div class="car-price">$${car.price.toLocaleString()}</div>
                    </div>
                    <div class="car-specs">
                        <div class="spec">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${car.specs.horsepower} HP</span>
                        </div>
                        <div class="spec">
                            <i class="fas fa-gas-pump"></i>
                            <span>${car.specs.mpg}</span>
                        </div>
                        <div class="spec">
                            <i class="fas fa-cogs"></i>
                            <span>${car.specs.engine}</span>
                        </div>
                        <div class="spec">
                            <i class="fas fa-road"></i>
                            <span>${car.specs.drive}</span>
                        </div>
                    </div>
                    <div class="select-car">
                        <input type="checkbox" class="select-checkbox" data-car-id="${car.id}">
                        <label>Select for comparison</label>
                    </div>
                </div>
            `;
            this.carsContainer.appendChild(carCard);
        });
    }

    filterCars() {
        const typeValue = this.typeFilter.value;
        const priceValue = this.priceFilter.value;
        const brandValue = this.brandFilter.value;
        
        const filteredCars = cars.filter(car => {
            // Type filter
            if (typeValue !== 'all' && car.type !== typeValue) return false;
            
            // Brand filter
            if (brandValue !== 'all' && car.brand !== brandValue) return false;
            
            // Price filter
            if (priceValue !== 'all') {
                if (priceValue === 'low' && car.price >= 30000) return false;
                if (priceValue === 'medium' && (car.price < 30000 || car.price > 50000)) return false;
                if (priceValue === 'high' && car.price <= 50000) return false;
            }
            
            return true;
        });
        
        this.renderCars(filteredCars);
    }

    compareCars() {
        const selectedCheckboxes = document.querySelectorAll('.select-checkbox:checked');
        
        if (selectedCheckboxes.length < 2) {
            alert('Please select at least 2 cars to compare');
            return;
        }
        
        const selectedCarIds = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.carId));
        const selectedCars = cars.filter(car => selectedCarIds.includes(car.id));
        
        // Navigate to comparison page
        navigateToPage('compare');
        
        // Build comparison table
        const comparisonTable = document.querySelector('.comparison-table');
        let tableHTML = `
            <thead>
                <tr>
                    <th>Specification</th>
        `;
        
        // Add car names to header
        selectedCars.forEach(car => {
            tableHTML += `<th class="car-header">
                <img src="${car.image}" alt="${car.name}">
                <div>${car.name}</div>
                <div class="car-price">$${car.price.toLocaleString()}</div>
            </th>`;
        });
        
        tableHTML += `</tr></thead><tbody>`;
        
        // Add specifications rows
        const specKeys = Object.keys(selectedCars[0].specs);
        
        specKeys.forEach(spec => {
            tableHTML += `<tr><th>${spec.charAt(0).toUpperCase() + spec.slice(1)}</th>`;
            
            // Find best value for this spec (for highlighting)
            let bestValue = null;
            if (spec === 'horsepower') {
                bestValue = Math.max(...selectedCars.map(car => parseInt(car.specs[spec])));
            } else if (spec === 'mpg') {
                // Extract numeric value from MPG string
                const mpgValues = selectedCars.map(car => {
                    const match = car.specs[spec].match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                });
                bestValue = Math.max(...mpgValues);
            }
            
            selectedCars.forEach(car => {
                let value = car.specs[spec];
                let isWinner = false;
                
                if (spec === 'horsepower' && parseInt(value) === bestValue) {
                    isWinner = true;
                } else if (spec === 'mpg') {
                    const match = value.match(/\d+/);
                    if (match && parseInt(match[0]) === bestValue) {
                        isWinner = true;
                    }
                }
                
                tableHTML += `<td class="spec-value ${isWinner ? 'winner' : ''}">${value}</td>`;
            });
            
            tableHTML += `</tr>`;
        });
        
        tableHTML += `</tbody>`;
        
        comparisonTable.innerHTML = tableHTML;
    }
}

// Initialize car browser when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cars-container')) {
        new CarBrowser();
    }
});
