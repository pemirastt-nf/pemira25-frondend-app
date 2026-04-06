# PEMIRA IM STTNF 2025 — Frontend App

> **Proyek Resmi Kegiatan Kampus**
> Repositori ini merupakan aplikasi frontend resmi untuk **Pemilihan Raya Mahasiswa Ikatan Mahasiswa STT Terpadu Nurul Fikri (PEMIRA IM STTNF) 2025**, sebuah kegiatan kemahasiswaan resmi yang diselenggarakan di lingkungan **STT Terpadu Nurul Fikri**.

---

## Tentang Proyek

PEMIRA IM STTNF 2025 adalah sistem e-voting berbasis web yang digunakan untuk pemilihan **Presiden Mahasiswa dan Wakil Presiden Mahasiswa** STT Terpadu Nurul Fikri periode **2026–2027**. Aplikasi ini menyediakan informasi kandidat, panduan voting, live tracking hasil suara, serta pengumuman pemenang secara real-time.

Proyek ini dikembangkan dan dikelola secara resmi oleh tim Ikatan Mahasiswa STT Terpadu Nurul Fikri.

---

## Fitur Utama

- 🗳️ **E-Voting** — Sistem voting online yang aman dan terverifikasi
- 📊 **Live Tracking** — Pantau hasil suara secara real-time
- 👥 **Profil Kandidat** — Informasi lengkap setiap pasangan calon
- 🏆 **Pengumuman Pemenang** — Tampilan hasil akhir pemilihan
- 📅 **Timeline** — Jadwal tahapan pelaksanaan PEMIRA
- 📱 **Responsif** — Dapat diakses dari berbagai perangkat

---

## Tech Stack

| Teknologi | Versi |
|---|---|
| [Next.js](https://nextjs.org) | 16 |
| [React](https://react.dev) | 19 |
| [TypeScript](https://www.typescriptlang.org) | 5 |
| [Tailwind CSS](https://tailwindcss.com) | 4 |
| [Framer Motion](https://www.framer.com/motion) | 12 |
| [Socket.IO Client](https://socket.io) | 4 |
| [Recharts](https://recharts.org) | 3 |

---

## Menjalankan Proyek (Development)

**Prasyarat:** Node.js ≥ 18, [pnpm](https://pnpm.io)

1. Clone repositori dan masuk ke direktorinya:
   ```bash
   git clone https://github.com/pemirastt-nf/pemira25-frondend-app.git
   cd pemira25-frondend-app
   ```

2. Salin file environment dan sesuaikan nilainya:
   ```bash
   cp .env.example .env.local
   ```

3. Install dependensi:
   ```bash
   pnpm install
   ```

4. Jalankan development server:
   ```bash
   pnpm dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Script yang Tersedia

| Script | Perintah | Keterangan |
|---|---|---|
| Development | `pnpm dev` | Jalankan server lokal di port 3000 |
| Build | `pnpm build` | Build untuk production |
| Start | `pnpm start` | Jalankan hasil build production |
| Lint | `pnpm lint` | Periksa kualitas kode dengan ESLint |

---

## Informasi Penting

- Repositori ini bersifat **resmi** dan dikelola oleh tim PEMIRA IM STTNF 2025.
- Seluruh data pemilih dan hasil suara diproses melalui backend terpisah yang aman.
- Dilarang memodifikasi, mendistribusikan, atau menggunakan kode ini di luar keperluan resmi PEMIRA IM STTNF tanpa izin dari pengelola.

---

## Kontak

Untuk pertanyaan terkait teknis atau pelaksanaan PEMIRA, silakan hubungi tim melalui kanal resmi Ikatan Mahasiswa STT Terpadu Nurul Fikri.
