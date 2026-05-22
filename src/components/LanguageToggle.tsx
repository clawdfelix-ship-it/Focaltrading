import Link from 'next/link';

interface LanguageToggleProps {
  lang: 'zh' | 'en';
}

export default function LanguageToggle({ lang }: LanguageToggleProps) {
  // Chinese site root is /, English is /en/
  const otherLang = lang === 'en' ? 'zh' : 'en';
  const otherPath = lang === 'en' ? '/' : '/en/';
  const currentLabel = lang === 'en' ? 'EN' : '中文';
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