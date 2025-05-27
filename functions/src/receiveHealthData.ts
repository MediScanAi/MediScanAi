import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

if (!admin.apps.length) admin.initializeApp();
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
    const groupedByDate: { [key: string]: string[] } = {};

    data.forEach((entry) => {
      const date = entry.date?.split('T')[0];
      if (!date) return;
      if (!groupedByDate[date]) groupedByDate[date] = [];
      groupedByDate[date].push(entry);
    });

    const batch = db.batch();

    for (const [date, entries] of Object.entries(groupedByDate)) {
      const ref = db
        .collection('users')
        .doc(uid)
        .collection('healthData')
        .doc(date);
      batch.set(ref, {
        date,
        entries,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
    res.status(200).send('Health data saved');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving health data');
  }
});

export default receiveHealthData;
