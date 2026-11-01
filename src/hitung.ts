// Tipe data hasil analisis teks.
// - kata     : total jumlah kata yang ditemukan
// - karakter : jumlah karakter (dihitung per code point, bukan per code unit)
// - baris    : jumlah baris teks
// - teratas  : kata yang paling sering muncul, format [kata, jumlah]
export type Statistik = {
    kata: number;
    karakter: number;
    baris: number;
    teratas: [string, number][];
}

/**
 * Menghitung statistik sederhana dari sebuah teks.
 *
 * @param teks          Teks yang akan dianalisis.
 * @param jumlahTeratas Banyaknya kata terpopuler yang diambil (default 3).
 * @returns Statistik jumlah kata, karakter, baris, dan kata terpopuler.
 */
export function hitung(teks: string, jumlahTeratas = 3): Statistik {
    // 1. toLowerCase() membuat "Halo" dan "halo" dianggap kata yang sama.
    // 2. Regex di bawah mengambil semua kata:
    //    - [\p{L}\p{N}]+          : satu atau lebih huruf/angka Unicode
    //                               (mendukung huruf non-Latin seperti Arab/Cina)
    //    - (?:[-'][\p{L}\p{N}]+)* : boleh berisi tanda hubung atau apostrof,
    //                               misalnya "kata-kata" atau "don't"
    //    Flag "g" = ambil semua kecocokan, "u" = aktifkan mode Unicode.
    //    Operator ?? [] mencegah error jika tidak ada kata sama sekali (hasil match = null).
    const kata = teks.toLowerCase().match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu) ?? [];

    // Hitung frekuensi setiap kata dengan Map:
    // key = kata, value = berapa kali kata itu muncul.
    const frekuensi = new Map<string, number>();
    for (const k of kata) frekuensi.set(k, (frekuensi.get(k) ?? 0) + 1);

    // Urutkan dari yang paling sering muncul.
    // Jika jumlahnya sama, urutkan sesuai abjad (localeCompare) agar hasilnya stabil.
    // Math.max(0, ...) mencegah nilai negatif, karena slice dengan angka negatif
    // akan mengambil data dari belakang (perilaku yang tidak diinginkan di sini).
    const teratas = [...frekuensi]
        .sort(([kataA, jumlahA], [kataB, jumlahB]) => jumlahB - jumlahA || kataA.localeCompare(kataB))
        .slice(0, Math.max(0, jumlahTeratas));

    return {
        kata: kata.length,
        // [...teks] memecah teks per code point, sehingga emoji seperti "👋"
        // dihitung 1 karakter (sedangkan teks.length menghitungnya 2).
        karakter: [...teks].length,
        // Newline di akhir teks dibuang dulu agar teks yang diakhiri enter tidak
        // dihitung sebagai baris tambahan. Teks kosong dianggap 0 baris.
        baris: teks === "" ? 0 : teks.replace(/\n$/, "").split("\n").length,
        teratas,
    }
}
