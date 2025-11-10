// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    // Toggle icon between menu and x
    const icon = mobileMenuButton.querySelector("i");
    icon.dataset.lucide = icon.dataset.lucide === "menu" ? "x" : "menu";
    lucide.createIcons();
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      const icon = mobileMenuButton.querySelector("i");
      icon.dataset.lucide = "menu";
      lucide.createIcons();
    });
  });
});

// Scroll to section smoothly when clicking nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Load section content
async function loadContent() {
  try {
    const response = await fetch("js/content.js");
    const content = await response.json();

    // About Section
    const aboutSection = document.getElementById("about");
    aboutSection.innerHTML = `
            <div class="max-w-7xl mx-auto px-6">
                <h2 class="text-4xl md:text-5xl font-bold mb-8">
                    About <span class="text-gradient">Me</span>
                </h2>
                <div class="grid md:grid-cols-2 gap-12">
                    <div class="glass p-8 animate-fade-in-up">
                        <p class="text-lg text-slate-300">${
                          content.personalInfo.bio
                        }</p>
                    </div>
                    <div class="space-y-6 animate-fade-in-up delay-200">
                        ${content.philosophy
                          .map(
                            (item) => `
                            <div class="glass p-6">
                                <h3 class="text-xl font-bold mb-2 text-cyan-400">
                                    ${item.principle}
                                </h3>
                                <p class="text-slate-300">${item.description}</p>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `;

    // Add other sections similarly...
    // Skills Section
    // Projects Section
    // Experience Section
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

// Call loadContent when DOM is ready
document.addEventListener("DOMContentLoaded", loadContent);
