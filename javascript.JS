document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       LOGIN
    ========================= */

    const loginCard =
        document.querySelector(".form-container > div:first-child");

    const loginEmail =
        loginCard.querySelector('input[type="email"]');

    const loginPassword =
        loginCard.querySelector('input[type="password"]');

    const loginButton =
        loginCard.querySelector('input[type="submit"]');


    /* =========================
       REGISTRATION FORM
    ========================= */

    const registerForm =
        document.querySelector("#registration ~ .section form");


    if (!registerForm) {
        console.error("Registration form not found!");
        return;
    }


    /* =========================
       LOGIN VISIBILITY
    ========================= */

    const protectedSections =
        [...document.querySelectorAll(".section")];

    const protectedNav =
        [...document.querySelectorAll("nav a:not([href='#about'])")];


    function setLoggedIn(loggedIn) {

        protectedSections.forEach(section => {
            section.hidden = !loggedIn;
        });

        const registration =
            document.querySelector("#registration");

        if (registration) {
            registration.hidden = !loggedIn;
        }

        protectedNav.forEach(link => {
            link.hidden = !loggedIn;
        });

        const about =
            document.querySelector("#about");

        if (about) {
            about.hidden = !loggedIn;
        }
    }


    /* Hide everything initially */

    setLoggedIn(false);


    /* =========================
       LOGIN MESSAGE
    ========================= */

    const loginMessage =
        document.createElement("p");

    loginMessage.setAttribute(
        "aria-live",
        "polite"
    );

    loginCard.appendChild(loginMessage);


    /* =========================
       LOGIN BUTTON
    ========================= */

    loginButton.addEventListener("click", function (event) {

        event.preventDefault();

        if (
            loginEmail.value.trim() === "" ||
            loginPassword.value.trim() === ""
        ) {

            loginMessage.textContent =
                "Please enter your email and password.";

            return;
        }


        setLoggedIn(true);


        const username =
            loginEmail.value
                .split("@")[0]
                .trim();


        loginCard.innerHTML = `
            <h2>Welcome, ${username}!</h2>

            <p>
                You are signed in.
                Explore the event details and register below.
            </p>
        `;


        const about =
            document.querySelector("#about");

        if (about) {

            about.scrollIntoView({
                behavior: "smooth"
            });

        }

    });


    /* =========================
       EXISTING FORM ELEMENTS
    ========================= */

    const eventSelect =
        document.querySelector("#event");

    const packageSelect =
        document.querySelector("#package");

    const customPriceBox =
        document.querySelector("#customPriceBox");

    const customPrice =
        document.querySelector("#customPrice");


    /* =========================
       PACKAGE PRICE
    ========================= */

    const priceByPackage = {

        Silver: "₹10,000",

        Gold: "₹25,000",

        Platinum: "₹50,000",

        Custom: "Custom quotation"

    };


    /* =========================
       PRICE DISPLAY
    ========================= */

    const priceNote =
        document.createElement("p");

    priceNote.style.cssText = `
        margin: 8px 0;
        font-size: 0.9rem;
        color: #1a4a7a;
        font-weight: 600;
    `;

    priceNote.textContent =
        "Select a package to view its price.";


    packageSelect.insertAdjacentElement(
        "afterend",
        priceNote
    );


    packageSelect.addEventListener(
        "change",
        function () {

            const selected =
                packageSelect.value;


            if (priceByPackage[selected]) {

                priceNote.textContent =
                    "Selected price: " +
                    priceByPackage[selected];

            } else {

                priceNote.textContent =
                    "Select a package to view its price.";

            }

        }
    );


    /* =========================
       REGISTRATION
    ========================= */

    registerForm.addEventListener(
        "submit",
        function (event) {

            /* STOP PAGE REFRESH */

            event.preventDefault();


            console.log("REGISTER BUTTON CLICKED");


            /* =========================
               VALIDATE FORM
            ========================= */

            if (!registerForm.checkValidity()) {

                registerForm.reportValidity();

                return;

            }


            /* =========================
               GET NAME
            ========================= */

            const name =
                document.querySelector("#fname")
                    .value
                    .trim();


            const email =
                document.querySelector("#email")
                    .value
                    .trim();


            const selectedEvent =
                eventSelect.value;


            const selectedPackage =
                packageSelect.value;


            /* =========================
               PACKAGE PRICE
            ========================= */

            let selectedPrice =
                priceByPackage[selectedPackage];


            /* =========================
               CUSTOM PACKAGE
            ========================= */

            let customDetails =
                "Standard package selected";


            if (selectedPackage === "Custom") {

                const budget =
                    customPrice.value ||
                    "Not specified";


                const requirements =
                    document.querySelector(
                        "#customRequest"
                    ).value ||
                    "None specified";


                customDetails =
                    `Custom Budget: ₹${budget} | Requirements: ${requirements}`;

                selectedPrice =
                    `₹${budget}`;

            }


            /* =========================
               REMOVE OLD MESSAGE
            ========================= */

            const oldMessage =
                document.querySelector(
                    "#booking-confirmation"
                );


            if (oldMessage) {
                oldMessage.remove();
            }


            /* =========================
               CREATE THANK YOU MESSAGE
            ========================= */

            const confirmation =
                document.createElement("div");


            confirmation.id =
                "booking-confirmation";


            confirmation.style.cssText = `

                max-width: 1080px;

                margin: 30px auto;

                padding: 35px;

                background:
                    rgba(255,255,255,0.95);

                border-radius: 18px;

                border:
                    2px solid #e9c46a;

                box-shadow:
                    0 15px 40px
                    rgba(0,0,0,0.2);

                text-align: center;

            `;


            confirmation.innerHTML = `

                <h2 style="
                    color:#4b176f;
                    margin-bottom:15px;
                ">

                    🎉 Thank You for Registering,
                    ${name}!

                </h2>


                <p style="
                    font-size:1.1rem;
                    margin-bottom:10px;
                ">

                    Your registration has been
                    received successfully.

                </p>


                <p>

                    Our EventSphere team will
                    contact you shortly.

                </p>


                <h3 style="
                    margin-top:25px;
                    color:#7a3c13;
                ">

                    Your Booking Details

                </h3>


                <table>

                    <tr>

                        <th>
                            Booking Detail
                        </th>

                        <th>
                            Your Selection
                        </th>

                    </tr>


                    <tr>

                        <td>
                            Name
                        </td>

                        <td>
                            ${name}
                        </td>

                    </tr>


                    <tr>

                        <td>
                            Email
                        </td>

                        <td>
                            ${email}
                        </td>

                    </tr>


                    <tr>

                        <td>
                            Event
                        </td>

                        <td>
                            ${selectedEvent}
                        </td>

                    </tr>


                    <tr>

                        <td>
                            Package
                        </td>

                        <td>
                            ${selectedPackage}
                        </td>

                    </tr>


                    <tr>

                        <td>
                            Package Price
                        </td>

                        <td>
                            ${selectedPrice}
                        </td>

                    </tr>


                    <tr>

                        <td>
                            Package Details
                        </td>

                        <td>
                            ${customDetails}
                        </td>

                    </tr>

                </table>


                <p style="
                    margin-top:25px;
                    font-weight:bold;
                    color:#4b176f;
                ">

                    ❤️ Thank you for choosing EventSphere!

                </p>

            `;


            /* =========================
               INSERT AFTER FORM
            ========================= */

            const formSection =
                registerForm.closest(".section");


            formSection.insertAdjacentElement(
                "afterend",
                confirmation
            );


            /* =========================
               SCROLL TO THANK YOU
            ========================= */

            confirmation.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });


            /* =========================
               RESET FORM
            ========================= */

            registerForm.reset();


            if (customPriceBox) {

                customPriceBox.style.display =
                    "none";

            }


            if (customPrice) {

                customPrice.required =
                    false;

            }


            priceNote.textContent =
                "Select a package to view its price.";

        }
    );

});s
