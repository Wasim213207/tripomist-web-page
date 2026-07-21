import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DynamicPage = ({ pageKey }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('website_pages')
          .select('*')
          .eq('page_key', pageKey)
          .eq('is_active', true)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') console.error('Error fetching page:', error);
          setPageData(null);
        } else {
          setPageData(data);
          if (data.seo_title) document.title = data.seo_title;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [pageKey]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-container-lowest">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-container-lowest">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Page Not Found</h1>
          <p className="text-on-surface-variant">The page you are looking for does not exist or is currently inactive.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const { title, subtitle, hero_image_url, content } = pageData;
  const contentObj = content || {};
  const paragraphs = contentObj.paragraphs || [];
  const sections = contentObj.sections || [];
  const contact = contentObj.contact || null;

  return (
    <div className="bg-surface text-on-surface antialiased font-body-md min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={hero_image_url || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center justify-end px-4 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white border border-[#bec8d2]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#006591]"></div>
          
          <h1 className="text-3xl font-bold mb-8 text-on-surface">{title}</h1>

          <div className="space-y-6 text-[#3e4850] leading-relaxed">
            {/* Render Paragraphs */}
            {paragraphs.map((p, idx) => (
              <p key={`p-${idx}`}>{p}</p>
            ))}

            {/* Render Sections */}
            {sections.map((sec, idx) => (
              <section key={`sec-${idx}`} className="mt-8">
                {sec.heading && <h2 className="text-xl font-bold text-on-surface mb-3">{sec.heading}</h2>}
                {sec.text && <p className="mb-3">{sec.text}</p>}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Render Contact Block if exists */}
            {contact && (contact.email || contact.phone) && (
              <section className="mt-8">
                <h2 className="text-xl font-bold text-on-surface mb-3">Contact Information</h2>
                <div className="bg-[#faf8ff] rounded-lg p-4 mt-2 border border-[#bec8d2]/30 text-on-surface">
                  {contact.email && <div className="mb-1"><strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></div>}
                  {contact.phone && <div><strong>Phone:</strong> <a href={`tel:${contact.phone.replace(/\D/g,'')}`} className="text-primary hover:underline">{contact.phone}</a></div>}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DynamicPage;
