import { Startup } from '@/lib/types';
import { StartupCard } from './StartupCard';

interface StartupGridProps {
  startups: Startup[];
  columns?:  |  | ; // Desktop-only
}

export function StartupGrid({ startups, columns =  }: StartupGridProps) {
  const gridClass = {
    : 'grid-cols-',
    : 'grid-cols-',
    : 'grid-cols-',
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {startups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
}