
document.addEventListener("DOMContentLoaded", function () {

    // Load all clubs and societies
    if (!window.eduClubData) {
        console.error("EduClub data file not loaded!");
        return;
    }

    const clubs = window.eduClubData.clubs || [];
const societies = window.eduClubData.societies || [];

    const clubContainer = document.getElementById("clubContainer");
    const searchInput = document.getElementById("searchInput");
    const noResults = document.getElementById("noResults");

    if (!clubContainer || !searchInput || !noResults) {
        console.error("Required HTML elements not found!");
        return;
    }

    
// Get a suitable description for each club or society
function getEduClubDescription(club) {

    if (
        club.description &&
        club.description.trim() !== "" &&
        club.description !== "More details coming soon."
    ) {
        return club.description;
    }

    const category = (club.category || "").toLowerCase();
    const name = (club.name || "").toLowerCase();

    if (name.includes("coding") || name.includes("programming") ||
        name.includes("computer") || name.includes("technology")) {
        return "This club brings together students interested in technology, computers and programming. It provides an opportunity to explore new ideas, improve technical knowledge and learn through collaboration and practical activities.";
    }

    if (name.includes("robot") || name.includes("mechanical") ||
        name.includes("automobile")) {
        return "This club encourages students to explore engineering, design and innovation. Members can develop practical skills, exchange ideas and learn about emerging technologies through collaborative activities.";
    }

    if (name.includes("music") || name.includes("singing")) {
        return "This club provides a platform for students who enjoy music and singing. It encourages creativity, musical learning and participation in performances and cultural activities.";
    }

    if (name.includes("dance") || name.includes("choreography")) {
        return "This club brings together students passionate about dance and movement. It offers an opportunity to develop performance skills, express creativity and participate in cultural events.";
    }

    if (name.includes("drama") || name.includes("theatre") ||
        name.includes("acting")) {
        return "This club encourages students to explore acting, theatre and stage performance. Members can develop confidence, communication and creative expression through performances and group activities.";
    }

    if (name.includes("photography") || name.includes("film") ||
        name.includes("cinema")) {
        return "This club is for students interested in visual storytelling, photography and filmmaking. It encourages creative expression and helps members explore the art of capturing and presenting ideas through visuals.";
    }

    if (name.includes("literary") || name.includes("writing") ||
        name.includes("poetry") || name.includes("book")) {
        return "This club promotes reading, writing and literary expression. It gives students a space to share ideas, improve communication skills and explore literature through creative activities.";
    }

    if (name.includes("sports") || name.includes("fitness") ||
        name.includes("athletic")) {
        return "This club encourages students to participate in sports and physical activities. It promotes teamwork, discipline, sportsmanship and an active campus environment.";
    }

    if (name.includes("art") || name.includes("design") ||
        name.includes("creative")) {
        return "This club provides a space for students to explore art, design and creative thinking. Members can share their ideas, develop artistic skills and work together on creative projects.";
    }

    if (category.includes("technical") || category.includes("technology")) {
        return "This technical club encourages students to explore their subject interests, develop practical knowledge and learn about new technologies. It provides opportunities for teamwork, innovation and collaborative learning.";
    }

    if (category.includes("creative") || category.includes("cultural")) {
        return "This club celebrates creativity and student talent. It provides opportunities to express ideas, develop skills and take part in activities that enrich campus life.";
    }

    if (category.includes("music") || category.includes("dance")) {
        return "This club gives students an opportunity to explore their interests, develop their talents and participate in creative and cultural activities with fellow students.";
    }

    return "This student club or society brings together students with a shared interest. It provides opportunities to learn, exchange ideas, develop new skills and participate in collaborative activities at the institute.";
}


// Create and display the club details popup
function showEduClubDetails(club) {

    let modal = document.getElementById("eduClubDetailsModal");

    // Create the popup only once
    if (!modal) {

        modal = document.createElement("div");
        modal.id = "eduClubDetailsModal";
        modal.className = "edu-details-modal";

        modal.innerHTML = `
            <div class="edu-details-content">

                <button class="edu-details-close" aria-label="Close">&times;</button>

                <img class="edu-details-image" alt="Club thumbnail">

                <div class="edu-details-body">
                    <span class="edu-details-category"></span>
                    <h2 class="edu-details-title"></h2>
                    <p class="edu-details-description"></p>
                    <p class="edu-details-coordinator"></p>
                    <a class="edu-details-link" target="_blank"
                       rel="noopener noreferrer" hidden>Visit Official Page</a>
                </div>

            </div>
        `;

        document.body.appendChild(modal);

        // Close button
        modal.querySelector(".edu-details-close").addEventListener("click", function () {
            modal.classList.remove("show");
        });

        // Close when clicking outside the popup
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.classList.remove("show");
            }
        });

        // Close with Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                modal.classList.remove("show");
            }
        });
    }

    // Fill popup with the selected club's information
    modal.querySelector(".edu-details-image").src = club.image || "";
    modal.querySelector(".edu-details-image").alt = club.name || "Club image";

    modal.querySelector(".edu-details-category").textContent =
        club.category || "Club / Society";

    modal.querySelector(".edu-details-title").textContent =
        club.name || "Club Details";

    modal.querySelector(".edu-details-description").textContent =
        getEduClubDescription(club);

    const coordinator = modal.querySelector(".edu-details-coordinator");

    if (club.coordinator) {
        coordinator.textContent = "Coordinator: " + club.coordinator;
        coordinator.hidden = false;
    } else {
        coordinator.textContent = "";
        coordinator.hidden = true;
    }

    const visitLink = modal.querySelector(".edu-details-link");

    if (club.link && club.link !== "#") {
        visitLink.href = club.link;
        visitLink.hidden = false;
    } else {
        visitLink.removeAttribute("href");
        visitLink.hidden = true;
    }

    modal.classList.add("show");
}


// Display clubs
function displayClubs(clubList) {

    clubContainer.innerHTML = "";

    clubList.forEach(function (club) {

        const card = document.createElement("div");
        card.className = "club-card";

        const imageBox = document.createElement("div");
        imageBox.className = "club-image";

        const img = document.createElement("img");
        img.src = club.image || "";
        img.alt = club.name || "Club image";
        img.loading = "lazy";

        imageBox.appendChild(img);

        const info = document.createElement("div");
        info.className = "club-info";

        const category = document.createElement("span");
        category.className = "club-category";
        category.textContent = club.category || "Club";

        const heading = document.createElement("h3");
        heading.textContent = club.name;

        const description = document.createElement("p");
        description.textContent = getEduClubDescription(club);

        info.appendChild(category);
        info.appendChild(heading);
        info.appendChild(description);

        if (club.coordinator) {
            const coordinator = document.createElement("p");
            coordinator.textContent = "Coordinator: " + club.coordinator;
            info.appendChild(coordinator);
        }

        const bottom = document.createElement("div");
        bottom.className = "club-card-bottom";

        const detailsButton = document.createElement("button");
        detailsButton.className = "club-link";
        detailsButton.type = "button";
        detailsButton.textContent = "Club Details";

        detailsButton.addEventListener("click", function () {
            showEduClubDetails(club);
        });

        bottom.appendChild(detailsButton);
        info.appendChild(bottom);

        card.appendChild(imageBox);
        card.appendChild(info);

        clubContainer.appendChild(card);
    });

    noResults.hidden = clubList.length !== 0;
}

    // Search and category filters
   
let selectedCategory = "All";
let selectedSection = "clubs";

const categoryButtons = document.querySelectorAll(
    ".filter-btn:not(.section-btn)"
);

const sectionButtons = document.querySelectorAll(".section-btn");

function filterClubs() {

    const currentList =
        selectedSection === "societies" ? societies : clubs;

    const searchText = searchInput.value.toLowerCase();

    const filteredList = currentList.filter(function (club) {

        const searchableText = [
            club.name,
            club.category,
            club.description,
            club.coordinator
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            club.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayClubs(filteredList);

    noResults.textContent =
        selectedSection === "societies"
        ? "No societies found. Try another search."
        : "No clubs found. Try another search.";
}

searchInput.addEventListener("input", filterClubs);

// Category filters
categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedCategory = button.dataset.category;

        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterClubs();
    });
});

// Clubs / Societies section buttons
sectionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedSection = button.dataset.section;
        selectedCategory = "All";

        sectionButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        filterClubs();
    });
});

// Show all clubs when website opens
displayClubs(clubs);


    // Category buttons
    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedCategory = button.dataset.category || "All";

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            filterClubs();
        });
    });

    // Initial display
    displayClubs(clubs);

    // Placeholder links
    clubContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("placeholder-link")) {
            event.preventDefault();
            alert("The official club link will be added soon.");
        }
    });

    // Night mode / Bright mode
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("educlub-theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
            themeToggle.innerHTML = "🌙 Night Mode";
        } else {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
            themeToggle.innerHTML = "☀️ Bright Mode";
        }

        themeToggle.addEventListener("click", function () {

            if (document.body.classList.contains("dark-mode")) {

                document.body.classList.remove("dark-mode");
                document.body.classList.add("light-mode");

                themeToggle.innerHTML = "🌙 Night Mode";
                localStorage.setItem("educlub-theme", "light");

            } else {

                document.body.classList.remove("light-mode");
                document.body.classList.add("dark-mode");

                themeToggle.innerHTML = "☀️ Bright Mode";
                localStorage.setItem("educlub-theme", "dark");
            }
        });
    }

    // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("show-menu");

            menuToggle.innerHTML =
                navMenu.classList.contains("show-menu") ? "✕" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("show-menu");
                menuToggle.innerHTML = "☰";
            });
        });
    }

    console.log("EduClub loaded:", clubs.length, "entries");

});
