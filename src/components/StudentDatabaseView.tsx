import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Download,
  Upload,
  FileCheck2,
  Edit2,
  Trash2,
  ArrowRightLeft,
  Award,
  Globe,
  ArrowLeft,
} from 'lucide-react';
import { Student, Teacher } from '../types';
import { exportToCSV, parseCSV } from '../utils/storage';
import { SiakadSyncModal } from './SiakadSyncModal';

interface StudentDatabaseViewProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onBulkImportStudents: (students: Student[]) => void;
  onGenerateSuratAktif: (studentId: string) => void;
  onGenerateSuratMutasi: (studentId: string) => void;
  onSyncFromSiakad?: (result: { teachers?: Teacher[]; students?: Student[]; mode: 'MERGE' | 'REPLACE' }) => void;
  onBack?: () => void;
}

export const StudentDatabaseView: React.FC<StudentDatabaseViewProps> = ({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onBulkImportStudents,
  onGenerateSuratAktif,
  onGenerateSuratMutasi,
  onSyncFromSiakad,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rombelFilter, setRombelFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSiakadModalOpen, setIsSiakadModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Extract Unique Rombels
  const uniqueRombels = Array.from(new Set(students.map((s) => s.rombel))).sort();

  // Form State
  const [formData, setFormData] = useState<Partial<Student>>({
    nisn: '',
    nis: '',
    nik: '',
    nama: '',
    jenisKelamin: 'L',
    tempatLahir: '',
    tanggalLahir: '2015-01-01',
    rombel: 'Kelas 4A',
    tingkat: 4,
    namaAyah: '',
    namaIbu: '',
    namaWali: '',
    pekerjaanOrtu: 'Wiraswasta',
    alamat: '',
    teleponOrtu: '',
    status: 'AKTIF',
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery) ||
      s.nis.includes(searchQuery) ||
      (s.nik && s.nik.includes(searchQuery));
    const matchesRombel = rombelFilter === 'ALL' || s.rombel === rombelFilter;
    return matchesSearch && matchesRombel;
  });

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      id: `STD-${Date.now()}`,
      nisn: '01' + Math.floor(10000000 + Math.random() * 90000000),
      nis: '2024' + Math.floor(1000 + Math.random() * 9000),
      nik: '3507' + Math.floor(100000000000 + Math.random() * 900000000000),
      nama: '',
      jenisKelamin: 'L',
      tempatLahir: 'Malang',
      tanggalLahir: '2015-05-14',
      rombel: uniqueRombels[0] || 'Kelas 4A',
      tingkat: 4,
      namaAyah: '',
      namaIbu: '',
      alamat: '',
      status: 'AKTIF',
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.nisn) return;

    if (editingStudent) {
      onUpdateStudent(formData as Student);
    } else {
      onAddStudent({
        ...formData,
        id: `STD-${Date.now()}`,
      } as Student);
    }
    setIsModalOpen(false);
  };

  // CSV Import handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const parsed = parseCSV(text);
      if (parsed.length > 0) {
        const mappedStudents: Student[] = parsed.map((item, index) => ({
          id: `STD-IMP-${Date.now()}-${index}`,
          nisn: item.nisn || item.NISN || `00${index + 10000000}`,
          nis: item.nis || item.NIS || `2024${index + 100}`,
          nik: item.nik || item.NIK || '',
          nama: item.nama || item.Nama || 'Siswa Baru',
          jenisKelamin: (item.jenisKelamin?.toUpperCase() === 'P' ? 'P' : 'L') as 'L' | 'P',
          tempatLahir: item.tempatLahir || 'Malang',
          tanggalLahir: item.tanggalLahir || '2015-01-01',
          rombel: item.rombel || item.Rombel || item.Kelas || 'Kelas 4A',
          tingkat: Number(item.tingkat) || 4,
          namaAyah: item.namaAyah || item.Ayah || '',
          namaIbu: item.namaIbu || item.Ibu || '',
          alamat: item.alamat || item.Alamat || '',
          teleponOrtu: item.teleponOrtu || '',
          statusSiswa: 'Aktif',
          tahunMasuk: item.tahunMasuk || '2024',
        }));
        onBulkImportStudents(mappedStudents);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          {onBack && (
            <button
              id="student-back-btn"
              type="button"
              onClick={onBack}
              className="p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs flex-shrink-0"
              title="Kembali ke Dashboard / Menu Utama"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2 truncate">
              <GraduationCap className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span className="truncate">Master Database Peserta Didik (Siswa Madrasah)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Integrasi data NISN, NIS, NIK, data orang tua, dan penerbitan surat keterangan langsung.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* CSV Import */}
          <label
            id="import-csv-student-btn"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import CSV EMIS</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* CSV Export */}
          <button
            id="export-csv-student-btn"
            onClick={() => exportToCSV(students, 'DATABASE_SISWA_MADRASAH')}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Add Student */}
          <button
            id="add-student-btn"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Siswa Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="search-student-input"
            type="text"
            placeholder="Cari nama siswa, NISN, NIS, atau NIK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-medium">Filter Rombel / Kelas:</span>
          <select
            id="filter-student-rombel"
            value={rombelFilter}
            onChange={(e) => setRombelFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:bg-white focus:outline-hidden"
          >
            <option value="ALL">Semua Rombel ({students.length} Siswa)</option>
            {uniqueRombels.map((r) => (
              <option key={r} value={r}>
                {r} ({students.filter((s) => s.rombel === r).length} Siswa)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">No</th>
                <th className="py-3.5 px-4">Nama Peserta Didik</th>
                <th className="py-3.5 px-4">NISN / NIS</th>
                <th className="py-3.5 px-4 text-center">L/P</th>
                <th className="py-3.5 px-4">Rombel / Kelas</th>
                <th className="py-3.5 px-4">Tempat & Tanggal Lahir</th>
                <th className="py-3.5 px-4">Nama Orang Tua</th>
                <th className="py-3.5 px-4 text-center">Layanan Dokumen Cepat</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, idx) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{student.nama}</div>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      NIK: {student.nik || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-emerald-950 block">{student.nisn}</span>
                    <span className="text-[10px] text-slate-500 block">NIS: {student.nis}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        student.jenisKelamin === 'L'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {student.jenisKelamin}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      {student.rombel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {student.tempatLahir}, {student.tanggalLahir}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="block font-medium text-slate-800">
                      Ayah: {student.namaAyah || '-'}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Ibu: {student.namaIbu || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1.5">
                      <button
                        id={`surat-aktif-btn-${idx}`}
                        onClick={() => onGenerateSuratAktif(student.id)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-semibold text-[11px] transition-colors flex items-center space-x-1 cursor-pointer"
                        title="Buat Surat Keterangan Aktif Belajar Siswa Ini"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Surat Aktif</span>
                      </button>
                      <button
                        id={`surat-mutasi-btn-${idx}`}
                        onClick={() => onGenerateSuratMutasi(student.id)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                        title="Buat Surat Mutasi / Pindah Siswa"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        id={`edit-student-btn-${idx}`}
                        onClick={() => handleOpenEdit(student)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        id={`del-student-btn-${idx}`}
                        onClick={() => onDeleteStudent(student.id)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-scale-up">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {editingStudent ? 'Edit Data Peserta Didik' : 'Tambah Peserta Didik Baru'}
              </h3>
              <button
                id="close-student-modal-btn"
                onClick={() => setIsModalOpen(false)}
                className="text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap Siswa*</label>
                  <input
                    type="text"
                    required
                    value={formData.nama || ''}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin || 'L'}
                    onChange={(e) =>
                      setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NISN (10 Digit)*</label>
                  <input
                    type="text"
                    required
                    value={formData.nisn || ''}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NIS Lokal</label>
                  <input
                    type="text"
                    value={formData.nis || ''}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NIK (Kependudukan)</label>
                  <input
                    type="text"
                    value={formData.nik || ''}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Rombongan Belajar (Kelas)*</label>
                  <input
                    type="text"
                    required
                    value={formData.rombel || ''}
                    onChange={(e) => setFormData({ ...formData, rombel: e.target.value })}
                    placeholder="Contoh: Kelas 4A"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.tempatLahir || ''}
                    onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.tanggalLahir || ''}
                    onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Ayah Kandung</label>
                  <input
                    type="text"
                    value={formData.namaAyah || ''}
                    onChange={(e) => setFormData({ ...formData, namaAyah: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Ibu Kandung</label>
                  <input
                    type="text"
                    value={formData.namaIbu || ''}
                    onChange={(e) => setFormData({ ...formData, namaIbu: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Alamat Tempat Tinggal</label>
                  <input
                    type="text"
                    value={formData.alamat || ''}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="Dusun, RT/RW, Desa, Kecamatan"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  id="save-student-form-btn"
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm"
                >
                  Simpan Data Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
