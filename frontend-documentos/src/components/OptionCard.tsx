import type { LucideIcon } from 'lucide-react';
import { Link } from './Link';

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  href: string;
}

export default function OptionCard({ icon: Icon, title, href }: OptionCardProps) {
  return (
    <div className="flex max-w-[250px] flex-1 cursor-pointer flex-col gap-5 rounded-[15px] bg-card p-[25px] transition duration-200 hover:-translate-y-[3px] hover:bg-card-hover">
      <Icon className="h-[35px] w-[35px] fill-[#111]" strokeWidth={2} />
      <Link
        href={href}
        target="_blank"
        className="flex max-w-[225px] flex-1 cursor-pointer flex-col gap-[15px] rounded-[10px] p-[15px] text-[#111] no-underline transition duration-200"
      >
        <h3 className="text-base font-semibold">{title}</h3>
      </Link>
    </div>
  );
}