// src/services/reservation.ts
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import type { Reservation } from '@/types/reservation';

export const listenToReservations = (callback: (reservations: Reservation[]) => void) => {
  const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const reservations: Reservation[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      reservations.push({
        id: doc.id,
        queueNumber: data.queueNumber ?? '',
        patientName: data.patientName ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        doctor: data.doctor ?? '',
        service: data.service ?? '',
        date: data.date ?? '',
        time: data.time ?? '',
        status: data.status === 'confirmed' ? 'Dikonfirmasi' :
                data.status === 'cancelled' ? 'Dibatalkan' :
                data.status === 'done' ? 'Selesai' : 'Menunggu',
        notes: data.notes ?? '',
        createdAt: data.createdAt ?? null,
      } as Reservation);
    });
    callback(reservations);
  });

  return unsubscribe;
};