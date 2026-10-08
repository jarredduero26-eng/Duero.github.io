
const loadingScreen =
    document.getElementById("loadingScreen");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const portfolio =
    document.getElementById("portfolio");

const loadingProgress =
    document.getElementById("loadingProgress");

const loadingPercent =
    document.getElementById("loadingPercent");

const loadingText =
    document.getElementById("loadingText");

const enterButton =
    document.getElementById("enterButton");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const clickLight =
    document.getElementById("clickLight");

const pageNumber =
    document.getElementById("pageNumber");

const pageName =
    document.getElementById("pageName");

const indicatorProgress =
    document.getElementById(
        "indicatorProgress"
    );

const restartButton =
    document.getElementById(
        "restartButton"
    );

const canvas =
    document.getElementById(
        "spaceCanvas"
    );

const ctx =
    canvas.getContext("2d");



let stars = [];

let mouseX = 0;
let mouseY = 0;


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createStars() {

    stars = [];

    const amount =
        Math.min(
            260,
            Math.floor(
                window.innerWidth *
                window.innerHeight /
                5500
            )
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        stars.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radius:
                Math.random() *
                1.7 +
                .2,

            speed:
                Math.random() *
                .35 +
                .05,

            alpha:
                Math.random() *
                .8 +
                .2,

            twinkle:
                Math.random() *
                .03 +
                .005

        });

    }

}


createStars();


function drawGalaxy() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(star => {

        star.y += star.speed;


        if (
            star.y >
            canvas.height
        ) {

            star.y = 0;

            star.x =
                Math.random() *
                canvas.width;

        }


        const twinkle =
            Math.sin(
                Date.now() *
                star.twinkle
            ) * .35;


        const alpha =
            Math.max(
                .05,
                star.alpha +
                twinkle
            );


        ctx.beginPath();

        ctx.arc(
            star.x +
            mouseX * .01,

            star.y +
            mouseY * .01,

            star.radius,

            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(255,255,255,${alpha})`;

        ctx.fill();

    });


    requestAnimationFrame(
        drawGalaxy
    );

}


drawGalaxy();



document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX -
            window.innerWidth / 2;

        mouseY =
            event.clientY -
            window.innerHeight / 2;

    }
);



const loadingMessages = [

    "INITIALIZING GALAXY...",

    "CONNECTING DIGITAL SPACE...",

    "BUILDING PORTFOLIO SYSTEM...",

    "LOADING JARRED D. DUERO...",

    "PREPARING PERSONAL INFORMATION...",

    "ALIGNING DIAMOND INTERFACE...",

    "CREATING VISUAL EXPERIENCE...",

    "ALMOST READY..."

];


let progress = 0;

let messageIndex = 0;


const loadingInterval =
    setInterval(() => {

        progress +=
            Math.random() * 3.5 +
            1.5;


        if (
            progress >= 100
        ) {

            progress = 100;

            clearInterval(
                loadingInterval
            );


            loadingProgress.style.width =
                "100%";


            loadingPercent.textContent =
                "100";


            loadingText.textContent =
                "SYSTEM READY.";


            setTimeout(() => {

                loadingScreen.classList.add(
                    "hidden"
                );

                welcomeScreen.classList.remove(
                    "hidden"
                );

            }, 900);

        }

        else {

            loadingProgress.style.width =
                progress + "%";


            loadingPercent.textContent =
                Math.floor(progress);


            const messageProgress =
                (messageIndex + 1) /
                loadingMessages.length *
                100;


            if (
                progress >=
                messageProgress
            ) {

                messageIndex++;


                if (
                    messageIndex <
                    loadingMessages.length
                ) {

                    loadingText.textContent =
                        loadingMessages[
                            messageIndex
                        ];

                }

            }

        }

    }, 100);



enterButton.addEventListener(
    "click",
    event => {

        createLight(
            event.clientX,
            event.clientY
        );


        enterButton.disabled =
            true;


        enterButton.innerHTML =
            `
            <span>
                ENTERING GALAXY...
            </span>

            <strong>
                →
            </strong>
            `;


        welcomeScreen.classList.add(
            "hidden"
        );


        setTimeout(() => {

            portfolio.classList.remove(
                "hidden"
            );

            showPage("home");

        }, 850);

    }
);


const pageData = {

    home: {
        number: "01",
        name: "HOME",
        progress: 12
    },

    about: {
        number: "02",
        name: "ABOUT",
        progress: 25
    },

    education: {
        number: "03",
        name: "EDUCATION",
        progress: 37
    },

    interests: {
        number: "04",
        name: "INTERESTS",
        progress: 50
    },

    dream: {
        number: "05",
        name: "MY DREAM",
        progress: 62
    },

    personal: {
        number: "06",
        name: "PERSONAL",
        progress: 75
    },

    contact: {
        number: "07",
        name: "CONTACT",
        progress: 87
    },

    finish: {
        number: "08",
        name: "FINISH",
        progress: 100
    }

};



function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".portfolio-page"
        );


    pages.forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    const target =
        document.getElementById(
            pageId
        );


    if (!target) return;


    target.classList.add(
        "active-page"
    );


    const data =
        pageData[pageId];


    if (data) {

        pageNumber.textContent =
            data.number;

        pageName.textContent =
            data.name;

        indicatorProgress.style.width =
            data.progress + "%";

    }


    document
        .querySelectorAll(".dot")
        .forEach(dot => {

            dot.classList.remove(
                "active"
            );


            if (
                dot.dataset.page ===
                pageId
            ) {

                dot.classList.add(
                    "active"
                );

            }

        });


    target.scrollTop = 0;

}

document
    .querySelectorAll(
        ".proceed-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                createLight(
                    event.clientX,
                    event.clientY
                );


                const next =
                    button.dataset.next;


                if (!next) return;


                button.classList.add(
                    "button-clicked"
                );


                setTimeout(() => {

                    button.classList.remove(
                        "button-clicked"
                    );

                    showPage(next);

                }, 180);

            }
        );

    });


document
    .querySelectorAll(".dot")
    .forEach(dot => {

        dot.addEventListener(
            "click",
            event => {

                createLight(
                    event.clientX,
                    event.clientY
                );


                showPage(
                    dot.dataset.page
                );

            }
        );

    });


themeToggle.addEventListener(
    "click",
    event => {

        createLight(
            event.clientX,
            event.clientY
        );


        document.body.classList.toggle(
            "light"
        );


        const isLight =
            document.body.classList.contains(
                "light"
            );


        themeIcon.textContent =
            isLight
                ? "☀"
                : "☾";

    }
);


function createLight(x, y) {

    if (
        typeof x !== "number" ||
        typeof y !== "number"
    ) {

        return;

    }


    clickLight.style.left =
        x + "px";

    clickLight.style.top =
        y + "px";


    clickLight.classList.remove(
        "active"
    );


    void clickLight.offsetWidth;


    clickLight.classList.add(
        "active"
    );

}


document.addEventListener(
    "click",
    event => {

        const interactive =
            event.target.closest(
                "button, a"
            );


        if (!interactive) return;


        createLight(
            event.clientX,
            event.clientY
        );

    }
);


const pageOrder = [

    "home",
    "about",
    "education",
    "interests",
    "dream",
    "personal",
    "contact",
    "finish"

];


function getCurrentPage() {

    const active =
        document.querySelector(
            ".portfolio-page.active-page"
        );


    if (!active) return 0;


    return pageOrder.indexOf(
        active.id
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            portfolio.classList.contains(
                "hidden"
            )
        ) {

            return;

        }


        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            event.preventDefault();


            const current =
                getCurrentPage();


            if (
                current >= 0 &&
                current <
                pageOrder.length - 1
            ) {

                showPage(
                    pageOrder[
                        current + 1
                    ]
                );

            }

        }


        if (
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();


            const current =
                getCurrentPage();


            if (
                current > 0
            ) {

                showPage(
                    pageOrder[
                        current - 1
                    ]
                );

            }

        }

    }
);


restartButton.addEventListener(
    "click",
    event => {

        createLight(
            event.clientX,
            event.clientY
        );


        portfolio.classList.add(
            "hidden"
        );


        welcomeScreen.classList.remove(
            "hidden"
        );


        enterButton.disabled =
            false;


        enterButton.innerHTML =
            `
            <span>
                ENTER MY WEBSITE
            </span>

            <strong>
                →
            </strong>
            `;

    }
);


const photo =
    document.querySelector(
        ".diamond-photo"
    );


document.addEventListener(
    "mousemove",
    event => {

        if (!photo) return;


        const x =
            (
                event.clientX /
                window.innerWidth -
                .5
            ) * 12;


        const y =
            (
                event.clientY /
                window.innerHeight -
                .5
            ) * 12;


        photo.style.marginLeft =
            `${x}px`;

        photo.style.marginTop =
            `${y}px`;

    }
);