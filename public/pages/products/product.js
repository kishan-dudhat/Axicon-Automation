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
      "Programming": "G-code / Teach pendant",
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
  
  const html = `
    <div id="${slug}" class="product-item max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-none scroll-mt-24">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        <!-- Left Side: Image & Buttons -->
        <div class="w-full lg:w-5/12 flex flex-col gap-6">
          <div class="bg-white rounded-xl overflow-hidden flex items-center justify-center p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] aspect-[4/3] group relative">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain mix-blend-darken transform group-hover:scale-105 transition-transform duration-[0.8s] ease-out" />
          </div>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="flex-1 bg-primary hover:bg-[#34367f] text-white font-semibold py-4 px-6 transition-all duration-300 text-sm md:text-[0.9rem] flex items-center justify-between shadow-[0_5px_15px_rgba(62,64,149,0.3)] tracking-wide">
              Request A Quote <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
            <button class="flex-1 bg-primary hover:bg-[#34367f] text-white font-semibold py-4 px-6 transition-all duration-300 text-sm md:text-[0.9rem] flex items-center justify-between shadow-[0_5px_15px_rgba(62,64,149,0.3)] tracking-wide">
              Download Catalogue <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
        
        <!-- Right Side: Details -->
        <div class="w-full lg:w-7/12 flex flex-col">
          <h2 class="text-3xl md:text-4xl lg:text-[2.2rem] font-extrabold text-primary mb-8 font-outfit tracking-tight">
            ${product.name}
          </h2>
          
          <!-- Specification -->
          <div class="mb-10 w-full overflow-hidden">
            <h3 class="text-xl md:text-[1.35rem] font-extrabold text-primary mb-4 font-outfit">Specification</h3>
            <div class="overflow-x-auto w-full">
              <table class="w-full text-[0.85rem] sm:text-sm text-center border-collapse bg-white shadow-sm border border-gray-200">
                <tbody>
                  ${ Object.entries(product.specifications).map(([key, value]) => `
                    <tr class="border-b border-gray-200 last:border-none">
                      <th scope="row" class="px-3 md:px-5 py-3 md:py-4 font-semibold text-white bg-primary border-r border-[#ffffff30] w-[35%] whitespace-nowrap align-middle tracking-wide">
                        ${key}
                      </th>
                      <td class="px-3 md:px-5 py-3 md:py-4 text-gray-700 bg-gray-50/70 font-medium">
                        ${value}
                      </td>
                    </tr>
                  `).join('') }
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Application -->
          <div>
            <h3 class="text-xl md:text-[1.35rem] font-extrabold text-primary mb-4 font-outfit">Application</h3>
            <ul class="space-y-2 mb-8">
              ${product.applications.map(app => `
                <li class="flex items-start text-gray-500 font-medium text-[0.95rem] leading-relaxed font-inter">
                  <i class="fa-solid fa-arrow-right-long text-gray-400 mt-1.5 mr-3 text-xs"></i>
                  <span>${app}</span>
                </li>
              `).join('')}
            </ul>
            
            <!-- Hexagon Thumbnails Grid -->
            <div class="flex flex-wrap gap-4 lg:gap-6 mt-6">
              ${[1, 2, 3, 4, 5].map(idx => `
              <div class="w-[4.5rem] h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] bg-gray-50 flex items-center justify-center border border-gray-100 hover:border-gray-200 transition-colors">
                 <div class="w-[85%] h-[85%] relative bg-white overflow-hidden shadow-sm" style="clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)">
                   <img src="./public/assets/images/HomeImage/home-why-us-${idx > 4 ? 4 : idx}.png" alt="Application sample" class="w-full h-full object-cover p-1 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                 </div>
              </div>
              `).join('')}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Scroll down past hero section if a specific machine was accessed directly
  if (targetSlug) {
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
}

// Render when DOM loads
if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProducts);
} else {
    renderProducts();
}
