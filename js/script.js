/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


// HOPE OF LIVING - PART 3 JAVASCRIPT

// 1. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });
}

// 2. Dynamic services
const services = [
    {
        name: "Community Support",
        category: "community",
        description: "Support and assistance for members of our community."
    },
    {
        name: "Food Support",
        category: "community",
        description: "Helping families access food and essential resources."
    },
    {
        name: "Education Support",
        category: "education",
        description: "Encouraging learning and educational development."
    },
    {
        name: "Community Outreach",
        category: "outreach",
        description: "Connecting with people and supporting local initiatives."
    }
];

const serviceContainer = document.getElementById("serviceContainer");
const serviceSearch = document.getElementById("serviceSearch");
const serviceFilter = document.getElementById("serviceFilter");

function displayServices() {
    if (!serviceContainer) return;

    const searchText = serviceSearch
        ? serviceSearch.value.toLowerCase()
        : "";

    const selectedCategory = serviceFilter
        ? serviceFilter.value
        : "all";

    const filteredServices = services.filter(service => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchText) ||
            service.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            service.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    serviceContainer.innerHTML = "";

    if (filteredServices.length === 0) {
        serviceContainer.textContent = "No services found.";
        return;
    }

    filteredServices.forEach(service => {
        const card = document.createElement("article");
        card.className = "service-card";

        const heading = document.createElement("h3");
        heading.textContent = service.name;

        const paragraph = document.createElement("p");
        paragraph.textContent = service.description;

        card.append(heading, paragraph);
        serviceContainer.appendChild(card);
    });
}

if (serviceContainer) {
    displayServices();

    if (serviceSearch) {
        serviceSearch.addEventListener("input", displayServices);
    }

    if (serviceFilter) {
        serviceFilter.addEventListener("change", displayServices);
    }
}

// 3. Accordion feature
document.querySelectorAll(".accordion-button").forEach(button => {
    button.addEventListener("click", function () {
        const content = this.nextElementSibling;
        const isOpen = this.getAttribute("aria-expanded") === "true";

        this.setAttribute("aria-expanded", String(!isOpen));

        if (content) {
            content.hidden = isOpen;
        }
    });
});

// 4. Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-image").forEach(image => {
    image.addEventListener("click", function () {
        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = this.src;
        lightboxImage.alt = this.alt;
        lightbox.hidden = false;
    });
});

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener("click", function () {
        lightbox.hidden = true;
    });
}

// 5. Enquiry form validation
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const phone = document.getElementById("enquiryPhone");
        const response = document.getElementById("enquiryResponse");

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        if (phone && !/^(\+27|0)[6-8][0-9]{8}$/.test(phone.value.trim())) {
            response.textContent =
                "Please enter a valid South African mobile number.";
            return;
        }

        response.textContent =
            "Your enquiry details are valid. Please submit them using the contact method provided.";
    });
}

// 6. Contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const phone = document.getElementById("contactPhone");
        const response = document.getElementById("contactResponse");

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (phone && !/^(\+27|0)[6-8][0-9]{8}$/.test(phone.value.trim())) {
            response.textContent =
                "Please enter a valid South African mobile number.";
            return;
        }

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const message = document.getElementById("contactMessage").value;

        const subject = encodeURIComponent("Hope of Living enquiry");
        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\nMessage: " + message
        );

        // Replace this placeholder with the organisation's real email.
        window.location.href =
            "mailto:REPLACE-WITH-REAL-EMAIL@example.com" +
            "?subject=" + subject + "&body=" + body;

        response.textContent =
            "Your email application should open with your message prepared.";
    });
}

// 7. Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    });

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

