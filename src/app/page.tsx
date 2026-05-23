import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLang = headersList.get('accept-language') || '';

  // Detect Chinese (zh, zh-HK, zh-TW, zh-CN, etc.)
  const isChinese = /zh/i.test(acceptLang);

  redirect(isChinese ? '/zh/' : '/en/');
}