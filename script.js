// 정답 정의
const correctAnswers = {
    q1: "c",
    q2: "c",
    q3: "b",
    q4: "a",
    q5: "b"
  };
  
  // 요소 불러오기
  const submitBtn = document.getElementById("submit-btn");
  const modal = document.getElementById("result-modal");
  const scoreDisplay = document.getElementById("score-number");
  const formSection = document.getElementById("form-section");
  const closeModalBtn = document.getElementById("close-modal");
  const entryForm = document.getElementById("entry-form");
  
  // 점수 계산 함수
  function calculateScore() {
    let score = 0;
    for (let key in correctAnswers) {
      const selected = document.querySelector(`input[name="${key}"]:checked`);
      if (selected && selected.value === correctAnswers[key]) { //selected && : selected가 null일 수도 있으니 안전하게 다음 코드를 실행하기 위한 조건문
        score += 20;
      }
    }
    return score;
  }
  
  // 숫자 애니메이션 효과
  function animateScore(finalScore) {
    let current = 0;
    const interval = setInterval(() => {
      scoreDisplay.textContent = `${current}점`;
      if (current >= finalScore) {
        clearInterval(interval);
      }
      current += 20;
    }, 300);
  }
  
  // 퀴즈 제출 버튼 클릭 시
  submitBtn.addEventListener("click", () => {
    const score = calculateScore();
    modal.classList.remove("hidden");
    scoreDisplay.textContent = "0점"; // 초기화. 사용자가 한 번 이상 퀴즈를 푼 경우, 점수가 계속 더해짐
    animateScore(score);
  
    // 일정 시간 뒤 경품 폼 표시
    setTimeout(() => {
      formSection.classList.remove("hidden");
    }, 4000); // 4초 후 표시
  });
  
  // 모달 닫기 버튼 (선택사항)
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    formSection.classList.add("hidden");
  });
  
  // 유효성 검사 함수 
  function validateForm(name, email, phone) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //정규표현식 객체 .test() 라는 기능을 갖고 있음
    if (!name || !email || !phone) {
      alert("모든 항목을 입력해주세요.");
      return false;
    }
    if (!emailRegex.test(email)) { //.test() 문자열이 정규표현식 형식에 맞는지 검사
      alert("올바른 이메일 형식을 입력해주세요.");
      return false;
    }
    return true;
  }
  
  // 응모하기 버튼 제출 시
  entryForm.addEventListener("submit", function (e) {
    e.preventDefault(); //폼 제출 후 새로고침 안 하도록 막아주는 코드
    const name = document.getElementById("name").value.trim(); //.trim() :실수로 입력한 앞뒤 공백 제거
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
  
    if (validateForm(name, email, phone)) {
      alert("응모가 완료되었습니다! 감사합니다.");
      entryForm.reset();
    }
  });