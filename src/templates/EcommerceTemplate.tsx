import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { Input } from '@/components/ui/input'
import { ScrollLink } from '@/components/ScrollLink'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()

  const header = (
    <div className={`py-4 backdrop-blur-xl bg-background/80 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogoLeft />

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <ScrollLink 
                to="/#products" 
                className="text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-wider"
              >
                SHOP
              </ScrollLink>
              <Link 
                to="/blog" 
                className="text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-wider"
              >
                JOURNAL
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-white/5"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-secondary/30 border-t border-white/10 py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive KINETIC Logo */}
        <div className="mb-12 overflow-hidden">
          <h2 className="text-[15vw] font-black tracking-tighter text-foreground/5 leading-none">
            KINETIC
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
          {/* Manifest */}
          <div>
            <p className="text-primary tracking-widest mb-4">MANIFEST</p>
            <div className="space-y-2 text-muted-foreground">
              <Link 
                to="/" 
                className="block hover:text-foreground transition-colors"
              >
                HOME
              </Link>
              <Link 
                to="/blog" 
                className="block hover:text-foreground transition-colors"
              >
                JOURNAL
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-primary tracking-widest mb-4">CONNECT</p>
            <SocialLinks />
          </div>

          {/* Legal */}
          <div>
            <p className="text-primary tracking-widest mb-4">LEGAL</p>
            <div className="space-y-2 text-muted-foreground">
              <p>© 2025 KINETIC AUDIO</p>
              <p>ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}