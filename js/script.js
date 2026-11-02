/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



/* =========================================================
   HOPE OF LIVING - PART 3 JAVASCRIPT
   Interactive website features
   ========================================================= */


/* 1. MOBILE NAVIGATION MENU */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        const isExpanded = navMenu.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isExpanded);
    });
}


/* 2. DYNAMIC SERVICES */

const services = [
    {
        title: "Community Support",
        category: "community",
        description:
            "Support initiatives that encourage and assist members of the local community."
    },
    {
        title: "Food Support",
        category: "community",
        description:
            "Community food support initiatives aimed at helping people in need."
    },
    {
        title: "Education Support",
        category: "education",
        description:
            "Activities that encourage learning, skills development and educational opportunities."
    },
    {
        title: "Community Outreach",
        category: "outreach",
        description:
            "Outreach activities that bring people together and encourage community participation."
    },
    {
        title: "Volunteer Opportunities",
        category: "outreach",
        description:
            "Opportunities for people to contribute their time and skills to community initiatives."
    }
];

const serviceContainer = document.getElementById("serviceContainer");
const serviceSearch = document.getElementById("serviceSearch");
const serviceFilter = document.getElementById("serviceFilter");


function displayServices(serviceList) {
    if (!serviceContainer) return;

    serviceContainer.innerHTML = "";

    if (serviceList.length === 0) {
        serviceContainer.innerHTML =
            "<p class='no-results'>No services found. Please try another search.</p>";
        return;
    }

    serviceList.forEach(function (service) {
        const serviceCard = document.createElement("article");

        serviceCard.className = "service-card";

        const heading = document.createElement("h3");
        heading.textContent = service.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = service.description;

        serviceCard.appendChild(heading);
        serviceCard.appendChild(paragraph);

        serviceContainer.appendChild(serviceCard);
    });
}


function filterServices() {
    if (!serviceContainer) return;

    const searchText = serviceSearch
        ? serviceSearch.value.toLowerCase().trim()
        : "";

    const selectedCategory = serviceFilter
        ? serviceFilter.value
        : "all";

    const filteredServices = services.filter(function (service) {
        const matchesSearch =
            service.title.toLowerCase().includes(searchText) ||
            service.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            service.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayServices(filteredServices);
}


if (serviceContainer) {
    displayServices(services);
}

if (serviceSearch) {
    serviceSearch.addEventListener("input", filterServices);
}

if (serviceFilter) {
    serviceFilter.addEventListener("change", filterServices);
}


/* 3. FAQ ACCORDION */

// FAQ ACCORDION
document.addEventListener("DOMContentLoaded", function () {

    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const content = button.nextElementSibling;

            if (!content) {
                console.log("FAQ answer not found.");
                return;
            }

            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", !isOpen);
            content.hidden = isOpen;

        });

    });

});


/* 4. GALLERY LIGHTBOX */

const galleryImages = document.querySelectorAll(".gallery-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");


function openLightbox(image) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";

    if (lightboxClose) {
        lightboxClose.focus();
    }
}


function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
}


galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
        openLightbox(image);
    });

    image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(image);
        }
    });
});


if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}


if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}


document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
        closeLightbox();
    }
});


/* 5. SCROLL-REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}
