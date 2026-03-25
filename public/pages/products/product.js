const products = [
  {
    id: 1,
    name: "Fiber Laser Marking Machine",
    image: "./public/assets/images/ProductsImage/lasor-marking-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Laser Working Area": "110x110 mm - 300x300 mm",
      "Laser Power": "20W, 30W, 50W, 100W",
      "Pulse Repetition": "20-80 kHz",
      "Cooling": "Air Cooling",
      "Marking Speed": "Up to 7000 mm/s",
      "Continuous Marking": "Yes, supported"
    },
    applications: [
      "Metal components engraving",
      "Automotive parts branding",
      "Electronic PCB marking"
    ]
  },
  {
    id: 2,
    name: "UV Laser Marking Machine",
    image: "./public/assets/images/ProductsImage/compect-lasor-marking-mashine-product.webp",
    specifications: {
      "Laser Type": "UV Laser (355nm)",
      "Laser Working Area": "110x110 mm",
      "Laser Power": "3W, 5W, 10W",
      "Pulse Repetition": "20-200 kHz",
      "Cooling": "Water Cooling",
      "Marking Speed": "Up to 7000 mm/s",
      "Continuous Marking": "Cold marking process"
    },
    applications: [
      "Glass surface marking",
      "Plastic & polymer engraving",
      "Medical device coding"
    ]
  },
  {
    id: 3,
    name: "CO₂ Laser Marking Machine",
    image: "./public/assets/images/ProductsImage/industrial-lasor-marking-mashine-product.webp",
    specifications: {
      "Laser Type": "CO2 Laser",
      "Laser Working Area": "110x110 mm - 300x300 mm",
      "Laser Power": "30W, 60W, 100W",
      "Cooling": "Air / Water Cooling",
      "Marking Speed": "Up to 7000 mm/s",
      "Continuous Marking": "High speed galvo scanner"
    },
    applications: [
      "Wood and leather engraving",
      "Acrylic cutting & marking",
      "Paper packaging coding"
    ]
  },
  {
    id: 4,
    name: "Jewellery Laser Marking Machine",
    image: "./public/assets/images/ProductsImage/lasor-marking-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Laser Working Area": "70x70 mm - 110x110 mm",
      "Laser Power": "20W, 30W, 50W",
      "Cooling": "Air Cooling",
      "Precision": "High precision micron level",
      "Rotary Support": "Yes, for ring marking"
    },
    applications: [
      "Gold & silver ring engraving",
      "Hallmark cutting & marking",
      "Bangle continuous marking"
    ]
  },
  {
    id: 5,
    name: "Online Laser Marking Machine",
    image: "./public/assets/images/ProductsImage/compect-lasor-marking-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber / CO2 / UV",
      "Integration": "Conveyor mounted",
      "Laser Power": "20W - 100W",
      "Cooling": "Air Cooling",
      "Speed": "High speed On-the-Fly (OTF)",
      "Continuous Marking": "Encoder synced motion"
    },
    applications: [
      "FMCG packaging dates",
      "Cable & pipe continuous marking",
      "Beverage bottle coding"
    ]
  },
  {
    id: 6,
    name: "Battery Laser Welding Machine",
    image: "./public/assets/images/ProductsImage/handling-welding-lasor-mashine-produt.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Weld Depth": "Up to 3 mm",
      "Laser Power": "1000W, 1500W, 2000W",
      "Cooling": "Industrial Water Chiller",
      "Automation": "CNC controlled table",
      "Gas Shielding": "Argon / Nitrogen"
    },
    applications: [
      "Lithium battery pack welding",
      "EV battery tab welding",
      "Precision spot welding"
    ]
  },
  {
    id: 7,
    name: "HandHeld 4 In 1 Laser Welding Machine",
    image: "./public/assets/images/ProductsImage/handling-welding-lasor-mashine-produt.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Functions": "Welding, Cleaning, Cutting, Weld-Seam Cleaning",
      "Laser Power": "1500W, 2000W, 3000W",
      "Cooling": "Built-in Water Chiller",
      "Weight": "Lightweight handheld torch",
      "Gas Shielding": "Auto-controlled"
    },
    applications: [
      "Sheet metal fabrications",
      "Rust & paint removal",
      "Door & window frame welding"
    ]
  },
  {
    id: 8,
    name: "Mould Laser Welding Machine",
    image: "./public/assets/images/ProductsImage/handling-welding-lasor-mashine-produt.webp",
    specifications: {
      "Laser Type": "Nd:YAG Laser / Fiber",
      "Table Type": "3/4 Axis Motorized",
      "Laser Power": "200W, 300W, 400W",
      "Cooling": "Water Cooling",
      "Microscope": "10X Stereo Microscope",
      "Spot Size": "0.1 - 2.0 mm"
    },
    applications: [
      "Injection mould repairing",
      "Die casting mould modifications",
      "Tooling precision welding"
    ]
  },
  {
    id: 9,
    name: "Jewellery Laser Soldering Machine",
    image: "./public/assets/images/ProductsImage/handling-welding-lasor-mashine-produt.webp",
    specifications: {
      "Laser Type": "Nd:YAG Pulse Laser",
      "Peak Power": "100W, 150W, 200W",
      "Pulse Energy": "Up to 60 Joules",
      "Cooling": "Internal Water Chiller",
      "Microscope": "High clarity crosshair microscope",
      "Spot Size": "0.1 - 2.0 mm adjustable"
    },
    applications: [
      "Gold & silver chain soldering",
      "Porosity filling in castings",
      "Antique jewellery repair"
    ]
  },
  {
    id: 10,
    name: "Metal Laser Cutting Machine",
    image: "./public/assets/images/ProductsImage/fiber-cutting-lasor-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Working Area": "1500x3000 mm to 2000x6000 mm",
      "Laser Power": "1kW to 12kW",
      "Cooling": "Dual-temperature Water Chiller",
      "Cutting Head": "Auto Focus Laser Head",
      "Max Speed": "Up to 120m/min"
    },
    applications: [
      "MS / SS / Aluminum sheet cutting",
      "Automotive panel manufacturing",
      "Machinery parts fabrication"
    ]
  },
  {
    id: 11,
    name: "Tube-Pipe Laser Cutting Machine",
    image: "./public/assets/images/ProductsImage/fiber-cutting-lasor-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Tube Length": "Up to 6000 mm",
      "Laser Power": "1000W - 6000W",
      "Chuck Type": "Pneumatic dual chucks",
      "Cutting Speed": "Variable high-rotation",
      "Cooling": "Industrial Water Chiller"
    },
    applications: [
      "Square, round, & oval pipe cutting",
      "Furniture pipeline processing",
      "Structural steel tubing"
    ]
  },
  {
    id: 12,
    name: "CO₂ Laser Cutting Machine",
    image: "./public/assets/images/ProductsImage/co2-lasor-cutting-mashine-product.webp",
    specifications: {
      "Laser Type": "CO2 Glass Tube",
      "Working Area": "1300x900 mm / 1300x2500 mm",
      "Laser Power": "80W, 100W, 130W, 150W",
      "Cooling": "CW-5200 Water Chiller",
      "Drive System": "Stepper / Servo motor",
      "Control": "DSP Ruida Controller"
    },
    applications: [
      "Acrylic and plastic display cutting",
      "MDF and wood crafts",
      "Fabric and leather patterns"
    ]
  },
  {
    id: 13,
    name: "Jewellery Laser Cutting Machine",
    image: "./public/assets/images/ProductsImage/fiber-cutting-lasor-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Working Area": "600x600 mm",
      "Laser Power": "50W, 100W",
      "Cooling": "Air Cooling",
      "Precision": "Ultra-fine continuous cutting",
      "Dust Collection": "Precious metal recovery box"
    },
    applications: [
      "Gold & silver name pendants",
      "Intricate jewellery filigree cutting",
      "Custom coin & medal blanking"
    ]
  },
  {
    id: 14,
    name: "Customized Laser Marking Machine",
    image: "./public/assets/images/ProductsImage/lasor-marking-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber / UV / CO2",
      "Working Area": "Custom tailored",
      "Integration": "Robotic arm / Vision system",
      "Laser Power": "Application dependent",
      "Automation": "Fully enclosed / Automatic door",
      "Continuous Marking": "Custom PLC integration"
    },
    applications: [
      "Large architectural panel marking",
      "Automated assembly line marking",
      "Multi-axis complex part engraving"
    ]
  },
  {
    id: 15,
    name: "3D Laser Marking Machine",
    image: "./public/assets/images/ProductsImage/lasor-marking-mashine-product.webp",
    specifications: {
      "Laser Type": "Fiber Laser with 3D Galvo",
      "Focus Shift": "Dynamic auto-focus",
      "Laser Power": "30W, 50W, 100W",
      "Cooling": "Air Cooling",
      "Software": "3D mapping capable software",
      "Relief Engraving": "Deep volume engraving support"
    },
    applications: [
      "Curved cylinder marking without rotary",
      "Deep relief 3D coin engraving",
      "Multi-level uneven surface marking"
    ]
  },
  {
    id: 16,
    name: "3 Axis Laser Welding Machine",
    image: "./public/assets/images/ProductsImage/handling-welding-lasor-mashine-produt.webp",
    specifications: {
      "Laser Type": "Fiber Laser",
      "Axis Scope": "X/Y/Z high precision motion",
      "Laser Power": "1000W, 1500W, 2000W",
      "Cooling": "Water Chiller",
      "Weld Head": "Wobble welding head"
    },
    applications: [
      "Automated continuous seam welding",
      "Sensor housing sealing",
      "Medical instrument precision welding"
    ]
  }
];





function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  const hashParts = window.location.hash.split("?");
  let targetSlug = null;
  if (hashParts.length > 1) {
    const params = new URLSearchParams(hashParts[1]);
    targetSlug = params.get("item");
  }

  // Find targeted product by slug, fallback to first entry
  let selectedProduct = products[0];
  if (targetSlug) {
    const foundProduct = products.find(p => {
      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return slug === targetSlug;
    });
    if (foundProduct) selectedProduct = foundProduct;
  }

  const product = selectedProduct;
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Quick stats extraction
  const specKeys = Object.keys(product.specifications);
  const quickStats = specKeys.slice(0, 4).map(key => ({
    label: key.toUpperCase(),
    value: product.specifications[key]
  }));

  // Build the related products list
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  // Generate HTML
  const html = `
    <!-- Top Hero Section -->
    <div class="hero-gradient relative pt-24 lg:pt-32 pb-32 lg:pb-40 w-full border-b border-color">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-10">
          <!-- Text Content -->
          <div class="w-full lg:w-1/2 mb-10 lg:mb-0">
             <div class="text-sm font-semibold text-brand mb-4 uppercase tracking-wide">Axicon Automation Products &gt; ${product.name}</div>
             <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand leading-tight font-outfit uppercase py-2 drop-shadow-sm">
               ${product.name}
             </h1>
          </div>
          <!-- Hero Image -->
          <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
             <img src="${product.image}" alt="${product.name}" class="w-full max-w-lg object-contain drop-shadow-2xl mix-blend-multiply hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>

    <!-- Info Banner Component: Overlaps Hero -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
       <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          ${quickStats.map(stat => `
            <div class="bg-primary rounded-lg p-5 lg:p-6 shadow-lg product-quick-card text-center flex flex-col justify-between h-36 border border-gray-100">
              <h4 class="text-[0.7rem] md:text-sm font-bold text-brand-dark uppercase tracking-widest mb-2 line-clamp-2 leading-snug">${stat.label}</h4>
              <p class="text-[0.85rem] md:text-[0.95rem] font-medium text-gray-700 line-clamp-2">${stat.value}</p>
              <a href="#specifications" class="text-red-500 text-xs font-semibold mt-auto inline-block hover:underline">View Details <i class="fa-solid fa-arrow-right ml-1"></i></a>
            </div>
          `).join('')}
       </div>
    </div>

    <!-- Contact & Small Image Block -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24 mb-16">
      <div class="bg-primary border border-gray-100 shadow-xl shadow-blue-900/5 rounded-2xl flex flex-col md:flex-row overflow-hidden">
         <!-- Left Details -->
         <div class="w-full md:w-5/12 p-8 md:p-12 border-r border-color flex flex-col justify-center bg-gray-50/50">
           <h2 class="text-2xl md:text-3xl font-extrabold text-brand mb-4 font-outfit uppercase">${product.name}</h2>
           <p class="text-secondary text-[0.95rem] mb-8 leading-relaxed">
             The ${product.name} provides best-in-class performance. Find out more about how it fits your production line. Connect with our technical experts today.
           </p>
           <h3 class="text-[1.1rem] font-bold text-primary mb-3">Immediate Contact Us</h3>
           <div class="flex items-center text-gray-700 mb-3 font-medium">
             <div class="w-8 flex items-center justify-center text-brand text-lg"><i class="fa-solid fa-phone"></i></div>
             <a href="tel:+919978430431" class="hover:text-blue-600 transition-colors ml-2">+91-9978430431</a>
           </div>
           <div class="flex items-center text-gray-700 mb-8 font-medium">
             <div class="w-8 flex items-center justify-center text-brand text-lg"><i class="fa-solid fa-phone"></i></div>
             <a href="tel:+919099653777" class="hover:text-blue-600 transition-colors ml-2">+91-9099653777</a>
           </div>
           <button onclick="document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })" class="bg-brand hover:bg-blue-800 text-light font-bold py-3 px-8 rounded shadow-lg transition-colors self-start flex items-center justify-center gap-3">
             FREE INQUIRY <i class="fa-solid fa-paper-plane"></i>
           </button>
         </div>
         <!-- Right Image -->
         <div class="w-full md:w-7/12 bg-primary flex items-center justify-center p-8 md:p-12">
            <img src="${product.image}" alt="${product.name} details" class="w-full max-w-lg object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500 mix-blend-darken" />
         </div>
      </div>
    </div>

    <!-- Blue Banner -->
    <div class="w-full bg-brand py-10 lg:py-14 mt-10 shadow-inner my-16 bg-gradient-to-r from-blue-700 to-blue-600 relative overflow-hidden">
      <!-- Decorative background elements -->
       <div class="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
       <div class="absolute bottom-0 left-0 w-48 h-48 bg-primary opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
       
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
        <div class="text-center md:text-left">
          <h2 class="text-2xl lg:text-3xl font-bold text-light mb-2 leading-tight">Building a Reliable <br class="hidden md:block" /> Technical Experience!</h2>
          <p class="text-blue-100 text-sm md:text-base mt-2">Axicon Automation: Advanced laser technology making manufacturing easier.</p>
        </div>
        <button class="border-2 border-white text-light hover:bg-white hover:text-[var(--primary-color)] font-bold py-3 px-8 rounded flex items-center transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
          DOWNLOAD BROCHURE <i class="fa-solid fa-file-pdf ml-3 text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Product Description & Application Video Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
         <!-- Left View (Video/Image Box) -->
         <div class="w-full lg:w-1/2 relative group rounded-2xl overflow-hidden shadow-2xl border flex-shrink-0 cursor-pointer bg-secondary" onclick="window.open('${product.image}', '_blank')">
            <div class="flex items-center justify-center aspect-video relative">
               <img src="${product.image}" alt="Video placeholder" class="w-[80%] object-contain mix-blend-darken group-hover:scale-105 transition-transform duration-700" />
               <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                 <div class="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center text-brand shadow-xl group-hover:scale-110 transition-transform">
                   <i class="fa-solid fa-play text-2xl ml-1"></i>
                 </div>
               </div>
               <!-- Brand Banner top-left -->
               <div class="absolute top-4 left-4 bg-orange-500 text-light text-[11px] font-extrabold px-3 py-1 uppercase rounded-sm shadow-md tracking-wider">
                  AXICON
               </div>
            </div>
         </div>
         <!-- Right Text -->
         <div class="w-full lg:w-1/2">
            <h2 class="text-sm font-bold text-red-500 mb-2 uppercase tracking-widest border-l-4 border-red-500 pl-3">PRODUCT</h2>
            <h3 class="section-heading text-brand mb-6 inline-block w-full">Product Description</h3>
            <p class="text-secondary mb-6 leading-relaxed text-[0.95rem] md:text-base">
              The exactly configured <strong>${product.name}</strong> offers exceptional consistency and durability for harsh industrial environments. Its intelligent engineering promotes higher throughput, minimizes downtime, and handles complex production lines natively. Built entirely according to international standards, this model delivers precise output with seamless operation.
            </p>
         </div>
      </div>

      <!-- Feature Badges Row -->
      <div class="flex flex-wrap items-stretch justify-center gap-6 md:gap-8 lg:gap-14 mt-20 mb-8 text-center px-4">
         ${product.applications.slice(0, 4).map((app, index) => {
    let icons = ["fa-bolt", "fa-microchip", "fa-gauge-high", "fa-droplet"];
    let icon = icons[index % icons.length];
    return `
    <div class="flex flex-col items-center w-32 md:w-36 lg:w-44 group cursor-pointer">
      <div class="feature-circle flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
        <i class="fa-solid ${icon} text-[3rem] text-brand opacity-80 group-hover:opacity-100 transition-opacity"></i>
      </div>
      <h4 class="text-xs md:text-[0.8rem] lg:text-[0.85rem] font-bold text-primary uppercase tracking-wide leading-tight group-hover:text-[var(--primary-color)] transition-colors">${app}</h4>
    </div>
    `}).join('')}
      </div>
    </div>


    <!-- Technical Specifications Table -->
    <div id="specifications" class="bg-secondary py-20 border-t border-color">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
           <h2 class="section-heading text-brand tracking-wide inline-block relative pb-4">
             Technical Specification
             <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-red-500 rounded-full"></span>
           </h2>
        </div>
        
        <div class="bg-primary shadow-lg rounded-xl border border-gray-100 overflow-hidden">
           <div class="bg-blue-50 border-b border-color px-6 sm:px-8 py-4 flex justify-between font-bold text-blue-900 text-sm sm:text-base border-t-4 border-t-[var(--primary-color)]">
             <span class="uppercase tracking-wider">Model</span>
             <span>${product.name}</span>
           </div>
           <div class="overflow-x-auto">
             <table class="w-full spec-table text-[0.85rem] sm:text-sm">
               <tbody>
                 ${Object.entries(product.specifications).map(([key, value]) => `
                   <tr class="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                     <th class="py-3 sm:py-4 px-6 sm:px-8 w-[40%] text-primary bg-primary font-semibold border-r border-gray-100 tracking-wide">${key}</th>
                     <td class="py-3 sm:py-4 px-6 sm:px-8 text-secondary bg-primary font-medium">${value}</td>
                   </tr>
                 `).join('')}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>

    <!-- Related Products Carousel (Bottom Blue Section) -->
    <div class="w-full bg-brand py-20 relative overflow-hidden bg-gradient-to-br from-[var(--primary-color)] to-[#125ba6]">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="flex items-center justify-between mb-10 flex-col sm:flex-row gap-6">
            <h3 class="text-2xl font-bold text-light tracking-wide uppercase">Related Products</h3>
            <div class="flex items-center gap-4">
               <button class="related-carousel-btn shadow-lg hover:shadow-xl"><i class="fa-solid fa-chevron-left text-lg"></i></button>
               <button class="related-carousel-btn shadow-lg hover:shadow-xl"><i class="fa-solid fa-chevron-right text-lg"></i></button>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            ${relatedProducts.map(rp => {
      const rpSlug = rp.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `
              <a href="#?item=${rpSlug}" onclick="setTimeout(()=>window.location.reload(), 50)" class="bg-primary rounded-2xl shadow-xl p-5 hover:-translate-y-3 transition-transform duration-300 block text-center cursor-pointer group border-b-4 border-transparent hover:border-red-500">
                <div class="bg-secondary rounded-xl p-6 mb-5 flex items-center justify-center h-48 sm:h-56 relative overflow-hidden border border-gray-100 group-hover:bg-blue-50/20 transition-colors">
                  <img src="${rp.image}" alt="${rp.name}" class="h-full object-contain mix-blend-darken group-hover:scale-110 transition-transform duration-500 relative z-10" />
                  <div class="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent opacity-50"></div>
                </div>
                <h4 class="font-bold text-primary text-[1.05rem] leading-tight line-clamp-2 min-h-[44px] group-hover:text-[var(--primary-color)] transition-colors">${rp.name}</h4>
                <div class="mt-4 flex justify-center">
                  <span class="inline-block border border-[var(--primary-color)] text-brand px-6 py-2 rounded text-xs font-bold tracking-wide w-full max-w-[180px] group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
                    VIEW PRODUCT
                  </span>
                </div>
              </a>
            `}).join('')}
          </div>
       </div>
    </div>
  `;

  container.innerHTML = html;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render when DOM loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProducts);
} else {
  renderProducts();
}
