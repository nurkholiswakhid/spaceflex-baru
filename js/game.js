/**
 * CSS Learning Game - Main Game Object
 * A web-based game for learning CSS with timer functionality
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
  timeLeft: localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft'), 10) : 1200, // 20 minutes

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
        timerDisplay.textContent = ` ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    this.timeLeft = 1200; // 20 minutes
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
    this.level++;
    this.loadLevel(levels[this.level]);
  },

  /**
   * Move to previous level
   */
  prev: function() {
    this.level--;
    this.loadLevel(levels[this.level]);
  },

  /**
   * End the game and show results
   */
  endGame: function() {
    clearInterval(this.timer);
    this.showResults();
  },

  /**
   * Reset game to initial state
   */
  resetGame: function() {
    this.resetTimer();
    this.level = 0;
    this.answers = {};
    this.solved = [];
    this.loadLevel(levels[0]);
    
    // Clear player data
    localStorage.removeItem('playerName');
    localStorage.removeItem('playerAbsence');
    
    this.showInputPopup();
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
   * Show game results with SweetAlert2
   */
  showResults: function() {
    const playerName = localStorage.getItem('playerName');
    const playerAbsence = localStorage.getItem('playerAbsence');
    const totalQuestions = levels.length;
    const correctAnswers = this.solved.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const correctDetails = this.solved.join(', ') || 'None';
    const wrongDetails = totalQuestions > 0 ? 
      levels.map(level => level.name).filter(name => !this.solved.includes(name)).join(', ') : 'None';

    Swal.fire({
      title: 'Quiz Results',
      html: `
        <p><strong>Name:</strong> ${playerName}</p>
        <p><strong>Absence:</strong> ${playerAbsence}</p>
        <p><strong>Score:</strong> ${score}/100</p>
        <p><strong>Total Questions:</strong> ${totalQuestions}</p>
        <p><strong>Correct Answers:</strong> ${correctAnswers}</p>
        <p><strong>Wrong Answers:</strong> ${wrongAnswers}</p>
        <p><strong>Correct Questions:</strong> ${correctDetails}</p>
        <p><strong>Wrong Questions:</strong> ${wrongDetails}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Reset',
      cancelButtonText: 'Share',
      customClass: {
        confirmButton: 'swal2-krem-btn',
        cancelButton: 'swal2-biru-btn'
      },
      preConfirm: () => this.resetGame()
    }).then((result) => {
      if (result.isDismissed) {
        this.shareResults({
          playerName, playerAbsence, score, totalQuestions,
          correctAnswers, wrongAnswers, correctDetails, wrongDetails
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
      self.saveAnswer();
      self.level = i;
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
   * Share results via WhatsApp and Google Sheets
   */
  shareResults: function(quizData) {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbw7ntIrknsJnYupRTLR5M28-eTHLKapEiBlcQlIoCQSIr8q5mz_NVO5u49BfEpU5ks/exec';

    fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData)
    })
    .then(() => {
      const shareText = `I scored ${quizData.score}/100 in the quiz! Check it out!`;
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
    // Level marker clicks
    $('.level-marker').on('click', function() {
      game.saveAnswer();
      const level = $(this).attr('data-level');
      game.level = parseInt(level, 10);
      game.loadLevel(levels[level]);
    });

    // Level indicator click
    $('#level-indicator').on('click', function() {
      $('#settings .tooltip').hide();
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
    this.check();
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

    // Apply initial styles
    const selector = level.selector || '';
    $('#background ' + selector).css(level.style);

    this.changed = false;
    this.applyStyles();
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

    // Code input events
    $('#code')
      .on('keydown', this.handleCodeKeydown.bind(this))
      .on('input', this.debounce(this.check.bind(this), 500))
      .on('input', function() {
        game.changed = true;
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
      $('#settings .tooltip').toggle();
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

    $('.tooltip, .toggle, #level-indicator').on('click', function(e) {
      e.stopPropagation();
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
        this.check();
        $('#next').click();
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
          $('#next').click();
        } else {
          $('#code').focus().val('').val(trim);
        }
      }
    }
  },

  // ===========================================
  // GAME LOGIC METHODS
  // ===========================================

  /**
   * Apply CSS styles to the pond
   */
  applyStyles: function() {
    const level = levels[this.level];
    const code = $('#code').val();
    const selector = level.selector || '';
    $('#pond ' + selector).attr('style', code);
    this.saveAnswer();
  },

  /**
   * Check if current solution is correct
   */
  check: async function() {
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
   * Compare frog and lilypad positions
   */
  compare: function() {
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

    // Update UI based on correctness
    if (correct) {
      if ($.inArray(level.name, this.solved) === -1) {
        this.solved.push(level.name);
      }
      $('[data-level=' + this.level + ']').addClass('solved');
      $('#next').removeClass('disabled').addClass('animated animation');
    } else {
      this.changed = true;
      $('#next').removeClass('animated animation').addClass('disabled');
    }
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

  /**
   * Show win screen
   */
  win: function() {
    const solution = $('#code').val();
    this.loadLevel(levelWin);
    $('#editor').hide();
    $('#code').val(solution);
    $('#share').show();
    $('.frog .bg').removeClass('pulse').addClass('bounce');
  },

  // ===========================================
  // UTILITY METHODS
  // ===========================================

  /**
   * Load CSS documentation tooltips
   */
  loadDocs: function() {
    $('#instructions code').each(function() {
      const code = $(this);
      const text = code.text();

      if (text in docs) {
        code.addClass('help');
        code.on('click', function(e) {
          e.stopPropagation();

          if ($('#instructions .tooltip').length !== 0 && clickedCode === code) {
            $('#instructions .tooltip').remove();
            return;
          }

          $('#levelsWrapper').hide();
          $('#settings .tooltip').hide();
          $('#instructions .tooltip').remove();

          const html = docs[text][game.language] || docs[text].en;
          const tooltipX = code.offset().left;
          const tooltipY = code.offset().top + code.height() + 13;

          $('<div class="tooltip"></div>').html(html).css({
            top: tooltipY,
            left: tooltipX
          }).appendTo($('#instructions'));

          $('#instructions .tooltip code').on('click', function(event) {
            const pName = text;
            let pValue = event.target.textContent.split(' ')[0];
            pValue = game.getDefaultPropVal(pValue);
            game.writeCSS(pName, pValue);
            game.check();
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
  },

  /**
   * Translate interface to selected language
   */
  translate: function() {
    document.title = messages.title[this.language] || messages.title.en;
    $('html').attr('lang', this.language);

    const level = $('#editor').is(':visible') ? levels[this.level] : levelWin;
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