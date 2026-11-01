# Panduan Git Tag untuk Belajar Bersama

Panduan ini dibuat untuk siapa saja yang sedang belajar coding dan ingin menyimpan
"titik checkpoint" dari progres belajarnya di GitHub, misalnya **bab-01 day-01**.

Setelah membaca panduan ini kamu diharapkan bisa:

- memahami apa itu tag dan bedanya dengan branch/commit,
- membuat tag yang rapi dan konsisten,
- mengirim tag ke GitHub,
- memakai tag untuk melihat kembali kode lama,
- memperbaiki tag yang salah tanpa merusak riwayat,
- membuat orang lain mudah mengikuti progres belajarmu.

---

## Daftar Isi

1. [Apa itu tag?](#1-apa-itu-tag)
2. [Tag vs commit vs branch](#2-tag-vs-commit-vs-branch)
3. [Dua jenis tag](#3-dua-jenis-tag)
4. [Aturan penamaan untuk belajar](#4-aturan-penamaan-untuk-belajar)
5. [Persiapan awal](#5-persiapan-awal)
6. [Alur harian step by step](#6-alur-harian-step-by-step)
7. [Melihat dan memeriksa tag](#7-melihat-dan-memeriksa-tag)
8. [Studi kasus](#8-studi-kasus)
9. [Error yang sering muncul](#9-error-yang-sering-muncul)
10. [Best practice](#10-best-practice)
11. [Cheat sheet](#11-cheat-sheet)

---

## 1. Apa itu tag?

Bayangkan kamu sedang menulis buku. Setiap hari kamu menulis beberapa halaman.
**Tag adalah pembatas buku** yang kamu tempel di halaman tertentu, dengan label
"Bab 1 - Hari 1".

Ciri penting tag:

- Tag menunjuk ke **satu commit** (satu kondisi kode).
- Tag **tidak berpindah** saat kamu commit lagi. Ini bedanya dengan branch.
- Tag **dibuat di komputer lokal**, lalu dikirim ke GitHub dengan `git push`.
- GitHub tidak membuat tag sendiri. Kalau kamu tidak push, tag tidak akan muncul di GitHub.

Kegunaan tag untuk belajar:

| Kebutuhan | Manfaat tag |
| --- | --- |
| Melihat kode saat akhir hari ke-1 | `git checkout bab-01-day-01` |
| Membandingkan progres hari 1 vs hari 2 | `git diff bab-01-day-01 bab-01-day-02` |
| Orang lain mengikuti materi dari awal | clone, lalu checkout tag pertama |
| Menandai materi yang sudah selesai | daftar tag = daftar milestone |
| Menyimpan versi yang terbukti jalan | tag = "kode ini aman" |

Analogi singkat:

```
commit  : foto keadaan kode pada satu waktu
branch  : jalur kerja yang terus bergerak (ada commit baru di ujungnya)
tag     : label tempel di salah satu foto, tidak ikut bergerak
release : halaman publikasi GitHub yang dibangun di atas tag
```

---

## 2. Tag vs commit vs branch

Agar tidak tertukar, perhatikan contoh berikut:

```
A --- B --- C --- D   (branch main)
          ^     ^
          |     |
   bab-01-day-01  bab-01-day-02
```

- `C` dan `D` adalah commit.
- `main` bergerak maju setiap kali ada commit baru.
- `bab-01-day-01` tetap menunjuk `C` selamanya, walaupun `main` sudah jauh di depan.
- Tag lama **tidak otomatis** mendapat commit baru. Itu justru yang kita inginkan.

---

## 3. Dua jenis tag

### Lightweight tag

Hanya sebuah nama yang menunjuk ke commit. Tidak punya pesan, tanggal, atau pembuat tag.

```bash
git tag bab-01-day-01
```

Cocok untuk: penanda pribadi yang sangat sederhana.

### Annotated tag (disarankan)

Tag yang disimpan sebagai objek Git tersendiri, berisi pesan, nama pembuat, dan tanggal.

```bash
git tag -a bab-01-day-01 -m "Bab 01 Day 01 - regex, Map, dan sorting"
```

Cocok untuk: milestone belajar, materi yang dibagikan, dan semua hal yang akan dibaca orang lain.

> **Saran:** untuk codebase belajar, selalu pakai **annotated tag** (`-a`).
> Alasannya: pesan tag menjelaskan *apa yang dipelajari*, sehingga orang lain
> (dan kamu 3 bulan kemudian) tidak perlu menebak isi commit.

---

## 4. Aturan penamaan untuk belajar

Gunakan pola yang konsisten dan mudah diurutkan:

```
bab-<nomor bab 2 digit>-day-<nomor hari 2 digit>
```

Contoh:

```
bab-01-day-01
bab-01-day-02
bab-02-day-01
bab-02-day-10
```

Kenapa dua digit (`01`, bukan `1`)? Karena Git mengurutkan tag secara abjad.
Dengan `01`, `02`, `10`, urutan abjad sama dengan urutan waktu:

```
bab-01-day-01
bab-01-day-02
bab-01-day-10   <- benar
```

Jika memakai `1`, `2`, `10`, hasilnya jadi:

```
bab-01-day-1
bab-01-day-10   <- muncul sebelum day-2
bab-01-day-2
```

Aturan nama tag yang perlu diingat:

- Boleh: huruf, angka, `-`, `.`, `_`, dan `/`.
- Tidak boleh: spasi, `~`, `^`, `:`, `?`, `*`, `[`, `\`.
- Tidak boleh diawali `-`.
- Tidak boleh diakhiri `.lock`.
- Tag dengan `/` seperti `bab-01/day-01` valid dan terlihat seperti folder di GitHub,
  tetapi untuk pemula lebih aman pakai `-` agar tidak bingung.

Contoh nama yang baik:

```
bab-01-day-01
bab-01-day-02-regex
bab-02-day-01-api-dasar
modul-03-latihan-array
```

Contoh nama yang buruk:

```
tag1
coba
final
fix
Bab 01 Day 01     <- ada spasi, tidak valid
v1.0-final-final  <- membingungkan
```

---

## 5. Persiapan awal

Cek dulu apakah repo sudah siap.

```bash
git status
git remote -v
git log --oneline -5
git tag -l
```

Yang perlu dipastikan:

1. **Sudah ada commit.** Tag menempel ke commit. Repo tanpa commit belum bisa diberi tag.
2. **Sudah ada remote** (alamat GitHub). Jika belum:

   ```bash
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   ```

3. **Branch utama sudah ter-push:**

   ```bash
   git push -u origin main
   ```

Jika remote memakai SSH, bentuknya seperti `git@github.com:USERNAME/NAMA-REPO.git`.

---

## 6. Alur harian step by step

Ini alur yang disarankan setiap selesai belajar satu hari.

### Langkah 1 - lihat perubahan

```bash
git status
git diff
```

Pastikan tidak ada file rahasia yang ikut (misalnya `.env` berisi API key).
Gunakan `.gitignore` untuk mengecualikannya.

### Langkah 2 - commit progres

```bash
git add .
git commit -m "bab-01 day-01: hitung statistik teks"
```

Pesan commit yang baik menjawab "apa yang berubah", bukan "update" atau "fix".

### Langkah 3 - buat annotated tag

```bash
git tag -a bab-01-day-01 -m "Bab 01 Day 01 - regex, Map, sorting"
```

Tag ini otomatis menempel ke commit terakhir (`HEAD`).

### Langkah 4 - push commit dan tag

```bash
git push origin main
git push origin bab-01-day-01
```

Atau sekaligus semua tag:

```bash
git push origin --tags
```

### Langkah 5 - verifikasi di GitHub

Buka halaman repo, klik tab **Tags**. Tag baru akan terlihat di sana.
Klik tag tersebut untuk melihat kode pada kondisi itu, atau mengunduh `.zip`.

### Langkah 6 - (opsional) buat Release

Release adalah tag yang diberi catatan tambahan, cocok untuk materi belajar.

```bash
gh release create bab-01-day-01 \
  --title "Bab 01 - Day 01" \
  --notes "Belajar regex Unicode, Map untuk frekuensi kata, dan sorting stabil."
```

Tanpa GitHub CLI, Release juga bisa dibuat lewat menu **Releases > Draft a new release**
di halaman GitHub.

---

## 7. Melihat dan memeriksa tag

```bash
# semua tag
git tag -l

# tag dengan pola tertentu
git tag -l "bab-01*"

# detail satu tag (pesan, pembuat, commit)
git show bab-01-day-01

# daftar tag beserta tanggal, urut waktu
git for-each-ref --sort=creatordate \
  --format '%(refname:short)  %(creatordate:short)' refs/tags

# tag apa yang paling dekat dengan posisi sekarang
git describe --tags

# tag yang sudah ada di GitHub
git ls-remote --tags origin
```

Melihat kode pada kondisi tag tertentu:

```bash
git switch --detach bab-01-day-01
```

Perintah ini membuat kamu berada di **detached HEAD**: kamu bisa melihat dan
menjalankan kode, tetapi jangan membuat commit baru di sini karena commit itu
tidak terikat ke branch mana pun.

Kembali ke branch utama:

```bash
git switch main
```

Ingin mencoba kode lama tanpa mengganggu folder kerja? Buat branch sementara dari tag:

```bash
git switch -c coba-day-01 bab-01-day-01
```

Setelah selesai, hapus branch sementara itu:

```bash
git switch main
git branch -D coba-day-01
```

---

## 8. Studi kasus

### Studi kasus 1 - Menandai progres belajar setiap hari

Situasi: kamu sedang mengerjakan `src/hitung.ts` dan ingin setiap hari punya checkpoint.

```bash
# Hari 1 - beres belajar regex dan Map
git add .
git commit -m "bab-01 day-01: hitung statistik teks"
git tag -a bab-01-day-01 -m "Bab 01 Day 01 - regex, Map, sorting"
git push origin main
git push origin bab-01-day-01

# Hari 2 - menambah unit test
git add .
git commit -m "bab-01 day-02: tambah unit test hitung()"
git tag -a bab-01-day-02 -m "Bab 01 Day 02 - unit test dengan bun test"
git push origin main
git push origin bab-01-day-02
```

Hasilnya di GitHub: daftar tag yang bisa dibaca seperti daftar isi materi.

### Studi kasus 2 - Membandingkan progres dua hari

```bash
# apa saja yang berubah dari hari 1 ke hari 2
git diff bab-01-day-01 bab-01-day-02

# nama file yang berubah saja
git diff --stat bab-01-day-01 bab-01-day-02

# riwayat commit di antara dua tag
git log --oneline bab-01-day-01..bab-01-day-02
```

Ini sangat membantu saat menulis catatan belajar: kamu bisa melihat
apa yang benar-benar berubah, bukan mengandalkan ingatan.

### Studi kasus 3 - Memberi tag pada commit lama

Situasi: kemarin lupa memberi tag, padahal commit-nya sudah beberapa langkah ke belakang.

```bash
# lihat daftar commit
git log --oneline

# misalnya commit yang dimaksud adalah a1b2c3d
git tag -a bab-01-day-01 a1b2c3d -m "Bab 01 Day 01 - regex, Map, sorting"

# push tag tersebut
git push origin bab-01-day-01
```

Catatan: commit tersebut harus ada di branch yang sudah di-push, atau ikut
ter-push, agar tag bisa dibaca orang lain di GitHub.

### Studi kasus 4 - Salah nama tag

Situasi: kamu membuat `bab-1-day-1`, padahal mau `bab-01-day-01`.

Jika tag **belum pernah di-push**, cukup:

```bash
git tag -d bab-1-day-1
git tag -a bab-01-day-01 -m "Bab 01 Day 01 - regex, Map, sorting"
git push origin bab-01-day-01
```

Jika tag **sudah terlanjur di-push**, hapus juga di remote:

```bash
git tag -d bab-1-day-1
git push origin :refs/tags/bab-1-day-1
git tag -a bab-01-day-01 -m "Bab 01 Day 01 - regex, Map, sorting"
git push origin bab-01-day-01
```

### Studi kasus 5 - Orang lain ingin mengikuti dari awal

Skenario: temanmu ingin belajar dari checkpoint hari 1, bukan dari kode terbaru.

```bash
git clone https://github.com/USERNAME/NAMA-REPO.git
cd NAMA-REPO

# lihat checkpoint yang tersedia
git tag -l

# mulai dari hari 1
git switch --detach bab-01-day-01

# atau buat branch belajar sendiri dari checkpoint itu
git switch -c belajar-day-01 bab-01-day-01
```

Selain lewat terminal, mereka juga bisa membuka tab **Tags** di GitHub,
memilih `bab-01-day-01`, lalu **Download ZIP**.

### Studi kasus 6 - Menandai versi yang sudah berjalan baik

Situasi: setelah semua test lulus, kamu ingin menyimpan versi itu sebagai
"kode yang terbukti jalan".

```bash
bun test
bun check

git add .
git commit -m "bab-01 day-03: semua test hijau"
git tag -a bab-01-day-03 -m "Bab 01 Day 03 - stabil, test lulus"
git push origin main
git push origin bab-01-day-03
```

Ketika nanti ada perubahan yang merusak, kamu bisa kembali dan membandingkan:

```bash
git diff bab-01-day-03 main
```

### Studi kasus 7 - Melihat perubahan satu file di antara tag

```bash
git diff bab-01-day-01 bab-01-day-02 -- src/hitung.ts
```

Ini cara cepat memahami evolusi satu file, misalnya bagaimana regex di
`src/hitung.ts` diperbaiki dari hari ke hari.

### Studi kasus 8 - Menghapus tag yang tidak dipakai

```bash
# hapus lokal
git tag -d bab-01-day-99

# hapus di GitHub
git push origin :refs/tags/bab-01-day-99
```

Hati-hati: menghapus tag yang sudah dibagikan bisa membingungkan orang yang
sudah mengunduhnya. Untuk tag yang sudah publik, lebih baik **buat tag baru**
daripada menghapus.

---

## 9. Error yang sering muncul

| Error | Penyebab | Solusi |
| --- | --- | --- |
| `src refspec bab-01 does not match any` | Tidak ada ref lokal bernama `bab-01` (nama tag berbeda, atau tag belum dibuat) | Cek `git tag -l`, lalu push nama yang benar: `git push origin bab-01-day-01` |
| `tag already exists` | Nama tag sudah dipakai | Pakai nama lain, atau hapus tag lama jika memang salah |
| `remote rejected ... tag already exists` | Tag dengan nama sama sudah ada di GitHub | Hapus tag remote dulu, atau jangan timpa tag publik |
| Tag tidak muncul di GitHub | Tag belum di-push | `git push origin <nama-tag>` atau `git push origin --tags` |
| `git push origin --tags` tetapi error refspec | Ada argumen nama ref yang tidak ada di belakang `--tags` | Jalankan `git push origin --tags` tanpa nama tag |
| `detached HEAD` saat checkout tag | Normal, karena tag bukan branch | Kembali dengan `git switch main` |
| `fatal: not a git repository` | Berada di folder yang salah | Masuk ke folder repo terlebih dahulu |
| `no commits yet` | Repo belum punya commit | `git add .` lalu `git commit -m "..."` |

Contoh memperbaiki error `src refspec ... does not match any` secara lengkap:

```bash
# 1. lihat tag yang benar-benar ada
git tag -l

# 2. push nama yang sesuai
git push origin bab-01-day-01
```

---

## 10. Best practice

### Untuk kamu sendiri

1. **Commit dulu, baru tag.** Tag selalu menunjuk commit yang sudah ada.
2. **Pakai annotated tag** (`git tag -a`) dengan pesan yang menjelaskan materi.
3. **Satu tag = satu checkpoint bermakna.** Jangan membuat tag setiap kali menyimpan file.
4. **Nama konsisten dan berurutan.** Gunakan pola `bab-XX-day-YY`.
5. **Push branch dan tag.** `git push origin main` tidak mengirim tag.
6. **Verifikasi setelah push.** Buka tab Tags di GitHub.
7. **Anggap tag publik sebagai permanen.** Jangan pindahkan atau timpa dengan `-f`.
8. **Jangan menaruh rahasia di kode yang ditandai.** Cek `.env`, token, dan API key sebelum commit.

### Untuk orang lain yang belajar

1. **Tulis pesan tag yang menjelaskan tujuan**, bukan sekadar "day 1".
2. **Buat README atau catatan per bab** agar tag punya konteks.
3. **Gunakan Release** untuk checkpoint penting, isi dengan ringkasan materi dan tautan.
4. **Jaga riwayat tetap lurus dan mudah dibaca**; hindari commit "wip" tanpa penjelasan.
5. **Sertakan cara menjalankan proyek** di README, karena orang lain mungkin checkout tag lama
   yang struktur dependensinya berbeda.

### Yang sebaiknya dihindari

| Hindari | Alasan |
| --- | --- |
| `git tag -f` pada tag yang sudah di-push | Riwayat orang lain jadi tidak sinkron |
| Tag bernama `final`, `fix`, `coba` | Tidak menjelaskan apa pun |
| Tag untuk setiap commit kecil | Daftar tag jadi berisik |
| Lupa push tag | Orang lain tidak bisa melihat checkpoint |
| Checkout tag lalu commit di sana | Commit bisa "hilang" karena detached HEAD |
| Menghapus tag publik | Membingungkan pengikut materi |

### Alur yang direkomendasikan (ringkas)

```
selesai belajar
   -> git status / git diff
   -> git add .
   -> git commit -m "bab-XX day-YY: ..."
   -> git tag -a bab-XX-day-YY -m "..."
   -> git push origin main
   -> git push origin bab-XX-day-YY
   -> verifikasi di GitHub (tab Tags)
```

---

## 11. Cheat sheet

```bash
# membuat tag
git tag -a bab-01-day-01 -m "Bab 01 Day 01 - materi"
git tag -a bab-01-day-01 <commit-hash> -m "Tag untuk commit lama"

# melihat tag
git tag -l
git tag -l "bab-01*"
git show bab-01-day-01
git for-each-ref --sort=creatordate --format '%(refname:short)  %(creatordate:short)' refs/tags

# mengirim tag
git push origin bab-01-day-01
git push origin --tags
git ls-remote --tags origin

# memakai tag
git switch --detach bab-01-day-01
git switch -c coba-day-01 bab-01-day-01
git diff bab-01-day-01 bab-01-day-02
git diff --stat bab-01-day-01 bab-01-day-02
git log --oneline bab-01-day-01..bab-01-day-02

# menghapus tag
git tag -d bab-01-day-01
git push origin :refs/tags/bab-01-day-01

# release di GitHub (butuh GitHub CLI)
gh release create bab-01-day-01 --title "Bab 01 - Day 01" --notes "Ringkasan materi"
```

---

## Penutup

Tag bukan sekadar hiasan. Untuk proyek belajar, tag adalah **daftar isi perjalanan
belajarmu**. Dengan penamaan yang konsisten dan pesan yang jelas, kamu bisa:

- kembali ke kondisi kode tertentu kapan saja,
- membandingkan pemahaman hari ini dengan hari sebelumnya,
- membagikan checkpoint yang bisa diikuti orang lain dari awal,
- menunjukkan progres yang terstruktur, bukan sekadar tumpukan commit.

Mulai dari satu tag hari ini, lalu jadikan kebiasaan di akhir setiap sesi belajar.
