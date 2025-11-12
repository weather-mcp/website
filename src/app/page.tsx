import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { QuickStart } from '@/components/home/QuickStart';
import { Stats } from '@/components/home/Stats';
import { CTA } from '@/components/home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <QuickStart />
      <Stats />
      <CTA />
    </>
  );
}
