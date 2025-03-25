let startTime, interval;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timerDisplay = document.getElementById("timer");
const resultMsg = document.getElementById("resultMsg");

startBtn.onclick = () => {
  resultMsg.textContent = "3초 뒤 타이머가 시작됩니다...";
  timerDisplay.textContent = "00.00초";
  startBtn.disabled = true;
  stopBtn.disabled = true;

  setTimeout(() => {
    resultMsg.textContent = "측정 중... 균형을 유지하세요!";
    startTime = Date.now();
    stopBtn.disabled = false;

    interval = setInterval(() => {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      timerDisplay.textContent = `${duration}초`;
    }, 10);
  }, 3000);
};

stopBtn.onclick = () => {
  clearInterval(interval);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  timerDisplay.textContent = `${duration}초`;
  stopBtn.disabled = true;

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  if (!name || !age || !gender) {
    resultMsg.textContent = "이름, 나이, 성별을 모두 입력해주세요.";
    startBtn.disabled = false;
    return;
  }

  fetch("postgresql://dpg-cvh3apdrie7s73ejlhrg-a.singapore-postgres.render.com/balance_test_db", {
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
      resultMsg.textContent = "✅ 참여해주셔서 감사합니다!";
      startBtn.disabled = false;
    })
    .catch((err) => {
      resultMsg.textContent = "❌ 서버 오류가 발생했습니다.";
      startBtn.disabled = false;
    });
};
