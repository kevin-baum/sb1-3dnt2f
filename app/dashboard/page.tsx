'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [funnels, setFunnels] = useState([
    { id: 1, name: 'Mein erster Funnel', status: 'active' },
    { id: 2, name: 'Produkt Launch', status: 'draft' },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6">
        <Link href="/builder">
          <Button>Neuen Funnel erstellen</Button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {funnels.map((funnel) => (
              <tr key={funnel.id}>
                <td className="px-6 py-4 whitespace-nowrap">{funnel.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{funnel.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/builder/${funnel.id}`}>
                    <Button variant="outline" size="sm">Bearbeiten</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}