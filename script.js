let startTime, interval;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timerDisplay = document.getElementById("timer");
const resultMsg = document.getElementById("resultMsg");

startBtn.onclick = () => {
  let countdown = 3;
  resultMsg.textContent = `⏳ ${countdown}초 뒤 타이머가 시작됩니다...(Countdown starts in ${countdown})second `;
  timerDisplay.textContent = "00.00초";
  startBtn.disabled = true;
  stopBtn.disabled = true;

  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      resultMsg.textContent = `⏳ ${countdown}초 뒤 타이머가 시작됩니다...(Countdown starts in ${countdown} sec) `;
    } else {
      clearInterval(countdownInterval);
      resultMsg.textContent =
        "측정 중... 균형을 유지하세요! (Counting.. keep your balance)";
      startTime = Date.now();
      stopBtn.disabled = false;

      interval = setInterval(() => {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        timerDisplay.textContent = `${duration}초(sec)`;
      }, 10);
    }
  }, 1000);
};

stopBtn.onclick = () => {
  clearInterval(interval);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  timerDisplay.textContent = `${duration}초(sec)`;
  stopBtn.disabled = true;

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  if (!name || !age || !gender) {
    resultMsg.textContent =
      "이름, 나이, 성별을 모두 입력해주세요.(Please enter all the information required )";
    startBtn.disabled = false;
    return;
  } else {
    alert("참여해주셔서 감사합니다! Thank you for participating!");
  }

  resultMsg.textContent = "📡 서버에 전송 중입니다... Connecting to the server";

  fetch("https://balancetest-backend.onrender.com/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      age: parseInt(age),
      gender,
      durationSeconds: parseFloat(duration),
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      resultMsg.textContent =
        "✅ 참여해주셔서 감사합니다! Thank you for participating";

      startBtn.disabled = false;
    })
    .catch((err) => {
      resultMsg.textContent =
        "❌ 서버 오류가 발생했습니다. An error from the server occured";

      startBtn.disabled = false;
    });
};
