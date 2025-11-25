// src/components/admin/ReservationManagement.tsx
import { useState, useEffect, SetStateAction } from 'react';
import { Heart, LogOut, LayoutDashboard, Stethoscope, Briefcase, ClipboardList, Filter, CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { listenToReservations } from '@/services/reservation';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface ReservationManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export type Reservation = {
  id: string;
  queueNumber?: string;
  patientName: string;
  email: string;
  phone: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  status: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai';
  notes?: string;
  createdAt?: any;
};

export default function ReservationManagement({ onNavigate, onLogout }: ReservationManagementProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filterDoctor, setFilterDoctor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');

  // Ambil data real-time dari Firebase
  useEffect(() => {
    const unsubscribe = listenToReservations((data: { map: (arg0: (item: { id: any; status: string; }) => { id: any; status: string; }) => Reservation[]; }) => {
      const formatted = data.map((item: { id: any; status: string; }) => ({
        ...item,
        id: item.id,
        status: item.status === 'pending' ? 'Menunggu' :
                item.status === 'confirmed' ? 'Dikonfirmasi' :
                item.status === 'done' ? 'Selesai' :
                item.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu'
      })) as Reservation[];
      setReservations(formatted);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = (id: string, newStatus: 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai') => {
    setReservations(prev => prev.map(r => 
      r.id === id ? { ...r, status: newStatus } : r
    ));
    // Nanti di sini tambah update ke Firebase
  };

  const filteredReservations = reservations.filter(r => {
    if (filterDoctor !== 'all' && r.doctor !== filterDoctor) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (filterDate && r.date !== filterDate) return false;
    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Dikonfirmasi': return 'bg-green-100 text-green-700';
      case 'Menunggu': return 'bg-yellow-100 text-yellow-700';
      case 'Dibatalkan': return 'bg-red-100 text-red-700';
      case 'Selesai': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar sama persis */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-green-600 text-white p-6">
        {/* ... sidebar kamu tetap sama ... */}
        <nav className="space-y-2">
          <button onClick={() => onNavigate('admin-dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-5 h-5" /> <span>Dashboard</span>
          </button>
          <button onClick={() => onNavigate('admin-doctors')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Stethoscope className="w-5 h-5" /> <span>Manajemen Dokter</span>
          </button>
          <button onClick={() => onNavigate('admin-services')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Briefcase className="w-5 h-5" /> <span>Manajemen Layanan</span>
          </button>
          <button onClick={() => onNavigate('admin-reservations')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
            <ClipboardList className="w-5 h-5" /> <span>Manajemen Reservasi</span>
          </button>
        </nav>
        <div className="mt-auto pt-8">
          <Button onClick={onLogout} variant="ghost" className="w-full text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900">Manajemen Reservasi</h1>
              <p className="text-gray-600">Kelola semua reservasi pasien secara real-time</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-700 px-4 py-2 text-lg">
              {reservations.filter(r => r.status === 'Menunggu').length} Menunggu Konfirmasi
            </Badge>
          </div>
        </header>

        <div className="p-8">
          {/* Filter tetap sama */}
          <Card className="border-2 border-gray-100 mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <CardTitle>Filter Reservasi</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Dokter</label>
                  <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                    <SelectTrigger><SelectValue placeholder="Semua Dokter" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Dokter</SelectItem>
                      <SelectItem value="Dr. Sarah Wijaya, Sp.PD">Dr. Sarah Wijaya, Sp.PD</SelectItem>
                      <SelectItem value="Dr. Ahmad Hartono, Sp.JP">Dr. Ahmad Hartono, Sp.JP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger><SelectValue placeholder="Semua Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="Menunggu">Menunggu</SelectItem>
                      <SelectItem value="Dikonfirmasi">Dikonfirmasi</SelectItem>
                      <SelectItem value="Selesai">Selesai</SelectItem>
                      <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Tanggal</label>
                  <Input type="date" value={filterDate} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFilterDate(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <Button onClick={() => { setFilterDoctor('all'); setFilterStatus('all'); setFilterDate(''); }} variant="outline" className="w-full">
                    Reset Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daftar Reservasi */}
          <div className="space-y-4">
            {filteredReservations.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent><p className="text-gray-500">Tidak ada reservasi yang sesuai filter</p></CardContent>
              </Card>
            ) : (
              filteredReservations.map((r) => (
                <Card key={r.id} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white">
                          <div className="text-center">
                            <p className="text-xs">No.</p>
                            <p className="text-lg">{r.queueNumber || '—'}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{r.patientName}</h4>
                          <p className="text-sm text-gray-600">{r.service}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{r.date}</div>
                            <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{r.time}</div>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusBadgeClass(r.status)}>{r.status}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl text-sm">
                      <div><strong>Dokter:</strong> {r.doctor}</div>
                      <div><strong>Email:</strong> {r.email}</div>
                      <div><strong>Telepon:</strong> {r.phone}</div>
                    </div>

                    {r.notes && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-xl text-sm">
                        <strong>Catatan:</strong> {r.notes}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {r.status === 'Menunggu' && (
                        <>
                          <Button onClick={() => updateStatus(r.id, 'Dikonfirmasi')} size="sm" className="bg-green-500 hover:bg-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" /> Konfirmasi
                          </Button>
                          <Button onClick={() => updateStatus(r.id, 'Dibatalkan')} size="sm" variant="outline" className="text-red-600 border-red-300">
                            <XCircle className="w-4 h-4 mr-1" /> Batalkan
                          </Button>
                        </>
                      )}
                      {r.status === 'Dikonfirmasi' && (
                        <Button onClick={() => updateStatus(r.id, 'Selesai')} size="sm" className="bg-blue-500 hover:bg-blue-600">
                          <CheckCircle className="w-4 h-4 mr-1" /> Tandai Selesai
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}