import os
import re

directory = r"c:\Users\dines\OneDrive\Desktop\hotel"

# 1. Remove packages from nav bar on all files
nav_pattern = re.compile(r'\s*<li><a href="packages\.html" class="nav-link[^"]*">Packages</a></li>')

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        path = os.path.join(directory, filename)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = nav_pattern.sub("", content)
        
        if new_content != content:
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Removed Packages nav from {filename}")

# 2. Add Packages section to experiences.html before Footer
exp_path = os.path.join(directory, "experiences.html")
with open(exp_path, "r", encoding="utf-8") as f:
    exp_content = f.read()

# Make sure we don't duplicate it
if "class=\"section packages-section bg-light\"" not in exp_content:
    packages_html = """
    <!-- Special Packages Section -->
    <section class="section packages-section bg-light">
        <div class="container">
            <div class="section-header">
                <span class="sub-title">SPECIAL ESCAPES</span>
                <h2 class="section-title">Curated Holiday Packages</h2>
                <div class="divider"></div>
                <p class="section-desc">Unlock exceptional value with custom packages tailored for honeymoons, monsoons, and adventure treks.</p>
            </div>

            <!-- Packages Grid (3 columns) -->
            <div class="packages-grid">
                <!-- Package 1 -->
                <div class="package-card">
                    <div class="package-content">
                        <span class="package-tag">Romantic Getaway</span>
                        <h3>Honeymoon Mist Package</h3>
                        <p class="package-desc">Spend 3 nights in our premium Silver Mist Hideaway. Includes champagne on arrival, private candlelight deck dinner, and wellness massage sessions.</p>
                        <div class="package-price">
                            <span class="pkg-price">₹45,000</span>
                            <span class="pkg-duration">/ 3 Nights</span>
                        </div>
                        <ul class="package-features">
                            <li><i class="fa-solid fa-circle-check"></i> Private Honeymoon Suite</li>
                            <li><i class="fa-solid fa-circle-check"></i> 1 Candlelight Dinner</li>
                            <li><i class="fa-solid fa-circle-check"></i> Couple Massage Session</li>
                            <li><i class="fa-solid fa-circle-check"></i> Private Jeep Tour</li>
                        </ul>
                        <a href="contact.html?subject=Honeymoon-Mist" class="btn btn-outline btn-block">Inquire Package</a>
                    </div>
                </div>

                <!-- Package 2 -->
                <div class="package-card featured-package">
                    <div class="package-content">
                        <span class="package-tag">Monsoon Special</span>
                        <h3>Monsoon Fog Sanctuary</h3>
                        <p class="package-desc">Embrace Kodaikanal's famous monsoon. Stay 4 nights for the price of 3 at Glass Forest Manor. Complete with unlimited warm cider and nightly indoor hearth fires.</p>
                        <div class="package-price">
                            <span class="pkg-price">₹84,000</span>
                            <span class="pkg-duration">/ 4 Nights</span>
                        </div>
                        <ul class="package-features">
                            <li><i class="fa-solid fa-circle-check"></i> Stay 4, Pay 3 Nights</li>
                            <li><i class="fa-solid fa-circle-check"></i> Complimentary Firewood</li>
                            <li><i class="fa-solid fa-circle-check"></i> Gourmet Hot Cocoa & Cider</li>
                            <li><i class="fa-solid fa-circle-check"></i> 24/7 Butler Support</li>
                        </ul>
                        <a href="contact.html?subject=Monsoon-Fog" class="btn btn-primary btn-block">Inquire Package</a>
                    </div>
                </div>

                <!-- Package 3 -->
                <div class="package-card">
                    <div class="package-content">
                        <span class="package-tag">Adventure Thrills</span>
                        <h3>Mountain Trail Expedition</h3>
                        <p class="package-desc">Designed for nature lovers. 2 nights at Whispering Pines Cottage including professional-guided rock climbing, valley hiking, and camping equipment.</p>
                        <div class="package-price">
                            <span class="pkg-price">₹38,000</span>
                            <span class="pkg-duration">/ 2 Nights</span>
                        </div>
                        <ul class="package-features">
                            <li><i class="fa-solid fa-circle-check"></i> Cozy Stone Cottage</li>
                            <li><i class="fa-solid fa-circle-check"></i> Professional Trek Guide</li>
                            <li><i class="fa-solid fa-circle-check"></i> Adventure Gear Included</li>
                            <li><i class="fa-solid fa-circle-check"></i> High-Energy Camp Meals</li>
                        </ul>
                        <a href="contact.html?subject=Mountain-Trail" class="btn btn-outline btn-block">Inquire Package</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
"""

    if "<!-- Footer -->" in exp_content:
        new_exp = exp_content.replace("<!-- Footer -->", packages_html + "\n    <!-- Footer -->")
        with open(exp_path, "w", encoding="utf-8") as f:
            f.write(new_exp)
        print("Inserted Packages into experiences.html")
    else:
        print("Error: Could not find Footer marker in experiences.html")
else:
    print("Packages section already exists in experiences.html")
