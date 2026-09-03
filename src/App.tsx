import React, { useState, useEffect } from 'react';
import {
  MadrasahProfile,
  Teacher,
  Student,
  Rombel,
  OfficialDocument,
  ActivityLog,
  DocumentType,
} from './types';
import {
  getStoredData,
  saveStoredData,
  DEFAULT_MADRASAH_PROFILE,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_ROMBELS,
  INITIAL_DOCUMENTS,
} from './utils/storage';
import { syncAllDocumentsWithDatabase } from './utils/documentTemplates';
import { Navbar, ActiveTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { KomCintaManagerView } from './components/KomCintaManagerView';
import { DocumentGeneratorView } from './components/DocumentGeneratorView';
import { DocumentArchiveView } from './components/DocumentArchiveView';
import { TeacherDatabaseView } from './components/TeacherDatabaseView';
import { StudentDatabaseView } from './components/StudentDatabaseView';
import { SignatureVerificationView } from './components/SignatureVerificationView';
import { SettingsSyncView } from './components/SettingsSyncView';
import { SignatureCanvasModal } from './components/SignatureCanvasModal';
import { OfficialDocumentSheet } from './components/OfficialDocumentSheet';
import { PrintDocumentModal } from './components/PrintDocumentModal';
import { MainFooter } from './components/MainFooter';
import { StickyActionFooter } from './components/StickyActionFooter';
import { LoginPage, UserSession } from './components/LoginPage';
import { PublicPortalView } from './components/PublicPortalView';
import { X, Printer, ShieldCheck } from 'lucide-react';

export default function App() {
  // Application Mode & Auth State
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const saved = getStoredData<UserSession | null>('MADRASAH_USER_SESSION', null);
    if (saved && saved.id !== 'usr_admin_1' && saved.name) {
      return saved;
    }
    return null;
  });

  const [appMode, setAppMode] = useState<'ADMIN' | 'PUBLIC' | 'LOGIN'>(() => {
    const saved = getStoredData<UserSession | null>('MADRASAH_USER_SESSION', null);
    if (saved && saved.id !== 'usr_admin_1' && saved.name) {
      return getStoredData<'ADMIN' | 'PUBLIC' | 'LOGIN'>('MADRASAH_APP_MODE', 'ADMIN');
    }
    return 'LOGIN';
  });
  const [profile, setProfile] = useState<MadrasahProfile>(() => {
    const loaded = getStoredData<MadrasahProfile>('MADRASAH_PROFILE', DEFAULT_MADRASAH_PROFILE);
    if (!loaded || !loaded.namaMadrasah || loaded.namaMadrasah.includes('Insan Kamil')) {
      return DEFAULT_MADRASAH_PROFILE;
    }
    return loaded;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    return getStoredData<Teacher[]>('MADRASAH_TEACHERS', INITIAL_TEACHERS);
  });

  const [students, setStudents] = useState<Student[]>(() => {
    return getStoredData<Student[]>('MADRASAH_STUDENTS', INITIAL_STUDENTS);
  });

  const [rombels, setRombels] = useState<Rombel[]>(() => {
    return getStoredData<Rombel[]>('MADRASAH_ROMBELS', INITIAL_ROMBELS);
  });

  const [documents, setDocuments] = useState<OfficialDocument[]>(() => {
    const loaded = getStoredData<OfficialDocument[]>('MADRASAH_DOCUMENTS', INITIAL_DOCUMENTS);
    if (Array.isArray(loaded)) {
      const hasOldName = loaded.some(d => JSON.stringify(d).includes('Insan Kamil'));
      if (hasOldName) {
        return INITIAL_DOCUMENTS;
      }
    }
    return loaded;
  });

  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    return getStoredData<ActivityLog[]>('MADRASAH_LOGS', [
      {
        id: 'LOG-1',
        action: 'Inisialisasi Sistem AutoMadrasah & Konfigurasi KMA 450/2024',
        timestamp: '14 Juli 2025, 08:00 WIB',
        user: 'Admin Madrasah',
        category: 'SYSTEM',
      },
    ]);
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('DASHBOARD');
  const [generatorDocType, setGeneratorDocType] = useState<DocumentType>('KOM');
  const [editingDoc, setEditingDoc] = useState<OfficialDocument | null>(null);

  // Print & Preview Studio Modal State
  const [printModalDoc, setPrintModalDoc] = useState<OfficialDocument | null>(null);

  // Modal Signature State
  const [signingContext, setSigningContext] = useState<{
    signer: any;
    document: OfficialDocument;
  } | null>(null);

  // Save changes to localStorage whenever state updates
  useEffect(() => {
    saveStoredData('MADRASAH_PROFILE', profile);
  }, [profile]);

  useEffect(() => {
    saveStoredData('MADRASAH_TEACHERS', teachers);
  }, [teachers]);

  useEffect(() => {
    saveStoredData('MADRASAH_STUDENTS', students);
  }, [students]);

  useEffect(() => {
    saveStoredData('MADRASAH_ROMBELS', rombels);
  }, [rombels]);

  useEffect(() => {
    saveStoredData('MADRASAH_DOCUMENTS', documents);
  }, [documents]);

  useEffect(() => {
    saveStoredData('MADRASAH_LOGS', logs);
  }, [logs]);

  useEffect(() => {
    saveStoredData('MADRASAH_APP_MODE', appMode);
  }, [appMode]);

  useEffect(() => {
    saveStoredData('MADRASAH_USER_SESSION', userSession);
  }, [userSession]);

  // Activity Log helper
  const addLog = (
    action: string,
    documentTitle?: string,
    category: 'DOCUMENT' | 'SIGNATURE' | 'DATABASE' | 'SYNC' | 'SYSTEM' = 'DOCUMENT'
  ) => {
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      action,
      documentTitle,
      category,
      timestamp:
        new Date().toLocaleString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB',
      user: profile.namaKepala || 'Admin Madrasah',
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Document Handlers
  const handleSaveDocument = (doc: OfficialDocument) => {
    setDocuments((prev) => {
      const exists = prev.some((d) => d.id === doc.id);
      if (exists) {
        return prev.map((d) => (d.id === doc.id ? doc : d));
      }
      return [doc, ...prev];
    });
    addLog(`Menyimpan dokumen resmi: ${doc.title}`, doc.title);
    setActiveTab('DOCUMENTS');
  };

  const handleDeleteDocument = (id: string) => {
    const docToDelete = documents.find((d) => d.id === id);
    if (window.confirm(`Hapus dokumen "${docToDelete?.title || 'ini'}"?`)) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      addLog(`Menghapus dokumen: ${docToDelete?.title || id}`);
    }
  };

  const handleCreateNewDocument = (type?: string) => {
    setEditingDoc(null);
    if (type) {
      setGeneratorDocType(type as DocumentType);
    }
    setActiveTab('GENERATOR');
  };

  const handleEditDocument = (doc: OfficialDocument) => {
    setEditingDoc(doc);
    setGeneratorDocType(doc.type);
    setActiveTab('GENERATOR');
  };

  // Direct generation shortcuts
  const handleGenerateSuratAktifForStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    setEditingDoc(null);
    setGeneratorDocType('SURAT_AKTIF_SISWA');
    setActiveTab('GENERATOR');
  };

  const handleGenerateSuratMutasiForStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    setEditingDoc(null);
    setGeneratorDocType('SURAT_MUTASI_SISWA');
    setActiveTab('GENERATOR');
  };

  const handleGenerateSuratTugasForTeacher = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (!teacher) return;
    setEditingDoc(null);
    setGeneratorDocType('SURAT_TUGAS_GURU');
    setActiveTab('GENERATOR');
  };

  // Signature Complete Handler
  const handleSignatureComplete = (signedData: {
    signatureImage?: string;
    qrCodeDataUrl?: string;
    digitalHash: string;
    signedAt: string;
  }) => {
    if (!signingContext) return;

    const { signer, document: targetDoc } = signingContext;

    const updatedSignatures = targetDoc.signatures.map((s) => {
      if (s.id === signer.id || s.name === signer.name) {
        return {
          ...s,
          isSigned: true,
          signatureImage: signedData.signatureImage,
          qrCodeDataUrl: signedData.qrCodeDataUrl,
          digitalHash: signedData.digitalHash,
          signedAt: signedData.signedAt,
        };
      }
      return s;
    });

    const allSigned = updatedSignatures.every((s) => s.isSigned);

    const updatedDoc: OfficialDocument = {
      ...targetDoc,
      signatures: updatedSignatures,
      status: allSigned ? 'SIGNED' : 'READY_FOR_SIGN',
      updatedAt: new Date().toISOString(),
    };

    setDocuments((prev) => prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)));

    if (printModalDoc && printModalDoc.id === updatedDoc.id) {
      setPrintModalDoc(updatedDoc);
    }

    addLog(
      `Menandatangani dokumen (TTE) "${targetDoc.title}" sebagai ${signer.name}`,
      targetDoc.title
    );
    setSigningContext(null);
  };

  // Reset Data Handler
  const handleResetAllData = () => {
    setProfile(DEFAULT_MADRASAH_PROFILE);
    setTeachers(INITIAL_TEACHERS);
    setStudents(INITIAL_STUDENTS);
    setRombels(INITIAL_ROMBELS);
    setDocuments(INITIAL_DOCUMENTS);
    addLog('Mereset sistem ke data standar awal Kemenag');
  };

  // Restore Handler
  const handleRestoreData = (backup: any) => {
    if (backup.profile) setProfile(backup.profile);
    if (backup.teachers) setTeachers(backup.teachers);
    if (backup.students) setStudents(backup.students);
    if (backup.rombels) setRombels(backup.rombels);
    if (backup.documents) setDocuments(backup.documents);
    addLog('Memulihkan database dari file cadangan JSON');
  };

  // Pending signatures count
  const pendingCount = documents.filter(
    (d) => d.status === 'READY_FOR_SIGN' || d.status === 'DRAFT'
  ).length;

  // Login Success Handler
  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    setAppMode('ADMIN');
    setActiveTab('DASHBOARD');
    addLog(`Berhasil masuk sebagai ${session.name} (${session.roleLabel})`, undefined, 'SYSTEM');
  };

  // Logout Handler
  const handleLogout = () => {
    addLog(`Pengguna ${userSession?.name || 'Admin'} keluar dari sistem`, undefined, 'SYSTEM');
    setUserSession(null);
    setAppMode('LOGIN');
  };

  // 1. Render Public Portal (Ruang Publik) Mode - Accessible by anyone
  if (appMode === 'PUBLIC') {
    return (
      <div id="public-app-root">
        <div id="public-portal-root" className={printModalDoc ? 'print:hidden' : ''}>
          <PublicPortalView
            profile={profile}
            documents={documents}
            teachers={teachers}
            students={students}
            onOpenLogin={() => {
              if (userSession) {
                setAppMode('ADMIN');
              } else {
                setAppMode('LOGIN');
              }
            }}
            onSelectDocument={(doc) => setPrintModalDoc(doc)}
          />
        </div>

        {/* Modal Sheet for Public Preview if clicked */}
        {printModalDoc && (
          <PrintDocumentModal
            isOpen={Boolean(printModalDoc)}
            onClose={() => setPrintModalDoc(null)}
            document={printModalDoc}
            documents={documents}
            onSelectDocument={(doc) => setPrintModalDoc(doc)}
            profile={profile}
            teachers={teachers}
            students={students}
          />
        )}
      </div>
    );
  }

  // 2. Render Login Page Mode if not authenticated or in LOGIN mode
  if (appMode === 'LOGIN' || !userSession) {
    return (
      <div id="login-root">
        <LoginPage
          profile={profile}
          onLoginSuccess={handleLoginSuccess}
          onOpenPublicPortal={() => setAppMode('PUBLIC')}
        />
      </div>
    );
  }

  return (
    <div id="admin-app-root" className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      <div id="admin-main-root" className={`flex flex-col min-h-screen flex-1 ${printModalDoc ? 'print:hidden' : ''}`}>
        {/* Top Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          profile={profile}
          pendingSignCount={pendingCount}
          userSession={userSession}
          onOpenPublicPortal={() => setAppMode('PUBLIC')}
          onLogout={handleLogout}
        />

        {/* Main Content View Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {activeTab === 'DASHBOARD' && (
          <DashboardView
            profile={profile}
            documents={documents}
            teachers={teachers}
            students={students}
            rombels={rombels}
            logs={logs}
            setActiveTab={setActiveTab}
            onSelectDocument={(doc) => setPrintModalDoc(doc)}
            onCreateNewDocument={handleCreateNewDocument}
            onAddLog={(action) => addLog(action, undefined, 'SYSTEM')}
          />
        )}

        {activeTab === 'KOM_CINTA' && (
          <KomCintaManagerView
            profile={profile}
            teachers={teachers}
            students={students}
            onOpenPrintModal={(doc) => setPrintModalDoc(doc)}
            onSaveToArchive={(doc) => {
              setDocuments((prev) => {
                const idx = prev.findIndex((d) => d.type === 'KOM_CINTA' || d.id === doc.id);
                if (idx >= 0) {
                  const updated = [...prev];
                  updated[idx] = doc;
                  return updated;
                }
                return [doc, ...prev];
              });
            }}
            onBack={() => setActiveTab('DASHBOARD')}
            onAddLog={(action) => addLog(action, undefined, 'DOCUMENT')}
          />
        )}

        {activeTab === 'GENERATOR' && (
          <DocumentGeneratorView
            profile={profile}
            teachers={teachers}
            students={students}
            documents={documents}
            initialDocType={generatorDocType}
            editingDoc={editingDoc}
            onSaveDocument={handleSaveDocument}
            onOpenSignModal={(signer, doc) => setSigningContext({ signer, document: doc })}
            onBack={() => setActiveTab('DASHBOARD')}
            onOpenPrintModal={(doc) => setPrintModalDoc(doc || documents[0] || null)}
          />
        )}

        {activeTab === 'DOCUMENTS' && (
          <DocumentArchiveView
            documents={documents}
            onSelectDocument={(doc) => setPrintModalDoc(doc)}
            onEditDocument={handleEditDocument}
            onDeleteDocument={handleDeleteDocument}
            onOpenSignModal={(signer, doc) => setSigningContext({ signer, document: doc })}
            onCreateNew={() => handleCreateNewDocument()}
            onBack={() => setActiveTab('DASHBOARD')}
            onOpenPrintModal={(doc) => setPrintModalDoc(doc)}
          />
        )}

        {activeTab === 'TEACHERS' && (
          <TeacherDatabaseView
            teachers={teachers}
            onAddTeacher={(tch) => {
              setTeachers((prev) => [...prev, tch]);
              addLog(`Menambahkan GTK baru: ${tch.nama}`);
            }}
            onUpdateTeacher={(tch) => {
              setTeachers((prev) => prev.map((t) => (t.id === tch.id ? tch : t)));
              addLog(`Memperbarui data GTK: ${tch.nama}`);
            }}
            onDeleteTeacher={(id) => {
              const tch = teachers.find((t) => t.id === id);
              if (window.confirm(`Hapus guru "${tch?.nama}"?`)) {
                setTeachers((prev) => prev.filter((t) => t.id !== id));
                addLog(`Menghapus data GTK: ${tch?.nama || id}`);
              }
            }}
            onBulkImportTeachers={(imported) => {
              setTeachers((prev) => [...prev, ...imported]);
              addLog(`Mengimpor ${imported.length} data guru dari CSV EMIS`);
            }}
            onGenerateSuratTugas={handleGenerateSuratTugasForTeacher}
            onBack={() => setActiveTab('DASHBOARD')}
          />
        )}

        {activeTab === 'STUDENTS' && (
          <StudentDatabaseView
            students={students}
            onAddStudent={(std) => {
              setStudents((prev) => [...prev, std]);
              addLog(`Menambahkan siswa baru: ${std.nama} (${std.rombel})`);
            }}
            onUpdateStudent={(std) => {
              setStudents((prev) => prev.map((s) => (s.id === std.id ? std : s)));
              addLog(`Memperbarui data siswa: ${std.nama}`);
            }}
            onDeleteStudent={(id) => {
              const std = students.find((s) => s.id === id);
              if (window.confirm(`Hapus siswa "${std?.nama}"?`)) {
                setStudents((prev) => prev.filter((s) => s.id !== id));
                addLog(`Menghapus data siswa: ${std?.nama || id}`);
              }
            }}
            onBulkImportStudents={(imported) => {
              setStudents((prev) => [...prev, ...imported]);
              addLog(`Mengimpor ${imported.length} data peserta didik dari CSV EMIS`);
            }}
            onGenerateSuratAktif={handleGenerateSuratAktifForStudent}
            onGenerateSuratMutasi={handleGenerateSuratMutasiForStudent}
            onBack={() => setActiveTab('DASHBOARD')}
          />
        )}

        {activeTab === 'VERIFICATION' && (
          <SignatureVerificationView
            documents={documents}
            profile={profile}
            onSelectDocument={(doc) => setPrintModalDoc(doc)}
            onBack={() => setActiveTab('DASHBOARD')}
          />
        )}

        {activeTab === 'SETTINGS' && (
          <SettingsSyncView
            profile={profile}
            teachers={teachers}
            students={students}
            rombels={rombels}
            documents={documents}
            logs={logs}
            onUpdateProfile={(newProfile) => {
              setProfile(newProfile);
              addLog('Memperbarui profil resmi madrasah dan Kop Surat');
            }}
            onResetAllData={handleResetAllData}
            onRestoreData={handleRestoreData}
            onSyncAllDocuments={() => {
              const synced = syncAllDocumentsWithDatabase(documents, profile, teachers, students);
              setDocuments(synced);
              addLog(`Melakukan sinkronisasi massal seluruh data guru dan siswa ke ${synced.length} dokumen`, undefined, 'SYNC');
            }}
            onBack={() => setActiveTab('DASHBOARD')}
            onAddLog={(action) => addLog(action, undefined, 'SYSTEM')}
          />
        )}
      </main>

        {/* Modern Iconic Footer */}
        <MainFooter
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenPrintModal={() => setPrintModalDoc(documents[0] || null)}
          documentCount={documents.length}
          teacherCount={teachers.length}
          studentCount={students.length}
        />

        {/* Sticky Quick Action Footer */}
        <StickyActionFooter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBack={() => setActiveTab('DASHBOARD')}
          onOpenPrintModal={() => setPrintModalDoc(documents[0] || null)}
          profile={profile}
          pendingSignCount={pendingCount}
        />
      </div>

      {/* Modern Print Studio & Export Modal */}
      {printModalDoc && (
        <PrintDocumentModal
          isOpen={Boolean(printModalDoc)}
          onClose={() => setPrintModalDoc(null)}
          document={printModalDoc}
          documents={documents}
          onSelectDocument={(doc) => setPrintModalDoc(doc)}
          profile={profile}
          teachers={teachers}
          students={students}
          onOpenSignModal={(signer) => {
            setSigningContext({ signer, document: printModalDoc });
          }}
        />
      )}

      {/* Signature & Digital QR Modal */}
      {signingContext && (
        <SignatureCanvasModal
          isOpen={true}
          onClose={() => setSigningContext(null)}
          onSaveSignature={handleSignatureComplete}
          signerName={signingContext.signer.name}
          signerTitle={signingContext.signer.title}
          signerNip={signingContext.signer.nip}
          madrasahName={profile.namaMadrasah}
          documentNumber={signingContext.document.nomorSurat}
        />
      )}
    </div>
  );
}
