class FoodTracker {
    constructor() {
        this.entries = [];
        this.showAllData = false;
        this.selectedEnjoyment = null;
        this.editingEntryId = null;
        
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
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleFormSubmit(e);
                return false;
            });
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
        
        console.log('Event listeners set up successfully');
    }

    setCurrentTime() {
        const timeInput = document.getElementById('timeOfDay');
        if (timeInput) {
            const now = new Date();
            const timeString = now.toTimeString().slice(0, 5);
            timeInput.value = timeString;
        }
    }

    selectEnjoyment(event) {
        console.log('Enjoyment button clicked:', event.target.dataset.value);
        
        // Remove previous selection
        document.querySelectorAll('.enjoyment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Add selection to clicked button
        event.target.classList.add('selected');
        this.selectedEnjoyment = event.target.dataset.value;
        
        const enjoymentInput = document.getElementById('enjoyment');
        if (enjoymentInput) {
            enjoymentInput.value = this.selectedEnjoyment;
        }
        
        console.log('Selected enjoyment:', this.selectedEnjoyment);
    }

    async handleFormSubmit(event) {
        console.log('Form submission handler called');
        event.preventDefault();

        // Validate enjoyment selection
        if (!this.selectedEnjoyment) {
            alert('Please select your enjoyment level');
            return;
        }

        const formData = new FormData(event.target);
        const entry = {
            id: this.generateId(),
            food: formData.get('food'),
            timeOfDay: formData.get('timeOfDay'),
            amount: formData.get('amount'),
            enjoyment: formData.get('enjoyment'),
            feeling: formData.get('feeling'),
            timestamp: new Date().toISOString()
        };

        console.log('Form data collected:', entry);

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
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    clearForm() {
        const form = document.getElementById('foodForm');
        if (form) {
            form.reset();
        }
        
        document.querySelectorAll('.enjoyment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.selectedEnjoyment = null;
        this.setCurrentTime();
    }

    showSuccessMessage() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            const span = submitBtn.querySelector('span');
            if (span) {
                const originalText = span.textContent;
                span.textContent = '✓ Added!';
                submitBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
                
                setTimeout(() => {
                    span.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #FF69B4 0%, #98FB98 100%)';
                }, 2000);
            }
        }
    }

    async loadData() {
        // Load from localStorage
        const savedData = localStorage.getItem('foodTrackerData');
        if (savedData) {
            try {
                this.entries = JSON.parse(savedData);
                console.log('Loaded entries from localStorage:', this.entries);
                
                // Migrate existing entries to have IDs if they don't
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
        
        this.entries.forEach(entry => {
            if (!entry.id) {
                entry.id = this.generateId();
                needsMigration = true;
            }
        });
        
        if (needsMigration) {
            console.log('Migrating entries to include IDs');
            this.saveData();
        }
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
        this.saveData();
    }

    async addEntry(entry) {
        this.entries.unshift(entry);
        this.saveData();
        this.displayEntries();
    }

    saveData() {
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
        
        // Add event listeners for edit buttons
        this.setupEditEventListeners();
        
        // Debug: Check if edit buttons are present
        const editButtons = document.querySelectorAll('.edit-btn');
        console.log('Found edit buttons:', editButtons.length);
    }

    setupEditEventListeners() {
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const entryId = e.target.closest('.entry-card').dataset.entryId;
                this.startEditing(entryId);
            });
        });

        // Save buttons
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const entryId = e.target.closest('.entry-card').dataset.entryId;
                this.saveEdit(entryId);
            });
        });

        // Cancel buttons
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const entryId = e.target.closest('.entry-card').dataset.entryId;
                this.cancelEdit(entryId);
            });
        });
    }

    startEditing(entryId) {
        this.editingEntryId = entryId;
        const entryCard = document.querySelector(`[data-entry-id="${entryId}"]`);
        if (!entryCard) return;

        const feelingElement = entryCard.querySelector('.feeling-badge');
        const originalFeeling = feelingElement.textContent;
        
        // Replace feeling badge with input field
        feelingElement.innerHTML = `
            <input type="text" class="edit-feeling-input" value="${this.escapeHtml(originalFeeling)}" placeholder="How did you feel?">
            <div class="edit-buttons">
                <button type="button" class="save-btn">💾</button>
                <button type="button" class="cancel-btn">❌</button>
            </div>
        `;

        // Focus on input
        const input = feelingElement.querySelector('.edit-feeling-input');
        if (input) {
            input.focus();
            input.select();
        }

        // Hide edit button
        const editBtn = entryCard.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.style.display = 'none';
        }
    }

    saveEdit(entryId) {
        const entryCard = document.querySelector(`[data-entry-id="${entryId}"]`);
        if (!entryCard) return;

        const input = entryCard.querySelector('.edit-feeling-input');
        if (!input) return;

        const newFeeling = input.value.trim();
        if (!newFeeling) {
            alert('Please enter a feeling');
            return;
        }

        // Update entry in data
        const entry = this.entries.find(e => e.id === entryId);
        if (entry) {
            entry.feeling = newFeeling;
            this.saveData();
        }

        // Update display
        const feelingElement = entryCard.querySelector('.feeling-badge');
        feelingElement.innerHTML = `<span class="feeling-badge">${this.escapeHtml(newFeeling)}</span>`;

        // Show edit button again
        const editBtn = entryCard.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.style.display = 'inline-block';
        }

        this.editingEntryId = null;
        this.showEditSuccessMessage(entryCard);
    }

    cancelEdit(entryId) {
        const entryCard = document.querySelector(`[data-entry-id="${entryId}"]`);
        if (!entryCard) return;

        const entry = this.entries.find(e => e.id === entryId);
        if (!entry) return;

        // Restore original feeling
        const feelingElement = entryCard.querySelector('.feeling-badge');
        feelingElement.innerHTML = `<span class="feeling-badge">${this.escapeHtml(entry.feeling)}</span>`;

        // Show edit button again
        const editBtn = entryCard.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.style.display = 'inline-block';
        }

        this.editingEntryId = null;
    }

    showEditSuccessMessage(entryCard) {
        const feelingElement = entryCard.querySelector('.feeling-badge');
        const originalContent = feelingElement.innerHTML;
        
        feelingElement.innerHTML = '<span class="feeling-badge updated">✓ Updated!</span>';
        
        setTimeout(() => {
            feelingElement.innerHTML = originalContent;
        }, 1500);
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
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Food Tracker: DOM loaded, initializing...');
    new FoodTracker();
}); 