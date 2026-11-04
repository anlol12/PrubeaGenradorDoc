import { Link } from './Link';

const footerLinks = [
  { label: 'Términos', href: '#' },
  { label: 'Privacidad', href: '#' },
  { label: 'Acceso interno', href: 'Resumen.html' },
];

export default function PageFooter() {
  return (
    <footer className="mt-auto flex w-full shrink-0 justify-end gap-[15px] px-10 py-5">
      {footerLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="cursor-pointer rounded-[20px] px-5 py-2 text-[13px] font-semibold text-main transition-colors duration-200 hover:bg-card-hover"
        >
          {item.label}
        </Link>
      ))}
    </footer>
  );
}