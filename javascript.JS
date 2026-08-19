/* JavaScript DOM Elements and Events — EventSphere Web Technology Lab */
"use strict";

window.addEventListener("load", function () { // onload event
    // getElementById(): selects one element using its unique id.
    const form = document.querySelector("#registration ~ .section form");
    const nameInput = document.getElementById("fname");
    const emailInput = document.getElementById("email");
    const eventSelect = document.getElementById("event");
    const feedbackInput = document.getElementById("feedback");
    const progressBar = document.querySelector("progress"); // querySelector(): first match.

    // getElementsByClassName(): returns the site's gallery image collection.
    const galleryImages = document.getElementsByClassName("gallery")[0].getElementsByTagName("img");
    // getElementsByTagName(): returns all table rows used for package selection.
    const tableRows = document.getElementsByTagName("tr");
    // querySelectorAll(): selects every editable registration control.
    const formFields = form.querySelectorAll("input:not([type=submit]):not([type=reset]), select, textarea");
    const packageRows = document.querySelectorAll("#packages table tr, #registration ~ .section table tr");

    // DOM creation: messages are added at runtime; the original HTML remains unchanged.
    const panel = document.createElement("div");
    panel.setAttribute("aria-live", "polite");
    panel.style.cssText = "margin:12px 0;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.55);color:#0d2b4e;font-size:.92rem;";
    form.parentElement.insertBefore(panel, form);

    const message = document.createElement("p");
    const dateTime = document.createElement("p");
    const selectedEvent = document.createElement("p");
    const characterCount = document.createElement("p");
    const packageDetails = document.createElement("p");
    const tip = document.createElement("p");
    const keyboardDemo = document.createElement("p");
    const mouseDemo = document.createElement("p");
    panel.append(message, dateTime, selectedEvent, characterCount, packageDetails, tip, keyboardDemo, mouseDemo);

    let clickCount = 0;
    let resetApproved = false;
    const eventTips = [
        "Tip: Book your venue before finalising decor.",
        "Tip: Confirm guest count early for accurate catering.",
        "Tip: Keep a small contingency budget for your event.",
        "Tip: Share the event schedule with vendors in advance."
    ];

    function showMessage(text, good) {
        message.textContent = text;
        message.style.color = good ? "#176b3a" : "#a12b2b";
    }

    function updateDateTime() {
        dateTime.textContent = "Current date and time: " + new Date().toLocaleString();
    }

    function updateProgress() {
        const completed = Array.from(formFields).filter(function (field) {
            if (field.type === "checkbox" || field.type === "radio") return field.checked;
            if (field.type === "file") return field.files.length > 0;
            return field.value.trim() !== "";
        }).length;
        const percentage = Math.min(100, Math.round((completed / formFields.length) * 100));
        progressBar.value = percentage;
        progressBar.nextElementSibling.textContent = percentage + "% complete";
    }

    // onkeyup: welcome text, character count, progress, and keyboard demonstration.
    nameInput.onkeyup = function () {
        const name = nameInput.value.trim();
        showMessage(name ? "Welcome, " + name + "! We are glad you are registering." : "Please enter your full name.");
        keyboardDemo.textContent = "Keyboard event: last key released while typing your name.";
        updateProgress();
    };

    feedbackInput.onkeyup = function () {
        characterCount.textContent = "Feedback character count: " + feedbackInput.value.length;
        updateProgress();
    };

    // onchange: displays the selected event dynamically.
    eventSelect.onchange = function () {
        selectedEvent.textContent = eventSelect.selectedIndex ? "Selected event: " + eventSelect.value : "No event selected yet.";
        updateProgress();
    };

    // onfocus and onblur: highlight inputs and validate the email field.
    formFields.forEach(function (field) {
        field.onfocus = function () {
            field.style.backgroundColor = "#eef7ff";
        };
        field.onblur = function () {
            field.style.backgroundColor = "";
            updateProgress();
        };
    });

    emailInput.onblur = function () {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        if (emailInput.value && !validEmail) {
            showMessage("Please enter a valid email address.");
        } else if (emailInput.value) {
            showMessage("Email address validated successfully.", true);
        }
        updateProgress();
    };

    // onclick: counts Register Now clicks and chooses a random event-management tip.
    form.querySelector(".btn-submit").onclick = function () {
        clickCount += 1;
        tip.textContent = "Button clicks: " + clickCount + ". " + eventTips[Math.floor(Math.random() * eventTips.length)];
    };

    // ondblclick: a direct double-click event demonstration on the registration heading.
    document.querySelector("#registration h1").ondblclick = function () {
        showMessage("Double-click event detected on the Registration Portal heading.", true);
    };

    // onmouseover and onmouseout: gallery borders and a mouse-event message.
    Array.from(galleryImages).forEach(function (image) {
        image.onmouseover = function () {
            image.style.border = "4px solid #1a4a7a";
            mouseDemo.textContent = "Mouseover event: gallery image highlighted.";
        };
        image.onmouseout = function () {
            image.style.border = "";
            mouseDemo.textContent = "Mouseout event: gallery image restored.";
        };
    });

    // addEventListener(): clicking a package row displays its details.
    packageRows.forEach(function (row) {
        if (row.cells.length === 3 && row.querySelector("td")) {
            row.addEventListener("click", function () {
                packageDetails.textContent = "Selected package: " + Array.from(row.cells).map(function (cell) {
                    return cell.textContent;
                }).join(" | ");
            });
        }
    });

    // addEventListener(): form submission shows a registration summary and success message.
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const summary = "Registration summary — Name: " + (nameInput.value || "Not entered") +
            "; Email: " + (emailInput.value || "Not entered") +
            "; Event: " + (eventSelect.selectedIndex ? eventSelect.value : "Not selected");
        alert(summary);
        showMessage("Registration submitted successfully. " + summary, true);
    });

    // addEventListener(): reset confirmation preserves the user's form until confirmed.
    form.addEventListener("reset", function (event) {
        if (!resetApproved) {
            event.preventDefault();
            if (confirm("Clear all registration form details?")) {
                resetApproved = true;
                form.reset();
                resetApproved = false;
                showMessage("Form has been reset.", true);
            }
        }
    });

    // addEventListener(): back-to-top link performs a smooth scroll and records the event.
    document.querySelectorAll('a[href="#top"]').forEach(function (link) {
        link.addEventListener("click", function () {
            mouseDemo.textContent = "Back-to-top button clicked.";
        });
    });

    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateProgress();
});

