import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Zap, Play } from 'lucide-react';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    filteredProducts,
  } = logic;

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section - Full Screen Immersive */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background spotlight effect */}
        <div className="absolute inset-0 spotlight opacity-50"></div>
        
        {/* Giant background text "SILENCE" */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-5">
          <h2 className="text-[30vw] font-black tracking-tighter text-foreground select-none">
            SILENCE
          </h2>
        </div>

        {/* Hero Video */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="relative">
            <video 
              src="/videos/hero-headphones-rotate.mp4" 
              poster="/videos/hero-headphones-rotate-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 80px rgba(204, 255, 0, 0.15))' }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <Button 
            size="lg" 
            className="glass text-lg px-8 py-6 font-bold tracking-wider hover:border-glow transition-all duration-300"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            PRE-ORDER — $599
          </Button>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="border-y border-white/10 py-4 bg-secondary/50">
        <div className="marquee-container overflow-hidden">
          <div className="marquee-content flex whitespace-nowrap animate-marquee">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center text-muted-foreground font-mono text-sm tracking-widest">
                <span className="mx-8">ANC 3.0</span>
                <Zap className="h-4 w-4 mx-8 text-primary" />
                <span className="mx-8">TITANIUM DRIVERS</span>
                <Zap className="h-4 w-4 mx-8 text-primary" />
                <span className="mx-8">SPATIAL AUDIO</span>
                <Zap className="h-4 w-4 mx-8 text-primary" />
                <span className="mx-8">40H BATTERY</span>
                <Zap className="h-4 w-4 mx-8 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spec Sheet Grid - Bento Style */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 - Ear Cup Detail */}
          <div className="group relative aspect-square overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow">
            <img 
              src="/hero-headphones.jpg" 
              alt="Ear cup detail"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-xs text-primary tracking-widest mb-2">MATERIAL</p>
              <h3 className="text-2xl font-bold">Premium Leather</h3>
            </div>
          </div>

          {/* Card 2 - Frequency Graph */}
          <div className="group relative aspect-square overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow bg-secondary/30 flex items-center justify-center">
            <div className="p-8 w-full">
              <p className="font-mono text-xs text-primary tracking-widest mb-6">FREQUENCY RESPONSE</p>
              <div className="flex items-end justify-between h-48 gap-2">
                {[40, 60, 95, 100, 90, 70, 85, 95, 80, 60, 50, 40, 35].map((height, i) => (
                  <div 
                    key={i}
                    className="flex-1 bg-primary/20 hover:bg-primary transition-all duration-300"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4">20Hz — 20kHz</p>
            </div>
          </div>

          {/* Card 3 - Lifestyle Shot 1 */}
          <div className="group relative aspect-square overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow">
            <img 
              src="/lifestyle-1.jpg" 
              alt="Lifestyle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Card 4 - Lifestyle Shot 2 */}
          <div className="group relative aspect-square overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow">
            <img 
              src="/lifestyle-2.jpg" 
              alt="Lifestyle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Sound Check Section */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <Button 
            size="icon" 
            className="h-24 w-24 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary transition-all duration-300"
          >
            <Play className="h-10 w-10 text-primary fill-primary" />
          </Button>
        </div>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-gradient">
          HEAR THE UNSEEN
        </h2>
        <p className="text-muted-foreground font-mono text-sm tracking-wider">
          IMMERSIVE SPATIAL AUDIO TECHNOLOGY
        </p>
      </section>

      {/* Products Section - Modular Parts */}
      {!loadingCollections && collections.find(c => c.handle === 'modular-parts') && (
        <section id="products" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="font-mono text-xs text-primary tracking-widest mb-4">SHOP</p>
            <h2 className="text-5xl font-black tracking-tight">Productos inspirados en Batman!</h2>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-6 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
                {filteredProducts
                  .filter(p => p.slug !== 'kinetic-pro')
                  .map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-80" style={{ scrollSnapAlign: 'start' }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Featured Product - KINETIC PRO */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs text-primary tracking-widest mb-4">FLAGSHIP</p>
          <h2 className="text-5xl font-black tracking-tight">KINETIC PRO</h2>
        </div>
        
        {loading ? (
          <div className="bg-card rounded-lg h-96 animate-pulse"></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts
              .filter(p => p.slug === 'kinetic-pro')
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};