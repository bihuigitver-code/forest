/* oxlint-disable react/set-state-in-effect */
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Search, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Loader2, 
  AlertCircle,
  Users,
  RefreshCw,
  Eye,
  Check,
  X
} from 'lucide-react';
import { Emblem } from '../layout/Emblem';
import { sendPaymentStatusEmail } from '../../services/emailService';

interface ApplicationRow {
  id: number;
  application_ref: string;
  full_name: string;
  father_name: string;
  mother_name?: string;
  dob: string;
  gender: string;
  category: string;
  amount: number | string;
  mobile: string;
  email?: string;
  applied_post: string;
  utr_number: string;
  payment_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}

interface AdminDashboardProps {
  onBackToPortal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPortal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => typeof window !== 'undefined' && Boolean(sessionStorage.getItem('causes_admin_token'))
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [updatingRef, setUpdatingRef] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<ApplicationRow | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoadingData(true);
    let apiApps: ApplicationRow[] = [];

    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      if (data.success && Array.isArray(data.applications)) {
        apiApps = data.applications;
      }
    } catch (err) {
      console.warn('API fetch error, falling back to local records:', err);
    }

    try {
      const localRecords: any[] = JSON.parse(localStorage.getItem('forest_recruitment_records') || '[]');
      const localMapped: ApplicationRow[] = localRecords.map((r, idx) => ({
        id: r.id || (idx + 1),
        application_ref: r.application_ref || r.applicationRef || `APP-${idx + 1}`,
        full_name: r.full_name || r.fullName || 'N/A',
        father_name: r.father_name || r.fatherName || 'N/A',
        mother_name: r.mother_name || r.motherName,
        dob: r.dob || '',
        gender: r.gender || '',
        category: r.category || 'General',
        amount: r.amount || 0,
        mobile: r.mobile || '',
        email: r.email || '',
        applied_post: r.applied_post || r.appliedPost || 'Forest Guard',
        utr_number: r.utr_number || r.utrNumber || '',
        payment_status: (r.payment_status || r.paymentStatus || 'pending') as 'pending' | 'verified' | 'rejected',
        created_at: r.created_at || r.timestamp || new Date().toISOString()
      }));

      // Combine both, avoiding duplicates by application_ref
      const combined = [...apiApps];
      for (const loc of localMapped) {
        if (!combined.some(c => c.application_ref === loc.application_ref)) {
          combined.push(loc);
        }
      }
      setApplications(combined);
    } catch {
      setApplications(apiApps);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Fetch applications whenever authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated, fetchApplications]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('causes_admin_token', data.token || 'causes_admin_authenticated');
        setIsAuthenticated(true);
        fetchApplications();
      } else {
        setLoginError(data.message || 'अमान्य एडमिन यूज़रनेम या पासवर्ड।');
      }
    } catch {
      // Fallback for Vercel static environments when backend API is unreachable
      const expectedUser = (import.meta as any).env?.VITE_ADMIN_USER || 'admin';
      const expectedPass = (import.meta as any).env?.VITE_ADMIN_PASS || 'forest@2026';
      if (username === expectedUser && password === expectedPass) {
        sessionStorage.setItem('causes_admin_token', 'causes_admin_authenticated');
        setIsAuthenticated(true);
        fetchApplications();
      } else {
        setLoginError('सर्वर से संपर्क करने में त्रुटि हुई।');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('causes_admin_token');
    setIsAuthenticated(false);
    setApplications([]);
    setUsername('');
    setPassword('');
  };

  const handleTogglePaymentStatus = async (applicationRef: string, currentStatus: string) => {
    const newStatus = currentStatus === 'verified' ? 'pending' : 'verified';
    setUpdatingRef(applicationRef);
    const targetCandidate = applications.find(app => app.application_ref === applicationRef);

    try {
      const res = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationRef, status: newStatus })
      });
      await res.json().catch(() => {});

      // Sync to localStorage
      try {
        const localRecords: any[] = JSON.parse(localStorage.getItem('forest_recruitment_records') || '[]');
        const updated = localRecords.map(r => 
          (r.applicationRef === applicationRef || r.application_ref === applicationRef)
            ? { ...r, paymentStatus: newStatus, payment_status: newStatus }
            : r
        );
        localStorage.setItem('forest_recruitment_records', JSON.stringify(updated));
      } catch {}

      setApplications(prev => prev.map(app => 
        app.application_ref === applicationRef ? { ...app, payment_status: newStatus as any } : app
      ));
      if (selectedCandidate && selectedCandidate.application_ref === applicationRef) {
        setSelectedCandidate(prev => prev ? { ...prev, payment_status: newStatus as any } : null);
      }

      // When marked as paid, dispatch email notification
      if (newStatus === 'verified' && targetCandidate) {
        sendPaymentStatusEmail({
          applicationRef: targetCandidate.application_ref,
          fullName: targetCandidate.full_name,
          fatherName: targetCandidate.father_name,
          appliedPost: targetCandidate.applied_post,
          category: targetCandidate.category,
          mobile: targetCandidate.mobile,
          email: targetCandidate.email,
          amount: targetCandidate.amount,
          utrNumber: targetCandidate.utr_number,
          paymentStatus: 'verified'
        }).catch((err: unknown) => console.warn('Frontend email trigger fallback:', err));

        setActionNotice(`✅ ${targetCandidate.full_name} (${targetCandidate.application_ref}) का शुल्क PAID मार्क हुआ!`);
      } else {
        setActionNotice(`ℹ️ ${targetCandidate?.full_name || applicationRef} का शुल्क वापस PENDING (Unpaid) मार्क किया गया।`);
      }

      setTimeout(() => setActionNotice(null), 7000);
    } catch {
      alert('सर्वर से संपर्क नहीं हो सका।');
    } finally {
      setUpdatingRef(null);
    }
  };

  // Filtered applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.full_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.mobile?.includes(searchFilter) ||
      app.email?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.utr_number?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.application_ref?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.applied_post?.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'verified' && app.payment_status === 'verified') ||
      (statusFilter === 'pending' && app.payment_status !== 'verified');

    return matchesSearch && matchesStatus;
  });

  const totalCount = applications.length;
  const verifiedCount = applications.filter(a => a.payment_status === 'verified').length;
  const pendingCount = totalCount - verifiedCount;

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F4EC] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#174A32] text-white p-6 text-center border-b-4 border-[#B79A52]">
            <div className="flex justify-center mb-2">
              <Emblem size={56} />
            </div>
            <h1 className="text-lg font-bold">विभागीय भर्ती नियंत्रण कक्ष</h1>
            <p className="text-xs text-[#E8DFB8] mt-0.5">Forest Recruitment Management Desk (Causes)</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                एडमिन यूज़रनेम (Admin ID)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                पासवर्ड (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {loginError && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#174A32] hover:bg-[#24563B] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E8DFB8]" />
                  <span>प्रमाणीकरण हो रहा है...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} className="text-[#E8DFB8]" />
                  <span>सुरक्षित लॉगिन करें</span>
                </>
              )}
            </button>

            {onBackToPortal && (
              <button
                type="button"
                onClick={onBackToPortal}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 transition py-1 cursor-pointer"
              >
                ← मुख्य वेबसाइट पर वापस जाएं
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#F5F4EC] text-slate-800">
      {/* Top Navbar */}
      <header className="bg-[#174A32] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Emblem size={36} />
            <div>
              <h1 className="text-sm sm:text-base font-bold leading-tight">भर्ती प्रशासन डैशबोर्ड</h1>
              <p className="text-[10px] text-[#E8DFB8]">Causes Admin Portal — Forest Recruitment 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchApplications}
              className="p-1.5 text-[#E8DFB8] hover:text-white hover:bg-emerald-800 rounded-lg transition cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={isLoadingData ? 'animate-spin' : ''} />
            </button>

            {onBackToPortal && (
              <button
                onClick={onBackToPortal}
                className="px-2.5 py-1.5 bg-emerald-800/80 hover:bg-emerald-700 text-[#E8DFB8] hover:text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                title="View Main Portal"
              >
                पोर्टल
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 bg-red-700/80 hover:bg-red-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">लॉगआउट</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-5 space-y-4">
        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button
              onClick={() => setActionNotice(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold px-2 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase">कुल आवेदन</div>
              <div className="text-lg sm:text-2xl font-bold text-slate-900">{totalCount}</div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-emerald-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-xs text-emerald-800 font-semibold uppercase">सत्यापित (PAID)</div>
              <div className="text-lg sm:text-2xl font-bold text-emerald-700">{verifiedCount}</div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-xs text-amber-800 font-semibold uppercase">प्रक्रियाधीन (UNPAID)</div>
              <div className="text-lg sm:text-2xl font-bold text-amber-700">{pendingCount}</div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="नाम, मोबाइल, ईमेल, यूटीआर (UTR) या आवेदन संख्या से खोजें..."
              className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-emerald-600 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                statusFilter === 'all' ? 'bg-[#174A32] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              सभी ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('verified')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                statusFilter === 'verified' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              PAID ({verifiedCount})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              PENDING ({pendingCount})
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {isLoadingData ? (
            <div className="p-8 text-center space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-700 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">डेटाबेस से आवेदन लोड हो रहे हैं...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              कोई आवेदन रिकॉर्ड नहीं मिला।
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Ref No</th>
                      <th className="p-3">अभ्यर्थी का नाम</th>
                      <th className="p-3">आवेदित पद</th>
                      <th className="p-3">मोबाइल / ईमेल</th>
                      <th className="p-3">12-अंकीय UTR</th>
                      <th className="p-3">शुल्क</th>
                      <th className="p-3">भुगतान स्थिति</th>
                      <th className="p-3 text-right">कार्रवाई (Action)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {filteredApplications.map(app => {
                      const isVerified = app.payment_status === 'verified';
                      const isUpdating = updatingRef === app.application_ref;

                      return (
                        <tr key={app.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-bold text-[#174A32]">{app.application_ref}</td>
                          <td className="p-3 font-semibold">{app.full_name}</td>
                          <td className="p-3 text-slate-600">{app.applied_post}</td>
                          <td className="p-3 text-slate-600 font-sans">
                            <div>{app.mobile}</div>
                            <div className="text-[10px] text-slate-400">{app.email || 'N/A'}</div>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                              {app.utr_number}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-emerald-800">₹{app.amount}</td>
                          <td className="p-3">
                            {isVerified ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <Check size={12} />
                                <span>PAID (सत्यापित)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                <Clock size={12} />
                                <span>PENDING (लंबित)</span>
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(app)}
                              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded transition cursor-pointer"
                              title="विवरण देखें (View Details)"
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleTogglePaymentStatus(app.application_ref, app.payment_status)}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded transition cursor-pointer disabled:opacity-50 ${
                                isVerified
                                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              }`}
                            >
                              {isUpdating ? (
                                <Loader2 size={12} className="animate-spin inline" />
                              ) : isVerified ? (
                                'Mark as Unpaid'
                              ) : (
                                'Mark as Paid'
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-slate-200">
                {filteredApplications.map(app => {
                  const isVerified = app.payment_status === 'verified';
                  const isUpdating = updatingRef === app.application_ref;

                  return (
                    <div key={app.id} className="p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#174A32] text-xs">{app.application_ref}</span>
                        {isVerified ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            PAID
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            PENDING
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-sm font-bold text-slate-900">{app.full_name}</div>
                        <div className="text-[11px] text-slate-600">{app.applied_post}</div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded border border-slate-200 font-mono text-[11px] space-y-0.5">
                        <div className="flex justify-between">
                          <span>UTR संख्या:</span>
                          <span className="font-bold text-slate-900">{app.utr_number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>शुल्क राशि:</span>
                          <span className="font-bold text-emerald-700">₹{app.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>मोबाइल:</span>
                          <span>{app.mobile}</span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCandidate(app)}
                          className="px-3 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-semibold transition cursor-pointer"
                        >
                          विवरण देखें
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleTogglePaymentStatus(app.application_ref, app.payment_status)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded transition cursor-pointer text-center ${
                            isVerified
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {isUpdating ? 'अपडेट हो रहा है...' : isVerified ? 'Mark as Unpaid' : 'Mark as Paid'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-300 max-h-[90vh] overflow-y-auto space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="font-bold text-base text-[#174A32]">{selectedCandidate.full_name}</h3>
                <p className="text-[11px] text-slate-500">{selectedCandidate.application_ref}</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-slate-700">
              <div><strong>आवेदित पद:</strong> {selectedCandidate.applied_post}</div>
              <div><strong>पिता का नाम:</strong> {selectedCandidate.father_name}</div>
              <div><strong>माता का नाम:</strong> {selectedCandidate.mother_name || 'N/A'}</div>
              <div><strong>जन्म तिथि / लिंग:</strong> {selectedCandidate.dob} ({selectedCandidate.gender})</div>
              <div><strong>श्रेणी:</strong> {selectedCandidate.category}</div>
              <div><strong>मोबाइल:</strong> {selectedCandidate.mobile}</div>
              <div><strong>ईमेल:</strong> {selectedCandidate.email || 'N/A'}</div>
              <div><strong>12-अंकीय UTR:</strong> <span className="text-emerald-700 font-bold">{selectedCandidate.utr_number}</span></div>
              <div><strong>शुल्क राशि:</strong> ₹{selectedCandidate.amount}</div>
              <div><strong>पंजीकरण समय:</strong> {new Date(selectedCandidate.created_at).toLocaleString('en-IN')}</div>
              <div>
                <strong>वर्तमान भुगतान स्थिति: </strong>
                {selectedCandidate.payment_status === 'verified' ? (
                  <span className="text-emerald-700 font-bold">PAID (सत्यापित)</span>
                ) : (
                  <span className="text-amber-700 font-bold">PENDING (सत्यापन प्रक्रियाधीन)</span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold cursor-pointer"
              >
                बंद करें (Close)
              </button>

              <button
                onClick={() => handleTogglePaymentStatus(selectedCandidate.application_ref, selectedCandidate.payment_status)}
                className={`px-4 py-2 rounded-lg font-bold text-white transition cursor-pointer ${
                  selectedCandidate.payment_status === 'verified' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                {selectedCandidate.payment_status === 'verified' ? 'Mark as Unpaid' : 'Mark as Paid (सत्यापित करें)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
