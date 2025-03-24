let startTime, interval;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timerDisplay = document.getElementById("timer");
const resultMsg = document.getElementById("resultMsg");

startBtn.onclick = () => {
  count = 3;
  resultMsg.textContent = `${count}초 뒤 타이머가 시작됩니다...`;
  timerDisplay.textContent = "00.00초";
  startBtn.disabled = true;
  stopBtn.disabled = true;

  countdown = setInterval(() => {
    count--;
    if (count > 0) {
      resultMsg.textContent = `${count}초 뒤 타이머가 시작됩니다...`;
    } else {
      clearInterval(countdown);
      startTimer(); // 타이머 시작
    }
 }, 1000); 
}

function startTimer() {
  resultMsg.textContent = "측정 중... 균형을 유지하세요!";
  startTime = Date.now();
  stopBtn.disabled = false;

  // 타이머 업데이트 (0.01초마다 실행)
  interval = setInterval(() => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    timerDisplay.textContent = `${duration}초`;
  }, 10);
}

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

  fetch("https://172.30.26.58:8080/api/test", {
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
