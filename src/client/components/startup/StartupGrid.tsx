import { Startup } from '@/lib/types';
import { StartupCard } from './StartupCard';

interface StartupGridProps {
  startups: Startup[];
  columns?: 4 | 3 | 2; // Desktop-only
}

export function StartupGrid({ startups, columns = 4 }: StartupGridProps) {
  const gridClass = {
    4: 'grid-cols-4',
    3: 'grid-cols-3',
    2: 'grid-cols-2',
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {startups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
}