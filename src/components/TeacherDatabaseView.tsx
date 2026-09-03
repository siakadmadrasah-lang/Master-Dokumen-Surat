import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Download,
  Upload,
  Briefcase,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Sparkles,
  Globe,
  ArrowLeft,
} from 'lucide-react';
import { Teacher, StatusKepegawaian, Student } from '../types';
import { exportToCSV, parseCSV } from '../utils/storage';
import { SiakadSyncModal } from './SiakadSyncModal';

interface TeacherDatabaseViewProps {
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  onUpdateTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
  onBulkImportTeachers: (teachers: Teacher[]) => void;
  onGenerateSuratTugas: (teacherId: string) => void;
  onSyncFromSiakad?: (result: { teachers?: Teacher[]; students?: Student[]; mode: 'MERGE' | 'REPLACE' }) => void;
  onBack?: () => void;
}

export const TeacherDatabaseView: React.FC<TeacherDatabaseViewProps> = ({
  teachers,
  onAddTeacher,
  onUpdateTeacher,
  onDeleteTeacher,
  onBulkImportTeachers,
  onGenerateSuratTugas,
  onSyncFromSiakad,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSiakadModalOpen, setIsSiakadModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<Teacher>>({
    nama: '',
    gelarDepan: '',
    gelarBelakang: 'S.Pd',
    nip: '',
    nuptk: '',
    pegId: '',
    jenisKelamin: 'L',
    tempatLahir: '',
    tanggalLahir: '1985-01-01',
    statusKepegawaian: 'PNS',
    pangkatGol: 'Penata / III c',
    jabatanUtama: 'Guru Mata Pelajaran',
    tugasTambahan: '',
    mapelUtama: '',
    jumlahJam: 24,
    waliKelasDi: '',
    sertifikasi: true,
    telepon: '',
    email: '',
    isActive: true,
  });

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.nip && t.nip.includes(searchQuery)) ||
      (t.mapelUtama && t.mapelUtama.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || t.statusKepegawaian === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      id: `TCH-${Date.now()}`,
      nama: '',
      gelarDepan: '',
      gelarBelakang: 'S.Pd',
      nip: '',
      nuptk: '',
      pegId: '',
      jenisKelamin: 'L',
      tempatLahir: '',
      tanggalLahir: '1985-01-01',
      statusKepegawaian: 'PNS',
      pangkatGol: 'Penata / III c',
      jabatanUtama: 'Guru Kelas',
      tugasTambahan: '',
      mapelUtama: 'Pendidikan Agama Islam (PAI)',
      jumlahJam: 24,
      waliKelasDi: '',
      sertifikasi: true,
      telepon: '',
      email: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData(teacher);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama) return;

    if (editingTeacher) {
      onUpdateTeacher(formData as Teacher);
    } else {
      onAddTeacher({
        ...formData,
        id: `TCH-${Date.now()}`,
      } as Teacher);
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
        const mappedTeachers: Teacher[] = parsed.map((item, index) => ({
          id: `TCH-IMP-${Date.now()}-${index}`,
          nama: item.nama || item.Nama || 'Guru Baru',
          gelarBelakang: item.gelarBelakang || item.Gelar || '',
          nip: item.nip || item.NIP || '',
          nuptk: item.nuptk || item.NUPTK || '',
          jenisKelamin: (item.jenisKelamin?.toUpperCase() === 'P' ? 'P' : 'L') as 'L' | 'P',
          tempatLahir: item.tempatLahir || '',
          tanggalLahir: item.tanggalLahir || '1990-01-01',
          statusKepegawaian: (item.statusKepegawaian as StatusKepegawaian) || 'PNS',
          pangkatGol: item.pangkatGol || 'Penata Muda / III a',
          jabatanUtama: item.jabatanUtama || 'Guru Mata Pelajaran',
          tugasTambahan: item.tugasTambahan || '',
          mapelUtama: item.mapelUtama || item.Mapel || 'Mata Pelajaran',
          jumlahJam: Number(item.jumlahJam) || 24,
          waliKelasDi: item.waliKelasDi || '',
          sertifikasi: item.sertifikasi === 'true' || item.sertifikasi === '1',
          telepon: item.telepon || '',
          email: item.email || '',
          isActive: true,
        }));
        onBulkImportTeachers(mappedTeachers);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          {onBack && (
            <button
              id="teacher-back-btn"
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
              <Users className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span className="truncate">Master Database Guru & Tenaga Kependidikan (GTK)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Manajemen data kepegawaian, pembagian jam mengajar, ekuivalensi, dan sinkronisasi Simpatika/EMIS.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* SIAKAD Sync Button */}
          <button
            id="sync-siakad-teacher-btn"
            type="button"
            onClick={() => setIsSiakadModalOpen(true)}
            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 shadow-xs"
            title="Tarik data guru dari siakad-madrasah.jaenalmaskun.biz.id"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tarik dari SIAKAD</span>
          </button>

          {/* CSV Import */}
          <label
            id="import-csv-teacher-btn"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import CSV EMIS</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* CSV Export */}
          <button
            id="export-csv-teacher-btn"
            onClick={() => exportToCSV(teachers, 'DATABASE_GTK_MADRASAH')}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Add Teacher */}
          <button
            id="add-teacher-btn"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah GTK Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="search-teacher-input"
            type="text"
            placeholder="Cari nama guru, NIP, atau mata pelajaran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            id="filter-teacher-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:bg-white focus:outline-hidden"
          >
            <option value="ALL">Semua Status ({teachers.length})</option>
            <option value="PNS">PNS</option>
            <option value="PPPK">PPPK</option>
            <option value="GTY">GTY / Yayasan</option>
            <option value="Honorer">Honorer</option>
          </select>
        </div>
      </div>

      {/* GTK Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">No</th>
                <th className="py-3.5 px-4">Nama Lengkap & NIP</th>
                <th className="py-3.5 px-4">Status & Golongan</th>
                <th className="py-3.5 px-4">Mata Pelajaran Utama</th>
                <th className="py-3.5 px-4">Tugas Tambahan</th>
                <th className="py-3.5 px-4 text-center">Jam / Pekan</th>
                <th className="py-3.5 px-4 text-center">Wali Kelas</th>
                <th className="py-3.5 px-4 text-center">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map((teacher, idx) => {
                const isFullLoad = teacher.jumlahJam >= 24;
                return (
                  <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">
                        {teacher.gelarDepan && `${teacher.gelarDepan} `}
                        {teacher.nama}
                        {teacher.gelarBelakang && `, ${teacher.gelarBelakang}`}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        NIP: {teacher.nip || 'Non-NIP'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${
                          teacher.statusKepegawaian === 'PNS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : teacher.statusKepegawaian === 'PPPK'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {teacher.statusKepegawaian}
                      </span>
                      <span className="text-[11px] text-slate-600 block">{teacher.pangkatGol}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{teacher.mapelUtama}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {teacher.tugasTambahan || <span className="text-slate-300">-</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                          isFullLoad ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {teacher.jumlahJam} JP
                      </span>
                      {teacher.sertifikasi && (
                        <span className="block text-[9px] text-emerald-600 font-semibold mt-0.5">
                          Sertifikasi
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-950">
                      {teacher.waliKelasDi || <span className="text-slate-300 font-normal">-</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          id={`spt-teacher-btn-${idx}`}
                          onClick={() => onGenerateSuratTugas(teacher.id)}
                          title="Terbitkan Surat Tugas Dinas GTK"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`edit-teacher-btn-${idx}`}
                          onClick={() => handleOpenEdit(teacher)}
                          title="Edit Data GTK"
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`del-teacher-btn-${idx}`}
                          onClick={() => onDeleteTeacher(teacher.id)}
                          title="Hapus Data GTK"
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Teacher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-scale-up">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {editingTeacher ? 'Edit Data Pendidik / GTK' : 'Tambah Pendidik / GTK Baru'}
              </h3>
              <button
                id="close-teacher-modal-btn"
                onClick={() => setIsModalOpen(false)}
                className="text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap (Tanpa Gelar)*</label>
                  <input
                    type="text"
                    required
                    value={formData.nama || ''}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Gelar Belakang</label>
                  <input
                    type="text"
                    value={formData.gelarBelakang || ''}
                    onChange={(e) => setFormData({ ...formData, gelarBelakang: e.target.value })}
                    placeholder="S.Pd, M.Pd.I, dll"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NIP (Jika PNS/PPPK)</label>
                  <input
                    type="text"
                    value={formData.nip || ''}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Kepegawaian</label>
                  <select
                    value={formData.statusKepegawaian || 'PNS'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        statusKepegawaian: e.target.value as StatusKepegawaian,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="PNS">PNS (Pegawai Negeri Sipil)</option>
                    <option value="PPPK">PPPK</option>
                    <option value="GTY">GTY (Guru Tetap Yayasan)</option>
                    <option value="Honorer">Honorer / GTT</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pangkat / Golongan</label>
                  <input
                    type="text"
                    value={formData.pangkatGol || ''}
                    onChange={(e) => setFormData({ ...formData, pangkatGol: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mata Pelajaran Utama</label>
                  <input
                    type="text"
                    required
                    value={formData.mapelUtama || ''}
                    onChange={(e) => setFormData({ ...formData, mapelUtama: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tugas Tambahan</label>
                  <input
                    type="text"
                    value={formData.tugasTambahan || ''}
                    onChange={(e) => setFormData({ ...formData, tugasTambahan: e.target.value })}
                    placeholder="Waka Kurikulum / Pembina OSIM / Kepala Lab"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Jam Tatap Muka (JP)</label>
                  <input
                    type="number"
                    value={formData.jumlahJam || 24}
                    onChange={(e) => setFormData({ ...formData, jumlahJam: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ditugaskan Jadi Wali Kelas Di</label>
                  <input
                    type="text"
                    value={formData.waliKelasDi || ''}
                    onChange={(e) => setFormData({ ...formData, waliKelasDi: e.target.value })}
                    placeholder="Contoh: Kelas 4A (Kosongkan jika bukan)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="chk-sertifikasi"
                    checked={formData.sertifikasi}
                    onChange={(e) => setFormData({ ...formData, sertifikasi: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="chk-sertifikasi" className="font-semibold text-slate-700">
                    Memiliki Sertifikat Pendidik (Sertifikasi)
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  id="save-teacher-form-btn"
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm cursor-pointer"
                >
                  Simpan Data Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIAKAD Sync Modal */}
      <SiakadSyncModal
        isOpen={isSiakadModalOpen}
        onClose={() => setIsSiakadModalOpen(false)}
        initialTarget="teachers"
        onApplySync={(result) => {
          if (onSyncFromSiakad) {
            onSyncFromSiakad(result);
          } else if (result.teachers && result.teachers.length > 0) {
            onBulkImportTeachers(result.teachers);
          }
        }}
      />
    </div>
  );
};
