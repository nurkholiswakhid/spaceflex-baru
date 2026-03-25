// Progress tracking using localStorage
const SPACEFLEX_PROGRESS = 'spaceflex_progress';
const SPACEFLEX_STARS = 'spaceflex_stars';

class ProgressTracker {
    constructor() {
        // Initialize from localStorage or create new
        this.completedMaterials = this.getCompletedMaterials();
        this.stars = this.getStars();
        this.updateStarDisplay();
    }

    // Get completed materials from localStorage
    getCompletedMaterials() {
        const saved = localStorage.getItem(SPACEFLEX_PROGRESS);
        return saved ? JSON.parse(saved) : {};
    }

    // Get total stars from localStorage
    getStars() {
        const saved = localStorage.getItem(SPACEFLEX_STARS);
        return saved ? parseInt(saved) : 0;
    }

    // Mark a material as completed and award a star if not already completed
    completeMaterial(materialId) {
        if (!this.completedMaterials[materialId]) {
            this.completedMaterials[materialId] = true;
            this.stars++;
            this.save();
            this.updateStarDisplay();
            return true; // Return true if a new star was awarded
        }
        return false; // Return false if material was already completed
    }

    // Save progress to localStorage
    save() {
        localStorage.setItem(SPACEFLEX_PROGRESS, JSON.stringify(this.completedMaterials));
        localStorage.setItem(SPACEFLEX_STARS, this.stars.toString());
    }

    // Update star display in navbar
    updateStarDisplay() {
        const starCount = document.querySelector('.star-counter .star-count');
        if (starCount) {
            starCount.textContent = this.stars;

            // Add animation class
            starCount.classList.add('star-update');
            // Remove animation class after animation completes
            setTimeout(() => {
                starCount.classList.remove('star-update');
            }, 500);
        }
    }

    // Check if a material is completed
    isCompleted(materialId) {
        return !!this.completedMaterials[materialId];
    }
}

// Initialize progress tracker
const progressTracker = new ProgressTracker();

// Add click event listeners to material cards and initialize completed status
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');

    // First mark any previously completed cards
    featureCards.forEach(card => {
        const materialId = card.getAttribute('data-modal');
        if (progressTracker.isCompleted(materialId)) {
            card.classList.add('completed');
        }
    });

    // Add click listeners
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const materialId = this.getAttribute('data-modal');
            if (progressTracker.completeMaterial(materialId)) {
                // Add completed class
                this.classList.add('completed');
                
                // Show star animation when new star is earned
                const star = document.createElement('div');
                star.className = 'star-animation';
                star.textContent = '⭐';
                this.appendChild(star);

                setTimeout(() => star.remove(), 1000); // Remove star after animation
            }
        });
    });
});
