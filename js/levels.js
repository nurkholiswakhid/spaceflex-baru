var levels = [
  {
    name: 'Q1',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Selamat datang di Spaceflex, sebuah game di mana Anda membantu Alien dan teman-temannya dengan menulis kode CSS! Arahkan alien ini ke planet di sebelah kanan dengan menggunakan properti <code>justify-content</code>, yang menyelaraskan item secara horizontal dan menerima nilai-nilai berikut:</p><ul><li><code>flex-start</code>: Item menyelaras ke sisi kiri kontainer.</li><li><code>flex-end</code>: Item menyelaras ke sisi kanan kontainer.</li><li><code>center</code>: Item menyelaras di tengah kontainer.</li><li><code>space-between</code>: Item ditampilkan dengan jarak yang sama di antara mereka.</li><li><code>space-around</code>: Item ditampilkan dengan jarak yang sama di sekitar mereka.</li></ul><p>Contohnya, <code>justify-content: flex-end;</code> akan memindahkan alien ke kanan.</p>',
    },
    board: 'g',
    style: { 'justify-content': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q2',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Gunakan <code>justify-content</code> lagi untuk membantu alien-alien ini sampai ke planet mereka. Ingat bahwa properti CSS ini menyelaraskan item secara horizontal dan menerima nilai-nilai berikut:</p><ul><li><code>flex-start</code>: Item menyelaras ke sisi kiri kontainer.</li><li><code>flex-end</code>: Item menyelaras ke sisi kanan kontainer.</li><li><code>center</code>: Item menyelaras di tengah kontainer.</li><li><code>space-between</code>: Item ditampilkan dengan jarak yang sama di antara mereka.</li><li><code>space-around</code>: Item ditampilkan dengan jarak yang sama di sekitar mereka.</li></ul>',
     },
    board: 'gy',
    style: { 'justify-content': 'center' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q3',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bantu ketiga alien menemukan planet mereka hanya dengan menggunakan <code>justify-content</code>. Kali ini, planet-planet memiliki banyak ruang di sekitar mereka.</p><p>Jika Anda lupa kemungkinan nilai untuk suatu properti, Anda dapat mengklik nama properti untuk melihatnya. Coba klik pada <code>justify-content</code>.</p>',
      },
    board: 'gyr',
    style: { 'justify-content': 'space-around' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q4',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Sekarang planet-planet di tepi telah bergeser ke pantai, meningkatkan jarak di antara mereka. Gunakan <code>justify-content</code>. Kali ini, planet-planet memiliki jarak yang sama di antara mereka.</p>',
          },
    board: 'gyr',
    style: { 'justify-content': 'space-between' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q5',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Sekarang gunakan <code>align-items</code> untuk membantu alien sampai ke bagian bawah galaxy. Properti CSS ini menyelaraskan item secara vertikal dan menerima nilai-nilai berikut:</p><ul><li><code>flex-start</code>: Item menyelaras ke bagian atas kontainer.</li><li><code>flex-end</code>: Item menyelaras ke bagian bawah kontainer.</li><li><code>center</code>: Item menyelaras di pusat vertikal kontainer.</li><li><code>baseline</code>: Item ditampilkan pada baseline kontainer.</li><li><code>stretch</code>: Item diregangkan untuk menyesuaikan kontainer.</li></ul>',
    },
    board: 'gyr',
    style: { 'align-items': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q6',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Arahkan alien ke tengah galaxy menggunakan kombinasi <code>justify-content</code> dan <code>align-items</code>.</p>',
      },
    board: 'g',
    style: { 'justify-content': 'center', 'align-items': 'center' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q7',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Alien-alien perlu menyeberangi galaxy lagi, kali ini untuk beberapa planet dengan banyak ruang di sekitar mereka. Gunakan kombinasi <code>justify-content</code> dan <code>align-items</code>.</p>',
    },
    board: 'gyr',
    style: { 'justify-content': 'space-around', 'align-items': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q8',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Alien-alien perlu berada dalam urutan yang sama dengan planet mereka menggunakan <code>flex-direction</code>. Properti CSS ini mendefinisikan arah item ditempatkan dalam kontainer, dan menerima nilai-nilai berikut:</p><ul><li><code>row</code>: Item ditempatkan sama dengan arah teks.</li><li><code>row-reverse</code>: Item ditempatkan berlawanan dengan arah teks.</li><li><code>column</code>: Item ditempatkan dari atas ke bawah.</li><li><code>column-reverse</code>: Item ditempatkan dari bawah ke atas.</li></ul>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'row-reverse' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q9',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bantu alien menemukan kolom planet mereka menggunakan <code>flex-direction</code>. Properti CSS ini mendefinisikan arah item ditempatkan dalam kontainer, dan menerima nilai-nilai berikut:</p><ul><li><code>row</code>: Item ditempatkan sama dengan arah teks.</li><li><code>row-reverse</code>: Item ditempatkan berlawanan dengan arah teks.</li><li><code>column</code>: Item ditempatkan dari atas ke bawah.</li><li><code>column-reverse</code>: Item ditempatkan dari bawah ke atas.</li></ul>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'column' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q10',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bantu alien sampai ke planet mereka masing-masing. Meskipun mereka tampak dekat, diperlukan <code>flex-direction</code> dan <code>justify-content</code> untuk membawa mereka ke sana.</p><p>Perhatikan bahwa ketika Anda mengatur arah ke baris atau kolom terbalik, start dan end juga terbalik.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'row-reverse', 'justify-content': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q11',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bantu alien menemukan planet mereka menggunakan <code>flex-direction</code> dan <code>justify-content</code>.</p><p>Perhatikan bahwa ketika arah flex adalah kolom, <code>justify-content</code> berubah ke vertikal dan <code>align-items</code> ke horizontal.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'column', 'justify-content': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q12',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bantu alien menemukan planet mereka menggunakan <code>flex-direction</code> dan <code>justify-content</code>.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'column-reverse', 'justify-content': 'space-between' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q13',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bantu alien menemukan planet mereka menggunakan <code>flex-direction</code>, <code>justify-content</code>, dan <code>align-items</code>.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'row-reverse', 'justify-content': 'center', 'align-items': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q14',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Terkadang membalikkan urutan baris atau kolom kontainer tidak cukup. Dalam kasus ini, kita dapat menerapkan properti <code>order</code> pada item individual. Secara default, item memiliki nilai 0, tetapi kita dapat menggunakan properti ini untuk mengaturnya ke nilai integer positif atau negatif (-2, -1, 0, 1, 2).</p><p>Gunakan properti <code>order</code> untuk mengatur ulang alien sesuai dengan planet mereka.</p>',
      },
    board: 'gyr',
    selector: '> :nth-child(2)',
    classes: { '#galaxy, #background': 'wrap' },
    style: { 'order': '2' },
    before: "#galaxy {\n  display: flex;\n}\n\n.yellow {\n",
    after: "}"
  },
  {
    name: 'Q15',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Gunakan properti <code>order</code> untuk mengirim alien merah ke planetnya.</p>',
    },
    board: 'gggrg',
    selector: '> :nth-child(4)',
    classes: { '#galaxy, #background': 'wrap' },
    style: { 'order': '-1' },
    before: "#galaxy {\n  display: flex;\n}\n\n.red {\n",
    after: "}"
  },
  {
    name: 'Q16',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Properti lain yang dapat Anda terapkan pada item individual adalah <code>align-self</code>. Properti ini menerima nilai yang sama dengan <code>align-items</code> dan nilainya untuk item tertentu.</p>',
   },
    board: 'ggygg',
    selector: '> :nth-child(3)',
    style: { 'align-self': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n  align-items: flex-start;\n}\n\n.yellow {\n",
    after: "}"
  },
  {
    name: 'Q17',  
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Kombinasikan <code>order</code> dengan <code>align-self</code> untuk membantu alien ke tujuan mereka.</p>',
    },
    board: 'ygygg',
    selector: '> .yellow',
    style: { 'align-self': 'flex-end', 'order': '2' },
    before: "#galaxy {\n  display: flex;\n  align-items: flex-start;\n}\n\n.yellow {\n",
    after: "}"
  },
  {
    name: 'Q18',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Oh tidak! Alien-alien semua terjepit pada satu baris planet. Sebarkan mereka menggunakan properti <code>flex-wrap</code>, yang menerima nilai-nilai berikut:</p><ul><li><code>nowrap</code>: Setiap item disesuaikan dengan satu baris.</li><li><code>wrap</code>: Item membungkus ke baris tambahan.</li><li><code>wrap-reverse</code>: Item membungkus ke baris tambahan secara terbalik.</li></ul>',
    },
    board: 'ygggggr',
    style: { 'flex-wrap': 'wrap' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q19',  
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bantu pasukan alien ini membentuk tiga kolom yang rapi menggunakan kombinasi <code>flex-direction</code> dan <code>flex-wrap</code>.</p>',
    },
    board: 'gggggrrrrryyyyy',
    style: { 'flex-direction': 'column', 'flex-wrap': 'wrap' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q20',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Dua properti <code>flex-direction</code> dan <code>flex-wrap</code> sangat sering digunakan bersama sehingga properti singkat <code>flex-flow</code> dibuat untuk menggabungkannya. Properti singkat ini menerima nilai dari dua properti yang dipisahkan oleh spasi.</p><p>Misalnya, Anda dapat menggunakan <code>flex-flow: row wrap</code> untuk mengatur baris dan membungkusnya.</p><p>Coba gunakan <code>flex-flow</code> untuk mengulangi level sebelumnya.</p>',
    },
    board: 'gggggrrrrryyyyy',
    style: { 'flex-flow': 'column wrap' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q21',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Alien-alien tersebar di seluruh galaxy, tetapi planet-planet berkumpul di bagian atas. Anda dapat menggunakan <code>align-content</code> untuk mengatur bagaimana beberapa baris dipisahkan satu sama lain. Properti ini menerima nilai-nilai berikut:</p><ul><li><code>flex-start</code>: Baris dikemas di bagian atas kontainer.</li><li><code>flex-end</code>: Baris dikemas di bagian bawah kontainer.</li><li><code>center</code>: Baris dikemas di pusat vertikal kontainer.</li><li><code>space-between</code>: Baris ditampilkan dengan jarak yang sama di antara mereka.</li><li><code>space-around</code>: Baris ditampilkan dengan jarak yang sama di sekitar mereka.</li><li><code>stretch</code>: Baris diregangkan untuk menyesuaikan kontainer.</li></ul><p>Ini bisa membingungkan, tetapi <code>align-content</code> menentukan jarak antara baris, sedangkan <code>align-items</code> menentukan bagaimana item secara keseluruhan diselaraskan dalam kontainer. Ketika hanya ada satu baris, <code>align-content</code> tidak berpengaruh.</p>',
    },
    board: 'ggggggggggggggg',
    classes: { '#pond, #background': 'wrap' },
    style: { 'align-content': 'flex-start' },
    before: "#galaxy {\n  display: flex;\n  flex-wrap: wrap;\n",
    after: "}"
  },
  {
    name: 'Q22',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Sekarang arus telah mengumpulkan planet-planet di bagian bawah. Gunakan <code>align-content</code> untuk membimbing alien ke sana.</p>',
    },
    board: 'ggggggggggggggg',
    classes: { '#pond, #background': 'wrap' },
    style: { 'align-content': 'flex-end' },
    before: "#galaxy {\n  display: flex;\n  flex-wrap: wrap;\n",
    after: "}"
  },
  {
    name: 'Q23',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Alien-alien telah mengadakan pesta, tetapi sekarang saatnya pulang. Gunakan kombinasi <code>flex-direction</code> dan <code>align-content</code> untuk membawa mereka ke planet mereka.</p>',
    },
    board: 'rgggyrgggyrgggy',
    classes: { '#pond, #background': 'wrap' },
    style: { 'flex-direction': 'column-reverse', 'align-content': 'center' },
    before: "#galaxy {\n  display: flex;\n  flex-wrap: wrap;\n",
    after: "}"
  },
  {
    name: 'Q24',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Bawa alien pulang untuk terakhir kalinya dengan menggunakan properti CSS yang telah Anda pelajari:</p><ul><li><code>justify-content</code></li><li><code>align-items</code></li><li><code>flex-direction</code></li><li><code>order</code></li><li><code>align-self</code></li><li><code>flex-wrap</code></li><li><code>flex-flow</code></li><li><code>align-content</code></li></ul>',
    },
    board: 'rggggyy',
    style: { 'flex-direction': 'column-reverse', 'flex-wrap': 'wrap-reverse', 'align-content': 'space-between', 'justify-content': 'center' },
    before: "#galaxy {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'Q25',
    poin4: 'Sangat Baik',
    poin3: 'Baik',
    poin2: 'Cukup',
    poin1: 'Kurang',
    poin0: 'Buruk',
    instructions: {
      'id': '<p>Tantangan Galaksi! Alien-alien telah tersebar di berbagai dimensi ruang. Gunakan kombinasi properti yang kompleks untuk membawa mereka ke planet yang tepat. Perhatikan bahwa beberapa alien memiliki gravitasi berbeda dan memerlukan perlakuan khusus.</p><p>Properti yang mungkin diperlukan: <code>flex-direction</code>, <code>flex-wrap</code>, <code>justify-content</code>, <code>align-items</code>, <code>align-content</code>, <code>order</code>, dan <code>flex-grow</code>.</p>',
    },
    board: 'rrggggbbyyyy',
    style: { 
      'flex-direction': 'row-reverse', 
      'flex-wrap': 'wrap-reverse', 
      'align-content': 'flex-end', 
      'justify-content': 'space-around',
      'align-items': 'stretch'
    },
    before: "#galaxy {\n  display: flex;\n  height: 400px;\n",
    after: "}"
  }
];