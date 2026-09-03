var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "10mb" }));
app.use(import_express.default.urlencoded({ extended: true, limit: "10mb" }));
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. AI features will fallback to smart template generators.");
    return null;
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
});
function normalizeTeachersList(rawItems) {
  if (!Array.isArray(rawItems)) return [];
  return rawItems.map((item, idx) => {
    const nama = item.nama || item.name || item.nama_lengkap || item.nama_guru || `Guru #${idx + 1}`;
    const nip = item.nip || item.NIP || (item.nip === "-" ? "" : item.nip) || "";
    const nuptk = item.nuptk || item.NUPTK || (item.nuptk === "-" ? "" : item.nuptk) || "";
    const pegId = item.peg_id || item.pegId || item.id_pegawai || "";
    let jk = "L";
    const rawJk = (item.jenis_kelamin || item.jk || item.gender || "L").toString().toUpperCase();
    if (rawJk.startsWith("P") || rawJk === "WANITA" || rawJk === "FEMALE") {
      jk = "P";
    }
    return {
      id: item.id ? String(item.id) : `T-SIAKAD-${Date.now()}-${idx + 1}`,
      nama,
      gelarDepan: item.gelar_depan || item.gelarDepan || "",
      gelarBelakang: item.gelar_belakang || item.gelarBelakang || (nama.includes(",") ? nama.split(",").slice(1).join(",").trim() : ""),
      nip,
      nuptk,
      pegId,
      jenisKelamin: jk,
      tempatLahir: item.tempat_lahir || item.tempatLahir || "Malang",
      tanggalLahir: item.tanggal_lahir || item.tanggalLahir || "1985-05-15",
      statusKepegawaian: item.status_kepegawaian || item.statusKepegawaian || (nip ? "PNS" : "GTY"),
      pangkatGol: item.pangkat_gol || item.pangkatGol || (nip ? "Penata Muda / III/a" : "Guru Tetap"),
      jabatanUtama: item.jabatan_utama || item.jabatan || item.jabatanUtama || "Guru Mata Pelajaran",
      tugasTambahan: item.tugas_tambahan || item.tugasTambahan || (item.wali_kelas ? `Wali Kelas ${item.wali_kelas}` : ""),
      mapelUtama: item.mapel_utama || item.mapel || item.mata_pelajaran || "Pendidikan Agama Islam",
      jumlahJam: Number(item.jumlah_jam || item.jumlahJam || item.jp || 24),
      waliKelasDi: item.wali_kelas || item.waliKelasDi || item.kelas_wali || "",
      sertifikasi: Boolean(item.sertifikasi === true || item.sertifikasi === "1" || item.is_certified === true),
      telepon: item.telepon || item.no_hp || item.phone || "08123456789",
      email: item.email || `${nama.toLowerCase().replace(/[^a-z0-9]/g, "")}@madrasah.sch.id`,
      isActive: item.is_active !== void 0 ? Boolean(item.is_active) : true
    };
  });
}
function normalizeStudentsList(rawItems) {
  if (!Array.isArray(rawItems)) return [];
  return rawItems.map((item, idx) => {
    const nama = item.nama || item.name || item.nama_lengkap || item.nama_siswa || `Siswa #${idx + 1}`;
    const nisn = item.nisn || item.NISN || `00${Date.now().toString().slice(-8)}${idx}`;
    const nis = item.nis || item.NIS || `MI-${2025e3 + idx + 1}`;
    const nik = item.nik || item.NIK || `350700000000${(idx + 1).toString().padStart(4, "0")}`;
    let jk = "L";
    const rawJk = (item.jenis_kelamin || item.jk || item.gender || "L").toString().toUpperCase();
    if (rawJk.startsWith("P") || rawJk === "WANITA" || rawJk === "PEREMPUAN" || rawJk === "FEMALE") {
      jk = "P";
    }
    const rombel = item.rombel || item.kelas || item.nama_kelas || "Kelas 1 A";
    const tingkatMatch = String(rombel).match(/\d+/);
    const tingkat = tingkatMatch ? parseInt(tingkatMatch[0], 10) : Number(item.tingkat || 1);
    return {
      id: item.id ? String(item.id) : `S-SIAKAD-${Date.now()}-${idx + 1}`,
      nisn,
      nis,
      nik,
      nama,
      jenisKelamin: jk,
      rombel,
      tingkat: isNaN(tingkat) ? 1 : tingkat,
      tempatLahir: item.tempat_lahir || item.tempatLahir || "Malang",
      tanggalLahir: item.tanggal_lahir || item.tanggalLahir || "2015-08-20",
      namaAyah: item.nama_ayah || item.ayah || item.namaAyah || "Bapak Siswa",
      namaIbu: item.nama_ibu || item.ibu || item.namaIbu || "Ibu Siswa",
      pekerjaanOrtu: item.pekerjaan_ortu || item.pekerjaan || item.pekerjaanOrtu || "Wiraswasta",
      alamat: item.alamat || item.alamat_lengkap || "Jl. Madrasah No. 10",
      desaKelurahan: item.desa || item.kelurahan || item.desaKelurahan || "Sukamaju",
      kecamatan: item.kecamatan || "Kepanjen",
      kabupatenKota: item.kabupaten || item.kabupatenKota || "Kabupaten Malang",
      provinsi: item.provinsi || "Jawa Timur",
      statusSiswa: item.status || item.statusSiswa || "Aktif",
      tahunMasuk: String(item.tahun_masuk || item.tahunMasuk || "2024"),
      teleponOrtu: item.telepon_ortu || item.no_hp_ortu || item.teleponOrtu || "085700000000"
    };
  });
}
app.post("/api/siakad/test-connection", async (req, res) => {
  try {
    const { baseUrl, apiToken } = req.body;
    const targetUrl = (baseUrl || "https://siakad-madrasah.jaenalmaskun.biz.id").replace(/\/$/, "");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7e3);
    const headers = {
      "User-Agent": "AutoMadrasah-Sync/1.0",
      "Accept": "application/json, text/html, */*"
    };
    if (apiToken) {
      headers["Authorization"] = `Bearer ${apiToken}`;
      headers["X-API-KEY"] = apiToken;
    }
    try {
      const response = await fetch(targetUrl, {
        headers,
        signal: controller.signal
      });
      clearTimeout(timeout);
      const contentType = response.headers.get("content-type") || "";
      return res.json({
        success: true,
        status: response.status,
        statusText: response.statusText,
        contentType,
        message: `Koneksi berhasil ke ${targetUrl} (HTTP ${response.status} ${response.statusText})`
      });
    } catch (fetchErr) {
      clearTimeout(timeout);
      return res.json({
        success: false,
        message: `Tidak dapat terhubung ke ${targetUrl}: ${fetchErr.message || "Connection timeout/unreachable"}`
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.post("/api/siakad/sync", async (req, res) => {
  try {
    const { baseUrl, apiToken, target, customEndpoints } = req.body;
    const rootUrl = (baseUrl || "https://siakad-madrasah.jaenalmaskun.biz.id").replace(/\/$/, "");
    const headers = {
      "User-Agent": "AutoMadrasah-Sync/1.0",
      "Accept": "application/json"
    };
    if (apiToken) {
      headers["Authorization"] = `Bearer ${apiToken}`;
      headers["X-API-KEY"] = apiToken;
    }
    let teachers = [];
    let students = [];
    const errors = [];
    if (target === "all" || target === "teachers") {
      const teacherEndpoints = [
        customEndpoints?.teachers,
        "/api/v1/teachers",
        "/api/v1/guru",
        "/api/teachers",
        "/api/guru",
        "/data/guru.json",
        "/api/export/teachers"
      ].filter(Boolean);
      let fetchedTeachers = false;
      for (const ep of teacherEndpoints) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 6e3);
          const tUrl = `${rootUrl}${ep?.startsWith("/") ? ep : `/${ep}`}`;
          const tRes = await fetch(tUrl, { headers, signal: controller.signal });
          clearTimeout(timeout);
          if (tRes.ok) {
            const json = await tRes.json();
            const rawList = Array.isArray(json) ? json : json.data || json.teachers || json.guru || json.items || [];
            if (Array.isArray(rawList) && rawList.length > 0) {
              teachers = normalizeTeachersList(rawList);
              fetchedTeachers = true;
              break;
            }
          }
        } catch (e) {
        }
      }
      if (!fetchedTeachers) {
        errors.push(`Endpoint guru di ${rootUrl} tidak mengembalikan data JSON otomatis. Anda dapat menggunakan format import JSON/Excel atau mengatur token/custom endpoint.`);
      }
    }
    if (target === "all" || target === "students") {
      const studentEndpoints = [
        customEndpoints?.students,
        "/api/v1/students",
        "/api/v1/siswa",
        "/api/students",
        "/api/siswa",
        "/data/siswa.json",
        "/api/export/students"
      ].filter(Boolean);
      let fetchedStudents = false;
      for (const ep of studentEndpoints) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 6e3);
          const sUrl = `${rootUrl}${ep?.startsWith("/") ? ep : `/${ep}`}`;
          const sRes = await fetch(sUrl, { headers, signal: controller.signal });
          clearTimeout(timeout);
          if (sRes.ok) {
            const json = await sRes.json();
            const rawList = Array.isArray(json) ? json : json.data || json.students || json.siswa || json.items || [];
            if (Array.isArray(rawList) && rawList.length > 0) {
              students = normalizeStudentsList(rawList);
              fetchedStudents = true;
              break;
            }
          }
        } catch (e) {
        }
      }
      if (!fetchedStudents) {
        errors.push(`Endpoint siswa di ${rootUrl} tidak mengembalikan data JSON otomatis. Pastikan token atau endpoint SIAKAD sesuai.`);
      }
    }
    const hasData = teachers.length > 0 || students.length > 0;
    res.json({
      success: hasData || errors.length === 0,
      message: hasData ? `Berhasil menarik ${teachers.length} data guru dan ${students.length} data siswa dari ${rootUrl}` : `Koneksi ke ${rootUrl} selesai. Silakan periksa kredensial token/endpoint jika data belum muncul.`,
      teachersCount: teachers.length,
      studentsCount: students.length,
      teachers: teachers.length > 0 ? teachers : void 0,
      students: students.length > 0 ? students : void 0,
      errors: errors.length > 0 ? errors : void 0
    });
  } catch (error) {
    console.error("Error in Siakad Sync:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Gagal sinkronisasi data SIAKAD"
    });
  }
});
app.post("/api/ai/generate-kom", async (req, res) => {
  try {
    const {
      madrasahName,
      jenjang,
      kepalaMadrasah,
      lokasi,
      karakteristik,
      visiMisi,
      fokusNilaiCinta,
      kurikulumVersion
    } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key belum terkonfigurasi di Settings."
      });
    }
    const prompt = `Anda adalah seorang Ahli Kurikulum dan Pengembang Kebijakan Pendidikan Islam di Kementerian Agama Republik Indonesia.
Buatkan draft BAB / Bagian Resmi Kurikulum Operasional Madrasah (KOM) Berbasis Cinta (KMA 450 Tahun 2024 / Kurikulum Merdeka) untuk:

Nama Madrasah: ${madrasahName || "Madrasah Ibtidaiyah Negeri 1"}
Jenjang: ${jenjang || "Madrasah Ibtidaiyah (MI)"}
Kepala Madrasah: ${kepalaMadrasah || "H. Ahmad Syafii, M.Pd.I"}
Lokasi / Lingkungan: ${lokasi || "Daerah semi-perkotaan religius dan dinamis"}
Karakteristik Satuan Pendidikan: ${karakteristik || "Madrasah berbasis riset, tahfidz, dan berwawasan lingkungan"}
Visi & Misi: ${visiMisi || "Mewujudkan generasi bertakwa, cerdas, berakhlak mulia, dan penuh kasih sayang"}
Fokus Nilai Madrasah Cinta: ${fokusNilaiCinta || "Cinta Allah & Rasul, Cinta Sesama & Tanpa Kekerasan/Bullying, Cinta Ilmu, Cinta Lingkungan & Moderasi Beragama"}
Regulasi: KMA Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah

Tolong buatkan struktur dokumen KOM yang lengkap, mendalam, inspiratif, dan siap digunakan resmi dengan format JSON dengan key:
1. "analisisKarakteristik": Teks narasi analisis karakteristik peserta didik, guru/tenaga kependidikan, dan konteks sosial budaya madrasah ramah anak.
2. "visiMisiTujuan": Narasi visi, misi, dan tujuan jangka pendek & menengah yang mengintegrasikan nilai Madrasah Ramah Anak dan Berbasis Cinta (Pilar Mahabbah).
3. "pengorganisasianPembelajaran": Penjelasan struktur intrakurikuler (mapel PAI + Umum), Kokurikuler (P5RA - Projek Penguatan Profil Pelajar Pancasila & Rahmatan Lil Alamin dengan 10 nilai Rahmatan Lil Alamin), dan Ekstrakurikuler.
4. "perencanaanPembelajaran": Panduan Modul Ajar berdiferensiasi dan berakar cinta kasih guru ke siswa (Pedagogi Welas Asih).
5. "pendampinganEvaluasi": Mekanisme supervisi akademik, monitoring, dan evaluasi berkelanjutan kepala madrasah dan pengawas.
6. "ikrarMadrasahCinta": Naskah Deklarasi/Komitmen Bersama Madrasah Maju, Bermutu, Penuh Kasih Sayang.

Pastikan gaya bahasa sangat resmi, akademis, santun, sesuai tata laksana Kemenag RI. Berikan output murni JSON.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    const text = response.text || "{}";
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { rawContent: text };
    }
    res.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("Error generating KOM:", error);
    res.status(500).json({ error: error.message || "Gagal generate KOM" });
  }
});
app.post("/api/ai/generate-sk-legal", async (req, res) => {
  try {
    const { jenisSK, tahunAjaran, nomorSK, namaMadrasah, jenjang, halKhusus } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key belum terkonfigurasi di Settings."
      });
    }
    const prompt = `Buatkan bagian resmi konsiderans SK Kepala Madrasah Kemenag RI untuk:
Jenis SK: ${jenisSK || "Surat Keputusan Pembagian Tugas Guru dan Beban Kerja"}
Tahun Pelajaran: ${tahunAjaran || "2025/2026"}
Nomor Surat: ${nomorSK || "B-042/MI.01/PP.00.4/07/2025"}
Satuan Pendidikan: ${namaMadrasah || "Madrasah"} (${jenjang || "MI"})
Catatan Khusus: ${halKhusus || "Sesuai KMA 450 Tahun 2024 dan regulasi beban kerja guru"}

Kembalikan format JSON dengan key:
- "menimbang": Array of string poin pertimbangan (a, b, c, dst)
- "mengingat": Array of string dasar hukum resmi (UU Sisdiknas, UU Guru dan Dosen, PMA No 90/2013, KMA 450 Tahun 2024, Juknis Dirjen Pendis terbaru)
- "memperhatikan": Array of string hasil rapat dewan guru dan komite
- "diktumPertama": Isi ketetapan KESATU
- "diktumKedua": Isi ketetapan KEDUA
- "diktumKetiga": Isi ketetapan KETIGA
- "diktumKeempat": Isi ketetapan KEEMPAT (tentang pembiayaan/anggaran DIPA/BOS)
- "diktumKelima": Isi ketetapan KELIMA (mulai berlaku dan perbaikan jika kekeliruan)`;
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    const text = response.text || "{}";
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { rawContent: text };
    }
    res.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("Error generating SK legal:", error);
    res.status(500).json({ error: error.message || "Gagal generate SK Legal" });
  }
});
app.post("/api/ai/polish-text", async (req, res) => {
  try {
    const { text, context } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key belum terkonfigurasi di Settings."
      });
    }
    const prompt = `Anda adalah ahli tata bahasa dan persuratan resmi Kementerian Agama RI.
Tolong perbaiki dan sempurnakan teks berikut agar lebih formal, lugas, santun, dan sesuai kaidah tata naskah dinas Kemenag.
Konteks: ${context || "Dokumen Resmi Madrasah"}
Teks Asli:
"""
${text}
"""

Kembalikan JSON dengan key:
- "polishedText": teks yang sudah disempurnakan
- "summaryOfChanges": ringkasan apa saja yang diperbaiki (e.g. ejaan, diksi, dasar regulasi)`;
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    const textRes = response.text || "{}";
    let parsedData = {};
    try {
      parsedData = JSON.parse(textRes);
    } catch {
      parsedData = { polishedText: textRes };
    }
    res.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("Error polishing text:", error);
    res.status(500).json({ error: error.message || "Gagal polish teks" });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AutoMadrasah Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
