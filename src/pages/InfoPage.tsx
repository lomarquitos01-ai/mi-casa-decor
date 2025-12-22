import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const pageContent: Record<string, { title: string; content: string }> = {
  sobre: {
    title: 'Nuestra Historia',
    content: `
      <p class="mb-6">Fundada en 2020, MI CASA nació de la pasión por crear espacios que inspiran. Nuestro objetivo siempre ha sido ofrecer productos de calidad excepcional que transforman cualquier hogar en un refugio de elegancia y confort.</p>
      <p class="mb-6">Cada pieza de nuestra colección es cuidadosamente seleccionada, priorizando materiales sostenibles, diseño atemporal y artesanía de calidad. Trabajamos directamente con artesanos y fabricantes que comparten nuestra visión de excelencia.</p>
      <p>Creemos que el hogar es más que un lugar: es una extensión de quiénes somos. Por eso, nos dedicamos a encontrar objetos que no solo decoran, sino que cuentan historias y crean momentos memorables.</p>
    `,
  },
  sostenibilidad: {
    title: 'Sostenibilidad',
    content: `
      <p class="mb-6">En MI CASA, la sostenibilidad no es una tendencia, es un compromiso fundamental. Trabajamos constantemente para reducir nuestro impacto ambiental en cada etapa de nuestro negocio.</p>
      <h3 class="font-serif text-xl mb-4">Nuestros Compromisos</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Materiales naturales y reciclables en nuestros productos</li>
        <li>Embalajes 100% reciclados y reciclables</li>
        <li>Colaboración con proveedores locales para reducir la huella de carbono</li>
        <li>Productos diseñados para durar, no para ser reemplazados</li>
      </ul>
      <p>Cada decisión que tomamos considera el impacto en nuestro planeta, porque creemos que un hogar hermoso debe contribuir a un mundo más sostenible.</p>
    `,
  },
  artesanos: {
    title: 'Artesanos Colaboradores',
    content: `
      <p class="mb-6">Detrás de cada producto MI CASA hay manos expertas y tradiciones centenarias. Colaboramos con artesanos de toda España y el mundo que comparten nuestra pasión por la excelencia.</p>
      <p class="mb-6">Nuestros colaboradores son maestros en cerámica, textiles, madera y metal. Cada uno aporta técnicas únicas transmitidas de generación en generación, fusionadas con diseño contemporáneo.</p>
      <p>Valoramos y apoyamos el comercio justo, asegurando que cada artesano reciba una compensación justa por su trabajo excepcional.</p>
    `,
  },
  prensa: {
    title: 'Prensa',
    content: `
      <p class="mb-6">Para consultas de prensa, colaboraciones editoriales o solicitudes de imágenes, por favor contacta con nuestro equipo de comunicación.</p>
      <p class="mb-6"><strong>Email:</strong> prensa@micasa.es</p>
      <p>Estaremos encantados de proporcionar información sobre nuestros productos, historia de marca y visión empresarial.</p>
    `,
  },
  carreras: {
    title: 'Carreras',
    content: `
      <p class="mb-6">¿Te apasiona el diseño de interiores y los productos para el hogar? Nos encantaría conocerte.</p>
      <p class="mb-6">En MI CASA buscamos personas creativas, comprometidas y con ganas de formar parte de un equipo que valora la calidad y la atención al detalle.</p>
      <p>Envía tu CV a <strong>carreras@micasa.es</strong> y cuéntanos por qué te gustaría unirte a nuestra familia.</p>
    `,
  },
  contacto: {
    title: 'Contacto',
    content: `
      <p class="mb-6">Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros.</p>
      <div class="space-y-4 mb-6">
        <p><strong>Email:</strong> hola@micasa.es</p>
        <p><strong>Teléfono:</strong> +34 900 123 456</p>
        <p><strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00</p>
      </div>
      <p><strong>Dirección:</strong><br/>Calle del Diseño, 123<br/>28001 Madrid, España</p>
    `,
  },
  envios: {
    title: 'Envíos',
    content: `
      <h3 class="font-serif text-xl mb-4">Política de Envíos</h3>
      <p class="mb-6">Realizamos envíos a toda España peninsular, Baleares y Canarias.</p>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li><strong>Envío estándar (3-5 días):</strong> €4,95</li>
        <li><strong>Envío express (1-2 días):</strong> €9,95</li>
        <li><strong>Envío gratuito:</strong> En compras superiores a €99</li>
      </ul>
      <p>Los pedidos realizados antes de las 14:00 se procesan el mismo día laborable.</p>
    `,
  },
  cambios: {
    title: 'Cambios y Devoluciones',
    content: `
      <p class="mb-6">Tu satisfacción es nuestra prioridad. Si no estás completamente satisfecho con tu compra, aceptamos devoluciones dentro de los 30 días siguientes a la recepción.</p>
      <h3 class="font-serif text-xl mb-4">Condiciones</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Los productos deben estar sin usar y en su embalaje original</li>
        <li>Incluye el ticket de compra o confirmación del pedido</li>
        <li>Los gastos de devolución corren a cargo del cliente, excepto en caso de defecto</li>
      </ul>
      <p>Para iniciar una devolución, contacta con nosotros en devoluciones@micasa.es</p>
    `,
  },
  faq: {
    title: 'Preguntas Frecuentes',
    content: `
      <div class="space-y-6">
        <div>
          <h3 class="font-serif text-lg mb-2">¿Cuánto tarda mi pedido en llegar?</h3>
          <p class="text-muted-foreground">Los pedidos estándar llegan en 3-5 días laborables. El envío express tarda 1-2 días.</p>
        </div>
        <div>
          <h3 class="font-serif text-lg mb-2">¿Puedo hacer seguimiento de mi pedido?</h3>
          <p class="text-muted-foreground">Sí, recibirás un email con el número de seguimiento cuando tu pedido sea enviado.</p>
        </div>
        <div>
          <h3 class="font-serif text-lg mb-2">¿Los productos tienen garantía?</h3>
          <p class="text-muted-foreground">Todos nuestros productos tienen garantía de 2 años contra defectos de fabricación.</p>
        </div>
        <div>
          <h3 class="font-serif text-lg mb-2">¿Puedo cambiar mi dirección de envío?</h3>
          <p class="text-muted-foreground">Sí, siempre que el pedido no haya sido enviado. Contacta con nosotros lo antes posible.</p>
        </div>
      </div>
    `,
  },
  privacidad: {
    title: 'Política de Privacidad',
    content: `
      <p class="mb-6">En MI CASA nos tomamos muy en serio la protección de tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.</p>
      <h3 class="font-serif text-xl mb-4">Datos que Recopilamos</h3>
      <p class="mb-6">Recopilamos información que nos proporcionas directamente, como nombre, email, dirección de envío y datos de pago para procesar tus pedidos.</p>
      <h3 class="font-serif text-xl mb-4">Uso de los Datos</h3>
      <p class="mb-6">Utilizamos tus datos únicamente para procesar pedidos, mejorar nuestros servicios y, si lo autorizas, enviarte comunicaciones comerciales.</p>
      <p>Nunca vendemos ni compartimos tus datos con terceros, excepto los necesarios para procesar pagos y envíos.</p>
    `,
  },
  terminos: {
    title: 'Términos y Condiciones',
    content: `
      <p class="mb-6">Al utilizar nuestra tienda online, aceptas los siguientes términos y condiciones.</p>
      <h3 class="font-serif text-xl mb-4">Uso del Sitio</h3>
      <p class="mb-6">Este sitio es para uso personal y no comercial. No está permitido reproducir, duplicar o revender ningún contenido sin autorización.</p>
      <h3 class="font-serif text-xl mb-4">Precios y Disponibilidad</h3>
      <p class="mb-6">Los precios pueden cambiar sin previo aviso. Nos reservamos el derecho de modificar o descontinuar productos en cualquier momento.</p>
      <h3 class="font-serif text-xl mb-4">Limitación de Responsabilidad</h3>
      <p>MI CASA no será responsable de daños indirectos, incidentales o consecuentes derivados del uso de nuestros productos o servicios.</p>
    `,
  },
  cuenta: {
    title: 'Mi Cuenta',
    content: `
      <p class="mb-6">La funcionalidad de cuenta de usuario estará disponible próximamente.</p>
      <p>Mientras tanto, puedes realizar tus compras como invitado y recibirás confirmaciones por email.</p>
    `,
  },
};

const InfoPage = () => {
  const { page } = useParams<{ page: string }>();
  const location = useLocation();
  
  const pageSlug = page || location.pathname.replace('/', '');
  const pageData = pageContent[pageSlug];

  if (!pageData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="heading-display text-foreground mb-4">Página no encontrada</h1>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-wide max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver
          </Link>

          <div className="mb-12">
            <h1 className="heading-display text-foreground mb-8">{pageData.title}</h1>
            <div 
              className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfoPage;