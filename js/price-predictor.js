// TensorFlow.js Price Prediction Model
class PricePredictor {
    constructor() {
        this.priceModel = null;
        this.modelReady = false;
        this.normalizationParams = {
            horsepower: { min: 0, max: 0, mean: 0, std: 0 },
            mpg: { min: 0, max: 0, mean: 0, std: 0 },
            seating: { min: 0, max: 0, mean: 0, std: 0 },
            price: { min: 0, max: 0, mean: 0, std: 0 }
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeModel();
    }

    bindEvents() {
        const predictionForm = document.getElementById('prediction-form');
        if (predictionForm) {
            predictionForm.addEventListener('submit', (e) => this.handlePrediction(e));
        }
    }

    // Update status indicator
    updateStatus(message, ready = false) {
        const statusElement = document.getElementById('model-status');
        const statusIcon = document.getElementById('status-icon');
        const indicator = document.querySelector('.status-indicator');
        
        if (statusElement) statusElement.textContent = message;
        
        if (ready) {
            if (statusIcon) statusIcon.className = 'fas fa-check-circle';
            if (indicator) indicator.classList.add('ready');
            this.modelReady = true;
        } else {
            if (statusIcon) statusIcon.className = 'fas fa-circle-notch fa-spin';
        }
    }

    // Extract numeric value from MPG string
    extractMPG(mpgString) {
        const match = mpgString.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }

    // Normalize data for training
    calculateNormalizationParams(data, field) {
        const values = data.map(item => item[field]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const std = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / values.length);
        
        return { min, max, mean, std };
    }

    // Normalize value
    normalize(value, params) {
        return (value - params.min) / (params.max - params.min + 0.0001);
    }

    // Denormalize value
    denormalize(value, params) {
        return value * (params.max - params.min) + params.min;
    }

    // Encode categorical features
    encodeCategorical(value, type) {
        const encodings = {
            type: { sedan: 0, suv: 0.33, truck: 0.66, electric: 1 },
            drive: { FWD: 0, RWD: 0.5, AWD: 1 },
            brand: { economy: 0, luxury: 0.5, premium: 1 }
        };
        
        return encodings[type][value] || 0;
    }

    // Get brand category from car brand
    getBrandCategory(brand) {
        const economy = ['toyota', 'honda', 'nissan', 'hyundai', 'kia', 'mazda', 'subaru', 'ford'];
        const luxury = ['bmw', 'mercedes', 'audi', 'tesla'];
        const premium = ['lexus', 'cadillac', 'genesis'];
        
        if (economy.includes(brand)) return 'economy';
        if (luxury.includes(brand)) return 'luxury';
        if (premium.includes(brand)) return 'premium';
        return 'economy';
    }

    // Prepare training data
    prepareTrainingData() {
        const trainingData = cars.map(car => {
            const horsepower = parseInt(car.specs.horsepower);
            const mpg = this.extractMPG(car.specs.mpg);
            const seating = car.specs.seating;
            const price = car.price;
            const type = car.type;
            const drive = car.specs.drive;
            const brand = this.getBrandCategory(car.brand);
            
            return { horsepower, mpg, seating, price, type, drive, brand };
        });
        
        // Calculate normalization parameters
        this.normalizationParams.horsepower = this.calculateNormalizationParams(trainingData, 'horsepower');
        this.normalizationParams.mpg = this.calculateNormalizationParams(trainingData, 'mpg');
        this.normalizationParams.seating = this.calculateNormalizationParams(trainingData, 'seating');
        this.normalizationParams.price = this.calculateNormalizationParams(trainingData, 'price');
        
        return trainingData;
    }

    // Create and train the model
    async createAndTrainModel() {
        this.updateStatus('Initializing TensorFlow.js model...');
        
        // Prepare data
        const trainingData = this.prepareTrainingData();
        
        // Create features and labels
        const features = trainingData.map(data => [
            this.normalize(data.horsepower, this.normalizationParams.horsepower),
            this.normalize(data.mpg, this.normalizationParams.mpg),
            this.normalize(data.seating, this.normalizationParams.seating),
            this.encodeCategorical(data.type, 'type'),
            this.encodeCategorical(data.drive, 'drive'),
            this.encodeCategorical(data.brand, 'brand')
        ]);
        
        const labels = trainingData.map(data => 
            this.normalize(data.price, this.normalizationParams.price)
        );
        
        // Convert to tensors
        const xs = tf.tensor2d(features);
        const ys = tf.tensor2d(labels, [labels.length, 1]);
        
        // Create model
        const model = tf.sequential({
            layers: [
                tf.layers.dense({ inputShape: [6], units: 64, activation: 'relu' }),
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({ units: 32, activation: 'relu' }),
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({ units: 16, activation: 'relu' }),
                tf.layers.dense({ units: 1, activation: 'linear' })
            ]
        });
        
        // Compile model
        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'meanSquaredError',
            metrics: ['mae']
        });
        
        this.updateStatus('Training model on ' + trainingData.length + ' vehicles...');
        
        // Train model
        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 8,
            validationSplit: 0.2,
            verbose: 0,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    if (epoch % 10 === 0) {
                        this.updateStatus(`Training... Epoch ${epoch}/100 (Loss: ${logs.loss.toFixed(4)})`);
                    }
                }
            }
        });
        
        // Clean up tensors
        xs.dispose();
        ys.dispose();
        
        this.priceModel = model;
        this.updateStatus(`✓ Model ready! Trained on ${trainingData.length} vehicles`, true);
        
        // Update training samples count
        const trainingSamplesElement = document.getElementById('training-samples');
        if (trainingSamplesElement) {
            trainingSamplesElement.textContent = trainingData.length;
        }
        
        // Enable prediction form
        const predictBtn = document.getElementById('predict-btn');
        if (predictBtn) {
            predictBtn.disabled = false;
        }
    }

    // Make prediction
    async predictPrice(inputData) {
        if (!this.priceModel || !this.modelReady) {
            alert('Model is still training. Please wait...');
            return null;
        }
        
        // Prepare input features
        const features = [
            this.normalize(inputData.horsepower, this.normalizationParams.horsepower),
            this.normalize(inputData.mpg, this.normalizationParams.mpg),
            this.normalize(inputData.seating, this.normalizationParams.seating),
            this.encodeCategorical(inputData.type, 'type'),
            this.encodeCategorical(inputData.drive, 'drive'),
            this.encodeCategorical(inputData.brand, 'brand')
        ];
        
        // Create tensor and predict
        const inputTensor = tf.tensor2d([features]);
        const prediction = this.priceModel.predict(inputTensor);
        const normalizedPrice = await prediction.data();
        
        // Clean up
        inputTensor.dispose();
        prediction.dispose();
        
        // Denormalize prediction
        const predictedPrice = this.denormalize(normalizedPrice[0], this.normalizationParams.price);
        
        return Math.round(predictedPrice);
    }

    // Handle form submission
    async handlePrediction(e) {
        e.preventDefault();
        
        if (!this.modelReady) {
            alert('Model is still training. Please wait...');
            return;
        }
        
        // Get form values
        const inputData = {
            horsepower: parseInt(document.getElementById('input-horsepower').value),
            mpg: parseInt(document.getElementById('input-mpg').value),
            seating: parseInt(document.getElementById('input-seating').value),
            type: document.getElementById('input-type').value,
            drive: document.getElementById('input-drive').value,
            brand: document.getElementById('input-brand').value
        };
        
        // Show loading state
        const predictBtn = document.getElementById('predict-btn');
        const originalText = predictBtn.innerHTML;
        predictBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Predicting...';
        predictBtn.disabled = true;
        
        // Make prediction
        const predictedPrice = await this.predictPrice(inputData);
        
        if (predictedPrice) {
            // Display result
            document.getElementById('predicted-price').textContent = 
                '$' + predictedPrice.toLocaleString();
            document.getElementById('prediction-result').style.display = 'block';
            
            // Scroll to result
            document.getElementById('prediction-result').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
        
        // Reset button
        predictBtn.innerHTML = originalText;
        predictBtn.disabled = false;
    }

    // Initialize model when TensorFlow.js is loaded
    async initializeModel() {
        try {
            // Check if TensorFlow.js is loaded
            if (typeof tf === 'undefined') {
                this.updateStatus('Error: TensorFlow.js failed to load');
                return;
            }
            
            // Disable predict button initially
            const predictBtn = document.getElementById('predict-btn');
            if (predictBtn) {
                predictBtn.disabled = true;
            }
            
            // Create and train model
            await this.createAndTrainModel();
            
        } catch (error) {
            console.error('Error initializing model:', error);
            this.updateStatus('Error loading model: ' + error.message);
        }
    }
}

// Initialize when page loads (after TensorFlow.js is loaded)
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('prediction-form')) {
        // Wait a bit for TensorFlow.js to fully initialize
        setTimeout(() => new PricePredictor(), 500);
    }
});
