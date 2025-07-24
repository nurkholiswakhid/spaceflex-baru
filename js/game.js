// Objek utama game yang menyimpan semua data dan fungsi permainan
var game = {
  // Status mode buta warna
  colorblind: (localStorage.colorblind && JSON.parse(localStorage.colorblind)) || 'false',
  // Bahasa yang digunakan
  language: window.location.hash.substring(1) || 'en',
  // Tingkat kesulitan (default beginner)
  difficulty: 'beginner', // Set default difficulty to beginner
  // Level saat ini
  level: parseInt(localStorage.level, 10) || 0,
  // Jawaban yang sudah diisi
  answers: (localStorage.answers && JSON.parse(localStorage.answers)) || {},
  // Level yang sudah diselesaikan
  solved: (localStorage.solved && JSON.parse(localStorage.solved)) || [],
  // Status perubahan kode
  changed: false,
  // Kode yang diklik pada tooltip
  clickedCode: null,
  // Variabel timer
  timer: null,   // Timer variable
  // Status apakah timer sudah dimulai
  timerStarted: false, // Flag to track if the timer has started

  // Sisa waktu dalam detik (default 20 menit)
  timeLeft: localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft'), 10) : 1200, // 20 minutes in seconds (1200 seconds)

  // Fungsi untuk memulai timer
  startTimer: function() {
    if (this.timerStarted) return; // Mencegah timer dimulai dua kali
    this.timerStarted = true; // Set flag bahwa timer sudah dimulai
    var timerDisplay = document.getElementById('timer'); // Elemen tampilan timer

    // Interval untuk update timer setiap detik
    game.timer = setInterval(function() {
      if (game.timeLeft > 0) {
        game.timeLeft--; // Kurangi waktu
        localStorage.setItem('timeLeft', game.timeLeft); // Simpan ke localStorage
        var minutes = Math.floor(game.timeLeft / 60);
        var seconds = game.timeLeft % 60;
        timerDisplay.textContent = ` ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Update tampilan timer
      } else {
        clearInterval(game.timer);  // Hentikan timer
        alert("Time's up! Game over."); // Tampilkan pesan waktu habis
        game.endGame();  // Akhiri permainan
      }
    }, 1000);  // Update setiap detik
  },

  // Fungsi untuk menghentikan timer
  stopTimer: function() {
    clearInterval(game.timer);  // Hentikan timer
    localStorage.setItem('timeLeft', game.timeLeft); // Simpan waktu terakhir ke localStorage
  },

  // Fungsi untuk menampilkan hasil menggunakan SweetAlert2
  showResults: function() {
    // Ambil data pemain dan hitung skor
    const playerName = localStorage.getItem('playerName');
    const playerAbsence = localStorage.getItem('playerAbsence');
    const totalQuestions = levels.length;
    const correctAnswers = this.solved.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Detail soal benar dan salah
    const correctDetails = this.solved.join(', ') || 'None';
    const wrongDetails = totalQuestions > 0 ? levels.map(level => level.name).filter(name => !this.solved.includes(name)).join(', ') : 'None';

    // Tampilkan hasil dengan SweetAlert2
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
      preConfirm: (result) => {
        if (result) {
          this.resetGame(); // Reset game jika tombol Reset ditekan
        }
      }
    }).then((result) => {
      if (result.isDismissed) {
        // Jika dibagikan, data dikirim ke Google Spreadsheet lalu buka WhatsApp
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

        // URL Google Apps Script
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

  // Fungsi untuk mereset permainan
  resetGame: function() {
    this.resetTimer(); // Reset timer
    this.level = 0; // Kembali ke level awal
    this.answers = {}; // Kosongkan jawaban
    this.solved = []; // Kosongkan level yang sudah diselesaikan
    this.loadLevel(levels[0]); // Load level pertama
    localStorage.removeItem('playerName'); // Hapus nama dari localStorage
    localStorage.removeItem('playerAbsence'); // Hapus absen dari localStorage
    this.showInputPopup(); // Tampilkan popup input nama/absen
  },

  // Fungsi untuk mengakhiri permainan
  endGame: function() {
    clearInterval(this.timer); // Hentikan timer
    this.showResults(); // Tampilkan hasil saat game berakhir
  },

  // Fungsi untuk mengatur event handler
  setHandlers: function() {
    // Event klik tombol Next
    $('#next').on('click', function() {
      $('#code').focus(); // Fokus ke input kode

      if ($(this).hasClass('disabled')) {
        if (!$('.frog').hasClass('animated')) {
          game.tryagain(); // Animasi jika jawaban salah
        }
        return;
      }

      $(this).removeClass('animated animation'); // Hapus animasi
      $('.frog').addClass('animated bounceOutUp'); // Animasi frog keluar
      $('.arrow, #next').addClass('disabled'); // Disable tombol

      setTimeout(function() {
        if (game.level >= levels.length - 1) {
          $('#next').text('Selesai'); // Ubah teks tombol jadi "Selesai"
          game.endGame(); // Akhiri game dan tampilkan hasil
        } else {
          game.next(); // Pindah ke level berikutnya
        }
      }, 2000);
    });
  },
  // Fungsi untuk mereset timer ke awal
  resetTimer: function() {
    this.timerStarted = false;    // Reset flag timer
    clearInterval(game.timer);  // Hentikan timer
    game.timeLeft = 1200;        // Kembali ke 20 menit
    localStorage.removeItem('timeLeft'); // Hapus waktu dari localStorage
  },

  // Fungsi untuk menampilkan popup input nama dan absen
  showInputPopup: function() {
    const savedName = localStorage.getItem('playerName'); // Ambil nama dari localStorage
    const savedAbsence = localStorage.getItem('playerAbsence'); // Ambil absen dari localStorage

    if (!savedName || !savedAbsence) {
        // Tampilkan popup input jika data belum ada
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
                // Validasi input nama dan absen
                const playerName = document.getElementById('nameInput').value;
                const playerAbsence = document.getElementById('absenceInput').value;

                if (!playerName || !playerAbsence) {
                    Swal.showValidationMessage('Nama dan nomor absen wajib diisi!');
                    return false;
                }

                localStorage.setItem('playerName', playerName); // Simpan nama
                localStorage.setItem('playerAbsence', playerAbsence); // Simpan absen
                
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
        startGame();  // Langsung mulai jika data sudah ada
    }
},

  // Fungsi utama untuk memulai permainan
  start: function() {
    const savedName = localStorage.getItem('playerName'); // Ambil nama
    const savedAbsence = localStorage.getItem('playerAbsence'); // Ambil absen

    if (!savedName || !savedAbsence) {
        game.showInputPopup(); // Tampilkan popup input jika data belum ada
        return; // Keluar agar timer tidak dimulai
    } else {
        game.startTimer(); // Mulai timer jika data ada
    }

    // Deteksi bahasa browser
    var requestLang = window.navigator.language.split('-')[0];
    if (window.location.hash === '' && requestLang !== 'en' && messages.languageActive.hasOwnProperty(requestLang)) {
      game.language = requestLang;
      window.location.hash = requestLang;
    }

    // Inisialisasi tampilan dan event handler
    game.translate();
    $('#level-counter .total').text(levels.length);
    $('#editor').show();
    $('#share').hide();
    $('#language').val(game.language);
    $('input[value="' + game.colorblind + '"]', '#colorblind').prop('checked', true);

    this.setHandlers(); // Atur event handler
    this.loadMenu(); // Tampilkan menu level
    game.loadLevel(levels[game.level]); // Load level saat ini

    // Timer dimulai saat klik "Start Game"
  },

  // Call this function when starting the game

  // Fungsi untuk mengatur semua event handler (input, tombol, dll)
  setHandlers: function() {
    // Event klik tombol Next
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

    // Event input kode CSS
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
      game.changed = true; // Tandai kode berubah
      $('#next').removeClass('animated animation').addClass('disabled'); // Disable tombol Next
    });

    // Event animasi selesai
    $('#editor').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass();
    });
    // Event klik tombol Reset
    $('#labelReset').on('click', function() {
      var warningReset = messages.warningReset[game.language] || messages.warningReset['en']; // Pesan peringatan reset
    
      // Menampilkan SweetAlert2 sebagai pop-up
      // Tampilkan popup konfirmasi reset
      Swal.fire({
          title: 'Warning',
          text: warningReset,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Reset!',
          cancelButtonText: 'Cancel'
      , customClass: {
          confirmButton: 'swal2-krem-btn',
          cancelButton: 'swal2-biru-btn'
          }
      }).then((result) => {
          if (result.isConfirmed) {
            game.resetTimer();  // Reset timer
            game.timerStarted = false; // Reset flag timer

              game.level = 0; // Kembali ke level awal
              game.answers = {}; // Kosongkan jawaban
              game.solved = []; // Kosongkan level selesai
              game.loadLevel(levels[0]); // Load level pertama
    
              // Hapus data nama dan absen
              localStorage.removeItem('playerName');
              localStorage.removeItem('playerAbsence');
    
              // Tampilkan popup input nama/absen
              game.showInputPopup();
    
              // Hapus status level selesai di menu
              $('.level-marker').removeClass('solved');
          }
      });
    });
    
    // Event klik tombol Settings
    $('#labelSettings').on('click', function() {
      $('#levelsWrapper').hide();
      $('#settings .tooltip').toggle();
      $('#instructions .tooltip').remove();
    });
    

    // Event ganti bahasa
    $('#language').on('change', function() {
      window.location.hash = $(this).val();
    });

    // Remove the difficulty change handler
    // $('#difficulty').on('change', function() {
    //   game.difficulty = $('input:checked', '#difficulty').val();
    // });

    // Event klik di luar tooltip
    $('body').on('click', function() {
      $('.tooltip').hide();
      clickedCode = null;
    });

    // Event klik pada tooltip dan toggle
    $('.tooltip, .toggle, #level-indicator').on('click', function(e) {
      e.stopPropagation();
    });

    // Event sebelum halaman ditutup (simpan data)
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

  // Fungsi untuk pindah ke level sebelumnya
  prev: function() {
    this.level--;

    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  // Fungsi untuk pindah ke level berikutnya
  next: function() {
    // Only Beginner difficulty
    this.level++;

    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  // Fungsi untuk menampilkan menu level
  loadMenu: function() {
    // Buat marker untuk setiap level
    levels.forEach(function(level, i) {
      var levelMarker = $('<span/>').addClass('level-marker').attr({'data-level': i, 'title': level.name}).text(i+1);

      if ($.inArray(level.name, game.solved) !== -1) {
        levelMarker.addClass('solved');
      }

      levelMarker.appendTo('#levels');
    });

    // Event klik marker level
    $('.level-marker').on('click', function() {
      game.saveAnswer();

      var level = $(this).attr('data-level');
      game.level = parseInt(level, 10);
      game.loadLevel(levels[level]);
    });

    // Event klik indikator level
    $('#level-indicator').on('click', function() {
      $('#settings .tooltip').hide();
      $('#levelsWrapper').toggle();
      $('#instructions .tooltip').remove();
    });

    // Event klik panah kiri
    $('.arrow.left').on('click', function() {
      if ($(this).hasClass('disabled')) {
        return;
      }

      game.saveAnswer();
      game.prev();
    });

    // Event klik panah kanan
    $('.arrow.right').on('click', function() {
      if ($(this).hasClass('disabled')) {
        return;
      }

      game.saveAnswer();
      game.next();
    });
  },

  // Fungsi untuk menampilkan level tertentu
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
    // Mapping warna frog dan lilypad
    var colors = {
      'g': 'green',
      'r': 'red',
      'y': 'yellow'
    };

    // Buat elemen lilypad dan frog sesuai board
    for (var i = 0; i < string.length; i++) {
      var c = string.charAt(i);
      var color = colors[c];

      var lilypad = $('<div/>').addClass('lilypad ' + color + (this.colorblind == 'true' ? ' cb-friendly' : '')).data('color', color);
      var frog = $('<div/>').addClass('frog ' + color + (this.colorblind == 'true' ? ' cb-friendly' : '')).data('color', color);

      // Lilypad tidak diberi efek rotasi dan scale
      $('<div/>').addClass('bg').appendTo(lilypad);
      // Frog tetap diberi efek animasi
      $('<div/>').addClass('bg animated pulse infinite').appendTo(frog);

      $('#background').append(lilypad);
      $('#pond').append(frog);
    }

    var classes = level.classes;

    // Tambahkan class khusus jika ada
    if (classes) {
      for (var rule in classes) {
        $(rule).addClass(classes[rule]);
      }
    }

    // Terapkan style pada background
    var selector = level.selector || '';
    $('#background ' + selector).css(level.style);

    game.changed = false; // Reset status perubahan
    game.applyStyles(); // Terapkan style ke pond
    game.check(); // Cek jawaban
  },

  // Fungsi untuk menampilkan tooltip bantuan CSS
  loadDocs: function() {
    // Event klik pada kode properti CSS
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

          // Event klik pada value di tooltip
          $('#instructions .tooltip code').on('click', function(event) {
            var pName = text;
            var pValue = event.target.textContent.split(' ')[0];
            pValue = getDefaultPropVal(pValue);
            game.writeCSS(pName, pValue); // Tulis kode CSS otomatis

            game.check(); // Cek jawaban
          });
          clickedCode = code;
        });
      }
    });
  },

  // Fungsi untuk menerapkan style CSS ke pond
  applyStyles: function() {
    var level = levels[game.level];
    var code = $('#code').val();
    var selector = level.selector || '';
    $('#pond ' +  selector).attr('style', code);
    game.saveAnswer(); // Simpan jawaban
  },

  // Fungsi untuk mengecek jawaban
  check: async function() {
    if (!document.startViewTransition) {
      game.applyStyles(); // Terapkan style
      game.compare(); // Bandingkan posisi frog dan lilypad
      return;
    }

    // Animasi transisi jika didukung browser
    const transition = document.startViewTransition(() => game.applyStyles());

    try {
      await transition.finished;
    } finally {
      game.compare(); // Bandingkan posisi frog dan lilypad
    }
  },

  // Fungsi untuk membandingkan posisi frog dan lilypad
  compare: function() {
    var level = levels[game.level];
    var lilypads = {};
    var frogs = {};
    var correct = true; // Status jawaban benar

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
      // Jika benar, tandai level selesai dan aktifkan tombol Next
      if ($.inArray(level.name, game.solved) === -1) {
        game.solved.push(level.name);
      }

      $('[data-level=' + game.level + ']').addClass('solved');
      $('#next').removeClass('disabled').addClass('animated animation');
    } else {
      // Jika salah, disable tombol Next
      game.changed = true;
      $('#next').removeClass('animated animation').addClass('disabled');
    }
  },

  // Fungsi untuk menyimpan jawaban ke objek game
  saveAnswer: function() {
    var level = levels[this.level];
    game.answers[level.name] = $('#code').val();
  },

  // Fungsi animasi shake jika jawaban salah
  tryagain: function() {
    $('#editor').addClass('animated shake');
  },

  // Fungsi untuk menampilkan level kemenangan
  win: function() {
    var solution = $('#code').val();

    this.loadLevel(levelWin); // Load level kemenangan

    $('#editor').hide(); // Sembunyikan editor
    $('#code').val(solution); // Tampilkan solusi
    $('#share').show(); // Tampilkan tombol share
    $('.frog .bg').removeClass('pulse').addClass('bounce'); // Animasi frog menang
  },

  // Fungsi untuk memberi efek acak pada frog/lilypad
  transform: function() {
    var scale = 1 + ((Math.random() / 5) - 0.2);
    var rotate = 360 * Math.random();

    return {'transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)'}; // Kembalikan style transform
  },

  // Fungsi untuk mengatur terjemahan bahasa
  translate: function() {
    document.title = messages.title[game.language] || messages.title.en; // Judul halaman
    $('html').attr('lang', game.language); // Set atribut bahasa

    var level = $('#editor').is(':visible') ? levels[game.level] : levelWin;
    var instructions = level.instructions[game.language] || level.instructions.en;
    $('#instructions').html(instructions); // Tampilkan instruksi
    game.loadDocs(); // Tampilkan tooltip bantuan

    // Terjemahkan label
    $('.translate').each(function() {
      var label = $(this).attr('id');
      if (messages[label]) {
        var text = messages[label][game.language] || messages[label].en;
      }

      $('#' + label).text(text);
    });
  },

  // Fungsi debounce untuk menunda eksekusi agar tidak terlalu sering
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args); // Eksekusi fungsi jika tidak immediate
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout); // Hapus timeout sebelumnya
      timeout = setTimeout(later, wait); // Set timeout baru
      if (callNow) func.apply(context, args); // Eksekusi langsung jika immediate
    };
  },

  // Fungsi untuk menulis kode CSS ke editor
  writeCSS: function(pName, pValue){
    var tokens = $('#code').val().trim().split(/[\n:;]+/).filter(i => i); // Pisahkan kode CSS
    var keywords = Object.keys(docs); // Daftar properti CSS
    var content = '';
    var filled = false;

    // Jika klik nama properti di tooltip, tidak melakukan apa-apa
    if (keywords.includes(pValue)) return;

    // Proses penulisan kode CSS ke editor
    tokens.forEach(function (token, i){
      var trimmedToken = token.trim();
      if (!keywords.includes(trimmedToken)){
        return;
      }

      var append = content !== '' ? '\n' : '';
      if (trimmedToken === pName && !filled)
      {
        filled = true;
        append += trimmedToken + ': ' + pValue + ';'; // Tambahkan properti dan value
      }
      else if (i + 1 < tokens.length){
        var val = !keywords.includes(tokens[i + 1].trim()) ? tokens[i + 1].trim() : ''; // Validasi value
        append += trimmedToken + ': ' + val + ';';
      }

      content += append;
    });

    if (!filled){
      content += content !== '' ? '\n' : '';
      content += pName + ': ' + pValue + ';'; // Tambahkan properti baru jika belum ada
    }

    $('#code').val(content); // Tulis ke editor
    $('#code').focus(); // Fokus ke editor
  }
};

// Inisialisasi game saat dokumen siap
$(document).ready(function() {
  game.start();
});

// Tampilkan popup input nama/absen saat pertama kali
game.showInputPopup();
