---
title: "Food Tracker"
permalink: /food-tracker/
layout: single
author_profile: false
---

<div class="food-tracker-container">
  <header class="header">
    <div class="header-content">
      <span class="header-icon energy-icon">⚡</span>
      <h1>🍽️ Magdalena Food Tracker</h1>
      <span class="header-icon bunny-icon">🐰</span>
    </div>
    <p class="subtitle">Track your meals and how they make you feel ✨</p>
  </header>

  <main class="main-content">
    <!-- Add Entry Form -->
    <section class="form-section">
      <div class="section-header">
        <span class="section-icon">⭐</span>
        <h2>Add New Entry</h2>
      </div>
      <form id="foodForm" class="food-form" onsubmit="return false;" action="javascript:void(0);" method="post">
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
          <span class="btn-icon">✨</span>
        </button>
      </form>
    </section>

    <!-- Display Section -->
    <section class="display-section">
      <div class="display-header">
        <div class="section-header">
          <span class="section-icon">⭐</span>
          <h2>Recent Entries</h2>
        </div>
        <button id="toggleView" class="toggle-btn">
          <span>Show All Data</span>
          <span class="btn-icon">→</span>
        </button>
      </div>
      
      <div id="entriesContainer" class="entries-container">
        <!-- Entries will be populated here -->
      </div>
    </section>
  </main>

  <!-- Floating decorative elements -->
  <div class="floating-elements">
    <span class="floating-element flower-1">🌸</span>
    <span class="floating-element flower-2">🌿</span>
    <span class="floating-element flower-3">🌸</span>
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
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  animation: bounce 2s infinite;
  display: inline-block;
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
  font-size: 1.2rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  display: inline-block;
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
  flex-wrap: wrap;
}

.enjoyment-btn {
  flex: 1;
  min-width: 60px;
  padding: 1rem 0.5rem;
  border: 2px solid #FFE6F2;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 70px;
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
  transform: scale(1.05);
  position: relative;
}

.enjoyment-btn.selected::after {
  content: '✓';
  position: absolute;
  top: -5px;
  right: -5px;
  background: #FF69B4;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
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
  font-size: 1rem;
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
  font-size: 1.5rem;
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
    gap: 0.25rem;
  }
  
  .enjoyment-btn {
    min-width: 50px;
    font-size: 1.5rem;
    min-height: 60px;
    padding: 0.75rem 0.25rem;
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

<script src="/assets/js/food-tracker.js"></script> 