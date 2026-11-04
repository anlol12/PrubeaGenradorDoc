import { Download } from 'lucide-react';

interface DocumentItemProps {
  status: string;
}

export default function DocumentItem({ status }: DocumentItemProps) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="h-[45px] flex-1 rounded-[10px] bg-card" />
      <div className="flex min-w-[120px] items-center gap-2 text-sm font-semibold">
        {status}
        <Download className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </div>
  );
}