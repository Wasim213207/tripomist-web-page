const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Itinerary') && f.endsWith('.jsx'));

const searchString = `  const handleAddToCart = () => {
    if (isAddedToCart) return;
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    cartItems.push({
      id: Date.now(),
      title: trip.title,
      duration: trip.durationText || "Package",
      travellers: travellers,
      price: trip.numericPrice,
      total: trip.numericPrice * travellers
    });
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setIsAddedToCart(true);
    window.dispatchEvent(new Event('cartUpdated'));
  }`;

const replaceString = `  const handleAddToCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (isAddedToCart) {
      cartItems = cartItems.filter(item => item.title !== trip.title);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setIsAddedToCart(false);
    } else {
      cartItems.push({
        id: Date.now(),
        title: trip.title,
        duration: trip.durationText || "Package",
        travellers: travellers,
        price: trip.numericPrice,
        total: trip.numericPrice * travellers
      });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setIsAddedToCart(true);
    }
    window.dispatchEvent(new Event('cartUpdated'));
  }`;

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  if (content.includes('if (isAddedToCart) return;')) {
    // try exact string replacement if matches, else fallback to regex
    if (content.includes(searchString)) {
        content = content.replace(searchString, replaceString);
    } else {
        // regex replacement as fallback
        const regex = /const handleAddToCart = \(\) => \{[\s\S]*?window\.dispatchEvent\(new Event\('cartUpdated'\)\);\s*\}/;
        content = content.replace(regex, replaceString);
    }
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed ' + file);
  }
}
