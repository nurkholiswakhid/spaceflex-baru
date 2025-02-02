var game = {
  colorblind: (localStorage.colorblind && JSON.parse(localStorage.colorblind)) || 'false',
  language: window.location.hash.substring(1) || 'en',
  difficulty: 'beginner', // Set default difficulty to beginner
  level: parseInt(localStorage.level, 10) || 0,
  answers: (localStorage.answers && JSON.parse(localStorage.answers)) || {},
  solved: (localStorage.solved && JSON.parse(localStorage.solved)) || [],
  changed: false,
  clickedCode: null,
  timer: null,   // Timer variable
  timerStarted: false, // Flag to track if the timer has started

  timeLeft: localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft'), 10) : 1200, // 20 minutes in seconds (1200 seconds)

  // Function to start the timer
  startTimer: function() {
    if (this.timerStarted) return; // Prevent starting the timer again
    this.timerStarted = true; // Set the flag to true
    var timerDisplay = document.getElementById('timer'); // Timer display element

    game.timer = setInterval(function() {
      if (game.timeLeft > 0) {
        game.timeLeft--;
        localStorage.setItem('timeLeft', game.timeLeft); // Save timeLeft to localStorage
        var minutes = Math.floor(game.timeLeft / 60);
        var seconds = game.timeLeft % 60;
        timerDisplay.textContent = ` ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      } else {
        clearInterval(game.timer);  // Stop the timer
        alert("Time's up! Game over.");
        game.endGame();  // End the game
      }
    }, 1000);  // Update every second
  },

  // Function to stop the timer
  stopTimer: function() {
    clearInterval(game.timer);  // Stop the timer
    localStorage.setItem('timeLeft', game.timeLeft); // Save current timeLeft to localStorage
  },

  // Function to show results using SweetAlert2
  showResults: function() {
    const playerName = localStorage.getItem('playerName');
    const totalQuestions = levels.length;
    const correctAnswers = this.solved.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const correctDetails = this.solved.join(', ') || 'None';
    const wrongDetails = totalQuestions > 0 ? levels.map(level => level.name).filter(name => !this.solved.includes(name)).join(', ') : 'None';

    Swal.fire({
      title: 'Quiz Results',
      html: `
        <p><strong>Name:</strong> ${playerName}</p>
        <p><strong>Name:</strong> ${playerAbsence}</p>
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
      preConfirm: (result) => {
        if (result) {
          this.resetGame();
        }
      }
    }).then((result) => {
      if (result.isDismissed) {
        // Data yang akan dikirim ke Google Spreadsheet
        const quizData = {
          playerName,
          playerAbsence,
          score,
          totalQuestions,
          correctAnswers,
          wrongAnswers,
          correctDetails,
          wrongDetails
        };

        // Ganti URL dengan URL Web App Anda
        const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbw7ntIrknsJnYupRTLR5M28-eTHLKapEiBlcQlIoCQSIr8q5mz_NVO5u49BfEpU5ks/exec';

        // Kirim data ke Google Apps Script
        fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Mode no-cors untuk menghindari CORS issues
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizData),
        })
          .then(() => {
            // Setelah data dikirim, buka WhatsApp untuk berbagi hasil
            const shareText = `I scored ${score}/100 in the quiz! Check it out!`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(whatsappUrl, '_blank');
          })
          .catch((error) => {
            console.error('Error saving data to Google Spreadsheet:', error);
            Swal.fire('Error', 'Failed to save results. Please try again.', 'error');
          });
      }
    });
  },

  // Function to reset the game
  resetGame: function() {
    this.resetTimer();
    this.level = 0;
    this.answers = {};
    this.solved = [];
    this.loadLevel(levels[0]);
    localStorage.removeItem('playerName');
    localStorage.removeItem('playerAbsence');
    this.showInputPopup();
  },

  // Function to end the game
  endGame: function() {
    clearInterval(this.timer);
    this.showResults(); // Show results when the game ends
  },

  // Function to set up event handlers
  setHandlers: function() {
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
          $('#next').text('Selesai'); // Change button text to "Selesai"
          game.endGame(); // Call endGame to show results
        } else {
          game.next();
        }
      }, 2000);
    });
  },
  resetTimer: function() {
    this.timerStarted = false;    // Reset the timer started flag
    clearInterval(game.timer);  // Stop the timer
    game.timeLeft = 1200;        // Reset to 20 minutes
    localStorage.removeItem('timeLeft'); // Clear timeLeft from localStorage
  },

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
            preConfirm: () => {
                const playerName = document.getElementById('nameInput').value;
                const playerAbsence = document.getElementById('absenceInput').value;

                if (!playerName || !playerAbsence) {
                    Swal.showValidationMessage('Both name and absence number are required!');
                    return false;
                }

                localStorage.setItem('playerName', playerName);
                localStorage.setItem('playerAbsence', playerAbsence);
                
                // Refresh halaman setelah data disimpan
                location.reload();
                return true;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                startGame(); 
                // Call startGame when user confirms
            }
        });
    } else {
        startGame();  // Start immediately if data exists
    }
},

  start: function() {
    const savedName = localStorage.getItem('playerName');
    const savedAbsence = localStorage.getItem('playerAbsence');

    if (!savedName || !savedAbsence) {
        game.showInputPopup(); // Prompt for input if data is missing
        return; // Exit the function to prevent starting the timer
    } else {
        game.startTimer(); // Start the timer if both values exist
    }

    var requestLang = window.navigator.language.split('-')[0];
    if (window.location.hash === '' && requestLang !== 'en' && messages.languageActive.hasOwnProperty(requestLang)) {
      game.language = requestLang;
      window.location.hash = requestLang;
    }

    game.translate();
    $('#level-counter .total').text(levels.length);
    $('#editor').show();
    $('#share').hide();
    $('#language').val(game.language);
    $('input[value="' + game.colorblind + '"]', '#colorblind').prop('checked', true);

    this.setHandlers();
    this.loadMenu();
    game.loadLevel(levels[game.level]);

    // Do not start the timer here, we will start it when the player clicks "Start Game"
  },

  // Call this function when starting the game

  setHandlers: function() {
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
          game.win();
        } else {
          game.next();
        }
      }, 2000);
    });

    $('#code').on('keydown', function(e) {
      if (e.keyCode === 13) {

        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          game.check();
          $('#next').click();
          return;
        }

        var max = $(this).data('lines');
        var code = $(this).val();
        var trim = code.trim();
        var codeLength = code.split('\n').length;
        var trimLength = trim.split('\n').length;

        if (codeLength >= max) {

          if (codeLength === trimLength) {
            e.preventDefault();
            $('#next').click();
          } else {
            $('#code').focus().val('').val(trim);
          }
        }
      }
    }).on('input', game.debounce(game.check, 500))
    .on('input', function() {
      game.changed = true;
      $('#next').removeClass('animated animation').addClass('disabled');
    });

    $('#editor').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass();
    });
    $('#labelReset').on('click', function() {
      var warningReset = messages.warningReset[game.language] || messages.warningReset['en']; // Mengambil pesan berdasarkan bahasa aktif
    
      // Menampilkan SweetAlert2 sebagai pop-up
      Swal.fire({
          title: 'Warning',
          text: warningReset,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Reset!',
          cancelButtonText: 'Cancel'
      }).then((result) => {
          if (result.isConfirmed) {
            game.resetTimer();  // Reset the timer when the game is reset
            game.timerStarted = false; // Reset the timer started flag

              game.level = 0;
              game.answers = {};
              game.solved = [];
              game.loadLevel(levels[0]);
    
              // Menghapus data nama dan nomor absen dari localStorage
              localStorage.removeItem('playerName');
              localStorage.removeItem('playerAbsence');
    
              // Menampilkan pop-up untuk input nama dan nomor absen kembali
              game.showInputPopup();
    
              // Menghapus status level yang sudah diselesaikan
              $('.level-marker').removeClass('solved');
          }
      });
    });
    
    $('#labelSettings').on('click', function() {
      $('#levelsWrapper').hide();
      $('#settings .tooltip').toggle();
      $('#instructions .tooltip').remove();
    });
    

    $('#language').on('change', function() {
      window.location.hash = $(this).val();
    });

    // Remove the difficulty change handler
    // $('#difficulty').on('change', function() {
    //   game.difficulty = $('input:checked', '#difficulty').val();
    // });

    $('body').on('click', function() {
      $('.tooltip').hide();
      clickedCode = null;
    });

    $('.tooltip, .toggle, #level-indicator').on('click', function(e) {
      e.stopPropagation();
    });

    $(window).on('beforeunload', function() {
      game.saveAnswer();
      localStorage.setItem('level', game.level);
      localStorage.setItem('answers', JSON.stringify(game.answers));
      localStorage.setItem('solved', JSON.stringify(game.solved));
      localStorage.setItem('colorblind', JSON.stringify(game.colorblind));
      localStorage.setItem('timeLeft', game.timeLeft); // Save timeLeft before unloading
    }).on('hashchange', function() {
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

  prev: function() {
    this.level--;

    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  next: function() {
    // Only Beginner difficulty
    this.level++;

    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  loadMenu: function() {
    levels.forEach(function(level, i) {
      var levelMarker = $('<span/>').addClass('level-marker').attr({'data-level': i, 'title': level.name}).text(i+1);

      if ($.inArray(level.name, game.solved) !== -1) {
        levelMarker.addClass('solved');
      }

      levelMarker.appendTo('#levels');
    });

    $('.level-marker').on('click', function() {
      game.saveAnswer();

      var level = $(this).attr('data-level');
      game.level = parseInt(level, 10);
      game.loadLevel(levels[level]);
    });

    $('#level-indicator').on('click', function() {
      $('#settings .tooltip').hide();
      $('#levelsWrapper').toggle();
      $('#instructions .tooltip').remove();
    });

    $('.arrow.left').on('click', function() {
      if ($(this).hasClass('disabled')) {
        return;
      }

      game.saveAnswer();
      game.prev();
    });

    $('.arrow.right').on('click', function() {
      if ($(this).hasClass('disabled')) {
        return;
      }

      game.saveAnswer();
      game.next();
    });
  },

  loadLevel: function(level) {
    $('#editor').show();
    $('#share').hide();
    $('#background, #pond').removeClass('wrap').attr('style', '').empty();
    $('#levelsWrapper').hide();
    $('.level-marker').removeClass('current').eq(this.level).addClass('current');
    $('#level-counter .current').text(this.level + 1);
    $('#before').text(level.before);
    $('#after').text(level.after);
    $('#next').removeClass('animated animation').addClass('disabled');

    var instructions = level.instructions[game.language] || level.instructions.en;
    $('#instructions').html(instructions);

    $('.arrow.disabled').removeClass('disabled');

    if (this.level === 0) {
      $('.arrow.left').addClass('disabled');
    }

    if (this.level === levels.length - 1) {
      $('.arrow.right').addClass('disabled');
    }

    var answer = game.answers[level.name];
    $('#code').val(answer).focus();

    this.loadDocs();

    var lines = Object.keys(level.style).length;
    $('#code').height(20 * lines).data("lines", lines);

    var string = level.board;
    var markup = '';
    var colors = {
      'g': 'green',
      'r': 'red',
      'y': 'yellow'
    };

    for (var i = 0; i < string.length; i++) {
      var c = string.charAt(i);
      var color = colors[c];

      var lilypad = $('<div/>').addClass('lilypad ' + color + (this.colorblind == 'true' ? ' cb-friendly' : '')).data('color', color);
      var frog = $('<div/>').addClass('frog ' + color + (this.colorblind == 'true' ? ' cb-friendly' : '')).data('color', color);

      $('<div/>').addClass('bg').css(game.transform()).appendTo(lilypad);
      $('<div/>').addClass('bg animated pulse infinite').appendTo(frog);

      $('#background').append(lilypad);
      $('#pond').append(frog);
    }

    var classes = level.classes;

    if (classes) {
      for (var rule in classes) {
        $(rule).addClass(classes[rule]);
      }
    }

    var selector = level.selector || '';
    $('#background ' + selector).css(level.style);

    game.changed = false;
    game.applyStyles();
    game.check();
  },

  loadDocs: function() {
    $('#instructions code').each(function() {
      var code = $(this);
      var text = code.text();

      if (text in docs) {
        code.addClass('help');
        code.on('click', function(e) {
          e.stopPropagation();

          // If click same code when tooltip already displayed, just remove current tooltip.
          if ($('#instructions .tooltip').length !== 0 && clickedCode === code){
            $('#instructions .tooltip').remove();
            return;
          }

          $('#levelsWrapper').hide();
          $('#settings .tooltip').hide();
          $('#instructions .tooltip').remove();
          var html = docs[text][game.language] || docs[text].en;
          var tooltipX = code.offset().left;
          var tooltipY = code.offset().top + code.height() + 13;
          $('<div class="tooltip"></div>').html(html).css({
            top: tooltipY,
            left: tooltipX
          }).appendTo($('#instructions'));

          var getDefaultPropVal = (pValue) => {
            if (pValue == '<integer>')
              return '0';
            else if (pValue == '<flex-direction>')
              return 'row nowrap';

            return pValue;
          };

          $('#instructions .tooltip code').on('click', function(event) {
            var pName = text;
            var pValue = event.target.textContent.split(' ')[0];
            pValue = getDefaultPropVal(pValue);
            game.writeCSS(pName, pValue);

            game.check();
          });
          clickedCode = code;
        });
      }
    });
  },

  applyStyles: function() {
    var level = levels[game.level];
    var code = $('#code').val();
    var selector = level.selector || '';
    $('#pond ' +  selector).attr('style', code);
    game.saveAnswer();
  },

  check: async function() {
    if (!document.startViewTransition) {
      game.applyStyles();
      game.compare();
      return;
    }

    const transition = document.startViewTransition(() => game.applyStyles());

    try {
      await transition.finished;
    } finally {
      game.compare();
    }
  },

  compare: function() {
    var level = levels[game.level];
    var lilypads = {};
    var frogs = {};
    var correct = true;

    $('.frog').each(function() {
      var position = $(this).position();
      position.top = Math.floor(position.top);
      position.left = Math.floor(position.left);

      var key = JSON.stringify(position);
      var val = $(this).data('color');
      frogs[key] = val;
    });

    $('.lilypad').each(function() {
      var position = $(this).position();
      position.top = Math.floor(position.top);
      position.left = Math.floor(position.left);

      var key = JSON.stringify(position);
      var val = $(this).data('color');

      if (!(key in frogs) || frogs[key] !== val) {
        correct = false;
      }
    });

    if (correct) {
      if ($.inArray(level.name, game.solved) === -1) {
        game.solved.push(level.name);
      }

      $('[data-level=' + game.level + ']').addClass('solved');
      $('#next').removeClass('disabled').addClass('animated animation');
    } else {
      game.changed = true;
      $('#next').removeClass('animated animation').addClass('disabled');
    }
  },

  saveAnswer: function() {
    var level = levels[this.level];
    game.answers[level.name] = $('#code').val();
  },

  tryagain: function() {
    $('#editor').addClass('animated shake');
  },

  win: function() {
    var solution = $('#code').val();

    this.loadLevel(levelWin);

    $('#editor').hide();
    $('#code').val(solution);
    $('#share').show();
    $('.frog .bg').removeClass('pulse').addClass('bounce');
  },

  transform: function() {
    var scale = 1 + ((Math.random() / 5) - 0.2);
    var rotate = 360 * Math.random();

    return {'transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)'};
  },

  translate: function() {
    document.title = messages.title[game.language] || messages.title.en;
    $('html').attr('lang', game.language);

    var level = $('#editor').is(':visible') ? levels[game.level] : levelWin;
    var instructions = level.instructions[game.language] || level.instructions.en;
    $('#instructions').html(instructions);
    game.loadDocs();

    $('.translate').each(function() {
      var label = $(this).attr('id');
      if (messages[label]) {
        var text = messages[label][game.language] || messages[label].en;
      }

      $('#' + label).text(text);
    });
  },

  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  writeCSS: function(pName, pValue){
    var tokens = $('#code').val().trim().split(/[\n:;]+/).filter(i => i);
    var keywords = Object.keys(docs);
    var content = '';
    var filled = false;

    // Do nothing when click property name inside Tooltip
    if (keywords.includes(pValue)) return;

    tokens.forEach(function (token, i){
      var trimmedToken = token.trim();
      if (!keywords.includes(trimmedToken)){
        return;
      }

      var append = content !== '' ? '\n' : '';
      if (trimmedToken === pName && !filled)
      {
        filled = true;
        append += trimmedToken + ': ' + pValue + ';';
      }
      else if (i + 1 < tokens.length){
        var val = !keywords.includes(tokens[i + 1].trim()) ? tokens[i + 1].trim() : ''; // TODO: Maybe prop value validiation required
        append += trimmedToken + ': ' + val + ';';
      }

      content += append;
    });

    if (!filled){
      content += content !== '' ? '\n' : '';
      content += pName + ': ' + pValue + ';';
    }

    $('#code').val(content);
    $('#code').focus();
  }
};

$(document).ready(function() {
  game.start();
});

game.showInputPopup();
