import { Briefcase, FileText, Home, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import TopHeader from '../components/TopHeader';
import PageFooter from '../components/PageFooter';
import OptionCard from '../components/OptionCard';

interface ContractOption {
  title: string;
  href: string;
  icon: LucideIcon;
}

const contractOptions: ContractOption[] = [
  { title: 'Contrato laboral', href: 'Contrato laboral.html', icon: Briefcase },
  { title: 'Arrendamiento', href: 'Arrendamiento.html', icon: Home },
  { title: 'Confidencialidad', href: 'Confidencial.html', icon: Shield },
];

export default function Inicio() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-bg-light">
      <TopHeader active="inicio" />

      <main className="flex flex-1 flex-col items-center p-10">
        <div className="mb-[50px] flex w-full items-center justify-between rounded-[15px] bg-primary px-[30px] py-5 text-white shadow-[0_4px_10px_rgba(75,59,255,0.3)]">
          <h1 className="text-[22px] font-semibold">
            Tu contrato, hecho a tu medida, cláusula por cláusula
          </h1>
          <FileText className="h-10 w-10 fill-none stroke-white" strokeWidth={2} />
        </div>

        <div className="flex w-full justify-center gap-[30px]">
          {contractOptions.map((option) => (
            <OptionCard key={option.title} icon={option.icon} title={option.title} href={option.href} />
          ))}
        </div>
      </main>

      <PageFooter />
    </div>
  );
}