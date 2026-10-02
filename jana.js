export default function handler(req, res) {
  // Benarkan akses CORS dari mana-mana domain / sistem web anda
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Ambil parameter dari URL (query)
  const { mod = 'mingguan', daerah = 'Pendang', sequence = 1 } = req.query;

  // 2. Tentukan Awalan Mod (M = Mingguan, B = Bulanan)
  const modCode = mod.toLowerCase() === 'bulanan' ? 'B' : 'M';

  // 3. Digit Tahun (2 digit akhir tahun semasa, contoh: 2026 -> 26)
  const yearCode = new Date().getFullYear().toString().slice(-2);

  // 4. Pemetaan Kod Daerah Kedah
  const districtMap = {
    'kuala muda': 'KM',
    'kota setar': 'KS',
    'kubang pasu': 'KP',
    'padang terap': 'PT',
    'bandar baharu': 'BB',
    'pokok sena': 'PS',
    'pendang': 'PDG',  // Khas: PDG
    'baling': 'BLG',
    'kulim': 'KLM',
    'langkawi': 'LGW',
    'sik': 'SIK',
    'yan': 'YAN'
  };

  const cleanDaerah = daerah.trim().toLowerCase();
  let districtCode = districtMap[cleanDaerah];

  // Jika nama daerah tiada dalam senarai di atas, jana secara dinamik
  if (!districtCode) {
    if (daerah.length <= 3) {
      districtCode = daerah.toUpperCase();
    } else {
      const words = daerah.trim().split(/\s+/);
      if (words.length >= 2) {
        districtCode = (words[0][0] + words[1][0]).toUpperCase();
      } else {
        const word = words[0].toUpperCase();
        const len = word.length;
        districtCode = word[0] + word[Math.floor((len - 1) / 2)] + word[len - 1];
      }
    }
  }

  // 5. Format Nombor Turutan (3 digit)
  const seqNumber = parseInt(sequence, 10) || 1;
  const seqFormatted = String(seqNumber).padStart(3, '0');

  // 6. Gabungkan Nombor Pelajar
  const studentId = `${modCode}${yearCode}${districtCode}${seqFormatted}`;

  // 7. Pulangkan jawapan JSON
  return res.status(200).json({
    status: 'success',
    data: {
      student_id: studentId,
      mod: mod.toLowerCase(),
      daerah: daerah,
      kod_daerah: districtCode,
      tahun: new Date().getFullYear(),
      turutan: seqNumber
    }
  });
}
