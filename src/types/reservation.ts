// src/types/reservation.ts
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