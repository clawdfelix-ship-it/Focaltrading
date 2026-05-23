import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageToggleProps {
  lang: 'zh' | 'en';
}

export default function LanguageToggle({ lang }: LanguageToggleProps) {
  const pathname = usePathname();
  const otherLang = lang === 'en' ? 'zh' : 'en';

  // Replace /en/ prefix with /zh/ or vice versa
  const otherPath = pathname.replace(/^\/(en|zh)/, `/${otherLang}`);

  const otherLabel = lang === 'en' ? '中文' : 'EN';

  return (
    <div className="flex items-center gap-1 text-sm">
      <Link
        href={otherPath}
        className="text-[#6c757d] hover:text-[#e94560] transition-colors duration-150"
      >
        {otherLabel}
      </Link>
    </div>
  );
}