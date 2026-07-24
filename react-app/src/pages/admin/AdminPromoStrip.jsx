import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import MediaUploader from '../../components/admin/MediaUploader';

export default function AdminPromoStrip() {
  const [promoStrips, setPromoStrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [text, setText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isClickable, setIsClickable] = useState(true);
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [shineEnabled, setShineEnabled] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);

  // New fields for Promo Page
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [heroBannerUrl, setHeroBannerUrl] = useState('');
  const [description, setDescription] = useState('');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [textColor, setTextColor] = useState('#ffffff');
  const [allowPackagePlacement, setAllowPackagePlacement] = useState(true);

  useEffect(() => {
    fetchPromoStrips();
  }, []);

  const fetchPromoStrips = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('promo_strips')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      alert('Failed to fetch promo strips');
      console.error(error);
    } else {
      setPromoStrips(data || []);
    }
    setLoading(false);
  };

  const openModal = (strip = null) => {
    if (strip) {
      setEditingId(strip.id);
      setText(strip.text || '');
      setLinkUrl(strip.link_url || '');
      setIsClickable(strip.is_clickable);
      setOpenInNewTab(strip.open_in_new_tab);
      setShineEnabled(strip.shine_enabled);
      setAnimationSpeed(strip.animation_speed || 3);
      setIsActive(strip.is_active);
      setDisplayOrder(strip.display_order || 0);
      setSlug(strip.slug || '');
      setSubtitle(strip.subtitle || '');
      setHeroBannerUrl(strip.hero_banner_url || '');
      setDescription(strip.description || '');
      setBgColor(strip.bg_color || '#0f172a');
      setTextColor(strip.text_color || '#ffffff');
      setAllowPackagePlacement(strip.allow_package_placement ?? true);
    } else {
      setEditingId(null);
      setText('');
      setLinkUrl('');
      setIsClickable(true);
      setOpenInNewTab(false);
      setShineEnabled(true);
      setAnimationSpeed(3);
      setIsActive(false);
      setDisplayOrder(0);
      setSlug('');
      setSubtitle('');
      setHeroBannerUrl('');
      setDescription('');
      setBgColor('#0f172a');
      setTextColor('#ffffff');
      setAllowPackagePlacement(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      alert('Text is required');
      return;
    }

    const payload = {
      text,
      link_url: linkUrl,
      is_clickable: isClickable,
      open_in_new_tab: openInNewTab,
      shine_enabled: shineEnabled,
      animation_speed: parseInt(animationSpeed, 10),
      is_active: isActive,
      display_order: parseInt(displayOrder, 10),
      slug: slug || null,
      subtitle: subtitle || null,
      hero_banner_url: heroBannerUrl || null,
      description: description || null,
      bg_color: bgColor,
      text_color: textColor,
      allow_package_placement: allowPackagePlacement,
      updated_at: new Date().toISOString()
    };

    if (editingId) {
      const { error } = await supabase.from('promo_strips').update(payload).eq('id', editingId);
      if (error) {
        alert('Failed to update promo strip');
      } else {
        alert('Promo strip updated successfully');
        closeModal();
        fetchPromoStrips();
      }
    } else {
      const { error } = await supabase.from('promo_strips').insert(payload);
      if (error) {
        alert('Failed to create promo strip');
      } else {
        alert('Promo strip created successfully');
        closeModal();
        fetchPromoStrips();
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this promo strip?')) return;
    
    const { error } = await supabase.from('promo_strips').delete().eq('id', id);
    if (error) {
      alert('Failed to delete item');
    } else {
      alert('Item deleted successfully');
      fetchPromoStrips();
    }
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase.from('promo_strips').update({ is_active: !currentStatus }).eq('id', id);
    if (error) {
      alert('Failed to update status');
    } else {
      fetchPromoStrips();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Promo Strip Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Promo Strip
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {promoStrips.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No promo strips found</td></tr>
                ) : (
                  promoStrips.map((strip) => (
                    <tr key={strip.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{strip.display_order}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{strip.text}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{strip.link_url || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleActive(strip.id, strip.is_active)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${strip.is_active ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${strip.is_active ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => openModal(strip)} className="text-blue-600 hover:text-blue-900 p-2"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(strip.id)} className="text-red-600 hover:text-red-900 p-2"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Promo Strip' : 'Add Promo Strip'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            {/* Preview Section */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">Live Preview</h3>
              <div className="border border-gray-300 rounded overflow-hidden relative shadow-sm">
                <div 
                  className={`relative overflow-hidden text-sm font-medium py-2 px-4 text-center w-full ${isClickable ? 'cursor-pointer hover:opacity-90' : ''}`}
                  style={{ backgroundColor: bgColor, color: textColor }}
                >
                  <span className="relative z-10">{text || 'Preview text...'}</span>
                  {shineEnabled && (
                    <div 
                      className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 animate-shine"
                      style={{ animationDuration: `${animationSpeed}s` }}
                    />
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Text *</label>
                  <input
                    type="text"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g. Ladakh Spiti Early Bird – Save up to ₹3,000 🎉"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug (For Promo Page URL)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g. early-bird"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <div className="flex gap-3">
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-10 p-1 bg-white border border-gray-200 rounded cursor-pointer" />
                    <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                  <div className="flex gap-3">
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-12 h-10 p-1 bg-white border border-gray-200 rounded cursor-pointer" />
                    <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (For Promo Page)</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g. Valid until August 31st"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Is Clickable?</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isClickable} onChange={(e) => setIsClickable(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {isClickable && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                      <input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="/explore/summer-destinations or https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Open in New Tab?</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={openInNewTab} onChange={(e) => setOpenInNewTab(e.target.checked)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              <MediaUploader 
                url={heroBannerUrl} 
                onUrlChange={setHeroBannerUrl} 
                folder="promos" 
                label="Promo Page Hero Banner"
                hint="Used if this promo strip has its own page."
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Page Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                  rows={3}
                  placeholder="Details about the promotion, shown on the promo page."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shine Animation?</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={shineEnabled} onChange={(e) => setShineEnabled(e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {shineEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Animation Speed (seconds)</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={animationSpeed}
                      onChange={(e) => setAnimationSpeed(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Is Active?</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allow Package Placement?</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={allowPackagePlacement} onChange={(e) => setAllowPackagePlacement(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                  <Check size={20} />
                  Save Promo Strip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
