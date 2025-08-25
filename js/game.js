/** 
 * CSS Learning Game - Main Game Object with CORRECTED Points System
 * A web-based game for learning CSS with timer functionality and proper points scoring
 * Fixed to implement correct point calculation rules
 */
var game = {
    // ===========================================
    // PROPERTIES
    // ===========================================
    // Game state
    language: window.location.hash.substring(1) || 'en',
    level: parseInt(localStorage.level, 10) || 0,
    answers: (localStorage.answers && JSON.parse(localStorage.answers)) || {},
    solved: (localStorage.solved && JSON.parse(localStorage.solved)) || [],
    changed: false,
    clickedCode: null,
    
    // Timer properties
    timer: null,
    timerStarted: false,
    timeLeft: localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft'), 10) : 20, // 20 minutes
    
    // Run button state - Controls when results are shown
    hasRun: false,
    resultsVisible: false,
    
    // Points system properties - CORRECTED
    levelRunCounts: (localStorage.levelRunCounts && JSON.parse(localStorage.levelRunCounts)) || {},
    levelPoints: (localStorage.levelPoints && JSON.parse(localStorage.levelPoints)) || {},
    levelCompleted: (localStorage.levelCompleted && JSON.parse(localStorage.levelCompleted)) || {},
    
    // ===========================================
    // POINTS SYSTEM METHODS - CORRECTED
    // ===========================================
    
    /**
     * Get current level identifier
     */
    getCurrentLevelId: function() {
        return levels[this.level] ? levels[this.level].name : 'level_' + this.level;
    },
    
    /**
     * Initialize points for current level
     */
    initializeLevelPoints: function() {
        const levelId = this.getCurrentLevelId();
        
        // Initialize run count if not exists
        if (!(levelId in this.levelRunCounts)) {
            this.levelRunCounts[levelId] = 0;
        }
        
        // Initialize points if not exists
        if (!(levelId in this.levelPoints)) {
            this.levelPoints[levelId] = 0;
        }
        
        // Initialize completion status if not exists
        if (!(levelId in this.levelCompleted)) {
            this.levelCompleted[levelId] = false;
        }
    },
    
    /**
     * Calculate points for current attempt - CORRECTED LOGIC
     */
    calculatePoints: function() {
        const levelId = this.getCurrentLevelId();
        this.initializeLevelPoints();
        
        // If level is already completed, don't increment run count or change points
        if (this.levelCompleted[levelId]) {
            console.log('Level already completed - run count and points preserved:', this.levelPoints[levelId]);
            return this.levelPoints[levelId];
        }
        
        // Increment run count only if level not completed
        this.levelRunCounts[levelId]++;
        
        let points = 0;
        const runCount = this.levelRunCounts[levelId];
        
        // CORRECTED: Calculate points based on run count
        if (runCount === 1) {
            points = 4;
        } else if (runCount === 2) {
            points = 3;
        } else if (runCount === 3) {
            points = 2;
        } else if (runCount >= 4) {
            points = 1; // Minimum 1 point if answered correctly
        }
        
        console.log(`Level: ${levelId}, Run count: ${runCount}, Potential points if correct: ${points}`);
        return points;
    },
    
    /**
     * Award points for correct answer - CORRECTED
     */
    awardPoints: function() {
        const levelId = this.getCurrentLevelId();
        
        // Only award points if not already completed
        if (!this.levelCompleted[levelId]) {
            const points = this.calculatePoints(); // This will increment run count
            this.levelPoints[levelId] = points;
            this.levelCompleted[levelId] = true;
            console.log(`Points awarded for ${levelId}: ${points} (after ${this.levelRunCounts[levelId]} runs)`);
        } else {
            console.log(`Level ${levelId} already completed - no additional points awarded`);
        }
        
        this.savePointsData();
    },
    
    /**
     * Track run attempt without awarding points (for incorrect answers) - CORRECTED
     */
    trackRunAttempt: function() {
        const levelId = this.getCurrentLevelId();
        this.initializeLevelPoints();
        
        // Only increment run count if level not completed
        if (!this.levelCompleted[levelId]) {
            this.levelRunCounts[levelId]++;
            console.log(`Run attempt tracked for ${levelId}: ${this.levelRunCounts[levelId]} runs, no points awarded (incorrect)`);
        }
        
        this.savePointsData();
    },
    
    /**
     * Set points to 0 for incorrect answer when moving to next level - CORRECTED
     */
    setZeroPoints: function() {
        const levelId = this.getCurrentLevelId();
        this.initializeLevelPoints();
        
        // Only set to 0 if not already completed
        if (!this.levelCompleted[levelId]) {
            this.levelPoints[levelId] = 0;
            this.levelCompleted[levelId] = true; // Mark as completed with 0 points
            console.log(`Zero points set for ${levelId} (unanswered or incorrect)`);
        }
        
        this.savePointsData();
    },
    
    /**
     * Get total points across all levels
     */
    getTotalPoints: function() {
        let total = 0;
        for (const levelId in this.levelPoints) {
            total += this.levelPoints[levelId];
        }
        return total;
    },
    
    /**
     * Get maximum possible points
     */
    getMaxPossiblePoints: function() {
        return levels.length * 4; // 4 points per level
    },
    
    /**
     * Save points data to localStorage
     */
    savePointsData: function() {
        localStorage.setItem('levelRunCounts', JSON.stringify(this.levelRunCounts));
        localStorage.setItem('levelPoints', JSON.stringify(this.levelPoints));
        localStorage.setItem('levelCompleted', JSON.stringify(this.levelCompleted));
    },
    
    /**
     * Reset all points data
     */
    resetPointsData: function() {
        this.levelRunCounts = {};
        this.levelPoints = {};
        this.levelCompleted = {};
        localStorage.removeItem('levelRunCounts');
        localStorage.removeItem('levelPoints');
        localStorage.removeItem('levelCompleted');
    },
    
    // ===========================================
    // TIMER METHODS
    // ===========================================
    
    /**
     * Start the game timer
     */
    startTimer: function() {
        if (this.timerStarted) return;
        
        this.timerStarted = true;
        var timerDisplay = document.getElementById('timer');
        
        this.timer = setInterval(function() {
            if (game.timeLeft > 0) {
                game.timeLeft--;
                localStorage.setItem('timeLeft', game.timeLeft);
                var minutes = Math.floor(game.timeLeft / 60);
                var seconds = game.timeLeft % 60;
                timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
                game.endGame();
            }
        }, 1000);
    },

    /**
     * Stop the timer
     */
    stopTimer: function() {
        clearInterval(this.timer);
        localStorage.setItem('timeLeft', this.timeLeft);
    },

    /**
     * Reset timer to initial state
     */
    resetTimer: function() {
        this.timerStarted = false;
        clearInterval(this.timer);
        this.timeLeft = 20; // 20 minutes
        localStorage.removeItem('timeLeft');
    },

    // ===========================================
    // GAME FLOW METHODS
    // ===========================================

    /**
     * Initialize and start the game
     */
    start: function() {
        const savedName = localStorage.getItem('playerName');
        const savedAbsence = localStorage.getItem('playerAbsence');
        
        if (!savedName || !savedAbsence) {
            this.showInputPopup();
            return;
        }
        
        this.startTimer();
        this.initializeGame();
        this.generateProgressDots();
    },

    /**
     * Initialize game components
     */
    initializeGame: function() {
        // Language detection
        var requestLang = window.navigator.language.split('-')[0];
        if (window.location.hash === '' && requestLang !== 'en' && messages.languageActive.hasOwnProperty(requestLang)) {
            this.language = requestLang;
            window.location.hash = requestLang;
        }

        // Setup UI
        this.translate();
        $('#level-counter .total').text(levels.length);
        $('#editor').show();
        $('#share').hide();
        $('#language').val(this.language);
        
        this.setHandlers();
        this.loadMenu();
        this.loadLevel(levels[this.level]);
    },

    /**
     * Move to next level
     */
    next: function() {
        // Set zero points for current level if not completed
        const currentLevelId = this.getCurrentLevelId();
        if (!this.levelCompleted[currentLevelId] && $.inArray(levels[this.level].name, this.solved) === -1) {
            this.setZeroPoints();
        }
        
        this.level++;
        this.resetRunState(); // Reset run state for new level
        this.loadLevel(levels[this.level]);
        this.generateProgressDots();
    },

    /**
     * Move to previous level
     */
    prev: function() {
        // Set zero points for current level if not completed
        const currentLevelId = this.getCurrentLevelId();
        if (!this.levelCompleted[currentLevelId] && $.inArray(levels[this.level].name, this.solved) === -1) {
            this.setZeroPoints();
        }
        
        this.level--;
        this.resetRunState(); // Reset run state for new level
        this.loadLevel(levels[this.level]);
        this.generateProgressDots();
    },

    /**
     * End the game and show results
     */
    endGame: function() {
        // Set zero points for current level if not completed
        const currentLevelId = this.getCurrentLevelId();
        if (!this.levelCompleted[currentLevelId] && $.inArray(levels[this.level].name, this.solved) === -1) {
            this.setZeroPoints();
        }
        
        clearInterval(this.timer);
        this.showResults();
    },

    /**
     * Reset game to initial state
     */
    resetGame: function() {
        this.resetTimer();
        this.resetPointsData(); // Reset points data
        this.level = 0;
        this.answers = {};
        this.solved = [];
        this.resetRunState(); // Reset run state
        this.loadLevel(levels[0]);
        
        // Clear player data
        localStorage.removeItem('playerName');
        localStorage.removeItem('playerAbsence');
        this.showInputPopup();
    },

    // ===========================================
    // RUN BUTTON METHODS - ENHANCED WITH CORRECTED POINTS
    // ===========================================
    
    /**
     * Reset run state when changing levels or starting new level
     */
    resetRunState: function() {
        this.hasRun = false;
        this.resultsVisible = false;
        this.initializeLevelPoints(); // Initialize points for new level
        console.log('Run state reset - results hidden until Run button is clicked');
    },
    
    /**
     * Handle Run button click - Show results and track points CORRECTLY
     */
    runCode: function() {
        console.log('Run button clicked - executing code...');
        
        // Mark that code has been run
        this.hasRun = true;
        this.resultsVisible = true;
        
        // Apply styles and check result
        this.applyStyles();
        this.compare();
        
        console.log('Code execution completed - results now visible');
    },
    
    /**
     * Clear visual results and hide output
     */
    clearResults: function() {
        const level = levels[this.level];
        const selector = level.selector || '';
        
        // Clear styles from pond (output area)
        $('#pond ' + selector).attr('style', '');
        
        // Reset run state
        this.resultsVisible = false;
        this.hasRun = false;
        
        // Hide next button since no results are shown
        $('#next').removeClass('animated animation').addClass('disabled');
        
        console.log('Results cleared - output hidden');
    },

    // ===========================================
    // USER INTERFACE METHODS
    // ===========================================

    /**
     * Show player input popup
     */
    showInputPopup: function() {
        const savedName = localStorage.getItem('playerName');
        const savedAbsence = localStorage.getItem('playerAbsence');
        
        if (!savedName || !savedAbsence) {
            Swal.fire({
                title: 'Welcome!',
                html: `
                    <input id="nameInput" class="swal2-input" placeholder="Enter your name" value="${savedName || ''}">
                    <input id="absenceInput" class="swal2-input" placeholder="Enter your absence number" value="${savedAbsence || ''}">
                `,
                confirmButtonText: 'Start Game',
                focusConfirm: false,
                allowOutsideClick: false,
                customClass: {
                    confirmButton: 'swal2-biru-btn'
                },
                preConfirm: () => {
                    const playerName = document.getElementById('nameInput').value;
                    const playerAbsence = document.getElementById('absenceInput').value;
                    
                    if (!playerName || !playerAbsence) {
                        Swal.showValidationMessage('Name and absence number are required!');
                        return false;
                    }
                    
                    localStorage.setItem('playerName', playerName);
                    localStorage.setItem('playerAbsence', playerAbsence);
                    location.reload();
                    return true;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.initializeGame();
                }
            });
        } else {
            this.initializeGame();
        }
    },

    /**
 * Show game results with SweetAlert2 - WIDER + BEAUTIFUL SCROLL
 */
showResults: function () {
    const playerName = localStorage.getItem('playerName') || 'Unknown';
    const playerAbsence = localStorage.getItem('playerAbsence') || '-';
    const totalQuestions = levels.length;
    const correctAnswers = this.solved.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Points calculation
    const totalPoints = this.getTotalPoints();
    const maxPossiblePoints = this.getMaxPossiblePoints();
    const pointsPercentage = Math.round((totalPoints / maxPossiblePoints) * 100);

    // Determine performance level
    let performanceLevel = '';
    let performanceColor = '';
    let performanceIcon = '';

    if (pointsPercentage >= 90) {
        performanceLevel = 'Excellent!';
        performanceColor = '#10b981';
        performanceIcon = '🌟';
    } else if (pointsPercentage >= 80) {
        performanceLevel = 'Very Good!';
        performanceColor = '#3b82f6';
        performanceIcon = '🎯';
    } else if (pointsPercentage >= 70) {
        performanceLevel = 'Good!';
        performanceColor = '#8b5cf6';
        performanceIcon = '👍';
    } else if (pointsPercentage >= 60) {
        performanceLevel = 'Fair';
        performanceColor = '#f59e0b';
        performanceIcon = '📈';
    } else {
        performanceLevel = 'Keep Trying!';
        performanceColor = '#ef4444';
        performanceIcon = '💪';
    }

    const correctDetails = this.solved.length > 0 ? `
        <div class="question-list correct-list">
            ${this.solved.map(q => {
                const points = this.levelPoints[q] || 0;
                const runCount = this.levelRunCounts[q] || 0;
                let explanation = '';
                if (runCount === 1) explanation = 'Perfect! 1st try';
                else if (runCount === 2) explanation = 'Good! 2nd try';
                else if (runCount === 3) explanation = 'OK! 3rd try';
                else explanation = `${runCount} tries`;
                
                return `
                    <div class="question-item correct-item">
                        <span class="question-icon">✅</span>
                        <span class="question-text">${q}</span>
                        <span class="points-info">
                            <span class="points-value">${points} pts</span>
                            <span class="run-count">(${explanation})</span>
                        </span>
                    </div>
                `;
            }).join('')}
        </div>
    ` : '<div class="empty-state">No correct answers</div>';

    const wrongDetails = totalQuestions > 0 ? `
        <div class="question-list wrong-list">
            ${levels.map(level => level.name)
                .filter(name => !this.solved.includes(name))
                .map(q => {
                    const points = this.levelPoints[q] || 0;
                    const runCount = this.levelRunCounts[q] || 0;
                    let explanation = runCount > 0 ? `${runCount} tries, wrong` : 'not attempted';
                    
                    return `
                        <div class="question-item wrong-item">
                            <span class="question-icon">❌</span>
                            <span class="question-text">${q}</span>
                            <span class="points-info">
                                <span class="points-value">${points} pts</span>
                                <span class="run-count">(${explanation})</span>
                            </span>
                        </div>
                    `;
                }).join('')}
        </div>
    ` : '<div class="empty-state">All questions answered correctly!</div>';

    Swal.fire({
        title: `${performanceIcon} Quiz Results`,
        html: `
            <style>
                .swal2-enhanced-popup {
                    max-width: 900px !important;
                    width: 90% !important;
                }
                .results-container {
                    max-height: 70vh;
                    overflow-y: auto;
                    text-align: left;
                    padding: 12px 16px;
                    border-radius: 12px;
                    box-shadow: inset 0 0 6px rgba(0,0,0,0.05);
                }
                /* Scrollbar style */
                .results-container::-webkit-scrollbar {
                    width: 5px;
                }
                .results-container::-webkit-scrollbar-track {
                    border-radius: 10px;
                }
                .results-container::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .results-container::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }

                .performance-badge {
                    background: linear-gradient(135deg, ${performanceColor}15, ${performanceColor}25);
                    border: 2px solid ${performanceColor};
                    border-radius: 25px;
                    padding: 12px 20px;
                    margin: 15px 0;
                    text-align: center;
                    font-weight: bold;
                    color: ${performanceColor};
                    font-size: 1.1em;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    margin: 15px 0;
                }
                .stat-card {
                    background: #f1f5f9;
                    padding: 12px;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .stat-value {
                    font-size: 1.4em;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                }
                .section-title {
                    margin: 12px 0 6px 0;
                    font-weight: bold;
                    font-size: 1.1em;
                }
                .question-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 12px;
                    margin: 4px 0;
                    border-radius: 8px;
                    background: #f8f9fa;
                }
                .points-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .points-value {
                    font-weight: bold;
                    color: #2563eb;
                    background: #dbeafe;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.9em;
                }
                .run-count {
                    font-size: 0.8em;
                    color: #6b7280;
                }
                .correct-item .points-value {
                    color: #059669;
                    background: #d1fae5;
                }
                .wrong-item .points-value {
                    color: #dc2626;
                    background: #fee2e2;
                }
            </style>
            <div class="results-container">
                <div class="performance-badge">
                    ${performanceLevel}<br>
                    Score: ${score}% | Points: ${totalPoints}/${maxPossiblePoints} (${pointsPercentage}%)
                </div>
                <div class="player-info">
                    <div class="player-row">
                        <span class="player-label">👤 Player Name:</span>
                        <span class="player-value">${playerName}</span>
                    </div>
                    <div class="player-row">
                        <span class="player-label">🔢 Absence Number:</span>
                        <span class="player-value">${playerAbsence}</span>
                    </div>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value score-value">${score}%</div>
                        <div class="stat-label">Accuracy Score</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value points-value">${totalPoints}/${maxPossiblePoints}</div>
                        <div class="stat-label">Total Points</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value correct-value">${correctAnswers}</div>
                        <div class="stat-label">Correct Answers</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value wrong-value">${wrongAnswers}</div>
                        <div class="stat-label">Wrong Answers</div>
                    </div>
                </div>
                <div class="section-divider"></div>
                <div class="section-title correct-title">✅ Correct Questions (${correctAnswers})</div>
                ${correctDetails}
                <div class="section-title wrong-title">❌ Wrong Questions (${wrongAnswers})</div>
                ${wrongDetails}
            </div>
        `,
        showCancelButton: true,
        focusConfirm: false,
        allowOutsideClick: false,
        confirmButtonText: '🔄 Play Again',
        cancelButtonText: '📤 Share Results',
        customClass: {
            popup: 'swal2-enhanced-popup',
            confirmButton: 'swal2-krem-btn',
            cancelButton: 'swal2-biru-btn'
        },
        preConfirm: () => this.resetGame()
    }).then((result) => {
        if (result.isDismissed) {
            this.shareResults({
                playerName,
                playerAbsence,
                score,
                totalQuestions,
                correctAnswers,
                wrongAnswers,
                performanceLevel,
                totalPoints,
                maxPossiblePoints,
                pointsPercentage,
                correctDetails: this.solved.map(name => {
                    const points = this.levelPoints[name] || 0;
                    const runs = this.levelRunCounts[name] || 0;
                    return `${name} (${points} pts, ${runs} runs)`;
                }).join(', ') || 'None',
                wrongDetails: levels.map(level => level.name).filter(name => !this.solved.includes(name))
                    .map(name => {
                        const points = this.levelPoints[name] || 0;
                        const runs = this.levelRunCounts[name] || 0;
                        return `${name} (${points} pts, ${runs} runs)`;
                    }).join(', ') || 'None'
            });
        }
    });
},


    /**
     * Generate progress dots with numbers and sync with level navigation
     */
    generateProgressDots: function () {
        const self = this;
        const totalLevels = levels.length;
        const $progressGrid = $('#progressGrid');
        $progressGrid.empty(); // bersihkan dulu
        
        for (let i = 0; i < totalLevels; i++) {
            const $dot = $('<span/>')
                .addClass('progress-dot')
                .attr('data-level', i)
                .text(i + 1);

            // Add CORRECTED points information to dot title
            const levelName = levels[i].name;
            const points = this.levelPoints[levelName] || 0;
            const runCount = this.levelRunCounts[levelName] || 0;
            const isCompleted = this.levelCompleted[levelName] || false;
            const statusText = isCompleted ? (points > 0 ? 'Completed' : 'Failed') : 'Not attempted';
            
            $dot.attr('title', `${levelName} - ${points} points (${runCount} runs) - ${statusText}`);

            // status solved / current
            if (this.solved.indexOf(levels[i].name) !== -1) {
                $dot.addClass('solved');
            }
            if (i === this.level) {
                $dot.addClass('current');
            }

            // klik pindah level
            $dot.on('click', function (e) {
                e.stopPropagation();
                
                // Set zero points for current level if not completed before switching
                const currentLevelId = self.getCurrentLevelId();
                if (!self.levelCompleted[currentLevelId] && $.inArray(levels[self.level].name, self.solved) === -1) {
                    self.setZeroPoints();
                }
                
                self.saveAnswer();
                self.level = i;
                self.resetRunState(); // Reset run state when changing levels
                self.loadLevel(levels[i]);
                // generate ulang supaya update tampilan dots & nav
                self.generateProgressDots();
            });

            $progressGrid.append($dot);
        }

        // sinkronkan indikator level teks "Mission X of Y"
        $('#level-indicator .current').text(this.level + 1);
        $('#level-indicator .total').text(totalLevels);

        // sinkronkan juga counter global jika ada (yang di header)
        $('#level-counter .current').text(this.level + 1);
        $('#level-counter .total').text(totalLevels);

        // update state tombol prev/next (kelas disabled sudah dipakai di code lama)
        if (this.level === 0) {
            $('.arrow.left').addClass('disabled');
        } else {
            $('.arrow.left').removeClass('disabled');
        }

        if (this.level === totalLevels - 1) {
            $('.arrow.right').addClass('disabled');
        } else {
            $('.arrow.right').removeClass('disabled');
        }
    },

    /**
     * Share results via WhatsApp and Google Sheets - ENHANCED WITH CORRECTED POINTS
     */
    shareResults: function(quizData) {
        const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbw7ntIrknsJnYupRTLR5M28-eTHLKapEiBlcQlIoCQSIr8q5mz_NVO5u49BfEpU5ks/exec';
        
        fetch(googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizData)
        })
        .then(() => {
            const shareText = `I scored ${quizData.score}% (${quizData.totalPoints}/${quizData.maxPossiblePoints} points) in the CSS learning game! Check it out!`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(whatsappUrl, '_blank');
        })
        .catch((error) => {
            console.error('Error saving data:', error);
            Swal.fire('Error', 'Failed to save results. Please try again.', 'error');
        });
    },

    // ===========================================
    // LEVEL MANAGEMENT METHODS
    // ===========================================

    /**
     * Load and display level menu
     */
    loadMenu: function() {
        levels.forEach((level, i) => {
            const levelMarker = $('<span/>')
                .addClass('level-marker')
                .attr({'data-level': i, 'title': level.name})
                .text(i + 1);

            if ($.inArray(level.name, this.solved) !== -1) {
                levelMarker.addClass('solved');
            }

            levelMarker.appendTo('#levels');
        });

        this.bindMenuEvents();
    },

    /**
     * Bind menu-related events
     */
    bindMenuEvents: function() {
        const self = this;
        
        // Level marker clicks
        $('.level-marker').on('click', function() {
            // Set zero points for current level if not completed before switching
            const currentLevelId = self.getCurrentLevelId();
            if (!self.levelCompleted[currentLevelId] && $.inArray(levels[self.level].name, self.solved) === -1) {
                self.setZeroPoints();
            }
            
            game.saveAnswer();
            const level = $(this).attr('data-level');
            game.level = parseInt(level, 10);
            game.resetRunState(); // Reset run state when changing levels
            game.loadLevel(levels[level]);
        });

        // Level indicator click
        $('#level-indicator').on('click', function() {
            $('#levelsWrapper').toggle();
            $('#instructions .tooltip').remove();
        });

        // Arrow navigation
        $('.arrow.left').on('click', function() {
            if (!$(this).hasClass('disabled')) {
                game.saveAnswer();
                game.prev();
                game.generateProgressDots(); // update indikator teks dan dots
            }
        });

        $('.arrow.right').on('click', function() {
            if (!$(this).hasClass('disabled')) {
                game.saveAnswer();
                game.next();
                game.generateProgressDots(); // update indikator teks dan dots
            }
        });
    },

    /**
     * Load specific level
     */
    loadLevel: function(level) {
        // Reset UI
        $('#editor').show();
        $('#share').hide();
        $('#background, #pond').removeClass('wrap').attr('style', '').empty();
        $('#levelsWrapper').hide();

        // Reset run state for new level - IMPORTANT
        this.resetRunState();

        // Update level indicators
        $('.level-marker').removeClass('current').eq(this.level).addClass('current');
        $('#level-counter .current').text(this.level + 1);
        $('#level-indicator .total').text(levels.length);

        // Set level content
        $('#before').text(level.before);
        $('#after').text(level.after);
        $('#next').removeClass('animated animation').addClass('disabled');

        const instructions = level.instructions[this.language] || level.instructions.en;
        $('#instructions').html(instructions);

        // Update navigation arrows
        $('.arrow.disabled').removeClass('disabled');
        if (this.level === 0) $('.arrow.left').addClass('disabled');
        if (this.level === levels.length - 1) $('.arrow.right').addClass('disabled');

        // Load saved answer
        const answer = this.answers[level.name];
        $('#code').val(answer).focus();

        this.setupLevelUI(level);
        this.loadDocs();
        
        // Clear output area - no results until Run is clicked
        this.clearResults();
    },

    /**
     * Setup level-specific UI elements
     */
    setupLevelUI: function(level) {
        const lines = Object.keys(level.style).length;
        $('#code').height(20 * lines).data("lines", lines);

        // Create game board
        const colors = { 'g': 'green', 'r': 'red', 'y': 'yellow' };
        const string = level.board;

        for (let i = 0; i < string.length; i++) {
            const c = string.charAt(i);
            const color = colors[c];

            // Create lilypad
            const lilypad = $('<div/>').addClass('lilypad ' + color).data('color', color);
            $('<div/>').addClass('bg').appendTo(lilypad);
            $('#background').append(lilypad);

            // Create frog
            const frog = $('<div/>').addClass('frog ' + color).data('color', color);
            $('<div/>').addClass('bg animated pulse infinite').appendTo(frog);
            $('#pond').append(frog);
        }

        // Apply level classes
        if (level.classes) {
            for (const rule in level.classes) {
                $(rule).addClass(level.classes[rule]);
            }
        }

        // Apply initial styles to background only
        const selector = level.selector || '';
        $('#background ' + selector).css(level.style);

        this.changed = false;
    },

    // ===========================================
    // EVENT HANDLERS
    // ===========================================

    /**
     * Set up all event handlers
     */
    setHandlers: function() {
        this.bindGameEvents();
        this.bindUIEvents();
        this.bindWindowEvents();
    },

    /**
     * Bind game-specific events
     */
    bindGameEvents: function() {
        // Run button click - MAIN EVENT HANDLER WITH CORRECTED POINTS
        $(document).on('click', '#runBtn', function() {
            console.log('Run button clicked');
            game.runCode();
        });

        // Next button
        $('#next').on('click', function() {
            $('#code').focus();

            if ($(this).hasClass('disabled')) {
                if (!$('.frog').hasClass('animated')) {
                    game.tryagain();
                }
                return;
            }

            $(this).removeClass('animated animation');
            $('.frog').addClass('animated bounceOutUp');
            $('.arrow, #next').addClass('disabled');

            setTimeout(function() {
                if (game.level >= levels.length - 1) {
                    game.endGame();
                } else {
                    game.next();
                }
            }, 2000);
        });

        // Code input events - MODIFIED TO REMOVE AUTO-EXECUTION
        $('#code')
            .on('keydown', this.handleCodeKeydown.bind(this))
            .on('input', function() {
                game.changed = true;
                
                // When code changes, hide results if they were visible
                if (game.resultsVisible) {
                    console.log('Code changed - results hidden until Run button is clicked again');
                    game.clearResults();
                }
                
                // Always disable next button until Run is clicked
                $('#next').removeClass('animated animation').addClass('disabled');
            });

        // Animation end event
        $('#editor').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    },

    /**
     * Bind UI events
     */
    bindUIEvents: function() {
        // Reset button
        $('#labelReset').on('click', function() {
            const warningReset = messages.warningReset[game.language] || messages.warningReset['en'];
            
            Swal.fire({
                title: 'Warning',
                text: warningReset,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Reset!',
                cancelButtonText: 'Cancel',
                customClass: {
                    confirmButton: 'swal2-krem-btn',
                    cancelButton: 'swal2-biru-btn'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    game.resetGame();
                    $('.level-marker').removeClass('solved');
                }
            });
        });

        // Settings button
        $('#labelSettings').on('click', function() {
            $('#levelsWrapper').hide();
            $('#instructions .tooltip').remove();
        });

        // Language selector
        $('#language').on('change', function() {
            window.location.hash = $(this).val();
        });

        // Tooltip events
        $('body').on('click', function() {
            $('.tooltip').hide();
            clickedCode = null;
        });
    },

    /**
     * Bind window events
     */
    bindWindowEvents: function() {
        $(window)
            .on('beforeunload', function() {
                game.saveAnswer();
                localStorage.setItem('level', game.level);
                localStorage.setItem('answers', JSON.stringify(game.answers));
                localStorage.setItem('solved', JSON.stringify(game.solved));
                localStorage.setItem('timeLeft', game.timeLeft);
                // Save points data
                game.savePointsData();
            })
            .on('hashchange', function() {
                game.language = window.location.hash.substring(1) || 'en';
                game.translate();

                if (typeof twttr !== 'undefined') {
                    twttr.widgets.load();
                }

                if (game.language === 'en') {
                    history.replaceState({}, document.title, './');
                }
            });
    },

    /**
     * Handle keydown events in code editor
     */
    handleCodeKeydown: function(e) {
        if (e.keyCode === 13) { // Enter key
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                // Always run code when Ctrl+Enter is pressed
                this.runCode();
                // Only proceed to next if solution is correct AND results are visible
                if ($('#next').hasClass('animated') && this.resultsVisible) {
                    $('#next').click();
                }
                return;
            }

            const max = $(e.target).data('lines');
            const code = $(e.target).val();
            const trim = code.trim();
            const codeLength = code.split('\n').length;
            const trimLength = trim.split('\n').length;

            if (codeLength >= max) {
                if (codeLength === trimLength) {
                    e.preventDefault();
                    // Just run the code, don't auto-proceed
                    this.runCode();
                } else {
                    $('#code').focus().val('').val(trim);
                }
            }
        }
    },

    // ===========================================
    // GAME LOGIC METHODS - CORRECTED WITH PROPER POINTS
    // ===========================================

    /**
     * Apply CSS styles to the pond - Only when Run button is clicked
     */
    applyStyles: function() {
        const level = levels[this.level];
        const code = $('#code').val();
        const selector = level.selector || '';
        
        // Only apply styles if Run button has been clicked
        if (this.hasRun && this.resultsVisible) {
            $('#pond ' + selector).attr('style', code);
            this.saveAnswer();
            console.log('Styles applied to output area');
        } else {
            console.log('Styles not applied - Run button must be clicked first');
        }
    },

    /**
     * Check if current solution is correct - Only when Run button is clicked
     */
    check: async function() {
        // Only check if results should be visible
        if (!this.resultsVisible) {
            console.log('Check skipped - results not visible');
            return;
        }

        if (!document.startViewTransition) {
            this.applyStyles();
            this.compare();
            return;
        }

        const transition = document.startViewTransition(() => this.applyStyles());
        try {
            await transition.finished;
        } finally {
            this.compare();
        }
    },

    /**
     * Compare frog and lilypad positions - CORRECTED WITH PROPER POINTS LOGIC
     */
    compare: function() {
        // Only compare if results should be visible
        if (!this.resultsVisible) {
            console.log('Compare skipped - results not visible');
            return;
        }

        const level = levels[this.level];
        const lilypads = {};
        const frogs = {};
        let correct = true;

        // Get frog positions
        $('.frog').each(function() {
            const position = $(this).position();
            position.top = Math.floor(position.top);
            position.left = Math.floor(position.left);
            const key = JSON.stringify(position);
            const val = $(this).data('color');
            frogs[key] = val;
        });

        // Check if frogs match lilypads
        $('.lilypad').each(function() {
            const position = $(this).position();
            position.top = Math.floor(position.top);
            position.left = Math.floor(position.left);
            const key = JSON.stringify(position);
            const val = $(this).data('color');

            if (!(key in frogs) || frogs[key] !== val) {
                correct = false;
            }
        });

        // CORRECTED: Update UI and handle points based on correctness
        if (correct) {
            // Award points for correct solution (this will handle run counting correctly)
            this.awardPoints();
            
            if ($.inArray(level.name, this.solved) === -1) {
                this.solved.push(level.name);
            }
            $('[data-level=' + this.level + ']').addClass('solved');
            $('#next').removeClass('disabled').addClass('animated animation');
            
            const levelId = this.getCurrentLevelId();
            const points = this.levelPoints[levelId] || 0;
            console.log(`✅ Solution is correct - Next button enabled. Points awarded: ${points}`);
        } else {
            // CORRECTED: Track run attempt for incorrect answer (increments run count but no points)
            this.trackRunAttempt();
            
            this.changed = true;
            $('#next').removeClass('animated animation').addClass('disabled');
            
            const levelId = this.getCurrentLevelId();
            const runCount = this.levelRunCounts[levelId] || 0;
            console.log(`❌ Solution is incorrect - Next button disabled. Run attempts: ${runCount}`);
        }
        
        // Update progress dots with latest points information
        this.generateProgressDots();
    },

    /**
     * Save current answer
     */
    saveAnswer: function() {
        const level = levels[this.level];
        this.answers[level.name] = $('#code').val();
    },

    /**
     * Show try again animation
     */
    tryagain: function() {
        $('#editor').addClass('animated shake');
    },

    // ===========================================
    // UTILITY METHODS
    // ===========================================

    /**
     * Load CSS documentation tooltips
     */
    loadDocs: function () {
        $('#instructions code').each(function () {
            const code = $(this);
            const text = code.text();

            if (text in docs) {
                code.addClass('help');
                code.on('click', function (e) {
                    e.stopPropagation();

                    if ($('.tooltip').length !== 0 && clickedCode === code) {
                        $('.tooltip').remove();
                        return;
                    }

                    $('#levelsWrapper').hide();
                    $('.tooltip').remove();

                    const html = docs[text][game.language] || docs[text].en;

                    // Ambil posisi elemen <code> di layar
                    const offset = code.offset();
                    const tooltipX = offset.left;
                    const tooltipY = offset.top + code.outerHeight() + 10;

                    // Append ke body supaya tidak terbatasi container
                    $('<div class="tooltip"></div>')
                        .html(html)
                        .css({
                            top: tooltipY + 'px',
                            left: tooltipX + 'px',
                            position: 'absolute'
                        })
                        .appendTo('body');

                    $('.tooltip code').on('click', function (event) {
                        const pName = text;
                        let pValue = event.target.textContent.split(' ')[0];
                        pValue = game.getDefaultPropVal(pValue);
                        game.writeCSS(pName, pValue);
                        // Removed automatic check() call - user must click Run button
                    });

                    clickedCode = code;
                });
            }
        });
    },

    /**
     * Get default property value
     */
    getDefaultPropVal: function(pValue) {
        if (pValue === '<integer>') return '0';
        if (pValue === '<flex-direction>') return 'row nowrap';
        return pValue;
    },

    /**
     * Write CSS to editor
     */
    writeCSS: function(pName, pValue) {
        const tokens = $('#code').val().trim().split(/[\n:;]+/).filter(i => i);
        const keywords = Object.keys(docs);
        let content = '';
        let filled = false;

        if (keywords.includes(pValue)) return;

        tokens.forEach((token, i) => {
            const trimmedToken = token.trim();
            if (!keywords.includes(trimmedToken)) return;

            const append = content !== '' ? '\n' : '';
            if (trimmedToken === pName && !filled) {
                filled = true;
                content += append + trimmedToken + ': ' + pValue + ';';
            } else if (i + 1 < tokens.length) {
                const val = !keywords.includes(tokens[i + 1].trim()) ? tokens[i + 1].trim() : '';
                content += append + trimmedToken + ': ' + val + ';';
            }
        });

        if (!filled) {
            content += content !== '' ? '\n' : '';
            content += pName + ': ' + pValue + ';';
        }

        $('#code').val(content).focus();
        
        // When CSS is written programmatically, hide results until Run is clicked
        if (this.resultsVisible) {
            this.clearResults();
        }
    },

    /**
     * Translate interface to selected language
     */
    translate: function() {
        document.title = messages.title[this.language] || messages.title.en;
        $('html').attr('lang', this.language);

        const level = levels[this.level];
        const instructions = level.instructions[this.language] || level.instructions.en;
        $('#instructions').html(instructions);
        
        this.loadDocs();

        $('.translate').each(function() {
            const label = $(this).attr('id');
            if (messages[label]) {
                const text = messages[label][game.language] || messages[label].en;
                $('#' + label).text(text);
            }
        });
    },

    /**
     * Debounce function to limit execution frequency
     */
    debounce: function(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};

// ===========================================
// INITIALIZATION
// ===========================================

$(document).ready(function() {
    game.start();
});