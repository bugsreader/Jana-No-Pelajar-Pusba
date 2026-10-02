# Student ID Generator API

API ringkas dan pantas berasaskan Node.js (Serverless) untuk menjana nombor ID pelajar secara automatik berdasarkan Mod (Mingguan/Bulanan), Tahun, Kod Daerah (Kedah), dan Nombor Turutan.

API ini sedia untuk di-deploy ke Vercel secara percuma.

---

# Format Nombor ID

Format yang dijana mengikut struktur berikut:
`[MOD][TAHUN][KOD_DAERAH][NOMBOR_TURUTAN]`

* Mod: `M` (Mingguan) atau `B` (Bulanan)
* Tahun: 2 digit akhir tahun semasa (contoh: `26` untuk 2026)
* Kod Daerah: 
   2 huruf untuk nama daerah 2 patah perkataan (contoh: Kuala Muda → `KM`)
   3 huruf untuk nama daerah 1 patah perkataan (contoh: Pendang → `PDG`, Baling → `BLG`, Kulim → `KLM`)
* Nombor Turutan: 3 digit angka berurut (contoh: `001`, `012`, `100`)

# Contoh Output:
* `M26PDG001` → Mingguan, Tahun 2026, Pendang, Turutan 1
* `B26KM005` → Bulanan, Tahun 2026, Kuala Muda, Turutan 5

---

# Pautan Endpoint API

```http
GET /api/generate
