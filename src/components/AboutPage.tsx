import { Heart, ArrowLeft, Award, Users, Clock, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const features = [
  {
    icon: Award,
    title: 'Tenaga Medis Profesional',
    description: 'Dokter bersertifikat dan berpengalaman lebih dari 10 tahun di bidangnya',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Clock,
    title: 'Sistem Antrian Modern',
    description: 'Reservasi online dan pemantauan antrian real-time untuk kenyamanan Anda',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Shield,
    title: 'Fasilitas Lengkap',
    description: 'Peralatan medis modern dan ruangan yang nyaman serta steril',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Users,
    title: 'Pelayanan Ramah',
    description: 'Staf medis dan non-medis yang siap membantu dengan penuh perhatian',
    color: 'bg-yellow-100 text-yellow-600'
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-blue-900">KlinikSehat</h1>
                <p className="text-xs text-gray-500">Kesehatan Anda, Prioritas Kami</p>
              </div>
            </div>
            <nav className="flex items-center gap-8">
              <button onClick={() => onNavigate('landing')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Beranda
              </button>
              <button onClick={() => onNavigate('queue')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Status Antrian
              </button>
              <button onClick={() => onNavigate('about')} className="text-blue-600">
                Tentang Kami
              </button>
              <Button onClick={() => onNavigate('reservation')} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Reservasi Sekarang
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl mb-6">Tentang KlinikSehat</h2>
          <p className="text-xl text-blue-50 max-w-3xl mx-auto">
            Penyedia layanan kesehatan terpercaya dengan sistem reservasi online yang memudahkan akses Anda ke layanan medis berkualitas
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Button onClick={() => onNavigate('landing')} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl text-gray-900 mb-6">Cerita Kami</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                KlinikSehat didirikan pada tahun 2015 dengan visi memberikan akses layanan kesehatan yang mudah, 
                cepat, dan berkualitas untuk semua kalangan. Kami memahami bahwa waktu adalah hal yang berharga, 
                terutama dalam urusan kesehatan.
              </p>
              <p>
                Dengan sistem reservasi online yang kami kembangkan, pasien tidak perlu lagi menghabiskan waktu 
                berjam-jam untuk menunggu antrian. Cukup dengan beberapa klik, Anda dapat membuat janji dengan 
                dokter pilihan dan memantau status antrian secara real-time.
              </p>
              <p>
                Hingga saat ini, kami telah melayani lebih dari 10,000 pasien dengan tingkat kepuasan mencapai 
                95%. Tim medis kami terdiri dari dokter-dokter berpengalaman di berbagai spesialisasi, didukung 
                oleh fasilitas modern dan staf yang ramah.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=500&fit=crop" 
              alt="Clinic interior" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl text-gray-900 mb-12 text-center">Mengapa Memilih KlinikSehat?</h3>
          <div className="grid grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-12 text-white mb-20">
          <h3 className="text-3xl mb-12 text-center">KlinikSehat dalam Angka</h3>
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl mb-2">10+</p>
              <p className="text-blue-100">Tahun Berpengalaman</p>
            </div>
            <div className="text-center">
              <p className="text-5xl mb-2">15+</p>
              <p className="text-blue-100">Dokter Profesional</p>
            </div>
            <div className="text-center">
              <p className="text-5xl mb-2">10K+</p>
              <p className="text-blue-100">Pasien Terlayani</p>
            </div>
            <div className="text-center">
              <p className="text-5xl mb-2">95%</p>
              <p className="text-blue-100">Tingkat Kepuasan</p>
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="grid grid-cols-2 gap-8">
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle className="text-gray-900">Lokasi Kami</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">
                Jl. Kesehatan Raya No. 123<br />
                Jakarta Selatan 12345<br />
                Indonesia
              </p>
              <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <p className="text-gray-500">Map Placeholder</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle className="text-gray-900">Hubungi Kami</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Telepon</p>
                <p className="text-gray-900">(021) 1234-5678</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                <p className="text-gray-900">+62 812-3456-7890</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-gray-900">info@kliniksehat.id</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Jam Operasional</p>
                <p className="text-gray-900">Senin - Minggu: 08:00 - 20:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl text-gray-900 mb-4">Siap untuk Reservasi?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Buat janji konsultasi dengan dokter pilihan Anda sekarang juga
          </p>
          <Button onClick={() => onNavigate('reservation')} size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            Buat Reservasi Sekarang
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">&copy; 2025 KlinikSehat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
