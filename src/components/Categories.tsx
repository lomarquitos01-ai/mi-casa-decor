import { Link } from 'react-router-dom';

import categoryKitchen from '@/assets/category-kitchen.jpg';
import categoryOrganization from '@/assets/category-organization.jpg';
import categoryDecor from '@/assets/category-decor.jpg';
import categoryTable from '@/assets/category-table.jpg';
import categoryBathroom from '@/assets/category-bathroom.jpg';
import categoryLighting from '@/assets/category-lighting.jpg';

const categories = [
  {
    name: 'Cocina',
    description: 'Cerámicas y utensilios artesanales',
    image: categoryKitchen,
    href: '/cocina',
  },
  {
    name: 'Organización',
    description: 'Cestas y cajas en fibras naturales',
    image: categoryOrganization,
    href: '/organizacion',
  },
  {
    name: 'Decoración',
    description: 'Jarrones, esculturas y objetos únicos',
    image: categoryDecor,
    href: '/decoracion',
  },
  {
    name: 'Mesa',
    description: 'Para momentos memorables',
    image: categoryTable,
    href: '/mesa',
  },
  {
    name: 'Baño',
    description: 'Accesorios en materiales nobles',
    image: categoryBathroom,
    href: '/bano',
  },
  {
    name: 'Iluminación',
    description: 'Luz que transforma ambientes',
    image: categoryLighting,
    href: '/iluminacion',
  },
];

export const Categories = () => {
  return (
    <section className="section-spacing bg-cream">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-caption mb-3">Categorías</p>
          <h2 className="heading-section text-foreground">
            Explora Nuestra Curaduría
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-[4/5] overflow-hidden bg-muted animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide text-background mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-background/80 tracking-wide">
                  {category.description}
                </p>

                {/* Underline animation */}
                <div className="mt-4 h-px bg-background/40 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-0 bg-background group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
