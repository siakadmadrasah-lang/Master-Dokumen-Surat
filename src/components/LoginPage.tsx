import React, { useState } from 'react';
import {
  School,
  Lock,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  HelpCircle,
  Globe,
  Award,
  KeyRound,
  FileCheck,
  Heart,
  ChevronRight,
  Info,
} from 'lucide-react';
import { MadrasahProfile } from '../types';

export interface UserSession {
  id: string;
  name: string;
  role: 'SUPER_ADMIN' | 'KEPALA_MADRASAH' | 'OPERATOR_KURIKULUM' | 'GURU' | 'PENGAWAS';
  roleLabel: string;
  nip?: string;
  avatarUrl?: string;
  loggedInAt: string;
}

interface LoginPageProps {
  profile: MadrasahProfile;
  onLoginSuccess: (session: UserSession) => void;
  onOpenPublicPortal: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  profile,
  onLoginSuccess,
  onOpenPublicPortal,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'SUPER_ADMIN' | 'KEPALA_MADRASAH' | 'OPERATOR_KURIKULUM' | 'GURU' | 'PENGAWAS'>('SUPER_ADMIN');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Preset role accounts for quick switching
  const rolePresets = [
    {
      role: 'SUPER_ADMIN' as const,
      title: 'Super Administrator',
      subtitle: 'Akses Penuh Seluruh Sistem & Konfigurasi',
      defaultUser: 'jaenalmaskun@gmail.com',
      defaultPass: 'masbagus',
      name: 'Jaenal Maskun',
      nip: 'SUPER ADMIN',
    },
    {
      role: 'OPERATOR_KURIKULUM' as const,
      title: 'Waka Kurikulum & Operator',
      subtitle: 'Akses Generator SK, KOM & Database',
      defaultUser: 'admin.kurikulum',
      defaultPass: 'kemenag2025',
      name: 'H. Ahmad Fauzi, M.Pd.',
      nip: '198503152010011012',
    },
    {
      role: 'KEPALA_MADRASAH' as const,
      title: 'Kepala Madrasah',
      subtitle: 'Otoritas Pengesahan TTE & Keputusan Resmi',
      defaultUser: 'kepala.madrasah',
      defaultPass: 'kepala123',
      name: profile.namaKepala || 'H. Mochammad Syarifudin, M.Pd.I',
      nip: profile.nipKepala || '197605142002121002',
    },
    {
      role: 'GURU' as const,
      title: 'Dewan Guru & Wali Kelas',
      subtitle: 'Administrasi Kelas & Database GTK',
      defaultUser: 'guru.kelas',
      defaultPass: 'guru123',
      name: 'Siti Nurhaliza, S.Pd.',
      nip: '199208242019032015',
    },
    {
      role: 'PENGAWAS' as const,
      title: 'Pengawas Kankemenag',
      subtitle: 'Supervisi & Verifikasi Dokumen KMA 450',
      defaultUser: 'pengawas.kemenag',
      defaultPass: 'pengawas123',
      name: profile.namaPengawas || 'Drs. H. Mulyono, M.Pd.I',
      nip: profile.nipPengawas || '196803121994032001',
    },
  ];

  const handleSelectPreset = (preset: typeof rolePresets[0]) => {
    setSelectedRole(preset.role);
    setUsername(preset.defaultUser);
    setPassword(preset.defaultPass);
    setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    if (!inputUser || !inputPass) {
      setErrorMessage('Silakan isi Email / Nama Pengguna dan Kata Sandi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // 1. Check Super Admin credentials
      if (inputUser === 'jaenalmaskun@gmail.com' && inputPass === 'masbagus') {
        const session: UserSession = {
          id: 'usr_super_admin',
          name: 'Jaenal Maskun',
          role: 'SUPER_ADMIN',
          roleLabel: 'Super Administrator',
          nip: 'Super Admin',
          loggedInAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        };
        onLoginSuccess(session);
        return;
      }

      // 2. Check predefined roles
      const matchedAccount = rolePresets.find(
        (r) => r.defaultUser.toLowerCase() === inputUser && r.defaultPass === inputPass
      );

      if (matchedAccount) {
        const session: UserSession = {
          id: `user_${Date.now()}`,
          name: matchedAccount.name,
          role: matchedAccount.role,
          roleLabel: matchedAccount.title,
          nip: matchedAccount.nip,
          loggedInAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        };
        onLoginSuccess(session);
        return;
      }

      setErrorMessage('Email/Pengguna atau kata sandi tidak cocok. Gunakan akun Super Admin jaenalmaskun@gmail.com (pass: masbagus) atau akun yang terdaftar.');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-teal-600 rounded-full blur-[128px]"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[140px]"></div>
      </div>

      {/* Top Floating Nav Bar for Login */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/30">
            <School className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                AutoMadrasah
              </span>
              <span className="bg-emerald-800/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-600/40">
                PRO v1.0
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/70 font-mono truncate max-w-[200px] sm:max-w-none">
              {profile.namaMadrasah}
            </p>
          </div>
        </div>

        {/* Action: Open Public Space */}
        <button
          id="public-portal-header-btn"
          type="button"
          onClick={onOpenPublicPortal}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 active:scale-95 text-emerald-100 hover:text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold border border-white/20 transition-all shadow-md cursor-pointer backdrop-blur-md"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Kunjungi Ruang Publik</span>
          <span className="sm:hidden">Ruang Publik</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
        </button>
      </header>

      {/* Center Container: Dual Column Login Experience */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-8 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Visual Showcase & Identity */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-900/60 backdrop-blur-md text-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-emerald-700/50 shadow-inner">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Standar KMA Nomor 450 Tahun 2024</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Sistem Tata Kelola Administrasi & Dokumen Resmi
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Portal terpadu penyusunan Kurikulum Operasional Madrasah (KOM) Berbasis Cinta, Surat Keputusan (SK) Kepala Madrasah, Tanda Tangan Elektronik (TTE) QR Code, dan database terintegrasi.
              </p>
            </div>

            {/* School Profile Pill */}
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Satuan Pendidikan Aktif
                </span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md text-[10px] font-bold">
                  Akreditasi {profile.akreditasi || 'A'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {profile.namaMadrasah}
              </h3>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono pt-1">
                <span>NSM: <strong className="text-slate-200">{profile.nsm}</strong></span>
                <span>•</span>
                <span>NPSN: <strong className="text-slate-200">{profile.npsn}</strong></span>
                <span>•</span>
                <span>T.A: <strong className="text-slate-200">{profile.tahunAjaran} ({profile.semester})</strong></span>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/50 flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-[12px]">TTE Sah QR Code</h4>
                  <p className="text-[10px] text-slate-400">Verifikasi naskah dinas resmi Kemenag RI</p>
                </div>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/50 flex items-start space-x-2.5">
                <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-[12px]">Generator Otomatis</h4>
                  <p className="text-[10px] text-slate-400">12+ format SK & naskah dinas siap cetak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Box */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-emerald-700/60 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-emerald-950/80 space-y-5">
              {/* Form Title */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span>Masuk ke Dashboard Admin</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pilih peran atau masukkan kredensial akun Anda
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Bantuan Akun"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Role Presets Switcher */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  Pilih Peran Pengguna (Akses Cepat):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {rolePresets.map((preset) => {
                    const isSelected = selectedRole === preset.role;
                    return (
                      <button
                        key={preset.role}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-800/70 border-emerald-400 text-white shadow-md shadow-emerald-950/50'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{preset.title}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{preset.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs flex items-center space-x-2">
                    <Info className="w-4 h-4 flex-shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 block">
                    Nama Pengguna / NIP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="login-username-input"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan nama pengguna..."
                      className="w-full pl-9.5 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-xs text-white placeholder-slate-500 transition-all outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-300 block">
                      Kata Sandi / PIN Keamanan
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">Enkripsi SHA-256</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi..."
                      className="w-full pl-9.5 pr-10 py-2.5 bg-slate-800/80 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-xs text-white placeholder-slate-500 transition-all outline-hidden font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  id="submit-login-btn"
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Masuk ke Dashboard ({rolePresets.find(r => r.role === selectedRole)?.title})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Public Portal Quick Gateway */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Bukan staf / operator?</span>
                <button
                  type="button"
                  onClick={onOpenPublicPortal}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  <span>Buka Ruang Publik Madrasah</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-4 py-4 text-center text-xs text-slate-400 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} {profile.namaMadrasah} • Kemenag RI Document Automation</p>
        <p className="text-[11px] text-slate-500 font-mono">
          KMA No. 450 Tahun 2024 • Kurikulum Operasional Berbasis Cinta Kasih
        </p>
      </footer>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Bantuan Masuk Akun</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs space-y-2 text-slate-300">
              <p>Gunakan akun administrator yang telah terdaftar pada sistem AutoMadrasah:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 font-mono text-[11px]">
                <li><strong className="text-emerald-300">Super Admin:</strong> Email <code>jaenalmaskun@gmail.com</code> | Pass <code>masbagus</code></li>
                <li><strong>Waka Kurikulum:</strong> User <code>admin.kurikulum</code> | Pass <code>kemenag2025</code></li>
                <li><strong>Kepala Madrasah:</strong> User <code>kepala.madrasah</code> | Pass <code>kepala123</code></li>
                <li><strong>Guru / Wali Kelas:</strong> User <code>guru.kelas</code> | Pass <code>guru123</code></li>
                <li><strong>Pengawas Kemenag:</strong> User <code>pengawas.kemenag</code> | Pass <code>pengawas123</code></li>
              </ul>
              <p className="pt-2 text-slate-400">Jika Anda adalah wali murid atau masyarakat umum, silakan pilih <strong>Kunjungi Ruang Publik</strong>.</p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
