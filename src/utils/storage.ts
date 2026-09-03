import QRCode from 'qrcode';
import { MadrasahProfile, Teacher, Student, Rombel, OfficialDocument, ActivityLog } from '../types';
import {
  initialMadrasahProfile,
  initialTeachers,
  initialStudents,
  initialRombels,
  initialOfficialDocuments,
  initialActivityLogs,
} from '../data/initialData';

export const DEFAULT_MADRASAH_PROFILE = initialMadrasahProfile;
export const INITIAL_TEACHERS = initialTeachers;
export const INITIAL_STUDENTS = initialStudents;
export const INITIAL_ROMBELS = initialRombels;
export const INITIAL_DOCUMENTS = initialOfficialDocuments;
export const INITIAL_LOGS = initialActivityLogs;

const STORAGE_KEYS = {
  PROFILE: 'automadrasah_profile_v1',
  TEACHERS: 'automadrasah_teachers_v1',
  STUDENTS: 'automadrasah_students_v1',
  ROMBELS: 'automadrasah_rombels_v1',
  DOCUMENTS: 'automadrasah_documents_v1',
  LOGS: 'automadrasah_logs_v1',
};

// Safe LocalStorage helpers
export const loadData = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    return JSON.parse(saved);
  } catch (err) {
    console.error(`Failed to load ${key} from localStorage`, err);
    return defaultValue;
  }
};

export const saveData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage`, err);
  }
};

export const getStoredData = loadData;
export const saveStoredData = saveData;

// Application State Initializer
export const getInitialAppState = () => {
  return {
    profile: loadData<MadrasahProfile>(STORAGE_KEYS.PROFILE, initialMadrasahProfile),
    teachers: loadData<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers),
    students: loadData<Student[]>(STORAGE_KEYS.STUDENTS, initialStudents),
    rombels: loadData<Rombel[]>(STORAGE_KEYS.ROMBELS, initialRombels),
    documents: loadData<OfficialDocument[]>(STORAGE_KEYS.DOCUMENTS, initialOfficialDocuments),
    logs: loadData<ActivityLog[]>(STORAGE_KEYS.LOGS, initialActivityLogs),
  };
};

export const persistAppState = (state: {
  profile?: MadrasahProfile;
  teachers?: Teacher[];
  students?: Student[];
  rombels?: Rombel[];
  documents?: OfficialDocument[];
  logs?: ActivityLog[];
}) => {
  if (state.profile) saveData(STORAGE_KEYS.PROFILE, state.profile);
  if (state.teachers) saveData(STORAGE_KEYS.TEACHERS, state.teachers);
  if (state.students) saveData(STORAGE_KEYS.STUDENTS, state.students);
  if (state.rombels) saveData(STORAGE_KEYS.ROMBELS, state.rombels);
  if (state.documents) saveData(STORAGE_KEYS.DOCUMENTS, state.documents);
  if (state.logs) saveData(STORAGE_KEYS.LOGS, state.logs);
};

// Reset to factory defaults
export const resetToFactoryDefaults = () => {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.TEACHERS);
  localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  localStorage.removeItem(STORAGE_KEYS.ROMBELS);
  localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
  localStorage.removeItem(STORAGE_KEYS.LOGS);
  return getInitialAppState();
};

// Digital Verification Hash Generator
export const generateDigitalSignatureHash = (
  docId: string,
  signerName: string,
  signerRole: string,
  docNumber: string,
  timestamp: string
): string => {
  const rawString = `${docId}|${docNumber}|${signerName}|${signerRole}|${timestamp}|KEMENAG-RI-VERIFIED`;
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
  return `KMA-${docId.substring(0, 6)}-${hex}-${Date.now().toString(36).toUpperCase()}`;
};

// Generate QR Code data URL for digital signature verification
export const generateQRCodeDataUrl = async (
  verificationPayload: {
    documentId: string;
    nomorSurat: string;
    judul: string;
    madrasah: string;
    penandatangan: string;
    jabatan: string;
    nip?: string;
    waktuTtd: string;
    hash: string;
  }
): Promise<string> => {
  try {
    const verificationText = `[TTE RESMI KEMENAG RI - TERVERIFIKASI]
Madrasah: ${verificationPayload.madrasah}
Nomor Surat: ${verificationPayload.nomorSurat}
Dokumen: ${verificationPayload.judul}
Penandatangan: ${verificationPayload.penandatangan} (${verificationPayload.jabatan})
NIP: ${verificationPayload.nip || '-'}
Waktu TTD: ${verificationPayload.waktuTtd}
Hash Integritas: ${verificationPayload.hash}
Status: Dokumen Asli dan Sah Sesuai Regulasi Kemenag`;

    return await QRCode.toDataURL(verificationText, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 180,
      color: {
        dark: '#064e3b', // Deep emerald green
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
};

// CSV Exporter
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) =>
    headers
      .map((header) => {
        let val = obj[header];
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        val = String(val ?? '').replace(/"/g, '""');
        return `"${val}"`;
      })
      .join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// JSON Exporter / Backup
export const exportFullBackupJSON = (state: any, madrasahName: string) => {
  const payload = {
    exportedAt: new Date().toISOString(),
    system: 'AutoMadrasah Kemenag RI v1.0',
    madrasah: madrasahName,
    data: state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `BACKUP_AUTOMADRASAH_${madrasahName.replace(/\s+/g, '_')}_${Date.now()}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// CSV Parser for Guru / Siswa Import
export const parseCSV = (csvText: string): Record<string, string>[] => {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.replace(/^["']|["']$/g, '').trim());
  const results: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let currentVal = '';
    let insideQuote = false;

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === '"' || char === "'") {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim());

    const item: Record<string, string> = {};
    headers.forEach((header, index) => {
      let val = values[index] ?? '';
      val = val.replace(/^["']|["']$/g, '').trim();
      item[header] = val;
    });

    results.push(item);
  }

  return results;
};
