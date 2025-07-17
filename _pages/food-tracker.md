---
title: "Food Tracker"
permalink: /food-tracker/
layout: single
author_profile: false
---

<div class="food-tracker-container">
  <header class="header">
    <div class="header-content">
      <img src="/assets/images/energy-icon.svg" alt="Energy" class="header-icon energy-icon">
      <h1>🍽️ Magdalena Food Tracker</h1>
      <img src="/assets/images/bunny-icon.svg" alt="Bunny" class="header-icon bunny-icon">
    </div>
    <p class="subtitle">Track your meals and how they make you feel ✨</p>
  </header>

  <main class="main-content">
    <!-- Add Entry Form -->
    <section class="form-section">
      <div class="section-header">
        <img src="/assets/images/star-icon.svg" alt="Star" class="section-icon">
        <h2>Add New Entry</h2>
      </div>
      <form id="foodForm" class="food-form">
        <div class="form-group">
          <label for="food">Food you ate</label>
          <input type="text" id="food" name="food" required placeholder="e.g., Grilled salmon with vegetables">
        </div>

        <div class="form-group">
          <label for="timeOfDay">Time of Day</label>
          <input type="time" id="timeOfDay" name="timeOfDay" required>
        </div>

        <div class="form-group">
          <label for="amount">Amount eaten</label>
          <input type="text" id="amount" name="amount" required placeholder="e.g., 1 cup, 2 pieces, 200g">
        </div>

        <div class="form-group">
          <label>Enjoyment</label>
          <div class="enjoyment-buttons">
            <button type="button" class="enjoyment-btn" data-value="0">😞</button>
            <button type="button" class="enjoyment-btn" data-value="25">😐</button>
            <button type="button" class="enjoyment-btn" data-value="50">😊</button>
            <button type="button" class="enjoyment-btn" data-value="75">😄</button>
            <button type="button" class="enjoyment-btn" data-value="100">🤩</button>
          </div>
          <input type="hidden" id="enjoyment" name="enjoyment" required>
        </div>

        <div class="form-group">
          <label for="feeling">How did you feel afterwards?</label>
          <input type="text" id="feeling" name="feeling" required placeholder="e.g., Energized, tired, satisfied, bloated">
        </div>

        <button type="submit" class="submit-btn">
          <span>Add Entry</span>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDJMMTEuMDkgNC4xM0wxNCA0TDEyIDZMMTQgOEwxMS4wOSA3Ljg3TDEwIDEwTDguOTEgNy44N0w2IDhMOCA2TDYgNEw4LjkxIDQuMTNMMTAgMloiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==" alt="Sparkle" class="btn-icon">
        </button>
      </form>
    </section>

    <!-- Display Section -->
    <section class="display-section">
      <div class="display-header">
        <div class="section-header">
          <img src="/assets/images/star-icon.svg" alt="Star" class="section-icon">
          <h2>Recent Entries</h2>
        </div>
        <button id="toggleView" class="toggle-btn">
          <span>Show All Data</span>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTJMMTIgOEw4IDQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIgOEg0IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" alt="Arrow" class="btn-icon">
        </button>
      </div>
      
      <div id="entriesContainer" class="entries-container">
        <!-- Entries will be populated here -->
      </div>
    </section>
  </main>

  <!-- Floating decorative elements -->
  <div class="floating-elements">
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0ZGRjBGMCIvPgo8L3N2Zz4K" alt="Flower" class="floating-element flower-1">
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iIzAwRkZGRiIvPgo8L3N2Zz4K" alt="Flower" class="floating-element flower-2">
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0ZGRjBGMCIvPgo8L3N2Zz4K" alt="Flower" class="floating-element flower-3">
  </div>
</div>

<style>
/* Food Tracker Styles - Cutesy Pink & Mint Theme */
.food-tracker-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* Background gradient */
.food-tracker-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #FFE6F2 0%, #E6FFF2 50%, #FFF0E6 100%);
  z-index: -1;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.header-icon {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  animation: bounce 2s infinite;
}

.energy-icon {
  animation-delay: 0s;
}

.bunny-icon {
  animation-delay: 0.5s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #FF69B4;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.2);
  background: linear-gradient(45deg, #FF69B4, #98FB98);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.1rem;
  font-weight: 300;
  color: #FF69B4;
  opacity: 0.8;
}

/* Main content */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .food-tracker-container {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}

/* Section headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.section-icon {
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
}

/* Form section */
.form-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.2);
  border: 2px solid #FFE6F2;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.form-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #FF69B4, #98FB98, #FF69B4);
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.form-section h2 {
  color: #FF69B4;
  margin: 0;
  font-weight: 600;
}

.food-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #FF69B4;
  font-size: 0.9rem;
}

.form-group input[type="text"],
.form-group input[type="time"] {
  padding: 0.75rem;
  border: 2px solid #FFE6F2;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.form-group input:focus {
  outline: none;
  border-color: #FF69B4;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
}

/* Enjoyment buttons */
.enjoyment-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.enjoyment-btn {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #FFE6F2;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enjoyment-btn:hover {
  border-color: #FF69B4;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.2);
}

.enjoyment-btn.selected {
  border-color: #FF69B4;
  background: linear-gradient(135deg, #FF69B4, #98FB98);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}

/* Submit button */
.submit-btn {
  background: linear-gradient(135deg, #FF69B4 0%, #98FB98 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Display section */
.display-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(152, 251, 152, 0.2);
  border: 2px solid #E6FFF2;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.display-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #98FB98, #FF69B4, #98FB98);
  background-size: 200% 100%;
  animation: shimmer 3s infinite reverse;
}

.display-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.display-header h2 {
  color: #98FB98;
  margin: 0;
  font-weight: 600;
}

.toggle-btn {
  background: rgba(152, 251, 152, 0.1);
  color: #98FB98;
  border: 2px solid #E6FFF2;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-btn:hover {
  background: rgba(152, 251, 152, 0.2);
  border-color: #98FB98;
  transform: translateY(-1px);
}

/* Entries container */
.entries-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.entry-card {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #FFE6F2;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.entry-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #FF69B4, #98FB98);
}

.entry-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.15);
  border-color: #FF69B4;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.food-name {
  font-weight: 600;
  color: #FF69B4;
  font-size: 1.1rem;
  flex: 1;
}

.entry-time {
  color: #98FB98;
  font-size: 0.9rem;
  font-weight: 500;
}

.entry-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.8rem;
  color: #FF69B4;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  color: #333;
  font-weight: 500;
}

.enjoyment-display {
  font-size: 1.5rem;
}

.feeling-badge {
  background: linear-gradient(135deg, #FF69B4 0%, #98FB98 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #FF69B4;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #FF69B4;
}

/* Loading state */
.loading {
  text-align: center;
  padding: 2rem;
  color: #FF69B4;
}

/* Floating decorative elements */
.floating-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.floating-element {
  position: absolute;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.flower-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.flower-2 {
  top: 20%;
  right: 15%;
  animation-delay: 2s;
}

.flower-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .entry-details {
    grid-template-columns: 1fr;
  }
  
  .enjoyment-buttons {
    flex-wrap: wrap;
  }
  
  .enjoyment-btn {
    min-width: 60px;
  }
  
  .display-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .toggle-btn {
    text-align: center;
    justify-content: center;
  }
  
  .header-content {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Animation for new entries */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.entry-card {
  animation: slideIn 0.3s ease-out;
}
</style>

<script>
class FoodTracker {
    constructor() {
        this.csvFile = '/files/food_data.csv';
        this.entries = [];
        this.showAllData = false;
        this.selectedEnjoyment = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadData();
        this.setCurrentTime();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('foodForm');
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Enjoyment buttons
        const enjoymentButtons = document.querySelectorAll('.enjoyment-btn');
        enjoymentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectEnjoyment(e));
        });

        // Toggle view button
        const toggleBtn = document.getElementById('toggleView');
        toggleBtn.addEventListener('click', () => this.toggleView());
    }

    setCurrentTime() {
        const now = new Date();
        const timeString = now.toTimeString().slice(0, 5);
        document.getElementById('timeOfDay').value = timeString;
    }

    selectEnjoyment(event) {
        // Remove previous selection
        document.querySelectorAll('.enjoyment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Add selection to clicked button
        event.target.classList.add('selected');
        this.selectedEnjoyment = event.target.dataset.value;
        document.getElementById('enjoyment').value = this.selectedEnjoyment;
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        // Validate enjoyment selection
        if (!this.selectedEnjoyment) {
            alert('Please select your enjoyment level');
            return;
        }

        const formData = new FormData(event.target);
        const entry = {
            food: formData.get('food'),
            timeOfDay: formData.get('timeOfDay'),
            amount: formData.get('amount'),
            enjoyment: formData.get('enjoyment'),
            feeling: formData.get('feeling'),
            timestamp: new Date().toISOString()
        };

        try {
            await this.addEntry(entry);
            this.clearForm();
            this.showSuccessMessage();
        } catch (error) {
            console.error('Error adding entry:', error);
            alert('Error adding entry. Please try again.');
        }
    }

    clearForm() {
        document.getElementById('foodForm').reset();
        document.querySelectorAll('.enjoyment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.selectedEnjoyment = null;
        this.setCurrentTime();
    }

    showSuccessMessage() {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = '✓ Added!';
        submitBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #FF69B4 0%, #98FB98 100%)';
        }, 2000);
    }

    async loadData() {
        // First try to load from localStorage
        const localStorageData = localStorage.getItem('foodTrackerData');
        if (localStorageData) {
            this.parseCSV(localStorageData);
            this.displayEntries();
            return;
        }

        // If no localStorage data, try to load from CSV file
        try {
            const response = await fetch(this.csvFile);
            if (response.ok) {
                const csvText = await response.text();
                this.parseCSV(csvText);
                // Save to localStorage for future use
                localStorage.setItem('foodTrackerData', csvText);
            } else {
                // Create new CSV file if it doesn't exist
                await this.createInitialCSV();
            }
        } catch (error) {
            console.log('No existing data found, creating new file');
            await this.createInitialCSV();
        }
        this.displayEntries();
    }

    async createInitialCSV() {
        const headers = ['Food you ate', 'Time of Day', 'Amount eaten', 'Enjoyment', 'How did you feel afterwards?', 'Timestamp'];
        const csvContent = headers.join(',') + '\n';
        
        // Add sample data for demonstration
        const sampleEntries = [
            {
                food: 'Grilled salmon with quinoa',
                timeOfDay: '12:30',
                amount: '1 fillet with 1/2 cup quinoa',
                enjoyment: '75',
                feeling: 'Energized and satisfied',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                food: 'Greek yogurt with berries',
                timeOfDay: '09:15',
                amount: '1 cup with 1/4 cup mixed berries',
                enjoyment: '100',
                feeling: 'Light and refreshed',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            },
            {
                food: 'Chicken stir-fry',
                timeOfDay: '19:45',
                amount: '1 bowl with vegetables',
                enjoyment: '50',
                feeling: 'A bit heavy',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        const sampleCSV = csvContent + sampleEntries.map(entry => 
            `"${entry.food}","${entry.timeOfDay}","${entry.amount}","${entry.enjoyment}","${entry.feeling}","${entry.timestamp}"`
        ).join('\n');
        
        localStorage.setItem('foodTrackerData', sampleCSV);
        this.parseCSV(sampleCSV);
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        if (lines.length <= 1) return; // Only headers or empty

        this.entries = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const values = this.parseCSVLine(line);
            
            if (values.length >= 5) {
                this.entries.push({
                    food: values[0],
                    timeOfDay: values[1],
                    amount: values[2],
                    enjoyment: values[3],
                    feeling: values[4],
                    timestamp: values[5] || new Date().toISOString()
                });
            }
        }

        // Sort by timestamp, newest first
        this.entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }

    async addEntry(entry) {
        this.entries.unshift(entry); // Add to beginning
        
        // Convert to CSV format
        const csvLine = [
            `"${entry.food}"`,
            `"${entry.timeOfDay}"`,
            `"${entry.amount}"`,
            `"${entry.enjoyment}"`,
            `"${entry.feeling}"`,
            `"${entry.timestamp}"`
        ].join(',') + '\n';

        // For now, we'll use localStorage as the primary storage
        // In the future, you can implement a simple backend to write to the CSV file
        let existingContent = localStorage.getItem('foodTrackerData') || 'Food you ate,Time of Day,Amount eaten,Enjoyment,How did you feel afterwards?,Timestamp\n';
        const newContent = existingContent + csvLine;
        localStorage.setItem('foodTrackerData', newContent);
        
        this.displayEntries();
    }

    displayEntries() {
        const container = document.getElementById('entriesContainer');
        const entriesToShow = this.showAllData ? this.entries : this.entries.slice(0, 5);

        if (entriesToShow.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No entries yet</h3>
                    <p>Add your first food entry to get started!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = entriesToShow.map(entry => this.createEntryCard(entry)).join('');
    }

    createEntryCard(entry) {
        const enjoymentEmoji = this.getEnjoymentEmoji(entry.enjoyment);
        const formattedTime = this.formatTime(entry.timeOfDay);
        const formattedDate = this.formatDate(entry.timestamp);

        return `
            <div class="entry-card">
                <div class="entry-header">
                    <div class="food-name">${this.escapeHtml(entry.food)}</div>
                    <div class="entry-time">${formattedTime} • ${formattedDate}</div>
                </div>
                <div class="entry-details">
                    <div class="detail-item">
                        <div class="detail-label">Amount</div>
                        <div class="detail-value">${this.escapeHtml(entry.amount)}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Enjoyment</div>
                        <div class="detail-value enjoyment-display">${enjoymentEmoji}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Feeling</div>
                        <div class="detail-value">
                            <span class="feeling-badge">${this.escapeHtml(entry.feeling)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getEnjoymentEmoji(enjoyment) {
        const emojiMap = {
            '0': '😞',
            '25': '😐',
            '50': '😊',
            '75': '😄',
            '100': '🤩'
        };
        return emojiMap[enjoyment] || '😐';
    }

    formatTime(timeString) {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggleView() {
        this.showAllData = !this.showAllData;
        const toggleBtn = document.getElementById('toggleView');
        toggleBtn.querySelector('span').textContent = this.showAllData ? 'Show Recent Only' : 'Show All Data';
        this.displayEntries();
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FoodTracker();
});


</script> 