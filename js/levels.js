var levels = [
  {
    name: 'justify-content 1',
    instructions: {
      'en': '<p>Welcome to Flexbox Froggy, a game where you help Froggy and friends by writing CSS code! Guide this frog to the lilypad on the right by using the <code>justify-content</code> property, which aligns items horizontally and accepts the following values:</p><ul><li><code>flex-start</code>: Items align to the left side of the container.</li><li><code>flex-end</code>: Items align to the right side of the container.</li><li><code>center</code>: Items align at the center of the container.</li><li><code>space-between</code>: Items display with equal spacing between them.</li><li><code>space-around</code>: Items display with equal spacing around them.</li></ul><p>For example, <code>justify-content: flex-end;</code> will move the frog to the right. <img src="https://code.org/api/hour/begin_flexbox_froggy.png"></p>',
      'id': '<p> Selamat datang di Flexbox Froggy, tempat permainan dimana kamu membantu Froggy dan teman-teman dengan menulis kode CSS! Arahkan katak ini ke lilypad di sebelah kanan dengan menggunakan properti <code> justify-content </code>, yang menyelaraskan objek secara:</p><ul><li><code>flex-start</code>: Objek selaras dengan wadah sebelah kiri.</li><li><code>flex-end</code>:Objek selaras dengan wadah sebelah kanan. </li><li><code>center</code>: Objek selaras di tengah wadah</li><li><code>space-between</code>: Objek ditampilkan dengan jarak yang sama dengan disekelilingnya.</li> </ul> <p> Misalnya, <code> justify-content: flex-end; </code> akan pindahkan katak ke kanan. <img src = "https://code.org/api/hour/begin_flexbox_froggy.png"> </p> ',
    },
    board: 'g',
    style: { 'justify-content': 'flex-end' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'justify-content 2',
    instructions: {
      'en': '<p>Use <code>justify-content</code> again to help these frogs get to their lilypads. Remember that this CSS property aligns items horizontally and accepts the following values:</p><ul><li><code>flex-start</code>: Items align to the left side of the container.</li><li><code>flex-end</code>: Items align to the right side of the container.</li><li><code>center</code>: Items align at the center of the container.</li><li><code>space-between</code>: Items display with equal spacing between them.</li><li><code>space-around</code>: Items display with equal spacing around them.</li></ul>',
      'id': '<p>Gunakan <code>justify-content</code> lagi untuk membantu katak ini ke lilypad. Ingat bahwa properti CSS ini menyejajarkan item secara horizontal dan menerima nilai-nilai berikut: </p><ul><li><code>flex-start</code>: Objek sejajar dengan sisi kiri wadah.</li><li><code>flex-end</code>: Objek sejajar dengan sisi kanan wadah. </li><li><code>center</code>: Objek sejajar di tengah wadah. </li><li><code>space-between</code>: Objek ditampilkan dengan jarak yang sama di antara mereka. </li><li><code>space-around</code>: Objek ditampilkan dengan jarak yang sama di sekitarnya.</li></ul>',
     },
    board: 'gy',
    style: { 'justify-content': 'center' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'justify-content 3',
    instructions: {
      'en': '<p>Help all three frogs find their lilypads just by using <code>justify-content</code>. This time, the lilypads have lots of space all around them.</p><p>If you find yourself forgetting the possible values for a property, you can click on the property name to view them. Try clicking on <code>justify-content</code>.</p>',
      'id': '<p> Bantu semua tiga katak menemukan lilypads dengan gunakan <code>justify-content</code>. Kali in i, lilypads mempunyai jarak lebih diantara mereka</p><p> Jika kamu lupa value untuk properti, kamu dapat mengarahkan kursor ke nama properti untuk melihatnya. Cobalah ambangkan pointer kamu <code>justify-content</code>.</p>',
      },
    board: 'gyr',
    style: { 'justify-content': 'space-around' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'justify-content 4',
    instructions: {
      'en': '<p>Now the lilypads on the edges have drifted to the shore, increasing the space between them. Use <code>justify-content</code>. This time, the lilypads have equal spacing between them.</p>',
      'id': '<p>Sekarang lilypads berada di tepi pantai, tambahkan jarak di antara mereka. Gunakan <code>justify-content</code>. Kali ini, lilypads harus memiliki jarak yang sama diantara mereka.</p>',
          },
    board: 'gyr',
    style: { 'justify-content': 'space-between' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'align-items 1',
    instructions: {
      'en': '<p>Now use <code>align-items</code> to help the frogs get to the bottom of the pond. This CSS property aligns items vertically and accepts the following values:</p><ul><li><code>flex-start</code>: Items align to the top of the container.</li><li><code>flex-end</code>: Items align to the bottom of the container.</li><li><code>center</code>: Items align at the vertical center of the container.</li><li><code>baseline</code>: Items display at the baseline of the container.</li><li><code>stretch</code>: Items are stretched to fit the container.</li></ul>',
      'id': '<p>Sekarang gunakan <code>align-items</code> untuk membantu ke dasar kolam. Properti CSS ini menyejajarkan objek secara vertikal dan menerima nilai-nilai berikut: </p><ul><li><code>flex-start</code>: Objek sejajar dengan bagian atas wadah. </li> <li> <code> flex-end </code>: Objek sejajar dengan bagian bawah wadah.</li><li><code>center</code>: Objek sejajar dengan bagian tengah wadah.</li><li><code>baseline</code>: Item ditampilkan di garis dasar wadah. </li> <li> <code> stretch </code>: Item diregangkan agar sesuai dengan wadah. </li> </ul> ',
    },
    board: 'gyr',
    style: { 'align-items': 'flex-end' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'align-items 2',
    instructions: {
      'en': '<p>Lead the frog to the center of the pond using a combination of <code>justify-content</code> and <code>align-items</code>.</p>',
      'id': '<p>Arahkan katak ke tengah kolam menggunakan kombinasi dari <code>justify-content</code> dan <code>align-items</code>.</p>',
      },
    board: 'g',
    style: { 'justify-content': 'center', 'align-items': 'center' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'align-items 3',
    instructions: {
      'en': '<p>The frogs need to cross the pond again, this time for some lilypads with plenty of space around them. Use a combination of <code>justify-content</code> and <code>align-items</code>.</p>',
      'id': '<p>Katak harus menyeberangi kolam lagi, kali ini untuk beberapa lilypad dengan banyak ruang di sekitar mereka. Menggunakan kombinasi <code>justify-content</code> and <code>align-items</code>.</p>',
    },
    board: 'gyr',
    style: { 'justify-content': 'space-around', 'align-items': 'flex-end' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-direction 1',
    instructions: {
      'en': '<p>The frogs need to get in the same order as their lilypads using <code>flex-direction</code>. This CSS property defines the direction items are placed in the container, and accepts the following values:</p><ul><li><code>row</code>: Items are placed the same as the text direction.</li><li><code>row-reverse</code>: Items are placed opposite to the text direction.</li><li><code>column</code>: Items are placed top to bottom.</li><li><code>column-reverse</code>: Items are placed bottom to top.</li></ul>',
      'id': '<p>Katak harus memiliki urutan yang sama dengan lilypad mereka menggunakan <code>flex-direction</code>. Properti CSS ini mendefinisikan arah objek yang ditempatkan dalam wadah, dan menerima nilai-nilai berikut:</p><ul><li><code>row</code>: Objek ditempatkan sama dengan arah teks.</li><li><code>row-reverse</code>: Objek ditempatkan berlawanan dengan arah teks.</li><li><code>column</code>: Objek ditempatkan dari atas ke bawah.</li><li><code>column-reverse</code>: Objek ditempatkan dari bawah ke atas.</li></ul>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'row-reverse' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-direction 2',
    instructions: {
      'en': '<p>Help the frogs find their column of lilypads using <code>flex-direction</code>. This CSS property defines the direction items are placed in the container, and accepts the following values:</p><ul><li><code>row</code>: Items are placed the same as the text direction.</li><li><code>row-reverse</code>: Items are placed opposite to the text direction.</li><li><code>column</code>: Items are placed top to bottom.</li><li><code>column-reverse</code>: Items are placed bottom to top.</li></ul>',
      'id': '<p>Bantu katak menemukan kolom lilypads mereka menggunakan <code>flex-direction</code>. Properti CSS ini mendefinisikan arah objek yang ditempatkan dalam wadah, dan menerima nilai-nilai berikut:</p><ul><li><code>row</code>: Objek ditempatkan sama dengan arah teks.</li><li><code>row-reverse</code>: Objek ditempatkan berlawanan dengan arah teks.</li><li><code>column</code>: Objek ditempatkan dari atas ke bawah.</li><li><code>column-reverse</code>:  Objek ditempatkan dari bawah ke atas.</li></ul>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'column' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-direction 3',
    instructions: {
      'en': '<p>Help the frogs get to their own lilypads. Although they seem close, it will take both <code>flex-direction</code> and <code>justify-content</code> to get them there.</p><p>Notice that when you set the direction to a reversed row or column, start and end are also reversed.</p>',
      'id': '<p>Bantu katak mencapai lilypads mereka sendiri. Meskipun mereka tampak dekat, itu akan membutuhkan keduanya<code>flex-direction</code> dan <code>justify-content</code> untuk mencapai ke sana.</p><p>Perhatikan bahwa ketika kamu mengatur arah ke baris atau kolom terbalik, mulai dan akhir juga terbalik.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'row-reverse', 'justify-content': 'flex-end' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-direction 4',
    instructions: {
      'en': '<p>Help the frogs find their lilypads using <code>flex-direction</code> and <code>justify-content</code>.</p><p>Notice that when the flex direction is a column, <code>justify-content</code> changes to the vertical and <code>align-items</code> to the horizontal.</p>',
      'id': '<p>Bantu katak menemukan lilypads mereka menggunakan <code>flex-direction</code> dan <code>justify-content</code>.</p><p>Perhatikan bahwa ketika arah flex adalah kolom, <code>justify-content</code> ubah vertical dan <code>align-items</code> dan ke horizontal.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'column', 'justify-content': 'flex-end' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-direction 5',
    instructions: {
      'en': '<p>Help the frogs find their lilypads using <code>flex-direction</code> and <code>justify-content</code>.</p>',
      'id': '<p>Bantu katak menemukan lilypad menggunakan <code>flex-direction</code> dan <code>justify-content</code>.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'column-reverse', 'justify-content': 'space-between' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-direction 6',
    instructions: {
      'en': '<p>Help the frogs find their lilypads using <code>flex-direction</code>, <code>justify-content</code>, and <code>align-items</code>.</p>',
      'id': '<p>Bantu katak menemukan lilypad menggunakan <code>flex-direction</code>, <code>justify-content</code>, dan <code>align-items</code>.</p>',
    },
    board: 'gyr',
    style: { 'flex-direction': 'row-reverse', 'justify-content': 'center', 'align-items': 'flex-end' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'order 1',
    instructions: {
      'en': '<p>Sometimes reversing the row or column order of a container is not enough. In these cases, we can apply the <code>order</code> property to individual items. By default, items have a value of 0, but we can use this property to also set it to a positive or negative integer value (-2, -1, 0, 1, 2).</p><p>Use the <code>order</code> property to reorder the frogs according to their lilypads.</p>',
      'id': '<p>Kadang-kadang membalik urutan baris atau kolom wadah tidak cukup. Dalam kasus ini, kita dapat menerapkan properti <code> order </code> ke masing-masing objek. Secara default, item memiliki nilai 0, tetapi kita dapat menggunakan properti ini untuk juga mengaturnya ke nilai integer positif atau negatif (-2, -1, 0, 1, 2).</p><p>Gunakan <code>order</code> properti untuk mengatur ulang katak berdasarkan lilypads mereka.</p>',
      },
    board: 'gyr',
    selector: '> :nth-child(2)',
    classes: { '#pond, #background': 'wrap' },
    style: { 'order': '2' },
    before: "#pond {\n  display: flex;\n}\n\n.yellow {\n",
    after: "}"
  },
  {
    name: 'order 2',
    instructions: {
      'en': '<p>Use the <code>order</code> property to send the red frog to his lilypad.</p>',
      'id': '<p>Gunakan <code>order</code> properti untuk mengirimkan katak merah ke lilypadnya.</p>',
    },
    board: 'gggrg',
    selector: '> :nth-child(4)',
    classes: { '#pond, #background': 'wrap' },
    style: { 'order': '-1' },
    before: "#pond {\n  display: flex;\n}\n\n.red {\n",
    after: "}"
  },
  {
    name: 'align-self 1',
    instructions: {
      'en': '<p>Another property you can apply to individual items is <code>align-self</code>. This property accepts the same values as <code>align-items</code> and its value for the specific item.</p>',
      'id': '<p>Properti lain yang dapat kamu terapkan untuk masing-masing objek adalah <code>align-self</code>. Properti ini memiliki nilai yang sama dengan <code>align-items</code> dan nilainya untuk item tertentu.</p>',
    },
    board: 'ggygg',
    selector: '> :nth-child(3)',
    style: { 'align-self': 'flex-end' },
    before: "#pond {\n  display: flex;\n  align-items: flex-start;\n}\n\n.yellow {\n",
    after: "}"
  },
  {
    name: 'align-self 2',
    instructions: {
      'en': '<p>Combine <code>order</code> with <code>align-self</code> to help the frogs to their destinations.</p>',
      'id': '<p>Gabungkan <code>order</code> dengan <code>align-self</code> untuk membanntu katak mencapai tujuan mereka.</p>',
    },
    board: 'ygygg',
    selector: '> .yellow',
    style: { 'align-self': 'flex-end', 'order': '2' },
    before: "#pond {\n  display: flex;\n  align-items: flex-start;\n}\n\n.yellow {\n",
    after: "}"
  },
  {
    name: 'flex-wrap 1',
    instructions: {
      'en': '<p>Oh no! The frogs are all squeezed onto a single row of lilypads. Spread them out using the <code>flex-wrap</code> property, which accepts the following values:</p><ul><li><code>nowrap</code>: Every item is fit to a single line.</li><li><code>wrap</code>: Items wrap around to additional lines.</li><li><code>wrap-reverse</code>: Items wrap around to additional lines in reverse.</li></ul>',
      'id': '<p>Oh tidak! Semua katak bersesakan dalam satu lilypads. Sebarkan mereka dengan menggunakan <code>flex-wrap</code> properti, yang menerima nilai-nilai berikut:</p><ul><li><code>nowrap</code>: Setiap objek pada satu baris.</li><li><code>wrap</code>: Objek membungkus ke baris tambahan.</li><li><code>wrap-reverse</code>: Objek membungkus ke garis tambahan wrap secara terbalik.</li></ul>',
    },
    board: 'ygggggr',
    style: { 'flex-wrap': 'wrap' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-wrap 2',
    instructions: {
      'en': '<p>Help this army of frogs form three orderly columns using a combination of <code>flex-direction</code> and <code>flex-wrap</code>.</p>',
      'id': '<p>Bantu pasukan katak ini kedalam 3 baris berurutan menggunakan kombinasi <code>flex-direction</code> dan <code>flex-wrap</code>.</p>',
    },
    board: 'gggggrrrrryyyyy',
    style: { 'flex-direction': 'column', 'flex-wrap': 'wrap' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'flex-flow 1',
    instructions: {
      'en': '<p>The two properties <code>flex-direction</code> and <code>flex-wrap</code> are used so often together that the shorthand property <code>flex-flow</code> was created to combine them. This shorthand property accepts the value of the two properties separated by a space.</p><p>For example, you can use <code>flex-flow: row wrap</code> to set rows and wrap them.</p><p>Try using <code>flex-flow</code> to repeat the previous level.</p>',
      'id': '<p>Dua properti <code>flex-direction</code> dan <code>flex-wrap</code> sering digunakan bersamaan shorthand properti <code>flex-flow</code> dibuat untuk menggabungkan keduanya. Shorthand properti ini menerima nilai dari satu dari dua properti terpisah oleh jarak/spasi.</p><p>Sebagai contoh, kamu dapat menggunakan<code>flex-flow: row wrap</code> untuk mengatur kolom dan membungkusnya.</p><p>Coba gunakan <code>flex-flow</code> untuk mengulangi tingkat sebelumnya.</p>',
    },
    board: 'gggggrrrrryyyyy',
    style: { 'flex-flow': 'column wrap' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  },
  {
    name: 'align-content 1',
    instructions: {
      'en': '<p>The frogs are spread all over the pond, but the lilypads are bunched at the top. You can use <code>align-content</code> to set how multiple lines are spaced apart from each other. This property takes the following values:</p><ul><li><code>flex-start</code>: Lines are packed at the top of the container.</li><li><code>flex-end</code>: Lines are packed at the bottom of the container.</li><li><code>center</code>: Lines are packed at the vertical center of the container.</li><li><code>space-between</code>: Lines display with equal spacing between them.</li><li><code>space-around</code>: Lines display with equal spacing around them.</li><li><code>stretch</code>: Lines are stretched to fit the container.</li></ul><p>This can be confusing, but <code>align-content</code> determines the spacing between lines, while <code>align-items</code> determines how the items as a whole are aligned within the container. When there is only one line, <code>align-content</code> has no effect.</p>',
      'id': '<p>PAra katak tersebar di seluruh kolam, tetap ada beberapa lilypads diatas. Kamu dapat gunakan <code>align-content</code> untuk mengatur beberapa baris untuk memberi jarak dari masing-masing. Properti ini memiliki nilai:</p><ul><li><code>flex-start</code>: Baris ini mengumpulkan pada wadah bagian atas.</li><li><code>flex-end</code>: Baris dikemas di bagian bawah wadah.</li><li><code>center</code>: Baris dikemas di pusat vertikal wadah.</li><li><code>space-between</code>: Baris ditampilkan dengan jarak sesuai diantara mereka.</li><li><code>space-around</code>: baris ditampilkan dengan jarak yang sama diantara mereka.</li><li><code>stretch</code>: Baris di tarik untuk menyesuaikan jarak wadah.</li></ul><p>Ini mungkin membinggungkan, tapi <code>align-content</code> menentukan jarak diantara baris, sedangkan <code>align-items</code> menentukan bagaimana objek secara keseluruhan sejajar di dalam wadah. Ketika ada satu baris, <code>align-content</code> hal ini tidak akan memberikan effect apapun.</p>',
    },
    board: 'ggggggggggggggg',
    classes: { '#pond, #background': 'wrap' },
    style: { 'align-content': 'flex-start' },
    before: "#pond {\n  display: flex;\n  flex-wrap: wrap;\n",
    after: "}"
  },
  {
    name: 'align-content 2',
    instructions: {
      'en': '<p>Now the current has bunched the lilypads at the bottom. Use <code>align-content</code> to guide the frogs there.</p>',
      'id': '<p>Saat ini ada banyak lilypad dibawah. Gunakan <code>align-content</code> untuk mengarahkan katak.</p>',
    },
    board: 'ggggggggggggggg',
    classes: { '#pond, #background': 'wrap' },
    style: { 'align-content': 'flex-end' },
    before: "#pond {\n  display: flex;\n  flex-wrap: wrap;\n",
    after: "}"
  },
  {
    name: 'align-content 3',
    instructions: {
      'en': '<p>The frogs have had a party, but it is time to go home. Use a combination of <code>flex-direction</code> and <code>align-content</code> to get them to their lilypads.</p>',
      'id': '<p>Para katak mengadakan pesta, tapi sudah saatnya pulang. Gunakan kombinasi <code>flex-direction</code> dan <code>align-content</code> untuk mengantarkan mereka ke lilypads masing-masing.</p>',
    },
    board: 'rgggyrgggyrgggy',
    classes: { '#pond, #background': 'wrap' },
    style: { 'flex-direction': 'column-reverse', 'align-content': 'center' },
    before: "#pond {\n  display: flex;\n  flex-wrap: wrap;\n",
    after: "}"
  },
  {
    name: 'align-content 4',
    instructions: {
      'en': '<p>Bring the frogs home one last time by using the CSS properties you\'ve learned:</p><ul><li><code>justify-content</code></li><li><code>align-items</code></li><li><code>flex-direction</code></li><li><code>order</code></li><li><code>align-self</code></li><li><code>flex-wrap</code></li><li><code>flex-flow</code></li><li><code>align-content</code><img src="https://code.org/api/hour/finish_flexbox_froggy.png"></li></ul>',
      'id': '<p>Bawa katak pulang sekali lagi mengunakan properti CSS yang telah kamu pelajari:</p><ul><li><code>justify-content</code></li><li><code>align-items</code></li><li><code>flex-direction</code></li><li><code>order</code></li><li><code>align-self</code></li><li><code>flex-wrap</code></li><li><code>flex-flow</code></li><li><code>align-content</code><img src="https://code.org/api/hour/finish_flexbox_froggy.png"></li></ul>',
    },
    board: 'rggggyy',
    style: { 'flex-direction': 'column-reverse', 'flex-wrap': 'wrap-reverse', 'align-content': 'space-between', 'justify-content': 'center' },
    before: "#pond {\n  display: flex;\n",
    after: "}"
  }
];

var levelWin = {
  name: 'win',
  instructions: {
    'en': '<p>You win! Thanks to your mastery of flexbox, you were able to help all of the frogs to their lilypads. Just look how hoppy they are!</p><p>If you found this ribbeting, be sure to visit <a href="https://codepip.com/games/grid-garden/">Grid Garden</a> to learn about another powerful new feature of CSS layout. You can also find other coding games over at <a href="https://codepip.com/">Codepip</a>. And be sure to share Flexbox Froggy with your friends!</p>',
    'id': '<p> Kamu menang! Berkat penguasaan flexbox kamu, kamu dapat membantu semua Froggy untuk lilypads mereka. Lihat betapa "bahagia" mereka!</p><p>Jika kamu menemukan ini menyenangkan, pastikan untuk mengunjungi <a href="https://codepip.com/games/grid-garden/">Grid Garden</a> untuk mempelajari hal penting CSS layout. Kamu juga bisa menemukan permainan coding di <a href="https://codepip.com/">Codepip</a>.</p><p>Ingin tetap bermain sambil mendukunng Flexbox Froggy tetap ada? Cobalah kursus desain dan pengkodean web terbaik yang ditawarkan oleh <a href="https://treehouse.7eer.net/c/371033/228915/3944?subId1=flexboxfroggy">Treehouse</a>. Dan jangan lupa bagikan Flexbox Froggy kepada teman-teman kamu!</p>',
  },
  board: 'gyrgyrgyrgyrgyrgyrgyrgyrg',
  classes: { '#pond, #background': 'wrap' },
  style: {},
  before: "#pond {\n  display: flex;\n",
  after: "}"
};
