import AdminHeader from '@/components/AdminHeader';
import AdminFooter from '@/components/AdminFooter';
import { AdminClientWrapper } from '@/components/AdminClientWrapper';

interface BackgroundResponse {
  url?: string;
  background?: string;
}

async function getRandomBackground(): Promise<string> {
  try {
    const response = await fetch('https://picsum.photos/1920/1080?random=' + Date.now(), {
      method: 'GET',
      cache: 'no-store',
    });
    return response.url || '';
  } catch {
    return '';
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const backgroundUrl = await getRandomBackground();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      {backgroundUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
        />
      )}

      {/* Dark Overlay with Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <AdminHeader />
        <AdminClientWrapper>
          <main className="flex-1 container mx-auto px-4 py-8 w-full">{children}</main>
        </AdminClientWrapper>
        <AdminFooter />
      </div>
    </div>
  );
}
