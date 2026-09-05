/* =====================================================
   WATTWISE - COMPLETE APP.JS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("⚡ WattWise started");

    /* =====================================================
       ANALYZER CALCULATION
       ===================================================== */

    const calculateBtn = document.getElementById("calculateBtn");

    if (calculateBtn) {

        calculateBtn.addEventListener("click", calculateEnergy);

        console.log("✅ Calculate button connected");

    }


    function calculateEnergy() {

        const applianceElement =
            document.getElementById("appliance");

        const hoursElement =
            document.getElementById("hours");

        const daysElement =
            document.getElementById("days");


        if (!applianceElement || !hoursElement || !daysElement) {

            console.error("❌ Analyzer input IDs not found");

            return;
        }


        const power =
            parseFloat(applianceElement.value);

        const hours =
            parseFloat(hoursElement.value);

        const days =
            parseFloat(daysElement.value);


        /* ================= VALIDATION ================= */

        if (
            isNaN(power) ||
            isNaN(hours) ||
            isNaN(days) ||
            power <= 0 ||
            hours < 0 ||
            hours > 24 ||
            days <= 0 ||
            days > 31
        ) {

            alert(
                "Please enter valid appliance usage.\n\n" +
                "Hours: 0–24\n" +
                "Days: 1–31"
            );

            return;
        }


        /* =================================================
           CALCULATIONS
           ================================================= */

        // Monthly electricity consumption
        const monthlyKwh =
            power * hours * days;


        // Daily electricity consumption
        const dailyKwh =
            power * hours;


        // Electricity tariff
        const tariff = 8;


        // Monthly electricity cost
        const monthlyCost =
            monthlyKwh * tariff;



        // Estimated saving = 20%
        const potentialSaving =
            monthlyCost * 0.20;


        console.log("Monthly:", monthlyKwh);
        console.log("Daily:", dailyKwh);
        
        console.log("Cost:", monthlyCost);
        console.log("Saving:", potentialSaving);

        // ================= RESULT UPDATE =================

document.getElementById("resultKwh").textContent =
    monthlyKwh.toFixed(1) + " kWh";

document.getElementById("resultCost").textContent =
    "₹" + Math.round(monthlyCost).toLocaleString("en-IN");

document.getElementById("resultDaily").textContent =
    dailyKwh.toFixed(1) + " kWh";

document.getElementById("resultSaving").textContent =
    "₹" + Math.round(potentialSaving).toLocaleString("en-IN");


        /* =================================================
           UPDATE RESULT PAGE
           ================================================= */

        const resultKwh =
            document.getElementById("resultKwh");

        const resultCost =
            document.getElementById("resultCost");

        const resultDaily =
            document.getElementById("resultDaily");

        const resultSaving =
            document.getElementById("resultSaving");


        if (resultKwh) {

            resultKwh.textContent =
                monthlyKwh.toFixed(1) + " kWh";

        }


        if (resultCost) {

            resultCost.textContent =
                "₹" +
                Math.round(monthlyCost)
                    .toLocaleString("en-IN");

        }


        if (resultDaily) {

            resultDaily.textContent =
                dailyKwh.toFixed(1) + " kWh";

        }


        if (resultSaving) {

            resultSaving.textContent =
                "₹" +
                Math.round(potentialSaving)
                    .toLocaleString("en-IN");

        }


        /* =================================================
           SAVE DATA FOR DASHBOARD
           ================================================= */

        const wattwiseData = {

            appliance: applianceElement.options[
                applianceElement.selectedIndex
            ].text,

            power: power,

            hours: hours,

            days: days,

            monthlyKwh: monthlyKwh,

            dailyKwh: dailyKwh,

            monthlyCost: monthlyCost,

            potentialSaving: potentialSaving,

            date: new Date().toISOString()

        };


        localStorage.setItem(
            "wattwiseData",
            JSON.stringify(wattwiseData)
        );


        console.log(
            "✅ WattWise data saved:",
            wattwiseData
        );


        /* =================================================
           RESULT ANIMATION
           ================================================= */

        const resultCards =
            document.querySelectorAll(".result-card");


        resultCards.forEach(function (card) {

            card.classList.add("calculated");

            setTimeout(function () {

                card.classList.remove("calculated");

            }, 500);

        });


        /* =================================================
           SUCCESS MESSAGE
           ================================================= */

        const insight =
            document.querySelector(".insight-text");


        if (insight) {

            if (monthlyKwh > 300) {

                insight.textContent =
                    "⚠️ Your consumption is high. " +
                    "Reducing appliance usage can significantly lower your electricity bill.";

            }

            else if (monthlyKwh > 150) {

                insight.textContent =
                    "💡 Your consumption is moderate. " +
                    "Small efficiency improvements can help reduce your monthly electricity cost.";

            }

            else {

                insight.textContent =
                    "🌱 Great! Your estimated consumption is relatively low. " +
                    "Keep using energy efficiently.";

            }

        }


        /* =================================================
           SHOW RESULT
           ================================================= */

        const resultSection =
            document.querySelector(".results-section");


        if (resultSection) {

            resultSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    /* =====================================================
       DASHBOARD DATA
       ===================================================== */

    loadDashboardData();


    function loadDashboardData() {

        const savedData =
            localStorage.getItem("wattwiseData");


        if (!savedData) {

            console.log("ℹ️ No WattWise data yet");

            return;

        }


        const data =
            JSON.parse(savedData);


        /* Dashboard energy */

        const dashboardKwh =
            document.getElementById("dashboardKwh");


        if (dashboardKwh) {

            dashboardKwh.textContent =
                data.monthlyKwh.toFixed(1) + " kWh";

        }


        /* Dashboard cost */

        const dashboardCost =
            document.getElementById("dashboardCost");


        if (dashboardCost) {

            dashboardCost.textContent =
                "₹" +
                Math.round(data.monthlyCost)
                    .toLocaleString("en-IN");

        }


        /* Dashboard daily usage */

        const dashboardDaily =
            document.getElementById("dashboardDaily");


        if (dashboardDaily) {

            dashboardDaily.textContent =
                data.dailyKwh.toFixed(1) + " kWh";

        }


        /* Dashboard saving */

        const dashboardSaving =
            document.getElementById("dashboardSaving");


        if (dashboardSaving) {

            dashboardSaving.textContent =
                "₹" +
                Math.round(data.potentialSaving)
                    .toLocaleString("en-IN");

        }


        console.log("✅ Dashboard updated");

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".problem-card, " +
            ".feature-card, " +
            ".stat-card, " +
            ".insight-card, " +
            ".result-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            function () {

                const nav =
                    document.querySelector(".nav-links");


                if (!nav) return;


                nav.classList.toggle("mobile-open");

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-links a");


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.forEach(function (item) {

                    item.classList.remove("active");

                });


                this.classList.add("active");

            }
        );

    });


    console.log(
        "⚡ WattWise Smart Energy Intelligence ready"
    );

});