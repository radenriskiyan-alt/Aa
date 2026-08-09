import { KitabPart, DocumentMetadata, QuizQuestion } from '../types';

export const initialMetadata: DocumentMetadata = {
  category: 'Kajian Tauhid & Aqidah Ahlussunnah',
  title: 'Syarah Risalah Tijan Ad-Darari',
  subtitle: 'Penjelasan Mendalam Muqaddimah Kitab dan Syarah Basmalah karya Syekh Ibrahim Al-Bajuri',
  footerLeft: 'Kajian Aqidah Tauhid — Syarh Tijan ad-Darari',
  author: 'Syekh Ibrahim Al-Bajuri / Syekh Nawawi Banten',
};

export const initialKitabParts: KitabPart[] = [
  {
    id: 'bagian-1',
    partNumber: 'BAGIAN I',
    title: 'MUQADDIMAH KITAB',
    description: 'Pujian kepada Allah, Syahadat Tauhid, Syahadat Rasul, dan Tujuan Penulisan Kitab',
    points: [
      {
        id: 'p1-1',
        title: 'Poin 1: Pujian kepada Allah dengan Sifat Tanzih (Penyucian)',
        arabicText: 'اَلْحَمْدُ لِلّٰهِ الْمُنَزَّهِ عَنْ سِمَاتِ الْحُدُوْثِ وَالْأَلْوَانِ وَالْكَيْفِيَّاتِ',
        translation: 'Segala puji bagi Allah yang Maha Suci dari ciri-ciri kejadian (makhluk), warna-warna, dan bagaimana (sifat-sifat fisik/kifayat).',
        explanationText: 'Saudaraku, perhatikanlah bagaimana penulis memulai kitabnya. Beliau tidak sekadar mengucapkan "Alhamdulillah", tetapi langsung menyematkan sifat Tanzih (penyucian) kepada Allah. Ini adalah fondasi utama Ilmu Tauhid.',
        explanationBullets: [
          {
            boldText: 'Al-Huduts (Kejadian/Makhluk):',
            normalText: 'Allah disucikan dari sifat huduts (baru/terjadi). Allah adalah Qadim (Maha Terdahulu) tanpa permulaan.',
          },
          {
            boldText: 'Al-Alwan (Warna-warna):',
            normalText: 'Warna adalah sifat benda (jisim) yang memantul dari cahaya. Allah disucikan dari jasad atau tubuh, karena Dia tidak terdiri dari materi.',
          },
          {
            boldText: 'Al-Kaifiyyat (Bagaimana/Kifayat):',
            normalText: 'Ini menafikan kaifiyyah (kualitas fisik yang bisa diindera atau dibayangkan). Allah tidak memiliki arah, tempat, atau batasan bentuk.',
          },
        ],
        references: [
          {
            type: 'quran',
            title: 'Al-Qur\'an',
            text: '"Tidak ada sesuatu pun yang serupa dengan-Nya, dan Dia Maha Mendengar, Maha Melihat." (QS. Asy-Syura [42]: 11). Ayat ini adalah kaidah emas dalam Tanzih.',
          },
          {
            type: 'kitab',
            title: 'Kitab Rujukan',
            text: 'Penjelasan ini sangat selaras dengan Aqidah Awam karya Imam Ahmad bin Muhammad bin Ahmad al-Maliki (Syekh Sanusi) dan Ummu al-Barahin (As-Sanusiyyah As-Sughra) yang memang menjadi rujukan utama Syekh Al-Bajuri dalam risalah tauhidnya.',
          },
        ],
      },
      {
        id: 'p1-2',
        title: 'Poin 2: Syahadat Tauhid dan Ketergantungan Semesta',
        arabicText: 'وَأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللّٰهُ الْغَنِيُّ عَنْ كُلِّ مَا سِوَاهُ وَالْمُفْتَقِرُ إِلَيْهِ كُلُّ شَيْءٍ فِي سَائِرِ الْأَوْقَاتِ',
        translation: 'Dan aku bersaksi bahwa tiada Tuhan selain Allah, Yang Maha Kaya dari segala sesuatu selain-Nya, dan segala sesuatu membutuhkan-Nya di segala waktu.',
        explanationText: 'Poin ini merangkum inti dari Syahadat Tauhid. Penulis menegaskan dua sifat mutlak Allah dalam kaitannya dengan alam semesta:',
        explanationBullets: [
          {
            boldText: 'Al-Ghani \'anil \'Alam (Maha Kaya dari alam semesta):',
            normalText: 'Kekayaan Allah adalah Ghina Mutlaq (mutlak). Kewujudan kita, amal ibadah kita, dan seluruh alam semesta tidak menambah kekayaan Allah sedikit pun.',
          },
          {
            boldText: 'Al-Iftiqar ilaih (Ketergantungan makhluk kepada-Nya):',
            normalText: 'Ini adalah konsep Qiyam ghairihi bihi (berdirinya makhluk di atas wujud Allah). Setiap detik, setiap kedipan mata, seluruh alam semesta ini faqir (sangat membutuhkan) Faidl Wujud (curahan wujud) dari Allah. Jika Allah menolehkan wajah-Nya dari semesta sedetik saja, hancurlah alam semesta menjadi ketiadaan.',
          },
        ],
        references: [
          {
            type: 'quran',
            title: 'Al-Qur\'an',
            text: '"Wahai manusia! Kamulah yang memerlukan Allah, dan Allah Dialah yang Maha Kaya (tidak memerlukan sesuatu), Maha Terpuji." (QS. Fatir [35]: 15).',
          },
          {
            type: 'hadith',
            title: 'Hadis Nabawi',
            text: 'Dalam sebuah hadis riwayat Imam Muslim, Rasulullah SAW bersabda: "Ya Allah, jadikanlah kami orang-orang yang bersyukur atas nikmat-Mu, dan tidak menyia-nyiakannya... dan tidak ada yang bisa memberi manfaat kecuali dengan izin-Mu." (HR. Muslim no. 2723 - Menegaskan ketergantungan mutlak).',
          },
        ],
      },
      {
        id: 'p1-3',
        title: 'Poin 3: Syahadat Rasul dan Keutamaan Nabi Muhammad SAW',
        arabicText: 'وَأَشْهَدُ أَنَّ سَيِّدَنَا مُحَمَّدًا سَيِّدُ الْمَخْلُوقَاتِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللّٰهِ صَاحِبِ الْحَوْضِ وَالشَّفَاعَاتِ وَعَلَى آلِهِ الْمُفَضِّلِينَ عَلَى سَائِرِ الْأُمَمِ وَأَصْحَابِهِ الْفَائِزِيْنَ بِأَنْوَاعِ الْخَيْرَاتِ وَالنِّعَمِ',
        translation: 'Dan aku bersaksi bahwa tuan kita Muhammad adalah penghulu segala makhluk. Shalawat dan salam semoga tercurah kepada utusan Allah, pemilik telaga (Kautsar) dan syafaat. Dan kepada keluarganya yang diutamakan atas seluruh umat, dan para sahabatnya yang meraih berbagai kebaikan dan nikmat.',
        explanationText: 'Setelah mengesakan Allah, penulis mengagungkan Rasulullah SAW. Ini adalah adab para ulama Ahlussunnah.',
        explanationBullets: [
          {
            boldText: 'Sayyidul Makhluqat:',
            normalText: 'Nabi Muhammad SAW adalah Sayyid (Penghulu) seluruh makhluk, termasuk para malaikat dan nabi lainnya. Ini adalah keyakinan Ahlussunnah wal Jamaah, bukan sekadar majas.',
          },
          {
            boldText: 'Shahibul Haudli wasy-Syafa\'at:',
            normalText: 'Beliau memiliki Telaga Al-Kautsar di Padang Mahsyar dan memegang hak Syafa\'ah Uzhma (Syafaat Teragung) untuk membebaskan umat manusia dari penantian yang sangat lama di hari kiamat.',
          },
          {
            boldText: 'Keutamaan Ahlul Bait dan Sahabat:',
            normalText: 'Penulis mendoakan shalawat kepada keluarga (Ahlul Bait) dan para sahabat. Ini menunjukkan wasathiyyah (keseimbangan) akidah penulis; mencintai Ahlul Bait sekaligus menghormati dan memuliakan para Sahabat, persis seperti akidah Asy\'ariyah dan Maturidiyah.',
          },
        ],
        references: [
          {
            type: 'hadith',
            title: 'Hadis (Penghulu Makhluk)',
            text: 'Rasulullah SAW bersabda: "Aku adalah penghulu anak cucu Adam di hari kiamat, dan tidak ada kebanggaan (karena hal itu)." (HR. Muslim no. 1946, dari Jabir bin Abdullah).',
          },
          {
            type: 'hadith',
            title: 'Hadis (Telaga & Syafaat)',
            text: 'Hadis Syafa\'ah Uzhma yang sangat panjang dan masyhur, diriwayatkan oleh Imam Bukhari (no. 4712) dan Muslim (no. 193) dari Anas bin Malik r.a.',
          },
          {
            type: 'kitab',
            title: 'Kitab Rujukan',
            text: 'Rujukan utama mengenai keutamaan-keutamaan ini dapat ditemukan secara mendalam dalam kitab Asy-Syifa bi Ta\'rif Huquq al-Musthafa karya Qadhi \'Iyadh, dan Dalail al-Khairat karya Imam Muhammad bin Sulaiman al-Jazuli.',
          },
        ],
      },
      {
        id: 'p1-4',
        title: 'Poin 4: Tujuan Penulisan Kitab dan Tabarruk (Mencari Keberkahan)',
        arabicText: 'أَمَّا بَعْدُ فَهَذَا شَرْحٌ عَلَى رِسَالَةِ الْعَلَّامَةِ الْبَاجُورِيِّ فِي التَّوْحِيدِ سَمَّيْتُهُ تِيجَانَ الدَّرَارِيِّ فِي شَرْحِ رِسَالَةِ الْبَاجُورِيِّ وَقَدْ سُئِلْتُ فِيهِ فَأَنَا أَشْرَعُ رَاجِيًا الِانْتِفَاعَ بِهِ وَعَوْدَ الْبَرَكَةِ مِنْ ذَلِكِ الشَّيْخِ لِي وَلِكُلِّ قَارِئٍ وَسَامِعٍ وَمُطَالِعٍ',
        translation: 'Amma ba\'du, ini adalah syarah (komentar) atas risalah Al-Allamah Al-Bajuri dalam ilmu Tauhid, yang aku namai \'Tijan ad-Drari fi Syarh Risalah al-Bajuri\' (Mahkota Permata bagi Syarah Risalah Al-Bajuri). Dan aku telah diminta untuk menulisnya, maka aku memulainya dengan harapan mendapatkan manfaat darinya dan kembalinya keberkahan dari syaikh tersebut (Al-Bajuri) untukku dan untuk setiap pembaca, pendengar, dan pemerhatinya.',
        explanationText: 'Di bagian akhir muqaddimah, penulis menjelaskan konteks penulisan kitabnya:',
        explanationBullets: [
          {
            boldText: 'Identitas Kitab:',
            normalText: 'Kitab ini adalah Syarah (penjelasan/komentar) dari Risalah Tauhid karya Syekh Ibrahim Al-Bajuri (wafat 1277 H). Al-Bajuri adalah ulama besar Mesir dari Universitas Al-Azhar. Risalah tauhidnya adalah kitab standar kurikulum tauhid di pesantren-pesantren Nusantara hingga hari ini.',
          },
          {
            boldText: 'Nama Kitab:',
            normalText: 'Penulis memberi nama syarahnya dengan Tijan ad-Drari (Mahkota Permata). Ini adalah tradisi ulama terdahulu yang selalu memberi nama kitabnya dengan bahasa yang puitis dan bermakna tinggi.',
          },
          {
            boldText: 'Adab Tholabul Ilmi (Tabarruk):',
            normalText: 'Perhatikan adab penulis! Beliau menulis kitab ini bukan untuk sombong atau pamer ilmu, melainkan karena disuruh/diminta (ditugaskan) oleh guru atau sesepuhnya. Lebih dari itu, beliau berharap mendapatkan barakah (limpahan kebaikan dan keberkahan) dari ruh dan ilmu Syekh Al-Bajuri. Ini adalah cerminan adab murid terhadap guru.',
          },
        ],
        references: [
          {
            type: 'kitab',
            title: 'Biografi Al-Bajuri',
            text: 'Silakan merujuk pada kitab Al-A\'lam karya Khairuddin az-Zirikli (Jilid 1, hal. 52) atau Sullam al-Munaja dan biografi ulama Al-Azhar.',
          },
          {
            type: 'quran',
            title: 'Adab Mencari Berkah (Tabarruk)',
            text: 'Perintah mencari keberkahan melalui orang-orang shalih dan ilmunya sejalan dengan firman Allah: "Maka bertanyalah kepada orang yang mempunyai pengetahuan jika kamu tidak mengetahui." (QS. An-Nahl [16]: 43). Dan hadis: "Barangsiapa yang Allah kehendaki kebaikan padanya, maka Allah akan memahamkannya dalam agama (faqiha fiddin)." (HR. Bukhari no. 71 dan Muslim no. 1037).',
          },
        ],
      },
    ],
    closingCard: {
      title: 'Penutup Penjabaran Muqaddimah',
      text: 'Saudaraku, sebuah muqaddimah yang sangat padat. Dari beberapa kalimat saja, penulis telah merangkum akidah Tanzih (penyucian Allah), hakikat Tauhid (ketergantungan mutlak), Mahabbah (cinta) kepada Rasulullah dan para sahabat, serta Adab dalam menuntut ilmu. Inilah ciri khas literatur Ahlussunnah wal Jamaah; akidah yang lurus, cinta yang mendalam, dan adab yang luhur.',
    },
  },
  {
    id: 'bagian-2',
    partNumber: 'BAGIAN II',
    title: 'SYARAH BASMALAH',
    description: 'Pengupasan Makna Ismul Jalalah, Ar-Rahman, Ar-Rahim, dan Aplikasi Spiritual',
    points: [
      {
        id: 'p2-1',
        title: 'Poin 1: Makna "Allah" (Ismul Jalalah) sebagai Pengumpul Segala Sifat Kesempurnaan',
        arabicText: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ\nفَاسْمُ الْجَلَالَالَةِ دَلَّ عَلَى الذَّاتِ الْجَامِعَةِ لِصِفَاتِ الْإِلَهِيَّةِ كُلِّهَا',
        translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Maka Ismul Jalalah (Nama Keagungan, yaitu \'Allah\') menunjukkan pada Dzat yang mengumpulkan seluruh sifat-sifat Ilahiah.',
        explanationText: 'Penulis memulai dengan menjelaskan hakikat nama "Allah" (Ismul Jalalah). Dalam ilmu Tauhid dan Tafsir, nama "Allah" adalah Ismul A\'zham (Nama Teragung) dan Ismu Dzat (Nama yang merujuk pada Dzat Allah itu sendiri).\n\nMengapa disebut "mengumpulkan seluruh sifat Ilahiah"? Karena nama "Allah" adalah nama yang mencakup seluruh Sifatul Kamal (Sifat-sifat Kesempurnaan). Ketika Anda menyebut "Allah", Anda tidak hanya menyebut Dzat-Nya, tetapi secara otomatis Anda menyifati-Nya dengan Qidam (Terdahulu), Baqa\' (Kekal), Mukhalafatu lil hawadits (Berbeda dengan makhluk), Qiyam bin nafsi (Berdiri sendiri), dan seluruh sifat ma\'ani seperti Ilmu, Qudrat, Iradat, dan seterusnya. Nama-nama lain seperti Al-\'Alim hanya menunjuk pada satu sifat, tetapi "Allah" menunjuk pada Dzat yang memiliki seluruh sifat kesempurnaan tersebut.',
        references: [
          {
            type: 'kitab',
            title: 'Kitab Tauhid',
            text: 'Penjelasan ini sangat sejalan dengan definisi yang diberikan oleh Imam As-Sanusi dalam kitab Syarah Ummil Barahin, di mana beliau mendefinisikan nama Allah sebagai: "Nama bagi Dzat yang memiliki seluruh sifat-sifat kesempurnaan."',
          },
          {
            type: 'kitab',
            title: 'Tafsir Rujukan',
            text: 'Imam Al-Baidawi dalam Tafsir Al-Baidawi dan Imam Ar-Razi dalam Mafatihul Ghaib juga menegaskan bahwa nama "Allah" adalah Ismu Dzat yang jami\' li jam\'i\'ish shifat.',
          },
        ],
      },
      {
        id: 'p2-2',
        title: 'Poin 2: Perbedaan Mendalam antara Ar-Rahman dan Ar-Rahim',
        arabicText: 'وَالرَّحْمَنُ هُوَ كَثِيرُ الرَّحْمَةِ لِعِبَادِهِ بِالسَّتْرِ فِي الدُّنْيَا وَالرَّحِيمُ هُوَ كَثِيرُ الرَّحْمَةِ لَهُمْ بِالْغُفْرَانِ فِي الْعُقْبَى',
        translation: 'Dan Ar-Rahman adalah Dzat yang Maha Banyak rahmat-Nya kepada hamba-hamba-Nya dengan cara menutupi (aib/dosa) di dunia. Dan Ar-Rahim adalah Dzat yang Maha Banyak rahmat-Nya kepada mereka dengan cara memberi ampunan di akhirat.',
        explanationText: 'Saudaraku, ini adalah sebuah Lathifah (kehalusan makna) yang luar biasa! Banyak ulama tafsir menjelaskan bahwa Ar-Rahman adalah rahmat yang luas di dunia, sedangkan Ar-Rahim adalah rahmat khusus di akhirat. Penulis di sini memberikan isyarah spiritual yang lebih spesifik:',
        explanationBullets: [
          {
            boldText: 'Ar-Rahman (Rahmat melalui Sitr/Penutupan di Dunia):',
            normalText: 'Di dunia, kita berbuat dosa dan aib. Itu adalah rahmat Ar-Rahman dalam bentuk Sitr (menutupi aib) agar kita punya waktu untuk bertaubat tanpa rasa malu di hadapan masyarakat.',
          },
          {
            boldText: 'Ar-Rahim (Rahmat melalui Ghufran/Pengampunan di Akhirat):',
            normalText: 'Di akhirat, Ar-Rahim turun dengan Ghufran (pengampunan total) untuk menghapus dosa dari catatan malaikat.',
          },
        ],
        references: [
          {
            type: 'hadith',
            title: 'Hadis Rahmat Allah',
            text: 'Rasulullah SAW bersabda tentang rahmat Allah yang luas: "Sesungguhnya Allah memiliki seratus rahmat, yang Dia turunkan satu rahmat di antara seluruh jin, manusia, hewan, dan binatang buas... Dan Dia menunda sembilan puluh sembilan rahmat untuk diberikan kepada hamba-hamba-Nya pada hari kiamat." (HR. Muslim no. 2752).',
          },
          {
            type: 'kitab',
            title: 'Kitab Tasawuf/Tafsir',
            text: 'Perbedaan makna Sitr dan Ghufran diulas dalam Lathaif al-Isyarat karya Imam Al-Qushayri dan Al-Maqsad Al-Asna karya Imam Al-Ghazali.',
          },
        ],
      },
      {
        id: 'p2-3',
        title: 'Poin 3: Aplikasi Spiritual (Mulahazah/Muhasabah) bagi Seorang Hamba',
        arabicText: 'فَلِلْعَبْدِ أَنْ يُلَاحِظَ مِنَ اللّٰهِ قُدْرَتَهُ وَمِنَ الرَّحْمَنِ نِعْمَتَهُ وَمِنَ الرَّحِيمِ عِصْمَتَهُ مِنَ الذُّنُوبِ وَمَغْفِرَتَهُ',
        translation: 'Maka hendaklah seorang hamba memperhatikan (merenungkan) dari (nama) Allah: Kuasa-Nya. Dari (nama) Ar-Rahman: Nikmat-Nya. Dan dari (nama) Ar-Rahim: Penjagaan-Nya dari dosa dan ampunan-Nya.',
        explanationText: 'Poin terakhir ini adalah buah dari ilmu tauhid. Penulis merumuskan resep spiritual bagi seorang hamba:',
        explanationBullets: [
          {
            boldText: 'Melihat Qudrat (Kuasa) dari nama "Allah":',
            normalText: 'Mengakibatkan lahirnya Tawadhu\', Khauf, dan Tawakkal.',
          },
          {
            boldText: 'Melihat Ni\'mah (Nikmat) dari nama "Ar-Rahman":',
            normalText: 'Mengakibatkan lahirnya Syukur, Raja\', dan Mahabbah.',
          },
          {
            boldText: 'Melihat Ishmah & Maghfirah dari nama "Ar-Rahim":',
            normalText: 'Mengakibatkan lahirnya Taubat, Haya\' (rasa malu), dan Husnuzan.',
          },
        ],
        references: [
          {
            type: 'kitab',
            title: 'Kitab Tasawuf/Akhlak',
            text: 'Konsep Mulahazah ini adalah inti dari bab Asrar al-Basmalah dalam kitab Ihya\' \'Ulumuddin karya Imam Al-Ghazali.',
          },
          {
            type: 'quran',
            title: 'Al-Qur\'an',
            text: '"Hanya kepada-Mu lah kami menyembah dan hanya kepada-Mu lah kami memohon pertolongan." (QS. Al-Fatihah [1]: 5).',
          },
        ],
      },
    ],
    closingCard: {
      title: 'Penutup Penjabaran Basmalah',
      text: 'Saudaraku, teks yang Anda kirimkan ini adalah sebuah mahakarya. Ia mengubah cara kita mengucapkan "Bismillah". Selama ini mungkin kita hanya mengucapkannya di lidah sebagai rutinitas. Namun setelah memahami syarah ini, setiap kali kita mengucapkan Bismillahirrahmanirrahim, hati kita akan bergetar: kita mengingat Qudrat-Nya yang membuat kita tunduk, Ni\'mat-Nya yang membuat kita bersyukur, Sitr-Nya yang membuat kita malu, dan Maghfirah-Nya yang membuat kita berharap. Inilah hakikat Tadabbur dan Hudhur al-Qalb dalam berdzikir.',
    },
  },
  {
    id: 'bagian-3',
    partNumber: 'BAGIAN III',
    title: 'LIL-ILAHI: SIFAT 20 WAJIB BAGI ALLAH',
    description: 'Ringkasan Matan Tijan ad-Darari Mengenai Sifat Wajib, Mustahil, dan Jaiz Bagi Allah SWT',
    points: [
      {
        id: 'p3-1',
        title: 'Poin 1: Pembagian Sifat 20 Wajib (Nafsiyah, Salbiyah, Ma\'ani, Ma\'nawiyah)',
        arabicText: 'يَجِبُ لِلّٰهِ تَعَالَى عِشْرُوْنَ صِفَةً : اَلْوُجُوْدُ، وَالْقِدَمُ، وَالْبَقَاءُ، وَالْمُخَالَفَةُ لِلْحَوَادِثِ، وَالْقِيَامُ بِالنَّفْسِ، وَالْوَحْدَانِيَّةُ...',
        translation: 'Wajib bagi Allah Ta\'ala 20 Sifat: Wujud (Ada), Qidam (Dahulu/Tanpa Awal), Baqa\' (Kekal), Mukhalafatu lil hawadits (Berbeda dari makhluk), Qiyamuhu binafsihi (Berdiri Sendiri), Wahdaniyah (Esa)...',
        explanationText: 'Sifat 20 wajib dikelompokkan menjadi 4 kategori ilmiah tauhid Asy\'ariyah:',
        explanationBullets: [
          {
            boldText: 'Sifat Nafsiyah (1):',
            normalText: 'Sifat Wujud, yaitu sifat yang berhubungan langsung dengan Dzat Allah tanpa membutuhkan sebab.',
          },
          {
            boldText: 'Sifat Salbiyah (5):',
            normalText: 'Qidam, Baqa\', Mukhalafatu lil Hawadits, Qiyamuhu binafsihi, Wahdaniyah. Sifat yang menafikan segala bentuk kekurangan dari Allah.',
          },
          {
            boldText: 'Sifat Ma\'ani (7):',
            normalText: 'Qudrat, Iradat, \'Ilmu, Hayat, Sama\', Bashar, Kalam. Sifat-sifat wujudiyah yang berdiri pada Dzat Allah.',
          },
          {
            boldText: 'Sifat Ma\'nawiyah (7):',
            normalText: 'Kaunuhu Qadiran, Muridan, \'Aliman, Hayyan, Sami\'an, Bashiran, Mutakalliman.',
          },
        ],
        references: [
          {
            type: 'kitab',
            title: 'Syarah Tijan ad-Darari',
            text: 'Penjelasan kategori Sifat 20 adalah pintu gerbang memahami Aqidah Sanusiyyah.',
          },
        ],
      },
    ],
  },
];

export const initialQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Apa arti dari sifat "Al-Huduts" yang disucikan dari Allah SWT dalam Muqaddimah Kitab?',
    options: [
      'Sifat yang baru/kejadian makhluk',
      'Sifat fisik berupa warna-warni',
      'Kualitas fisik yang dapat dibayangkan',
      'Sifat ketergantungan makhluk'
    ],
    correctAnswerIndex: 0,
    explanation: 'Al-Huduts artinya baru atau terjadi (ciri makhluk). Allah adalah Qadim (Maha Terdahulu) tanpa permulaan.',
    relatedPointId: 'p1-1',
  },
  {
    id: 'q2',
    question: 'Menurut Syarah Basmalah, apakah perbedaan antara Ar-Rahman dan Ar-Rahim menurut isyarah spiritual penulis?',
    options: [
      'Ar-Rahman untuk Muslim, Ar-Rahim untuk Non-Muslim',
      'Ar-Rahman adalah penutupan aib (Sitr) di dunia, Ar-Rahim adalah pengampunan dosa (Ghufran) di akhirat',
      'Ar-Rahman adalah ampunan dosa, Ar-Rahim adalah rezeki fisik',
      'Tidak ada perbedaan antara keduanya'
    ],
    correctAnswerIndex: 1,
    explanation: 'Penulis menjelaskan bahwa Ar-Rahman adalah rahmat Allah dengan menutupi aib di dunia (Sitr), sedangkan Ar-Rahim adalah rahmat dengan memberi ampunan di akhirat (Ghufran).',
    relatedPointId: 'p2-2',
  },
  {
    id: 'q3',
    question: 'Apakah yang dimaksud dengan konsep "Al-Iftiqar ilaih" dalam Syahadat Tauhid?',
    options: [
      'Allah membutuhkan bantuan malaikat',
      'Makhluk tidak memerlukan pertolongan',
      'Seluruh makhluk bergantung dan sangat membutuhkan wujud dari Allah di segala waktu',
      'Makhluk bisa berdiri sendiri tanpa izin Allah'
    ],
    correctAnswerIndex: 2,
    explanation: 'Al-Iftiqar ilaih artinya seluruh makhluk faqir (sangat membutuhkan) curahan wujud dari Allah setiap detik.',
    relatedPointId: 'p1-2',
  },
  {
    id: 'q4',
    question: 'Mengapa Nama "Allah" (Ismul Jalalah) disebut mengumpulkan seluruh sifat-sifat Ilahiah?',
    options: [
      'Karena nama "Allah" terdiri dari 4 huruf Hijaiyah',
      'Karena nama "Allah" adalah Ismu Dzat yang secara otomatis mencakup seluruh Sifat Kesempurnaan (Sifatul Kamal)',
      'Karena hanya digunakan saat shalat',
      'Karena nama "Allah" sama artinya dengan Al-\'Alim'
    ],
    correctAnswerIndex: 1,
    explanation: 'Nama "Allah" adalah Ismu Dzat yang mencakup seluruh sifat kesempurnaan seperti Qidam, Baqa\', Mukhalafatu lil hawadits, Qudrat, Iradat, dan seterusnya.',
    relatedPointId: 'p2-1',
  },
  {
    id: 'q5',
    question: 'Perasaan apakah yang lahir ketika seorang hamba merenungkan (Mulahazah) nikmat dari Nama "Ar-Rahman"?',
    options: [
      'Tawadhu dan Rasa Takut',
      'Syukur, Harapan (Raja\'), dan Cinta (Mahabbah)',
      'Sombong dan Takabbur',
      'Putus asa dari rahmat'
    ],
    correctAnswerIndex: 1,
    explanation: 'Melihat nikmat (Ni\'mah) dari nama Ar-Rahman melahirkan rasa Syukur, Harapan (Raja\'), dan Mahabbah kepada Allah.',
    relatedPointId: 'p2-3',
  },
];
