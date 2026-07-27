import { FeedingLog } from '../types';

export const exportToCSV = (data: FeedingLog[]) => {
  const headers = ['Date', 'Food Type', 'Amount', 'Notes'];
  const rows = data.map(log => [
    new Date(log.timestamp).toLocaleString(),
    log.foodType,
    log.amount,
    log.notes || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // In a real app, you would use expo-sharing and expo-file-system to save/share this
  console.log('Exported CSV Content:', csvContent);
  return csvContent;
};