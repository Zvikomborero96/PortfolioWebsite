// Utility function for handling form submissions
async function handleFormSubmit(event, formId, endpoint) {
  event.preventDefault();
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Show success message
    showNotification(
      "Success!",
      "Your message has been sent successfully.",
      "success"
    );
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    showNotification(
      "Error!",
      "There was a problem sending your message.",
      "error"
    );
  }
}

// Utility function for showing notifications
function showNotification(title, message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;

  document.body.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Utility function for lazy loading images
function lazyLoadImages() {
  const images = document.querySelectorAll("[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Utility function for handling animations on scroll
function setupScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => observer.observe(element));
}

// Utility function for filtering projects
function filterProjects(category) {
  const projects = document.querySelectorAll(".project-card");

  if (category === "all") {
    projects.forEach((project) => (project.style.display = "block"));
    return;
  }

  projects.forEach((project) => {
    const tags = project.dataset.tags.split(",");
    project.style.display = tags.includes(category) ? "block" : "none";
  });
}

// Export utilities for use in main.js
window.utils = {
  handleFormSubmit,
  showNotification,
  lazyLoadImages,
  setupScrollAnimations,
  filterProjects,
};
