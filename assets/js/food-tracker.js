// Food Tracker Application
class FoodTracker {
    constructor() {
        this.entries = [];
        this.showAllData = false;
        this.editingEntryId = null;
        this.unsubscribe = null;
        
        console.log('Food Tracker: Constructor called');
        this.initializeApp();
    }

    initializeApp() {
        console.log('Food Tracker: Initializing app...');
        this.setupEventListeners();
        this.setCurrentTime();
        this.loadData();
    }

    setupEventListeners() {
        console.log('Food Tracker: Setting up event listeners...');
        
        // Form submission
        const form = document.getElementById('foodForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Enjoyment buttons
        const enjoymentButtons = document.querySelectorAll('.enjoyment-btn');
        enjoymentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectEnjoyment(e));
        });

        // Toggle view button
        const toggleBtn = document.getElementById('toggleView');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleView());
        }

        // Event delegation for edit buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const entryCard = e.target.closest('.entry-card');
                if (entryCard) {
                    const entryId = entryCard.dataset.entryId;
                    if (entryId) {
                        this.startEditing(entryId);
                    }
                }
            }
        });

        console.log('Food Tracker: Event listeners set up successfully');
    }

    setCurrentTime() {
        const now = new Date();
        const timeString = now.toTimeString().slice(0, 5);
        const timeInput = document.getElementById('timeOfDay');
        if (timeInput) {
            timeInput.value = timeString;
        }
    }

    selectEnjoyment(event) {
        // Remove selected class from all buttons
        document.querySelectorAll('.enjoyment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selected class to clicked button
        event.target.classList.add('selected');
        
        // Update hidden input
        const value = event.target.dataset.value;
        const hiddenInput = document.getElementById('enjoyment');
        if (hiddenInput) {
            hiddenInput.value = value;
        }
        
        console.log('Enjoyment selected:', value);
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        console.log('Food Tracker: Form submitted');
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Validate enjoyment selection
        const enjoyment = formData.get('enjoyment');
        if (!enjoyment) {
            alert('Please select an enjoyment level!');
            return;
        }
        
        // Create entry object
        const entry = {
            id: this.generateId(),
            food: formData.get('food'),
            timeOfDay: formData.get('timeOfDay'),
            amount: formData.get('amount'),
            enjoyment: enjoyment,
            feeling: formData.get('feeling'),
            timestamp: new Date().toISOString()
        };
        
        console.log('Adding entry:', entry);
        
        try {
            await this.addEntry(entry);
            this.clearForm();
            this.showSuccessMessage();
        } catch (error) {
            console.error('Error adding entry:', error);
            alert('Error adding entry. Please try again.');
        }
    }

    generateId() {
        return 'md' + Math.random().toString(36).substr(2, 9);
    }

    clearForm() {
        const form = document.getElementById('foodForm');
        if (form) {
            form.reset();
        }
        
        // Clear enjoyment selection
        document.querySelectorAll('.enjoyment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Reset hidden input
        const hiddenInput = document.getElementById('enjoyment');
        if (hiddenInput) {
            hiddenInput.value = '';
        }
        
        // Set current time
        this.setCurrentTime();
    }

    showSuccessMessage() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Entry Added! ✨</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 2000);
        }
    }

    async loadData() {
        try {
            console.log('Loading data from Firebase...');
            
            // Check if Firebase is available
            console.log('Checking Firebase availability:', {
                windowDb: !!window.db,
                dbType: typeof window.db,
                hasCollection: window.db && typeof window.db.collection === 'function',
                userAgent: navigator.userAgent
            });
            
            // For Firefox, be more patient with Firebase loading
            if (!window.db || typeof window.db.collection !== 'function') {
                if (navigator.userAgent.includes('Firefox')) {
                    console.log('Firefox detected - Firebase not ready, waiting...');
                    setTimeout(() => this.loadData(), 1000);
                    return;
                } else {
                    console.log('Firebase not available or invalid, using localStorage fallback');
                    this.loadFromLocalStorage();
                    return;
                }
            }
            
            // Set up real-time listener using Firebase v8 API
            console.log('Setting up Firebase listener with db:', window.db);
            const q = window.db.collection('food_entries').orderBy('timestamp', 'desc');
            
            this.unsubscribe = q.onSnapshot((snapshot) => {
                this.entries = [];
                snapshot.forEach((doc) => {
                    const entry = { id: doc.id, ...doc.data() };
                    this.entries.push(entry);
                });
                
                console.log('Loaded entries from Firebase:', this.entries);
                this.displayEntries();
            }, (error) => {
                console.error('Error loading data:', error);
                // Fallback to localStorage if Firebase fails
                this.loadFromLocalStorage();
            });
                
        } catch (error) {
            console.error('Error setting up Firebase listener:', error);
            this.loadFromLocalStorage();
        }
    }

    loadFromLocalStorage() {
        // Fallback to localStorage
        const savedData = localStorage.getItem('foodTrackerData');
        if (savedData) {
            try {
                this.entries = JSON.parse(savedData);
                console.log('Loaded entries from localStorage:', this.entries);
                this.migrateEntries();
            } catch (error) {
                console.error('Error parsing saved data:', error);
                this.entries = [];
            }
        } else {
            // Create initial sample data
            this.createSampleData();
        }

        // Sort by timestamp, newest first
        this.entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        this.displayEntries();
    }

    migrateEntries() {
        let needsMigration = false;

        this.entries.forEach((entry, index) => {
            if (!entry.id) {
                entry.id = this.generateId();
                needsMigration = true;
                console.log(`Added ID to entry ${index}:`, entry.id);
            }
        });

        if (needsMigration) {
            console.log('Migrating entries to include IDs');
            this.saveToLocalStorage();
            console.log('Migration completed. All entries now have IDs.');
        } else {
            console.log('All entries already have IDs');
        }

        // Log all entries with their IDs for debugging
        this.entries.forEach((entry, index) => {
            console.log(`Entry ${index}:`, { id: entry.id, food: entry.food, feeling: entry.feeling });
        });
    }

    createSampleData() {
        const sampleEntries = [
            {
                id: this.generateId(),
                food: 'Grilled salmon with quinoa',
                timeOfDay: '12:30',
                amount: '1 fillet with 1/2 cup quinoa',
                enjoyment: '75',
                feeling: 'Energized and satisfied',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                id: this.generateId(),
                food: 'Greek yogurt with berries',
                timeOfDay: '09:15',
                amount: '1 cup with 1/4 cup mixed berries',
                enjoyment: '100',
                feeling: 'Light and refreshed',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            },
            {
                id: this.generateId(),
                food: 'Chicken stir-fry',
                timeOfDay: '19:45',
                amount: '1 bowl with vegetables',
                enjoyment: '50',
                feeling: 'A bit heavy',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        console.log('Creating sample data:', sampleEntries);
        this.entries = sampleEntries;
        this.saveToLocalStorage();
    }

    async addEntry(entry) {
        try {
            console.log('Adding entry to Firebase:', entry);
            
            // Check if Firebase is available
            if (!window.db) {
                console.log('Firebase not available, saving to localStorage');
                this.entries.unshift(entry);
                this.saveToLocalStorage();
                this.displayEntries();
                return;
            }
            
            const docRef = await window.db.collection('food_entries').add(entry);
            console.log('Entry added with ID:', docRef.id);
            // Note: We don't need to manually update this.entries or displayEntries()
            // because the real-time listener will handle that automatically
        } catch (error) {
            console.error('Error adding entry to Firebase:', error);
            // Fallback to localStorage
            this.entries.unshift(entry);
            this.saveToLocalStorage();
            this.displayEntries();
        }
    }

    async updateEntry(entryId, updatedData) {
        try {
            console.log('Updating entry in Firebase:', entryId, updatedData);
            
            // Check if Firebase is available
            if (!window.db) {
                console.log('Firebase not available, updating localStorage');
                const entry = this.entries.find(e => e.id === entryId);
                if (entry) {
                    Object.assign(entry, updatedData);
                    this.saveToLocalStorage();
                    this.displayEntries();
                }
                return;
            }
            
            await window.db.collection('food_entries').doc(entryId).update(updatedData);
            console.log('Entry updated successfully');
            // Real-time listener will handle the UI update
        } catch (error) {
            console.error('Error updating entry in Firebase:', error);
            // Fallback to localStorage
            const entry = this.entries.find(e => e.id === entryId);
            if (entry) {
                Object.assign(entry, updatedData);
                this.saveToLocalStorage();
                this.displayEntries();
            }
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('foodTrackerData', JSON.stringify(this.entries));
        console.log('Saved data to localStorage:', this.entries);
    }

    displayEntries() {
        const container = document.getElementById('entriesContainer');
        if (!container) return;
        
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

        console.log('Displaying entries:', entriesToShow);
        container.innerHTML = entriesToShow.map(entry => this.createEntryCard(entry)).join('');
        
        // Debug: Check if edit buttons are present
        const editButtons = document.querySelectorAll('.edit-btn');
        console.log('Found edit buttons:', editButtons.length);
    }

    createEntryCard(entry) {
        const enjoymentEmoji = this.getEnjoymentEmoji(entry.enjoyment);
        const formattedTime = this.formatTime(entry.timeOfDay);
        const formattedDate = this.formatDate(entry.timestamp);

        return `
            <div class="entry-card" data-entry-id="${entry.id}">
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
                            <button type="button" class="edit-btn" title="Edit feeling">✏️</button>
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
        if (toggleBtn) {
            const span = toggleBtn.querySelector('span');
            if (span) {
                span.textContent = this.showAllData ? 'Show Recent Only' : 'Show All Data';
            }
        }
        this.displayEntries();
    }

    async startEditing(entryId) {
        console.log('Starting edit for entry:', entryId);
        this.editingEntryId = entryId;
        const entryCard = document.querySelector(`[data-entry-id="${entryId}"]`);
        if (!entryCard) {
            console.error('Entry card not found');
            return;
        }

        const entry = this.entries.find(e => e.id === entryId);
        if (!entry) {
            console.error('Entry not found in data');
            return;
        }

        // Simple prompt approach - much more reliable
        const newFeeling = prompt('Edit your feeling:', entry.feeling);
        
        if (newFeeling !== null && newFeeling.trim() !== '') {
            console.log('Saving new feeling:', newFeeling);
            try {
                await this.updateEntry(entryId, { feeling: newFeeling.trim() });
                console.log('Feeling updated successfully');
            } catch (error) {
                console.error('Error updating feeling:', error);
                alert('Error updating feeling. Please try again.');
            }
        } else {
            console.log('Edit cancelled or empty feeling');
        }
        
        this.editingEntryId = null;
    }

    // Cleanup method to unsubscribe from Firebase listener
    cleanup() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Food Tracker: DOM loaded, initializing...');
    
    // Give Firebase a moment to initialize - longer delay for Firefox
    setTimeout(() => {
        console.log('🔄 Starting Food Tracker initialization...');
        console.log('🔍 Checking Firebase availability:', {
            windowDb: !!window.db,
            firebaseAvailable: typeof window.db !== 'undefined',
            userAgent: navigator.userAgent
        });
        
        // Additional check for Firefox
        if (navigator.userAgent.includes('Firefox')) {
            console.log('Firefox detected, using additional delay');
            setTimeout(() => {
                window.foodTracker = new FoodTracker();
            }, 500);
        } else {
            window.foodTracker = new FoodTracker();
        }
    }, 1500); // Increased wait time for Firebase to initialize
});

// Cleanup when page unloads
window.addEventListener('beforeunload', () => {
    if (window.foodTracker) {
        window.foodTracker.cleanup();
    }
}); 