import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Mobile Funnel Builder</h1>
      <div className="flex justify-center space-x-4">
        <Link href="/login">
          <Button size="lg">Anmelden</Button>
        </Link>
        <Link href="/register">
          <Button size="lg" variant="outline">Registrieren</Button>
        </Link>
        <Link href="/demo">
          <Button size="lg" variant="secondary">Demo</Button>
        </Link>
      </div>
    </div>
  );
}