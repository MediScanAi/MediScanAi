import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: applicationDefault(),
    projectId: 'mediscan-ai-app',
  });
}

const db = admin.firestore();

export const receiveHealthData = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { uid, data } = req.body;

  if (!uid || !Array.isArray(data)) {
    res.status(400).send('Invalid uid or data');
    return;
  }

  try {
    const cleanUid = String(uid).trim();
    const docRef = db.collection('users').doc(cleanUid);

    const userDocSnap = await docRef.get();

    if (!userDocSnap.exists) {
      res.status(404).send(`User with uid ${cleanUid} not found`);
      return;
    }

    const groupedByDate: { [key: string]: string[] } = {};

    data.forEach((entry) => {
      const date = entry.date?.split('T')[0];
      if (!date) return;
      if (!groupedByDate[date]) groupedByDate[date] = [];
      groupedByDate[date].push(entry);
    });

    const batch = db.batch();

    for (const [date, entries] of Object.entries(groupedByDate)) {
      const ref = docRef.collection('healthData').doc(date);
      batch.set(ref, {
        date,
        entries,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
    res.status(200).send('Health data saved');
  } catch {
    res.status(500).send('Error saving health data');
  }
});

export default receiveHealthData;
