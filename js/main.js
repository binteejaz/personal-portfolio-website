const themeToggle = document.querySelector('#switch-button');
const htmlElement = document.documentElement;
const projectsContainer = document.querySelector('.projects-container');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});


const projects = [
    {
        title: "Portfolio Project (This Website!)",
        description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
        imageUrl: "./images/project-placeholder-1.webp",
        liveUrl: "https://6ad9eb70aacc6a198dc041c4--nimble-frangipane-80ee5a.netlify.app",
        codeUrl: "https://github.com/binteejaz/personal-portfolio-website/"
    },
    {
        title: "Campus Hub",
        description: "A concept design and front-end implementation for a campus hub. Focused on a clean UI, responsive layouts, and a better platform for students problems using modern CSS techniques.",
        imageUrl: "./images/project-placeholder-2.webp",
        liveUrl: "https://6ad9eb70aacc6a198dc041c4--nimble-frangipane-80ee5a.netlify.app",
        codeUrl: "https://github.com/binteejaz/personal-portfolio-website/"
    },
    {
        title: "Task Management App",
        description: "A client-side task management application built with vanilla JavaScript. Allows users to add, edit, delete, and mark tasks as complete, with all data saved to localStorage.",
        imageUrl: "./images/project-placeholder-3.webp",
        codeUrl: "https://github.com/binteejaz/personal-portfolio-website/" // Replace with your repo link
    }
];

const renderProjects = () => {

    let allProjectsHTML = "";
    projects.forEach(project => {
        const projectCardHTML = `
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    `;
        allProjectsHTML += projectCardHTML;
    });
    projectsContainer.innerHTML = allProjectsHTML;
};

document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector("button[type='submit']");
            formStatus.innerHTML = "Sending...";
            formStatus.className = "info";
            formStatus.style.display = "block";
            submitButton.disabled = true;
            fetch(contactForm.action, {
                method: "post",
                body: formData,
                headers: {
                    'Accept': "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = "Thank you! Your message has been sent.";
                    formStatus.className = "success";
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, "errors")) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).json(", ");
                        } else {
                            formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
                        }
                        formStatus.className = "error";
                    })
                }
            }).catch(error => {
                formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
                formStatus.className = 'error';
            }).finally(() => {
                submitButton.disabled = false;
            });

        });
    }
});

