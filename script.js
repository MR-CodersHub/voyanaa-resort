document.addEventListener('DOMContentLoaded', () => {

    // Global Date references
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    /* ==========================================================================
       1. Global Theme Switcher (Dark / Light Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Check local storage or system preferences
    const savedTheme = localStorage.getItem('voyana_theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('voyana_theme', newTheme);
            updateThemeToggleUI(newTheme);
        });
    }

    function updateThemeToggleUI(theme) {
        const toggleIcon = document.getElementById('themeToggleIcon');
        if (toggleIcon) {
            if (theme === 'dark') {
                toggleIcon.className = 'fa-solid fa-sun';
            } else {
                toggleIcon.className = 'fa-solid fa-moon';
            }
        }
    }

    /* ==========================================================================
       2. Global Search Overlay Control
       ========================================================================== */
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchToggleBtn && searchOverlay) {
        searchToggleBtn.addEventListener('click', () => {
            searchOverlay.classList.add('open');
            if (searchInput) searchInput.focus();
        });
    }

    if (searchCloseBtn && searchOverlay) {
        searchCloseBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('open');
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    showToast('Search Triggered', `Searching properties for: "${query}"...`);
                    searchOverlay.classList.remove('open');
                    searchInput.value = '';
                    // Redirect to villas or cottages if relevant
                    setTimeout(() => {
                        window.location.href = `villas.html?search=${encodeURIComponent(query)}`;
                    }, 800);
                }
            }
        });
    }

    /* ==========================================================================
       3. Global Header, Sticky Nav & Mobile Toggle
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }
    });

    // Mobile nav toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // Active page highlighters
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === 'index.html' && href === '#') || (pageName === '' && href === '#')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    /* ==========================================================================
       4. Property Datastore & State Management
       ========================================================================== */
    const properties = {
        'glass-manor': {
            id: 'glass-manor',
            title: 'The Glass Forest Manor',
            type: 'villa',
            location: 'Pine Forest Ridge, Kodaikanal',
            rating: '4.9',
            reviews: '124 reviews',
            price: 28000,
            image: 'assets/villa_pine.png',
            images: ['assets/villa_pine.png', 'assets/gallery_interior.png', 'assets/hero_background.png', 'assets/experience_trek.png'],
            description: 'An architectural masterpiece featuring floor-to-ceiling glass walls, opening directly into towering pine forests. This premier villa offers spectacular views of the valleys, a private glass gazebo, and stone-clad cozy interiors with a central fireplace.',
            guests: 6,
            bedrooms: 3,
            size: '3,200 sq.ft',
            status: 'Available',
            amenities: ['Private Pine Garden', '24/7 Butler Service', 'Heated Outdoor Dining', 'Central Fireplace', 'Complimentary Breakfast', 'BBQ Grill & Deck', 'High-Speed Fiber Wi-Fi']
        },
        'elysian-retreat': {
            id: 'elysian-retreat',
            title: 'Elysian Misty Retreat',
            type: 'villa',
            location: 'Coaker\'s Walk Edge, Kodaikanal',
            rating: '5.0',
            reviews: '98 reviews',
            price: 35000,
            image: 'assets/hero_background.png',
            images: ['assets/hero_background.png', 'assets/gallery_interior.png', 'assets/experience_lake.png', 'assets/experience_trek.png'],
            description: 'Hovering over the clouds on Kodaikanal\'s highest ridge. Elysian features a private heated pool, hot tub, sunset viewing platforms, master fireplace rooms, and comprehensive 5-star concierge services.',
            guests: 8,
            bedrooms: 4,
            size: '4,500 sq.ft',
            status: 'Available',
            amenities: ['Heated Outdoor Jacuzzi', 'Private Cinema Room', '24/7 Concierge Support', 'Private Chef Custom Menus', 'Stargazing Platform', 'Indoor Hearth', 'Airport Pickup']
        },
        'pine-crest': {
            id: 'pine-crest',
            title: 'Pine Crest Presidential Villa',
            type: 'villa',
            location: 'Pillar Rocks Road, Kodaikanal',
            rating: '4.8',
            reviews: '74 reviews',
            price: 30000,
            image: 'assets/villa_pine.png',
            images: ['assets/villa_pine.png', 'assets/gallery_interior.png', 'assets/hero_background.png'],
            description: 'Secluded luxury home set amidst tall pines, offering absolute security, massive open wooden decks, double height ceilings, and panoramic mountain-view balconies.',
            guests: 10,
            bedrooms: 5,
            size: '5,000 sq.ft',
            status: 'Available',
            amenities: ['Presidential Butler Service', 'Huge Open Sun Deck', 'Stoneware Kitchen', 'Barbecue Setups', 'Indoor Billiards Board', 'Fiber Internet', 'Mountain Balconies']
        },
        'whispering-pines': {
            id: 'whispering-pines',
            title: 'Whispering Pines Cabin',
            type: 'cottage',
            location: 'Vattakanal Valley, Kodaikanal',
            rating: '4.8',
            reviews: '86 reviews',
            price: 18500,
            image: 'assets/cottage_mist.png',
            images: ['assets/cottage_mist.png', 'assets/gallery_interior.png', 'assets/experience_trek.png'],
            description: 'A cozy local stone and timber wood cottage offering rustic mountain charm, outdoor fire pits, local guided trail accesses, and total privacy in the pine valley.',
            guests: 4,
            bedrooms: 2,
            size: '1,800 sq.ft',
            status: 'Available',
            amenities: ['Stone Hearth Fireplace', 'Outdoor Bonfire Pit', 'Pine Garden Swings', 'Kitchenette Equipment', 'Valley Forest Access', 'High-Speed Wi-Fi', 'Pet Friendly']
        },
        'silver-mist': {
            id: 'silver-mist',
            title: 'Silver Mist Honeymoon Hideaway',
            type: 'cottage',
            location: 'Kurinji Temple Hills, Kodaikanal',
            rating: '4.7',
            reviews: '42 reviews',
            price: 14000,
            image: 'assets/gallery_interior.png',
            images: ['assets/gallery_interior.png', 'assets/cottage_mist.png', 'assets/experience_lake.png'],
            description: 'Specially created for couples. Features glass ceilings for night sky gazing, a vintage clawfoot copper tub, and private decks overlooking valley morning mist.',
            guests: 2,
            bedrooms: 1,
            size: '1,100 sq.ft',
            status: 'Available',
            amenities: ['Stargazing Glass Ceiling', 'Vintage Clawfoot Tub', 'Mist View Deck', 'Espresso Bar', 'Hammock Stand', 'Parking Facility', 'Breakfast in Bed']
        },
        'serene-meadows': {
            id: 'serene-meadows',
            title: 'Serene Meadows Family Cottage',
            type: 'cottage',
            location: 'Bryant Park Border, Kodaikanal',
            rating: '4.6',
            reviews: '55 reviews',
            price: 16000,
            image: 'assets/cottage_mist.png',
            images: ['assets/cottage_mist.png', 'assets/gallery_interior.png', 'assets/experience_lake.png'],
            description: 'Spacious cottage designed for family getaways, situated next to beautiful lawns, featuring children\'s outdoor playing sets, open kitchens, and campfire areas.',
            guests: 6,
            bedrooms: 3,
            size: '2,200 sq.ft',
            status: 'Available',
            amenities: ['Large Children Park Access', 'Private Bonfire Area', 'Fully Set Kitchen', 'High-Speed Internet', 'Gated Backyard Deck', 'Secure Parking', 'Washing Amenities']
        }
    };

    const retreats = {
        'lake-boating': {
            id: 'lake-boating',
            title: 'Tranquil Lake Boating',
            location: 'Kodaikanal Lake',
            duration: '2 Hours',
            difficulty: 'Easy',
            price: 2500,
            image: 'assets/experience_lake.png',
            description: 'Enjoy private early morning rowing on the pristine waters of Kodaikanal Lake, blanketed in soft mist. Watch the sunrise break over the hills as you enjoy hot tea or coffee served right on your boat by your private guide.',
            included: ['Private Rowboat Hire', 'Certified Local Guide', 'Life Jackets & Safety Kit', 'Hot Tea, Coffee & Light Snacks', 'Morning Viewpoint Access'],
            bring: ['Warm Fleece/Jacket', 'Camera or Smartphone', 'Sunglasses', 'Slip-on Shoes']
        },
        'forest-trekking': {
            id: 'forest-trekking',
            title: 'Guided Pine Forest Trekking',
            location: 'Pine Forest Ridge',
            duration: '4 Hours',
            difficulty: 'Moderate',
            price: 3500,
            image: 'assets/experience_trek.png',
            description: 'Trek with expert local guides through towering pine forest sanctuaries to reach secret panoramic ridges. Learn about the rich high-altitude flora and fauna while taking in breath-taking valley views and mist rolling over the edges.',
            included: ['Professional Hiking Guide', 'Premium Hiking Poles', 'Energy Snacks & Fruit Packs', 'Bottled Spring Water', 'First Aid Safety Kits'],
            bring: ['Sturdy Hiking Shoes', 'Windcheater or Raincoat', 'Personal Backpack', 'Insect Repellent']
        },
        'mountain-bonfire': {
            id: 'mountain-bonfire',
            title: 'Private Mountain Bonfire',
            location: 'Villa/Cottage Gated Garden',
            duration: 'Evening',
            difficulty: 'Easy',
            price: 4000,
            image: 'assets/cottage_mist.png',
            description: 'Relax under a star-filled sky by a warm log fire while your private host grills delicious local delicacies. Enjoy acoustic ambient music and cozy seating in your villa\'s private garden area.',
            included: ['Premium Firewood & Setup', 'Private Chef/Grill Master', 'Gourmet Barbecue Skewers (Veg/Non-Veg)', 'Warm Cider & Hot Cocoa', 'Comfortable Seating & Blankets'],
            bring: ['Heavy Warm Jacket/Shawl', 'Acoustic Guitar (Optional)', 'Good Appetite']
        },
        'mist-photography': {
            id: 'mist-photography',
            title: 'Mist & Valley Photography',
            location: 'Coaker\'s Walk & Pillar Rocks',
            duration: '3 Hours',
            difficulty: 'Easy',
            price: 3000,
            image: 'assets/hero_background.png',
            description: 'Capture spectacular landscapes and sunrises over Coaker\'s Walk and Pillar Rocks with local photography experts. Perfect for both beginners wanting to learn DSLR/Smartphone controls and veterans looking for the best secret angles.',
            included: ['Award-Winning Photographer Guide', 'Private Transportation to Viewpoints', 'Tripod & Lens Filter Rentals', 'Digital Post-Processing Tipsheet', 'Morning Warm Refreshments'],
            bring: ['DSLR or Smartphone', 'Extra Batteries & Memory Cards', 'Warm Layers', 'Comfortable Walking Shoes']
        },
        'culinary-masterclass': {
            id: 'culinary-masterclass',
            title: 'Mountain Culinary Masterclass',
            location: 'Voyana Organic Garden Kitchen',
            duration: '3 Hours',
            difficulty: 'Easy',
            price: 2800,
            image: 'assets/gallery_interior.png',
            description: 'Cook signature high-altitude local delicacies over traditional clay fires in our rustic timber kitchens, guided by veteran culinary masters. Harvest fresh organic herbs and vegetables directly from our backyard garden before the class.',
            included: ['Organic Garden Harvesting Tour', 'Individual Cooking Station & Utensils', 'Fresh Organic Ingredients', 'Voyana Signature Linen Apron', 'Full-Course Gourmet Dinner'],
            bring: ['Comfortable Clothes', 'Tie-back for Hair', 'Notebook/Pen for Recipes']
        },
        'cycling-excursion': {
            id: 'cycling-excursion',
            title: 'Pine Forest Cycling Excursion',
            location: 'Pine Reserve Border Routes',
            duration: 'Half Day',
            difficulty: 'Easy',
            price: 1500,
            image: 'assets/experience_trek.png',
            description: 'Rent premium gears and ride across pine pathways, enjoying fresh breeze and forest flora. Follow custom digital maps highlighting local viewpoints, quiet meadows, and forest-side cafes.',
            included: ['Premium Hybrid Mountain Bicycle', 'Protective Helmet & Knee Pads', 'Interactive GPS Trail Maps', 'Trail Snacks & Hydration Packs', 'Concierge Roadside Support'],
            bring: ['Active Dry-Fit Clothing', 'Athletic Shoes', 'Action Camera (Optional)', 'Backpack']
        }
    };

    const packages = {
        'honeymoon-mist': {
            id: 'honeymoon-mist',
            title: 'Honeymoon Mist Package',
            type: 'package',
            location: 'Silver Mist Hideaway',
            price: 45000,
            nights: 3,
            image: 'assets/gallery_interior.png',
            description: 'Spend 3 nights in our premium Silver Mist Hideaway. Includes champagne on arrival, private candlelight deck dinner, daily organic breakfast, and wellness massage sessions.',
            amenities: ['Private Honeymoon Suite', 'Daily Organic Breakfast', '1 Candlelight Dinner', 'Couple Massage Session', 'Private Jeep Tour']
        },
        'monsoon-fog': {
            id: 'monsoon-fog',
            title: 'Monsoon Fog Sanctuary Package',
            type: 'package',
            location: 'Glass Forest Manor',
            price: 84000,
            nights: 4,
            image: 'assets/villa_pine.png',
            description: 'Embrace Kodaikanal\'s famous monsoon. Stay 4 nights for the price of 3 at Glass Forest Manor. Complete with all-inclusive gourmet meals, unlimited warm cider, and nightly indoor hearth fires.',
            amenities: ['Stay 4, Pay 3 Nights', 'All-Inclusive Gourmet Meals', 'Gourmet Hot Cocoa & Cider', 'Complimentary Firewood', '24/7 Butler Support']
        },
        'mountain-trail': {
            id: 'mountain-trail',
            title: 'Mountain Trail Expedition Package',
            type: 'package',
            location: 'Whispering Pines Cottage',
            price: 38000,
            nights: 2,
            image: 'assets/experience_trek.png',
            description: 'Designed for nature lovers. 2 nights at Whispering Pines Cottage including professional-guided rock climbing, forest BBQ, valley hiking, and camping equipment.',
            amenities: ['Cozy Stone Cottage', 'Professional Trek Guide', 'High-Energy Camp Meals', 'Mountain BBQ & Bonfire Feast', 'Adventure Gear Included']
        }
    };

    const initialFoodOrders = [
        {
            id: 'FD-5042',
            guestName: 'Aditya Sen',
            guestEmail: 'aditya@sen.org',
            diningOption: 'Fireside Deck Candlelight Dinner',
            villa: 'The Glass Forest Manor',
            date: '2026-06-16',
            timeSlot: 'Evening (7:00 PM - 10:00 PM)',
            servings: 2,
            totalPrice: 6000,
            status: 'Confirmed',
            notes: 'Vegetarian meals only, please.',
            createdAt: '2026-05-29'
        },
        {
            id: 'FD-5043',
            guestName: 'Rohan Sharma',
            guestEmail: 'rohan@sharma.in',
            diningOption: 'Mountain BBQ & Bonfire Feast',
            villa: 'Whispering Pines Cabin',
            date: '2026-07-03',
            timeSlot: 'Evening (6:00 PM - 9:00 PM)',
            servings: 4,
            totalPrice: 4500,
            status: 'Pending Approval',
            notes: 'Extra spicy marinade.',
            createdAt: '2026-05-30'
        }
    ];

    // Initialize mock database in LocalStorage if not exists
    if (!localStorage.getItem('voyana_properties')) {
        localStorage.setItem('voyana_properties', JSON.stringify(properties));
    }
    if (!localStorage.getItem('voyana_packages')) {
        localStorage.setItem('voyana_packages', JSON.stringify(packages));
    }
    if (!localStorage.getItem('voyana_foodOrders')) {
        localStorage.setItem('voyana_foodOrders', JSON.stringify(initialFoodOrders));
    }
    
    // Initialize mock bookings database
    const initialBookings = [
        {
            id: 'BK-1088',
            propertyId: 'glass-manor',
            propertyName: 'The Glass Forest Manor',
            guestName: 'Aditya Sen',
            guestEmail: 'aditya@sen.org',
            checkIn: '2026-06-15',
            checkOut: '2026-06-18',
            guests: 4,
            totalPrice: 92400,
            status: 'Confirmed',
            createdAt: '2026-05-28'
        },
        {
            id: 'BK-1089',
            propertyId: 'whispering-pines',
            propertyName: 'Whispering Pines Cabin',
            guestName: 'Rohan Sharma',
            guestEmail: 'rohan@sharma.in',
            checkIn: '2026-07-02',
            checkOut: '2026-07-05',
            guests: 2,
            totalPrice: 61050,
            status: 'Pending Approval',
            createdAt: '2026-05-29'
        }
    ];

    if (!localStorage.getItem('voyana_bookings')) {
        localStorage.setItem('voyana_bookings', JSON.stringify(initialBookings));
    }

    /* ==========================================================================
       5. Dynamic Property Details Page (details.html)
       ========================================================================== */
    const detailsContainer = document.getElementById('details-page-container');
    if (detailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const propId = urlParams.get('id') || 'glass-manor';
        const dbProperties = JSON.parse(localStorage.getItem('voyana_properties')) || properties;
        const prop = dbProperties[propId];

        if (prop) {
            // Document Title
            document.title = `${prop.title} | Voyana Kodaikanal Luxury Details`;

            // Breadcrumbs & Headers
            const titleEl = document.getElementById('detail-title');
            const locEl = document.getElementById('detail-location');
            const breadcrumbEl = document.getElementById('detail-breadcrumb-title');
            
            if (titleEl) titleEl.textContent = prop.title;
            if (locEl) locEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${prop.location}`;
            if (breadcrumbEl) breadcrumbEl.textContent = prop.title;

            // Gallery Inject
            const mainImg = document.getElementById('detail-main-img');
            const thumbGrid = document.getElementById('detail-thumb-grid');
            
            if (mainImg) {
                mainImg.src = prop.image;
                mainImg.alt = prop.title;
            }

            if (thumbGrid && prop.images) {
                thumbGrid.innerHTML = '';
                prop.images.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${prop.title} view ${index + 1}`;
                    img.className = `details-thumb ${index === 0 ? 'active' : ''}`;
                    
                    // Click thumb to swap main
                    img.addEventListener('click', () => {
                        document.querySelectorAll('.details-thumb').forEach(t => t.classList.remove('active'));
                        img.classList.add('active');
                        mainImg.src = imgSrc;
                    });
                    thumbGrid.appendChild(img);
                });
            }

            // Room Meta Specs
            const guestSpec = document.getElementById('detail-spec-guests');
            const bedSpec = document.getElementById('detail-spec-beds');
            const sizeSpec = document.getElementById('detail-spec-size');

            if (guestSpec) guestSpec.innerHTML = `<i class="fa-solid fa-user"></i> Up to ${prop.guests} Guests`;
            if (bedSpec) bedSpec.innerHTML = `<i class="fa-solid fa-bed"></i> ${prop.bedrooms} Bedrooms`;
            if (sizeSpec) sizeSpec.innerHTML = `<i class="fa-solid fa-maximize"></i> ${prop.size}`;

            // Description
            const descEl = document.getElementById('detail-desc');
            if (descEl) descEl.textContent = prop.description;

            // Amenities List
            const amenitiesEl = document.getElementById('detail-amenities-list');
            if (amenitiesEl) {
                amenitiesEl.innerHTML = '';
                prop.amenities.forEach(amenity => {
                    const span = document.createElement('span');
                    span.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${amenity}`;
                    amenitiesEl.appendChild(span);
                });
            }

            // Pricing details
            const sidebarPrice = document.getElementById('detail-sidebar-price');
            if (sidebarPrice) sidebarPrice.textContent = `₹${prop.price.toLocaleString('en-IN')}`;

            // Real-time Booking Widget inside Sidebar Card
            const sidebarIn = document.getElementById('sidebar-checkin');
            const sidebarOut = document.getElementById('sidebar-checkout');
            const sidebarChef = document.getElementById('sidebar-chef');
            const sidebarGuests = document.getElementById('sidebar-guests');

            if (sidebarIn && sidebarOut) {
                sidebarIn.value = formatDateStr(today);
                sidebarIn.min = formatDateStr(today);
                sidebarOut.value = formatDateStr(tomorrow);
                sidebarOut.min = formatDateStr(tomorrow);

                // Set Guests limits based on property limit
                if (sidebarGuests) {
                    sidebarGuests.innerHTML = '';
                    for (let i = 1; i <= prop.guests; i++) {
                        const opt = document.createElement('option');
                        opt.value = i;
                        opt.textContent = `${i} Guest${i > 1 ? 's' : ''}`;
                        if (i === 2) opt.selected = true;
                        sidebarGuests.appendChild(opt);
                    }
                }

                sidebarIn.addEventListener('change', () => {
                    const inDate = new Date(sidebarIn.value);
                    const nextDay = new Date(inDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    sidebarOut.min = formatDateStr(nextDay);
                    if (new Date(sidebarOut.value) <= inDate) {
                        sidebarOut.value = formatDateStr(nextDay);
                    }
                    updateSidebarPrice();
                });

                sidebarOut.addEventListener('change', updateSidebarPrice);
                sidebarChef.addEventListener('change', updateSidebarPrice);

                function updateSidebarPrice() {
                    const date1 = new Date(sidebarIn.value);
                    const date2 = new Date(sidebarOut.value);
                    let nights = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
                    if (isNaN(nights) || nights <= 0) nights = 1;

                    const priceVal = prop.price;
                    let chefRate = sidebarChef.value === 'yes' ? 3500 : 0;
                    
                    const stayTotal = (priceVal + chefRate) * nights;
                    const serviceFee = Math.round(stayTotal * 0.10);
                    const grandTotal = stayTotal + serviceFee;

                    document.getElementById('side-summary-nights').textContent = `₹${(priceVal + chefRate).toLocaleString('en-IN')} x ${nights} night${nights > 1 ? 's' : ''}`;
                    document.getElementById('side-summary-stay').textContent = `₹${stayTotal.toLocaleString('en-IN')}`;
                    document.getElementById('side-summary-fee').textContent = `₹${serviceFee.toLocaleString('en-IN')}`;
                    document.getElementById('side-summary-grand').textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
                }

                updateSidebarPrice();

                // Book Now Button redirection
                const bookNowBtn = document.getElementById('sidebar-book-now-btn');
                if (bookNowBtn) {
                    bookNowBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const checkIn = sidebarIn.value;
                        const checkOut = sidebarOut.value;
                        const guests = sidebarGuests.value;
                        const chef = sidebarChef.value;
                        // Redirect to booking.html with pre-selected parameters
                        window.location.href = `booking.html?id=${prop.id}&in=${checkIn}&out=${checkOut}&guests=${guests}&chef=${chef}`;
                    });
                }
            }
        }
    }

    /* ==========================================================================
       5b. Dynamic Retreat Details Page (retreat-details.html)
       ========================================================================== */
    const retreatDetailsContainer = document.getElementById('retreat-details-page-container');
    if (retreatDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const retreatId = urlParams.get('id') || 'lake-boating';
        const retreat = retreats[retreatId];

        if (retreat) {
            document.title = `${retreat.title} | Voyana Retreat Details`;

            // Titles & Breadcrumbs
            const titleEl = document.getElementById('retreat-title');
            const locEl = document.getElementById('retreat-location');
            const breadcrumbEl = document.getElementById('retreat-breadcrumb-title');
            
            if (titleEl) titleEl.textContent = retreat.title;
            if (locEl) locEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${retreat.location}`;
            if (breadcrumbEl) breadcrumbEl.textContent = retreat.title;

            // Details
            const mainImg = document.getElementById('retreat-main-img');
            const descEl = document.getElementById('retreat-desc');
            const durationEl = document.getElementById('retreat-duration');
            const diffEl = document.getElementById('retreat-difficulty');
            const priceEl = document.getElementById('retreat-sidebar-price');

            if (mainImg) mainImg.src = retreat.image;
            if (descEl) descEl.textContent = retreat.description;
            if (durationEl) durationEl.innerHTML = `<i class="fa-regular fa-clock" style="color: var(--color-gold); margin-right: 6px;"></i> ${retreat.duration}`;
            if (diffEl) diffEl.innerHTML = `<i class="fa-solid fa-mountain" style="color: var(--color-gold); margin-right: 6px;"></i> ${retreat.difficulty}`;
            if (priceEl) priceEl.textContent = `₹${retreat.price.toLocaleString('en-IN')}`;

            // What's Included List
            const incList = document.getElementById('retreat-included-list');
            if (incList) {
                incList.innerHTML = '';
                retreat.included.forEach(item => {
                    const div = document.createElement('div');
                    div.style.display = 'flex';
                    div.style.gap = '10px';
                    div.style.alignItems = 'center';
                    div.style.fontSize = '0.95rem';
                    div.style.color = 'var(--color-text-muted)';
                    div.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--color-gold);"></i> <span>${item}</span>`;
                    incList.appendChild(div);
                });
            }

            // What to Bring List
            const bringList = document.getElementById('retreat-bring-list');
            if (bringList) {
                bringList.innerHTML = '';
                retreat.bring.forEach(item => {
                    const div = document.createElement('div');
                    div.style.display = 'flex';
                    div.style.gap = '10px';
                    div.style.alignItems = 'center';
                    div.style.fontSize = '0.95rem';
                    div.style.color = 'var(--color-text-muted)';
                    div.innerHTML = `<i class="fa-solid fa-square-check" style="color: var(--color-gold);"></i> <span>${item}</span>`;
                    bringList.appendChild(div);
                });
            }

            // Price unit adjustments for bonfire (group price)
            const priceUnitEl = document.getElementById('retreat-price-unit');
            const formulaTextEl = document.getElementById('retreat-summary-formula');
            if (retreatId === 'mountain-bonfire') {
                if (priceUnitEl) priceUnitEl.textContent = '/ group';
            }

            // Form booking calculations
            const dateInput = document.getElementById('retreat-booking-date');
            const guestsSelect = document.getElementById('retreat-booking-guests');
            const summaryFormula = document.getElementById('retreat-summary-formula');
            const summaryBase = document.getElementById('retreat-summary-base');
            const summaryTotal = document.getElementById('retreat-summary-total');

            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];

            function calculateRetreatTotal() {
                const count = parseInt(guestsSelect.value);
                let basePrice = 0;
                
                if (retreatId === 'mountain-bonfire') {
                    // Group pricing: flat rate
                    basePrice = retreat.price;
                    if (summaryFormula) summaryFormula.textContent = `Flat rate for group`;
                } else {
                    // Per person pricing
                    basePrice = retreat.price * count;
                    if (summaryFormula) summaryFormula.textContent = `₹${retreat.price.toLocaleString('en-IN')} x ${count} participants`;
                }

                if (summaryBase) summaryBase.textContent = `₹${basePrice.toLocaleString('en-IN')}`;
                if (summaryTotal) summaryTotal.textContent = `₹${basePrice.toLocaleString('en-IN')}`;
            }

            if (guestsSelect) {
                guestsSelect.addEventListener('change', calculateRetreatTotal);
                calculateRetreatTotal(); // initial run
            }

            // Booking Form Submission
            const form = document.getElementById('retreat-sidebar-booking-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const date = dateInput.value;
                    const guests = guestsSelect.value;
                    const slot = document.getElementById('retreat-booking-slots').value;
                    
                    showToast(
                        'Booking Requested',
                        `Request for ${retreat.title} on ${date} (${slot}) submitted successfully! Our concierge will call you back shortly.`,
                        'success',
                        6000
                    );
                });
            }
        }
    }

    /* ==========================================================================
       6. Booking Wizard Page (booking.html)
       ========================================================================== */
    const bookingPage = document.getElementById('booking-wizard-container');
    if (bookingPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const propId = urlParams.get('id') || 'glass-manor';
        const inDateParam = urlParams.get('in') || formatDateStr(today);
        const outDateParam = urlParams.get('out') || formatDateStr(tomorrow);
        const guestsParam = urlParams.get('guests') || '2';
        const chefParam = urlParams.get('chef') || 'no';

        const dbProperties = JSON.parse(localStorage.getItem('voyana_properties')) || properties;
        const prop = dbProperties[propId];

        // Step Panels Navigation
        let currentStep = 1;
        const stepPanels = document.querySelectorAll('.booking-panel');
        const stepIndicators = document.querySelectorAll('.wizard-step');
        const prevBtn = document.getElementById('wizard-prev-btn');
        const nextBtn = document.getElementById('wizard-next-btn');

        // Dynamic Summary Panel Bindings
        const summaryName = document.getElementById('summary-property-name');
        const summaryLocation = document.getElementById('summary-property-location');
        const summaryDates = document.getElementById('summary-dates');
        const summaryNights = document.getElementById('summary-nights');
        const summaryChef = document.getElementById('summary-chef-incl');
        const summaryStay = document.getElementById('summary-stay-total');
        const summaryFee = document.getElementById('summary-service-fee');
        const summaryGrand = document.getElementById('summary-grand-total');

        // Form Fields
        const inputCheckIn = document.getElementById('wizard-checkin');
        const inputCheckOut = document.getElementById('wizard-checkout');
        const inputGuests = document.getElementById('wizard-guests');
        const inputChef = document.getElementById('wizard-chef');
        const inputProperty = document.getElementById('wizard-property');

        // Initialize Property Selector
        if (inputProperty) {
            inputProperty.innerHTML = '';
            
            const dbPackages = JSON.parse(localStorage.getItem('voyana_packages')) || packages;

            // Group: Luxury Stays
            const optGroupStays = document.createElement('optgroup');
            optGroupStays.label = 'Luxury Stays';
            Object.values(dbProperties).forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = `${p.title} (₹${p.price.toLocaleString('en-IN')}/night)`;
                if (p.id === propId) opt.selected = true;
                optGroupStays.appendChild(opt);
            });
            inputProperty.appendChild(optGroupStays);

            // Group: Curated Holiday Packages
            const optGroupPkgs = document.createElement('optgroup');
            optGroupPkgs.label = 'Curated Holiday Packages';
            Object.values(dbPackages).forEach(pkg => {
                const opt = document.createElement('option');
                opt.value = pkg.id;
                opt.textContent = `${pkg.title} (₹${pkg.price.toLocaleString('en-IN')} / ${pkg.nights} Nights)`;
                if (pkg.id === propId) opt.selected = true;
                optGroupPkgs.appendChild(opt);
            });
            inputProperty.appendChild(optGroupPkgs);
        }

        // Set form defaults
        if (inputCheckIn) inputCheckIn.value = inDateParam;
        if (inputCheckOut) inputCheckOut.value = outDateParam;
        if (inputChef) inputChef.value = chefParam;
        if (inputGuests) inputGuests.value = guestsParam;

        function updateWizardBilling() {
            const selectedPropId = inputProperty.value;
            const dbPackages = JSON.parse(localStorage.getItem('voyana_packages')) || packages;
            
            const currentProp = dbProperties[selectedPropId];
            const currentPkg = dbPackages[selectedPropId];
            const isPackage = currentPkg !== undefined;

            const checkInVal = new Date(inputCheckIn.value);
            const checkOutVal = new Date(inputCheckOut.value);

            let nights = Math.ceil((checkOutVal - checkInVal) / (1000 * 60 * 60 * 24));
            if (isNaN(nights) || nights <= 0) nights = 1;

            let baseCost = 0;
            let stayCost = 0;
            let foodCost = 0;
            let chefCost = 0;

            const inputMealPlan = document.getElementById('wizard-meal-plan');
            const mealPlanVal = inputMealPlan ? inputMealPlan.value : 'breakfast';
            const guestsCount = parseInt(inputGuests.value, 10) || 2;

            if (isPackage) {
                baseCost = currentPkg.price;
                nights = currentPkg.nights; // Override nights for package calculations

                // Dynamic checkout date calculation if check-in changes
                if (inputCheckIn.value) {
                    const checkInDate = new Date(inputCheckIn.value);
                    const checkOutDate = new Date(checkInDate);
                    checkOutDate.setDate(checkOutDate.getDate() + currentPkg.nights);
                    if (inputCheckOut.value !== formatDateStr(checkOutDate)) {
                        inputCheckOut.value = formatDateStr(checkOutDate);
                    }
                }

                // For packages, breakfast is complimentary. Other meal upgrades:
                let mealRatePerNightPerGuest = 0;
                if (mealPlanVal === 'half-board') {
                    if (currentPkg.id === 'monsoon-fog') mealRatePerNightPerGuest = 0; // already included
                    else if (currentPkg.id === 'honeymoon-mist') mealRatePerNightPerGuest = 500;
                    else mealRatePerNightPerGuest = 1000;
                } else if (mealPlanVal === 'full-board') {
                    if (currentPkg.id === 'monsoon-fog') mealRatePerNightPerGuest = 0; // already included
                    else if (currentPkg.id === 'honeymoon-mist') mealRatePerNightPerGuest = 1500;
                    else mealRatePerNightPerGuest = 2000;
                }
                
                foodCost = mealRatePerNightPerGuest * guestsCount * nights;
                chefCost = inputChef.value === 'yes' ? 3500 * nights : 0;
                stayCost = baseCost + foodCost + chefCost;

                // Update right summary panel
                if (summaryName) summaryName.textContent = currentPkg.title;
                if (summaryLocation) summaryLocation.innerHTML = `<i class="fa-solid fa-hotel"></i> ${currentPkg.location}`;
                if (summaryDates) summaryDates.textContent = `${inputCheckIn.value} to ${inputCheckOut.value}`;
                if (summaryNights) summaryNights.textContent = `${nights} Night Package`;
                if (summaryChef) summaryChef.textContent = inputChef.value === 'yes' ? 'Private Chef Included' : 'No Private Chef';
            } else if (currentProp) {
                baseCost = currentProp.price;
                chefCost = inputChef.value === 'yes' ? 3500 : 0;
                const totalCostPerNight = baseCost + chefCost;
                
                // Meal Plan Pricing for standard stays
                let mealRatePerNightPerGuest = 0;
                if (mealPlanVal === 'half-board') mealRatePerNightPerGuest = 1500;
                else if (mealPlanVal === 'full-board') mealRatePerNightPerGuest = 3000;
                
                foodCost = mealRatePerNightPerGuest * guestsCount * nights;
                stayCost = (totalCostPerNight * nights) + foodCost;

                // Update right summary panel
                if (summaryName) summaryName.textContent = currentProp.title;
                if (summaryLocation) summaryLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${currentProp.location}`;
                if (summaryDates) summaryDates.textContent = `${inputCheckIn.value} to ${inputCheckOut.value}`;
                if (summaryNights) summaryNights.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
                if (summaryChef) summaryChef.textContent = inputChef.value === 'yes' ? 'Private Chef Included' : 'No Private Chef';
            }

            const serviceFee = Math.round(stayCost * 0.10);
            const grandTotal = stayCost + serviceFee;

            if (summaryStay) {
                let stayCostBreakdown = `₹${(baseCost * (isPackage ? 1 : nights)).toLocaleString('en-IN')}`;
                if (foodCost > 0) stayCostBreakdown += ` + Food ₹${foodCost.toLocaleString('en-IN')}`;
                if (chefCost > 0) stayCostBreakdown += ` + Chef ₹${chefCost.toLocaleString('en-IN')}`;
                summaryStay.innerHTML = `${stayCostBreakdown} <br><span style="font-size:0.75rem; color:var(--color-text-muted); font-weight:normal;">Subtotal: ₹${stayCost.toLocaleString('en-IN')}</span>`;
            }
            if (summaryFee) summaryFee.textContent = `₹${serviceFee.toLocaleString('en-IN')}`;
            if (summaryGrand) summaryGrand.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
        }

        // Handles property selection change - sets lock on dates
        function handlePropertyChange() {
            const selectedPropId = inputProperty.value;
            const dbPackages = JSON.parse(localStorage.getItem('voyana_packages')) || packages;
            const currentPkg = dbPackages[selectedPropId];
            const isPackage = currentPkg !== undefined;

            if (isPackage) {
                inputCheckOut.readOnly = true;
                inputCheckOut.style.opacity = '0.7';
                inputCheckOut.style.cursor = 'not-allowed';
                
                // Auto-calculate check-out date based on package nights
                if (inputCheckIn.value) {
                    const checkInDate = new Date(inputCheckIn.value);
                    const checkOutDate = new Date(checkInDate);
                    checkOutDate.setDate(checkOutDate.getDate() + currentPkg.nights);
                    inputCheckOut.value = formatDateStr(checkOutDate);
                }
            } else {
                inputCheckOut.readOnly = false;
                inputCheckOut.style.opacity = '1';
                inputCheckOut.style.cursor = 'default';
            }
            updateWizardBilling();
        }

        updateWizardBilling();
        handlePropertyChange();

        // Listeners for Wizard Pricing updates
        [inputProperty, inputCheckIn, inputCheckOut, inputChef, inputGuests].forEach(input => {
            if (input) input.addEventListener('change', updateWizardBilling);
        });
        if (inputProperty) {
            inputProperty.addEventListener('change', handlePropertyChange);
        }
        if (inputCheckIn) {
            inputCheckIn.addEventListener('change', handlePropertyChange);
        }

        // Listener for Meal Plan update
        const inputMealPlan = document.getElementById('wizard-meal-plan');
        if (inputMealPlan) {
            inputMealPlan.addEventListener('change', updateWizardBilling);
        }

        // Navigation controls
        function renderStep() {
            stepPanels.forEach((panel, index) => {
                panel.style.display = (index + 1 === currentStep) ? 'block' : 'none';
            });

            stepIndicators.forEach((ind, index) => {
                ind.classList.toggle('active', index + 1 <= currentStep);
            });

            // Adjust navigation buttons
            if (currentStep === 1) {
                prevBtn.style.display = 'none';
                nextBtn.innerHTML = `<span>Continue to Details</span> <i class="fa-solid fa-arrow-right"></i>`;
            } else if (currentStep === 2) {
                prevBtn.style.display = 'block';
                nextBtn.innerHTML = `<span>Proceed to Payment</span> <i class="fa-solid fa-arrow-right"></i>`;
            } else {
                prevBtn.style.display = 'block';
                nextBtn.innerHTML = `<span>Confirm Reservation</span> <i class="fa-solid fa-check"></i>`;
            }
        }

        renderStep();

        nextBtn.addEventListener('click', () => {
            if (currentStep < 3) {
                // Validation checks
                if (currentStep === 1) {
                    const checkInVal = new Date(inputCheckIn.value);
                    const checkOutVal = new Date(inputCheckOut.value);
                    if (checkOutVal <= checkInVal) {
                        showToast('Dates Error', 'Check-out date must be after check-in.', 'error');
                        return;
                    }
                }
                if (currentStep === 2) {
                    const name = document.getElementById('guest-name').value.trim();
                    const email = document.getElementById('guest-email').value.trim();
                    const phone = document.getElementById('guest-phone').value.trim();
                    if (!name || !email || !phone) {
                        showToast('Fields Required', 'Please fill in all guest contact details.', 'error');
                        return;
                    }
                }
                currentStep++;
                renderStep();
            } else {
                // Final Submit (Create Booking in localStorage)
                const name = document.getElementById('guest-name').value.trim();
                const email = document.getElementById('guest-email').value.trim();
                const selectedPropId = inputProperty.value;
                const dbPackages = JSON.parse(localStorage.getItem('voyana_packages')) || packages;
                const currentProp = dbProperties[selectedPropId];
                const currentPkg = dbPackages[selectedPropId];
                const isPackage = currentPkg !== undefined;
                
                const checkInVal = new Date(inputCheckIn.value);
                const checkOutVal = new Date(inputCheckOut.value);
                let nights = Math.ceil((checkOutVal - checkInVal) / (1000 * 60 * 60 * 24));
                if (isNaN(nights) || nights <= 0) nights = 1;

                let baseCost = 0;
                let stayCost = 0;
                let foodCost = 0;
                let chefCost = 0;
                const mealPlanVal = inputMealPlan ? inputMealPlan.value : 'breakfast';
                const guestsCount = parseInt(inputGuests.value, 10) || 2;

                if (isPackage) {
                    baseCost = currentPkg.price;
                    nights = currentPkg.nights;
                    
                    let mealRatePerNightPerGuest = 0;
                    if (mealPlanVal === 'half-board') {
                        if (currentPkg.id === 'monsoon-fog') mealRatePerNightPerGuest = 0;
                        else if (currentPkg.id === 'honeymoon-mist') mealRatePerNightPerGuest = 500;
                        else mealRatePerNightPerGuest = 1000;
                    } else if (mealPlanVal === 'full-board') {
                        if (currentPkg.id === 'monsoon-fog') mealRatePerNightPerGuest = 0;
                        else if (currentPkg.id === 'honeymoon-mist') mealRatePerNightPerGuest = 1500;
                        else mealRatePerNightPerGuest = 2000;
                    }

                    foodCost = mealRatePerNightPerGuest * guestsCount * nights;
                    chefCost = inputChef.value === 'yes' ? 3500 * nights : 0;
                    stayCost = baseCost + foodCost + chefCost;
                } else if (currentProp) {
                    baseCost = currentProp.price;
                    chefCost = inputChef.value === 'yes' ? 3500 : 0;
                    
                    let mealRatePerNightPerGuest = 0;
                    if (mealPlanVal === 'half-board') mealRatePerNightPerGuest = 1500;
                    else if (mealPlanVal === 'full-board') mealRatePerNightPerGuest = 3000;

                    foodCost = mealRatePerNightPerGuest * guestsCount * nights;
                    stayCost = ((baseCost + chefCost) * nights) + foodCost;
                }

                const serviceFee = Math.round(stayCost * 0.10);
                const grandTotal = stayCost + serviceFee;

                const newBooking = {
                    id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
                    propertyId: selectedPropId,
                    propertyName: isPackage ? currentPkg.title : (currentProp ? currentProp.title : 'Retreat Stay'),
                    guestName: name,
                    guestEmail: email,
                    checkIn: inputCheckIn.value,
                    checkOut: inputCheckOut.value,
                    guests: guestsCount,
                    mealPlan: mealPlanVal, // Save the selected food package option!
                    totalPrice: grandTotal,
                    status: 'Pending Approval',
                    createdAt: formatDateStr(today)
                };

                // Add to bookings list
                const allBookings = JSON.parse(localStorage.getItem('voyana_bookings')) || [];
                allBookings.push(newBooking);
                localStorage.setItem('voyana_bookings', JSON.stringify(allBookings));

                showToast(
                    'Booking Success', 
                    `Reservation ${newBooking.id} submitted! View confirmation details on your dashboard.`, 
                    'success', 
                    6000
                );

                setTimeout(() => {
                    window.location.href = 'dashboard-user.html';
                }, 1500);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                renderStep();
            }
        });
    }

    /* ==========================================================================
       7. User Dashboard Logic (dashboard-user.html)
       ========================================================================== */
    const userDashboard = document.getElementById('user-dashboard');
    if (userDashboard) {
        const bookingsTable = document.getElementById('user-bookings-table');
        const dbBookings = JSON.parse(localStorage.getItem('voyana_bookings')) || [];

        function renderUserBookings() {
            if (bookingsTable) {
                bookingsTable.innerHTML = '';
                
                if (dbBookings.length === 0) {
                    bookingsTable.innerHTML = `<tr><td colspan="6" style="text-align:center;">No active bookings found. <a href="villas.html" style="color:var(--color-gold);">Explore our stays</a>.</td></tr>`;
                    return;
                }

                dbBookings.forEach(booking => {
                    const row = document.createElement('tr');
                    
                    let badgeClass = 'pending';
                    if (booking.status === 'Confirmed') badgeClass = 'confirmed';
                    if (booking.status === 'Cancelled') badgeClass = 'cancelled';

                    row.innerHTML = `
                        <td><strong>${booking.id}</strong></td>
                        <td>${booking.propertyName}</td>
                        <td>${booking.checkIn} to ${booking.checkOut}</td>
                        <td>₹${booking.totalPrice.toLocaleString('en-IN')}</td>
                        <td><span class="status-badge ${badgeClass}">${booking.status}</span></td>
                        <td>
                            <a href="#" class="btn btn-outline btn-nav download-invoice" data-id="${booking.id}" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 4px;">Invoice</a>
                        </td>
                    `;
                    bookingsTable.appendChild(row);
                });

                // Attach Invoice click events
                document.querySelectorAll('.download-invoice').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const bId = btn.getAttribute('data-id');
                        const booking = dbBookings.find(b => b.id === bId);
                        if (booking) {
                            showInvoiceModal(booking);
                        }
                    });
                });
            }
        }

        renderUserBookings();

        // User profile form logic
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const userName = document.getElementById('profile-name').value;
                showToast('Profile Updated', `Thank you ${userName}, your profile updates have been successfully saved.`, 'success');
            });
        }
    }

    // Modal to display mock Invoice details
    function showInvoiceModal(booking) {
        // Create dynamic modal box overlay
        const modal = document.createElement('div');
        modal.className = 'modal-overlay open';
        modal.style.zIndex = '3000';
        
        modal.innerHTML = `
            <div class="modal-box glass-panel" style="max-width: 600px; padding: 40px;">
                <button class="modal-close invoice-modal-close" aria-label="Close Invoice">&times;</button>
                <div style="border-bottom: 2px solid var(--color-gold); padding-bottom: 12px; margin-bottom: 20px;">
                    <h2 style="font-family:var(--font-heading); color:var(--color-primary-dark); font-size:1.8rem;">VOYANA SANCTUARIES</h2>
                    <p style="font-size:0.8rem; color:var(--color-text-muted);">Invoice details for booking ${booking.id}</p>
                </div>
                <div style="margin-bottom: 20px; font-size: 0.9rem; line-height: 1.8;">
                    <p><strong>Guest Name:</strong> ${booking.guestName}</p>
                    <p><strong>Retreat:</strong> ${booking.propertyName}</p>
                    <p><strong>Period:</strong> ${booking.checkIn} to ${booking.checkOut}</p>
                    <p><strong>Guests:</strong> ${booking.guests} Guest(s)</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                </div>
                <table style="width:100%; border-collapse:collapse; margin-bottom: 20px; font-size:0.9rem;">
                    <thead>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.1); text-align: left;">
                            <th style="padding: 8px 0;">Description</th>
                            <th style="padding: 8px 0; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                            <td style="padding: 8px 0;">Luxury Mountain Stay Charges (incl. taxes)</td>
                            <td style="padding: 8px 0; text-align: right;">₹${Math.round(booking.totalPrice / 1.1).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                            <td style="padding: 8px 0;">Service & Administration Fee (10%)</td>
                            <td style="padding: 8px 0; text-align: right;">₹${Math.round((booking.totalPrice / 1.1) * 0.1).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr style="font-weight: 700;">
                            <td style="padding: 12px 0;">Grand Total</td>
                            <td style="padding: 12px 0; text-align: right; color:var(--color-gold);">₹${booking.totalPrice.toLocaleString('en-IN')}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn btn-primary invoice-modal-close" style="padding: 10px 24px; font-size: 0.85rem;">Close Invoice</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelectorAll('.invoice-modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
    }

    /* ==========================================================================
       8. Admin Dashboard Logic (dashboard-admin.html)
       ========================================================================== */
    const adminDashboard = document.getElementById('admin-dashboard');
    if (adminDashboard) {
        const adminTable = document.getElementById('admin-bookings-table');
        let dbBookings = JSON.parse(localStorage.getItem('voyana_bookings')) || [];

        function renderAdminBookings() {
            if (adminTable) {
                adminTable.innerHTML = '';
                if (dbBookings.length === 0) {
                    adminTable.innerHTML = `<tr><td colspan="7" style="text-align:center;">No reservation history found in system.</td></tr>`;
                    return;
                }

                // Compute and update Admin Metrics
                let totalRevenue = 0;
                let pendingCount = 0;
                let activeCount = 0;

                dbBookings.forEach(booking => {
                    if (booking.status === 'Confirmed') {
                        totalRevenue += booking.totalPrice;
                        activeCount++;
                    }
                    if (booking.status === 'Pending Approval') {
                        pendingCount++;
                    }
                });

                const revMetric = document.getElementById('metric-total-rev');
                const pendMetric = document.getElementById('metric-pending-cnt');
                const activeMetric = document.getElementById('metric-active-cnt');

                if (revMetric) revMetric.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
                if (pendMetric) pendMetric.textContent = pendingCount;
                if (activeMetric) activeMetric.textContent = activeCount;

                dbBookings.forEach(booking => {
                    const row = document.createElement('tr');
                    
                    let badgeClass = 'pending';
                    if (booking.status === 'Confirmed') badgeClass = 'confirmed';
                    if (booking.status === 'Cancelled') badgeClass = 'cancelled';

                    let actionsHTML = '';
                    if (booking.status === 'Pending Approval') {
                        actionsHTML = `
                            <button class="btn btn-primary approve-btn" data-id="${booking.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px; border:none;">Approve</button>
                            <button class="btn btn-outline cancel-btn" data-id="${booking.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px; border-color:#b23b3b; color:#b23b3b;">Cancel</button>
                        `;
                    } else if (booking.status === 'Confirmed') {
                        actionsHTML = `
                            <button class="btn btn-outline cancel-btn" data-id="${booking.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px; border-color:#b23b3b; color:#b23b3b;">Cancel</button>
                        `;
                    } else {
                        actionsHTML = `<span style="font-size:0.8rem; color:var(--color-text-muted);">No actions available</span>`;
                    }

                    row.innerHTML = `
                        <td><strong>${booking.id}</strong></td>
                        <td>${booking.guestName}<br><span style="font-size:0.75rem; color:var(--color-text-muted);">${booking.guestEmail}</span></td>
                        <td>${booking.propertyName}</td>
                        <td>${booking.checkIn} to ${booking.checkOut}</td>
                        <td>₹${booking.totalPrice.toLocaleString('en-IN')}</td>
                        <td><span class="status-badge ${badgeClass}">${booking.status}</span></td>
                        <td><div style="display:flex; gap:8px;">${actionsHTML}</div></td>
                    `;
                    adminTable.appendChild(row);
                });

                // Attach Action Listeners
                document.querySelectorAll('.approve-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const bId = btn.getAttribute('data-id');
                        updateBookingStatus(bId, 'Confirmed');
                    });
                });

                document.querySelectorAll('.cancel-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const bId = btn.getAttribute('data-id');
                        updateBookingStatus(bId, 'Cancelled');
                    });
                });
            }
        }

        function updateBookingStatus(bookingId, status) {
            dbBookings = dbBookings.map(booking => {
                if (booking.id === bookingId) {
                    booking.status = status;
                }
                return booking;
            });
            localStorage.setItem('voyana_bookings', JSON.stringify(dbBookings));
            showToast('System Updated', `Booking ${bookingId} has been marked as ${status}.`, 'success');
            renderAdminBookings();
        }

        renderAdminBookings();
    }

    /* ==========================================================================
       9. Testimonials & Carousels
       ========================================================================== */
    const carouselTrack = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        let currentIndex = 0;
        let slideInterval;

        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

        const updateDots = () => {
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
            resetAutoSlide();
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, 6000);
        };

        const resetAutoSlide = () => {
            clearInterval(slideInterval);
            startAutoSlide();
        };

        startAutoSlide();
    }

    /* ==========================================================================
       10. Photo Gallery Lightbox Viewer
       ========================================================================== */
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close-btn');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxPrev = document.getElementById('lightbox-prev-btn');
    const lightboxNext = document.getElementById('lightbox-next-btn');

    let visibleGalleryImages = [];
    let currentLightboxIdx = 0;

    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterVal = btn.getAttribute('data-gallery-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-gallery-cat');
                    if (filterVal === 'all' || category === filterVal) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    function updateVisibleGallery() {
        visibleGalleryImages = [];
        galleryItems.forEach(item => {
            if (!item.classList.contains('hidden')) {
                visibleGalleryImages.push({
                    src: item.querySelector('img').src,
                    title: item.querySelector('.gallery-title').textContent
                });
            }
        });
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateVisibleGallery();
            const imgSrc = item.querySelector('img').src;
            currentLightboxIdx = visibleGalleryImages.findIndex(imgObj => imgObj.src === imgSrc);
            openLightbox();
        });
    });

    function openLightbox() {
        if (currentLightboxIdx > -1 && visibleGalleryImages[currentLightboxIdx] && lightboxModal) {
            const currentImg = visibleGalleryImages[currentLightboxIdx];
            lightboxImg.src = currentImg.src;
            lightboxCaption.textContent = currentImg.title;
            lightboxModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            if (visibleGalleryImages.length > 0) {
                currentLightboxIdx = (currentLightboxIdx + 1) % visibleGalleryImages.length;
                openLightbox();
            }
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            if (visibleGalleryImages.length > 0) {
                currentLightboxIdx = (currentLightboxIdx - 1 + visibleGalleryImages.length) % visibleGalleryImages.length;
                openLightbox();
            }
        });
    }

    /* ==========================================================================
       11a. Dining Page Food Order Modal & Form Submission
       ========================================================================== */
    const foodOrderModal = document.getElementById('food-order-modal');
    const foodOrderModalClose = document.getElementById('food-order-modal-close');
    const diningOrderForm = document.getElementById('dining-order-form');
    const orderDiningOption = document.getElementById('order-dining-option');
    const orderServings = document.getElementById('order-servings');
    const orderTotalPrice = document.getElementById('order-total-price');

    // Calculate food order price
    function calculateFoodOrderPrice() {
        if (!orderDiningOption || !orderTotalPrice) return;
        
        const option = orderDiningOption.value;
        const servings = parseInt(orderServings.value, 10) || 2;
        let price = 0;

        if (option === 'Organic Forest Breakfast') {
            price = 0;
        } else if (option === 'Garden-to-Table Lunch & Dinner') {
            price = 1500 * servings;
        } else if (option === 'Fireside Deck Candlelight Dinner') {
            price = 6000; // Flat price per couple
        } else if (option === 'Mountain BBQ & Bonfire Feast') {
            price = 4500; // Flat price per group
        }

        orderTotalPrice.textContent = `₹${price.toLocaleString('en-IN')}`;
        return price;
    }

    if (orderDiningOption && orderServings) {
        orderDiningOption.addEventListener('change', calculateFoodOrderPrice);
        orderServings.addEventListener('change', calculateFoodOrderPrice);
    }

    // Open Modal and Pre-fill Option
    const orderFoodBtns = document.querySelectorAll('.btn-order-food');
    orderFoodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.getAttribute('data-item');
            if (orderDiningOption) {
                orderDiningOption.value = item;
                calculateFoodOrderPrice();
            }
            if (foodOrderModal) {
                foodOrderModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
            // Set default date to tomorrow
            const orderDateInput = document.getElementById('order-date');
            if (orderDateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                orderDateInput.value = tomorrow.toISOString().split('T')[0];
            }
        });
    });

    // Close Modal
    if (foodOrderModalClose && foodOrderModal) {
        foodOrderModalClose.addEventListener('click', () => {
            foodOrderModal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }

    // Submit Food Order
    if (diningOrderForm) {
        diningOrderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedOption = orderDiningOption.value;
            const selectedVilla = document.getElementById('order-villa').value;
            const selectedServings = parseInt(orderServings.value, 10);
            const selectedDate = document.getElementById('order-date').value;
            const selectedTime = document.getElementById('order-time').value;
            const notes = document.getElementById('order-notes').value.trim();
            const orderPrice = calculateFoodOrderPrice();

            const newOrder = {
                id: 'FD-' + Math.floor(1000 + Math.random() * 9000),
                guestName: 'Aditya Sen', // Simulated Guest Name
                guestEmail: 'aditya@sen.org', // Simulated Email
                diningOption: selectedOption,
                villa: selectedVilla,
                date: selectedDate,
                timeSlot: selectedTime,
                servings: selectedServings,
                totalPrice: orderPrice,
                status: 'Pending Approval',
                notes: notes,
                createdAt: formatDateStr(new Date())
            };

            const dbOrders = JSON.parse(localStorage.getItem('voyana_foodOrders')) || [];
            dbOrders.push(newOrder);
            localStorage.setItem('voyana_foodOrders', JSON.stringify(dbOrders));

            showToast(
                'Food Order Placed',
                `Room service order ${newOrder.id} submitted for delivery to ${selectedVilla}!`,
                'success',
                6000
            );

            // Close and reset
            diningOrderForm.reset();
            foodOrderModal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }

    // Dashboard User Food Orders Renderer helper
    function renderUserFoodOrders() {
        const foodTable = document.getElementById('user-food-orders-table');
        if (foodTable) {
            const dbFoodOrders = JSON.parse(localStorage.getItem('voyana_foodOrders')) || [];
            foodTable.innerHTML = '';
            
            if (dbFoodOrders.length === 0) {
                foodTable.innerHTML = `<tr><td colspan="7" style="text-align:center;">No active room service orders. <a href="dining.html" style="color:var(--color-gold);">Explore our menus</a>.</td></tr>`;
                return;
            }

            dbFoodOrders.forEach(order => {
                let badgeClass = 'pending';
                if (order.status === 'Confirmed' || order.status === 'Completed' || order.status === 'Delivered') badgeClass = 'confirmed';
                if (order.status === 'Cancelled') badgeClass = 'cancelled';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${order.id}</strong></td>
                    <td>${order.diningOption}</td>
                    <td>${order.villa}</td>
                    <td>${order.date}<br><span style="font-size:0.75rem; color:var(--color-text-muted);">${order.timeSlot}</span></td>
                    <td>${order.servings} Servings</td>
                    <td>₹${order.totalPrice.toLocaleString('en-IN')}</td>
                    <td><span class="status-badge ${badgeClass}">${order.status}</span></td>
                `;
                foodTable.appendChild(row);
            });
        }
    }

    // Call user food orders renderer if dashboard is active
    if (document.getElementById('user-dashboard')) {
        renderUserFoodOrders();
    }

    // Dashboard Admin Food Orders Renderer helper
    function renderAdminFoodOrders() {
        const adminFoodTable = document.getElementById('admin-food-orders-table');
        if (adminFoodTable) {
            let dbFoodOrders = JSON.parse(localStorage.getItem('voyana_foodOrders')) || [];
            adminFoodTable.innerHTML = '';

            if (dbFoodOrders.length === 0) {
                adminFoodTable.innerHTML = `<tr><td colspan="8" style="text-align:center;">No customer food orders in system.</td></tr>`;
                return;
            }

            dbFoodOrders.forEach(order => {
                let badgeClass = 'pending';
                if (order.status === 'Confirmed' || order.status === 'Completed' || order.status === 'Delivered') badgeClass = 'confirmed';
                if (order.status === 'Cancelled') badgeClass = 'cancelled';

                let actionsHTML = '';
                if (order.status === 'Pending Approval') {
                    actionsHTML = `
                        <button class="btn btn-primary approve-food-btn" data-id="${order.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px; border:none;">Approve</button>
                        <button class="btn btn-outline cancel-food-btn" data-id="${order.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px; border-color:#b23b3b; color:#b23b3b;">Cancel</button>
                    `;
                } else if (order.status === 'Confirmed') {
                    actionsHTML = `
                        <button class="btn btn-outline deliver-food-btn" data-id="${order.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px; border-color:var(--color-primary); color:var(--color-primary);">Mark Delivered</button>
                    `;
                } else {
                    actionsHTML = `<span style="font-size:0.8rem; color:var(--color-text-muted);">No actions</span>`;
                }

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${order.id}</strong></td>
                    <td>${order.guestName}<br><span style="font-size:0.75rem; color:var(--color-text-muted);">${order.guestEmail}</span></td>
                    <td>${order.diningOption}</td>
                    <td>${order.villa}</td>
                    <td>${order.date}<br><span style="font-size:0.75rem; color:var(--color-text-muted);">${order.timeSlot}</span></td>
                    <td>₹${order.totalPrice.toLocaleString('en-IN')}</td>
                    <td><span class="status-badge ${badgeClass}">${order.status}</span></td>
                    <td><div style="display:flex; gap:8px;">${actionsHTML}</div></td>
                `;
                adminFoodTable.appendChild(row);
            });

            // Action Listeners for Food Orders
            document.querySelectorAll('.approve-food-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const oId = btn.getAttribute('data-id');
                    updateFoodOrderStatus(oId, 'Confirmed');
                });
            });

            document.querySelectorAll('.cancel-food-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const oId = btn.getAttribute('data-id');
                    updateFoodOrderStatus(oId, 'Cancelled');
                });
            });

            document.querySelectorAll('.deliver-food-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const oId = btn.getAttribute('data-id');
                    updateFoodOrderStatus(oId, 'Delivered');
                });
            });
        }
    }

    function updateFoodOrderStatus(orderId, status) {
        let dbFoodOrders = JSON.parse(localStorage.getItem('voyana_foodOrders')) || [];
        dbFoodOrders = dbFoodOrders.map(order => {
            if (order.id === orderId) {
                order.status = status;
            }
            return order;
        });
        localStorage.setItem('voyana_foodOrders', JSON.stringify(dbFoodOrders));
        showToast('System Updated', `Order ${orderId} marked as ${status}.`, 'success');
        renderAdminFoodOrders();
    }

    // Call admin food orders renderer if admin dashboard is active
    if (document.getElementById('admin-dashboard')) {
        renderAdminFoodOrders();
    }

    /* ==========================================================================
       11. Forms Submissions (Contact & Newsletter)
       ========================================================================== */
    const contactForm = document.getElementById('contact-inquiry-form');
    const newsletterForm = document.getElementById('newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            showToast(
                'Inquiry Received', 
                `Thank you ${name}. Your message has been sent successfully. Our booking advisor will respond in 24 hours.`, 
                'success'
            );
            contactForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input');
            showToast(
                'Subscribed', 
                `Thank you for joining the Voyana Journal. Itineraries will be sent to: ${emailInput.value}.`, 
                'success'
            );
            newsletterForm.reset();
        });
    }

    /* ==========================================================================
       12. Floating Toast Alert Helper
       ========================================================================== */
    const toast = document.getElementById('success-toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    const toastCloseBtn = document.getElementById('toast-close-btn');
    let toastTimeout;

    function showToast(title, desc, type = 'success', duration = 5000) {
        if (!toast) return;
        clearTimeout(toastTimeout);

        toastTitle.textContent = title;
        toastDesc.textContent = desc;

        const iconEl = toast.querySelector('.toast-icon');
        if (type === 'error') {
            toast.style.borderLeftColor = '#b23b3b';
            if (iconEl) iconEl.className = 'fa-solid fa-circle-exclamation toast-icon';
        } else {
            toast.style.borderLeftColor = 'var(--color-primary-dark)';
            if (iconEl) iconEl.className = 'fa-solid fa-circle-check toast-icon';
        }

        toast.classList.add('show');
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
    
    window.showToast = showToast; // Expose globally for pages like contact.html to use

    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

    /* ==========================================================================
       13. Animated Counter — Intro Section Stats
       ========================================================================== */
    function animateCounter(el, target, duration) {
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counterEls = document.querySelectorAll('[data-target].pill-number, [data-target].intro-stat-num, [data-target].stat-number');
    if (counterEls.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const target = parseInt(entry.target.dataset.target, 10);
                    animateCounter(entry.target, target, 1600);
                }
            });
        }, { threshold: 0.4 });

        counterEls.forEach(el => counterObserver.observe(el));
    }

    /* ==========================================================================
       14. Cinematic Subpage Hero Interaction (Villas & Cottages Parallax)
       ========================================================================== */
    const villasHero = document.querySelector('.villas-hero');
    const villasCard = document.querySelector('.villas-hero-card');
    const villasVideo = document.querySelector('.villas-video-bg');

    if (villasHero && villasCard) {
        // 3D Card Tilt on mouse movement
        villasHero.addEventListener('mousemove', (e) => {
            const rect = villasHero.getBoundingClientRect();
            // Calculate cursor coordinates relative to center of the hero section
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);

            // Compute rotation angles (max tilt around 10 degrees)
            const tiltX = (y / rect.height) * -20;
            const tiltY = (x / rect.width) * 20;

            // Apply 3D rotation with smooth perspective transform
            villasCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            villasCard.style.boxShadow = `
                0 35px 70px rgba(0, 0, 0, 0.6), 
                0 0 50px rgba(212, 175, 55, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `;
        });

        // Reset Card orientation when mouse leaves
        villasHero.addEventListener('mouseleave', () => {
            villasCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            villasCard.style.boxShadow = '';
        });
        
        // Scroll Parallax Effect for Background Video
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if (scrollPos < window.innerHeight && villasVideo) {
                // Shift background video downwards slightly to create depth window effect
                // Scale factor 1.15 is preserved from css base styling
                villasVideo.style.transform = `scale(1.15) translateY(${scrollPos * 0.25}px)`;
            }
        }, { passive: true });
    }

    // Helper: Dates formatter
    function formatDateStr(date) {
        return date.toISOString().split('T')[0];
    }
});
