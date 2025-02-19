document.addEventListener("DOMContentLoaded", () => {
    const getBody = document.querySelector("body");
    const getCursorXY = document.getElementById("cursor-x-and-y");
    const detectesdTest = document.getElementById("detected-text");

    let alertAudio = new Audio("alert.mp3");
    let lastCursorPosition = "";
    let isTrackingActive = false;

    function startTracking() {
        if (isTrackingActive) return;
        isTrackingActive = true;

        detectesdTest.innerText = "커서가 브라우저 안에 있습니다.";

        console.log("🔄 커서 추적 시작...");

        document.addEventListener("mousemove", (event) => {
            lastCursorPosition = `X: ${event.clientX}, Y: ${event.clientY}`;
            getCursorXY.innerText = lastCursorPosition;
        });

        getBody.addEventListener("mouseenter", () => {
            detectesdTest.innerText = "커서가 브라우저 안에 있습니다.";
            alertAudio.pause();
            alertAudio.currentTime = 0;
        });

        document.addEventListener("mouseleave", (e) => {
            if (!e.relatedTarget) {
                detectesdTest.innerHTML = `🚨 커서가 브라우저 밖에 있습니다. 🚨<br /> 경고음을 끄려면 커서를 브라우저 안으로 가져오세요.`;
                alertAudio.loop = true;
                alertAudio.play();

                getCursorXY.innerText = `마지막으로 나간 좌표: ${lastCursorPosition}`;
            }
        });
    }

    getBody.addEventListener("click", startTracking);
});
