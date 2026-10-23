/**
 * PHẦN MỀM TRẮC NGHIỆM TIẾNG ANH - REVISION UNITS 10-13
 * Trường Cao đẳng Công nghệ Thủ Đức (TDC)
 * 
 * Các tính năng chính:
 * 1. Ngân hàng 40 câu hỏi trắc nghiệm Units 10-13.
 * 2. Xáo trộn ngẫu nhiên 2 tầng (Fisher-Yates Shuffle):
 *    - Xáo trộn thứ tự 40 câu hỏi mỗi lần làm bài / làm lại.
 *    - Xáo trộn vị trí các phương án (A, B, C, D) trong từng câu hỏi và tự động cập nhật mã đáp án đúng.
 * 3. Thiết kế hiển thị tối ưu cho Điện thoại và iPad:
 *    - Khung câu hỏi đặt bên DƯỚI CÙNG (Bottom-docked card).
 *    - Đảm bảo câu hỏi và các lựa chọn trả lời cùng nằm trên 1 khung duy nhất.
 * 4. Bảo mật khi làm bài & Xem giải thích chi tiết sau khi nộp:
 *    - Tuyệt đối KHÔNG có gợi ý lúc làm bài.
 *    - Chỉ sau khi sinh viên nộp bài: mới mở khóa xem đáp án đúng, dịch nghĩa tiếng Việt và giải thích ngữ pháp.
 * 5. Theo dõi lượt sinh viên làm bài & Lượt truy cập:
 *    - Hiển thị trực tiếp số lượt truy cập và số bài đã nộp trên thanh menu.
 *    - Bảng điều khiển Admin thống kê chi tiết từng sinh viên, điểm số, thời gian làm bài.
 *    - Xuất file báo cáo Excel (CSV) chuẩn tiếng Việt UTF-8.
 */

(function () {
  "use strict";

  // Cấu hình bài thi
  const TOTAL_QUESTIONS = 40;
  const INITIAL_COUNTDOWN_SECONDS = 40 * 60; // 40 phút đếm ngược (2400s)

  // 4 Chủ điểm ngữ pháp chính của Units 10-13
  const TOPIC_CONFIG = [
    { key: "comp", name: "1. So sánh (Comparatives & Superlatives)", elementId: "topic-score-comp", match: "So sánh" },
    { key: "rel", name: "2. Mệnh đề quan hệ rút gọn (Reduced Relative Clauses)", elementId: "topic-score-rel", match: "Rút gọn" },
    { key: "modal", name: "3. Động từ khiếm khuyết (Modal Verbs: Obligation, Deduction, Prohibition)", elementId: "topic-score-modal", match: "Modal" },
    { key: "rep", name: "4. Câu tường thuật gián tiếp (Reported Speech)", elementId: "topic-score-rep", match: "Reported" }
  ];

  // LocalStorage Keys
  const STORAGE_PREFIX = "tdc_revision4_";
  const STORAGE_KEY_VISITS = `${STORAGE_PREFIX}visits_count`;
  const STORAGE_KEY_SESSION = `${STORAGE_PREFIX}has_visited`;
  const STORAGE_KEY_SUBMISSIONS = `${STORAGE_PREFIX}submissions`;
  const STORAGE_KEY_STUDENT = `${STORAGE_PREFIX}current_student`;
  const STORAGE_KEY_THEME = `${STORAGE_PREFIX}theme`;

  // Application State
  const state = {
    quizQuestions: [],      // 40 questions for current attempt
    currentIndex: 0,        // 0..39
    userAnswers: {},        // { [index]: 'A'|'B'|'C'|'D' }
    flaggedSet: new Set(),  // Set of flagged question indices
    isSubmitted: false,
    remainingSeconds: INITIAL_COUNTDOWN_SECONDS,
    elapsedSeconds: 0,
    timerInterval: null,
    viewMode: "desktop",
    theme: "light",
    visitCount: 156,
    student: {
      name: "Sinh viên TDC",
      id: "",
      className: ""
    }
  };

  // DOM Elements cache
  const elements = {};

  function cacheDOMElements() {
    elements.appRoot = document.getElementById("app-root");
    elements.timerDisplay = document.getElementById("timer-display");
    elements.quizTimerBox = document.getElementById("quiz-timer");
    elements.visitorCountText = document.getElementById("visitor-count-text");
    elements.navSubmissionCount = document.getElementById("nav-submission-count");
    elements.themeIcon = document.getElementById("theme-icon");
    elements.btnThemeToggle = document.getElementById("btn-theme-toggle");
    elements.btnAdminOpen = document.getElementById("btn-admin-open");

    // Device switchers
    elements.btnViewDesktop = document.getElementById("btn-view-desktop");
    elements.btnViewIpad = document.getElementById("btn-view-ipad");
    elements.btnViewMobile = document.getElementById("btn-view-mobile");

    // Upper section
    elements.answeredCount = document.getElementById("answered-count");
    elements.progressBarFill = document.getElementById("progress-bar-fill");
    elements.questionPillGrid = document.getElementById("question-pill-grid");
    elements.studentNameTag = document.getElementById("student-name-tag");
    elements.avatarCircle = document.getElementById("avatar-circle");
    elements.btnEditStudent = document.getElementById("btn-edit-student");
    elements.btnNewQuizTop = document.getElementById("btn-new-quiz-top");
    elements.btnQuickSubmit = document.getElementById("btn-quick-submit");

    // Question Card (Single unified frame)
    elements.questionCard = document.getElementById("question-card");
    elements.currentQBadge = document.getElementById("current-q-badge");
    elements.currentTopicBadge = document.getElementById("current-topic-badge");
    elements.btnCardFlag = document.getElementById("btn-card-flag");
    elements.cardFlagIcon = document.getElementById("card-flag-icon");
    elements.cardFlagText = document.getElementById("card-flag-text");
    elements.statusTag = document.getElementById("status-tag");
    elements.questionText = document.getElementById("question-text");
    elements.optionsGroup = document.getElementById("options-group");

    // Explanation Box inside card
    elements.explanationBox = document.getElementById("explanation-box");
    elements.expBadge = document.getElementById("exp-badge");
    elements.expTranslation = document.getElementById("exp-translation");
    elements.expExplanation = document.getElementById("exp-explanation");

    // Question Card Nav buttons
    elements.btnPrev = document.getElementById("btn-prev");
    elements.btnNext = document.getElementById("btn-next");
    elements.btnSubmit = document.getElementById("btn-submit");

    // Result Modal
    elements.resultModal = document.getElementById("result-modal");
    elements.resultScore = document.getElementById("result-score");
    elements.resultScale10 = document.getElementById("result-scale10");
    elements.resultRating = document.getElementById("result-rating");
    elements.statCorrect = document.getElementById("stat-correct");
    elements.statWrong = document.getElementById("stat-wrong");
    elements.statUnanswered = document.getElementById("stat-unanswered");
    elements.statTime = document.getElementById("stat-time");
    elements.breakdownGrid = document.getElementById("breakdown-grid");
    elements.btnCloseResult = document.getElementById("btn-close-result");
    elements.btnViewAll40 = document.getElementById("btn-view-all-40");
    elements.btnReview = document.getElementById("btn-review");
    elements.btnRestart = document.getElementById("btn-restart");

    // Confirm Modal
    elements.confirmModal = document.getElementById("confirm-modal");
    elements.confirmText = document.getElementById("confirm-text");
    elements.cAnsweredNum = document.getElementById("c-answered-num");
    elements.cUnansweredNum = document.getElementById("c-unanswered-num");
    elements.cFlaggedNum = document.getElementById("c-flagged-num");
    elements.btnCancelSubmit = document.getElementById("btn-cancel-submit");
    elements.btnConfirmSubmit = document.getElementById("btn-confirm-submit");
    elements.btnCloseConfirm = document.getElementById("btn-close-confirm");

    // Student Modal
    elements.studentModal = document.getElementById("student-modal");
    elements.formStudent = document.getElementById("form-student");
    elements.inputStudentName = document.getElementById("input-student-name");
    elements.inputStudentId = document.getElementById("input-student-id");
    elements.inputStudentClass = document.getElementById("input-student-class");
    elements.btnCloseStudent = document.getElementById("btn-close-student");

    // Admin Modal
    elements.adminModal = document.getElementById("admin-modal");
    elements.adminVisitCount = document.getElementById("admin-visit-count");
    elements.adminSubmissionCount = document.getElementById("admin-submission-count");
    elements.adminAvgScore = document.getElementById("admin-avg-score");
    elements.adminTableBody = document.getElementById("admin-table-body");
    elements.btnExportCsv = document.getElementById("btn-export-csv");
    elements.btnClearData = document.getElementById("btn-clear-data");
    elements.btnCloseAdmin = document.getElementById("btn-close-admin");

    // Full Review Modal
    elements.fullReviewModal = document.getElementById("full-review-modal");
    elements.fullReviewContent = document.getElementById("full-review-content");
    elements.btnCloseFullReview = document.getElementById("btn-close-full-review");
  }

  // =========================================================================
  // UTILITIES & SHUFFLE ALGORITHMS (Fisher-Yates)
  // =========================================================================
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Tạo đề thi 40 câu xáo trộn 2 tầng:
   * Tầng 1: Xáo trộn ngẫu nhiên thứ tự 40 câu hỏi.
   * Tầng 2: Xáo trộn ngẫu nhiên vị trí các lựa chọn A, B, C, D của từng câu,
   *         đồng thời map lại chính xác đáp án đúng dựa trên text phương án.
   */
  function generateShuffledQuiz() {
    if (typeof REVISION_40_QUESTIONS === "undefined" || !Array.isArray(REVISION_40_QUESTIONS)) {
      console.error("Không tìm thấy dữ liệu REVISION_40_QUESTIONS!");
      return [];
    }

    // Tầng 1: Xáo trộn thứ tự 40 câu hỏi
    const shuffledBank = shuffleArray(REVISION_40_QUESTIONS);

    // Tầng 2: Xáo trộn các phương án lựa chọn A, B, C, D trong từng câu
    const keys = ["A", "B", "C", "D"];
    return shuffledBank.map((qItem, idx) => {
      const clonedOptions = qItem.options.map(opt => ({ ...opt }));
      const shuffledOptions = shuffleArray(clonedOptions);

      // Gán lại nhãn A, B, C, D cho các vị trí mới và tìm ra nhãn của đáp án đúng
      let activeCorrectKey = "A";
      const newOptions = shuffledOptions.map((opt, optIdx) => {
        const newKey = keys[optIdx];
        if (opt.text.trim().toLowerCase() === qItem.correctAnswerText.trim().toLowerCase()) {
          activeCorrectKey = newKey;
        }
        return {
          key: newKey,
          text: opt.text,
          originalKey: opt.key
        };
      });

      return {
        quizIndex: idx, // 0..39
        id: qItem.id,
        originalNumber: qItem.originalNumber,
        topic: qItem.topic,
        question: qItem.question,
        options: newOptions,
        activeCorrectKey: activeCorrectKey,
        correctAnswerText: qItem.correctAnswerText,
        translation: qItem.translation,
        explanation: qItem.explanation
      };
    });
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // =========================================================================
  // THEME & VIEW MODE CONTROLLER
  // =========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || "light";
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    state.theme = theme;
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      elements.themeIcon.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      elements.themeIcon.textContent = "🌙";
    }
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }

  function toggleTheme() {
    setTheme(state.theme === "dark" ? "light" : "dark");
  }

  function setViewMode(mode) {
    state.viewMode = mode;
    elements.appRoot.classList.remove("desktop-mode", "ipad-mode", "mobile-mode");
    elements.btnViewDesktop.classList.remove("active");
    elements.btnViewIpad.classList.remove("active");
    elements.btnViewMobile.classList.remove("active");

    if (mode === "ipad") {
      elements.appRoot.classList.add("ipad-mode");
      elements.btnViewIpad.classList.add("active");
    } else if (mode === "mobile") {
      elements.appRoot.classList.add("mobile-mode");
      elements.btnViewMobile.classList.add("active");
    } else {
      elements.appRoot.classList.add("desktop-mode");
      elements.btnViewDesktop.classList.add("active");
    }
  }

  // =========================================================================
  // VISITOR TRACKING & STUDENT SUBMISSIONS (LƯỢT SINH VIÊN LÀM BÀI)
  // =========================================================================
  function initVisitorTracking() {
    // 1. Local tracking lượt truy cập
    let currentVisits = parseInt(localStorage.getItem(STORAGE_KEY_VISITS), 10);
    if (isNaN(currentVisits)) currentVisits = 156;

    const hasVisitedSession = sessionStorage.getItem(STORAGE_KEY_SESSION);
    if (!hasVisitedSession) {
      currentVisits += 1;
      localStorage.setItem(STORAGE_KEY_VISITS, currentVisits);
      sessionStorage.setItem(STORAGE_KEY_SESSION, "true");
    }
    state.visitCount = currentVisits;
    elements.visitorCountText.textContent = state.visitCount;

    // Cập nhật số lượt nộp bài trên navbar
    updateNavSubmissionCount();

    // 2. Cloud CounterAPI (Theo dõi live khi đưa lên GitHub Pages / web hosting)
    try {
      fetch("https://api.counterapi.dev/v1/tdc_english_quiz/revisionunits10_13/up")
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.count === "number") {
            state.visitCount = data.count;
            elements.visitorCountText.textContent = data.count;
            localStorage.setItem(STORAGE_KEY_VISITS, data.count);
          }
        })
        .catch(() => {});
    } catch (e) {}
  }

  function updateNavSubmissionCount() {
    const list = getSubmissions();
    if (elements.navSubmissionCount) {
      elements.navSubmissionCount.textContent = list.length;
    }
  }

  function loadStudentProfile() {
    const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
    if (saved) {
      try {
        state.student = JSON.parse(saved);
      } catch (e) {}
    }
    updateStudentDisplay();
  }

  function saveStudentProfile(name, id, className) {
    state.student = {
      name: name.trim() || "Sinh viên TDC",
      id: id.trim(),
      className: className.trim()
    };
    localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(state.student));
    updateStudentDisplay();
  }

  function updateStudentDisplay() {
    elements.studentNameTag.textContent = state.student.name;
    const initial = state.student.name.charAt(0).toUpperCase() || "T";
    elements.avatarCircle.textContent = initial;

    elements.inputStudentName.value = state.student.name === "Sinh viên TDC" ? "" : state.student.name;
    elements.inputStudentId.value = state.student.id || "";
    elements.inputStudentClass.value = state.student.className || "";
  }

  function getSubmissions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSubmissionRecord(record) {
    const list = getSubmissions();
    list.unshift(record);
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(list));
    updateNavSubmissionCount();
  }

  // =========================================================================
  // QUIZ LIFECYCLE & TIMER
  // =========================================================================
  function initQuiz() {
    state.quizQuestions = generateShuffledQuiz();
    state.currentIndex = 0;
    state.userAnswers = {};
    state.flaggedSet.clear();
    state.isSubmitted = false;
    state.remainingSeconds = INITIAL_COUNTDOWN_SECONDS;
    state.elapsedSeconds = 0;

    buildNavigatorPills();
    renderQuestion(0);
    updateProgress();
    startTimer();
    initTheme();
    loadStudentProfile();
    initVisitorTracking();
    attachEvents();
  }

  function restartQuiz() {
    if (state.timerInterval) clearInterval(state.timerInterval);

    state.quizQuestions = generateShuffledQuiz();
    state.currentIndex = 0;
    state.userAnswers = {};
    state.flaggedSet.clear();
    state.isSubmitted = false;
    state.remainingSeconds = INITIAL_COUNTDOWN_SECONDS;
    state.elapsedSeconds = 0;

    elements.explanationBox.style.display = "none";
    elements.btnSubmit.textContent = "Nộp bài thi";

    buildNavigatorPills();
    renderQuestion(0);
    updateProgress();
    startTimer();

    // Close any open modals
    elements.resultModal.classList.remove("open");
    elements.confirmModal.classList.remove("open");
    elements.fullReviewModal.classList.remove("open");
  }

  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      if (state.isSubmitted) {
        clearInterval(state.timerInterval);
        return;
      }

      state.elapsedSeconds += 1;
      if (state.remainingSeconds > 0) {
        state.remainingSeconds -= 1;
        updateTimerDisplay();

        if (state.remainingSeconds <= 300) { // 5 phút cuối
          elements.quizTimerBox.style.backgroundColor = "var(--danger-light)";
          elements.quizTimerBox.style.color = "var(--danger)";
          elements.quizTimerBox.style.borderColor = "var(--danger)";
        }
      } else {
        clearInterval(state.timerInterval);
        alert("Hết giờ làm bài! Hệ thống sẽ tự động nộp bài thi của bạn.");
        submitQuiz(true);
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    elements.timerDisplay.textContent = formatTime(state.remainingSeconds);
  }

  // =========================================================================
  // RENDERING & INTERACTION
  // =========================================================================
  function buildNavigatorPills() {
    elements.questionPillGrid.innerHTML = "";
    state.quizQuestions.forEach((q, idx) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "q-pill";
      pill.id = `pill-${idx}`;
      pill.textContent = idx + 1;
      pill.title = `Câu ${idx + 1}: ${q.topic}`;
      pill.addEventListener("click", () => {
        goToQuestion(idx);
      });
      elements.questionPillGrid.appendChild(pill);
    });
    updatePillStyles();
  }

  function updatePillStyles() {
    state.quizQuestions.forEach((_, idx) => {
      const pill = document.getElementById(`pill-${idx}`);
      if (!pill) return;

      pill.className = "q-pill";

      if (idx === state.currentIndex) {
        pill.classList.add("active");
      }

      const isFlagged = state.flaggedSet.has(idx);
      const isAnswered = state.userAnswers[idx] !== undefined;

      if (state.isSubmitted) {
        // Chế độ sau khi nộp bài: hiển thị đúng (xanh) hoặc sai (đỏ)
        const q = state.quizQuestions[idx];
        const userChoice = state.userAnswers[idx];
        if (userChoice === q.activeCorrectKey) {
          pill.classList.add("correct-pill");
        } else {
          pill.classList.add("wrong-pill");
        }
      } else {
        // Chế độ đang làm bài: chỉ hiển thị trạng thái đã chọn / cờ
        if (isFlagged) {
          pill.classList.add("flagged");
        } else if (isAnswered) {
          pill.classList.add("done");
        }
      }
    });
  }

  function renderQuestion(index) {
    if (index < 0 || index >= TOTAL_QUESTIONS) return;
    state.currentIndex = index;

    const q = state.quizQuestions[index];

    // Card Header
    elements.currentQBadge.textContent = `CÂU ${index + 1} / ${TOTAL_QUESTIONS}`;
    elements.currentTopicBadge.textContent = q.topic;

    // Flag Button
    const isFlagged = state.flaggedSet.has(index);
    if (isFlagged) {
      elements.btnCardFlag.classList.add("flagged");
      elements.cardFlagText.textContent = "Bỏ cờ";
    } else {
      elements.btnCardFlag.classList.remove("flagged");
      elements.cardFlagText.textContent = "Gắn cờ";
    }

    // Status Tag
    const isAnswered = state.userAnswers[index] !== undefined;
    if (state.isSubmitted) {
      const isCorrect = state.userAnswers[index] === q.activeCorrectKey;
      elements.statusTag.className = isCorrect ? "status-tag done" : "status-tag";
      elements.statusTag.textContent = isCorrect ? "Đúng ✓" : "Sai ✗";
      if (!isCorrect) {
        elements.statusTag.style.backgroundColor = "var(--danger-light)";
        elements.statusTag.style.color = "var(--danger-dark)";
      } else {
        elements.statusTag.style.backgroundColor = "";
        elements.statusTag.style.color = "";
      }
    } else {
      elements.statusTag.className = isAnswered ? "status-tag done" : "status-tag";
      elements.statusTag.textContent = isAnswered ? "Đã chọn" : "Chưa làm";
      elements.statusTag.style.backgroundColor = "";
      elements.statusTag.style.color = "";
    }

    // Question Text inside single unified frame
    elements.questionText.innerHTML = `<strong>${index + 1}.</strong> ${escapeHTML(q.question)}`;

    // Options inside the SAME single frame
    elements.optionsGroup.innerHTML = "";
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.key = opt.key;

      const isSelected = state.userAnswers[index] === opt.key;
      if (isSelected) {
        btn.classList.add("selected");
      }

      // Khi đã nộp bài: tô màu đáp án đúng và đáp án sai của sinh viên
      if (state.isSubmitted) {
        btn.disabled = true;
        if (opt.key === q.activeCorrectKey) {
          btn.classList.add("correct-highlight");
        } else if (isSelected && opt.key !== q.activeCorrectKey) {
          btn.classList.add("wrong-highlight");
        }
      } else {
        btn.addEventListener("click", () => selectOption(opt.key));
      }

      btn.innerHTML = `
        <span class="option-key">${opt.key}</span>
        <span class="option-text">${escapeHTML(opt.text)}</span>
      `;
      elements.optionsGroup.appendChild(btn);
    });

    // Explanation Box: Tuyệt đối ẩn khi đang làm bài, chỉ hiển thị sau khi nộp bài
    if (state.isSubmitted) {
      elements.explanationBox.style.display = "block";
      elements.expBadge.textContent = `Đáp án đúng: ${q.activeCorrectKey}`;
      elements.expTranslation.innerHTML = q.translation;
      elements.expExplanation.innerHTML = q.explanation;
    } else {
      elements.explanationBox.style.display = "none";
    }

    // Nav Footer Buttons
    elements.btnPrev.disabled = index === 0;
    elements.btnNext.disabled = index === TOTAL_QUESTIONS - 1;

    updatePillStyles();
  }

  function selectOption(key) {
    if (state.isSubmitted) return;

    state.userAnswers[state.currentIndex] = key;
    renderQuestion(state.currentIndex);
    updateProgress();
  }

  function toggleFlag(index) {
    if (state.flaggedSet.has(index)) {
      state.flaggedSet.delete(index);
    } else {
      state.flaggedSet.add(index);
    }
    renderQuestion(index);
  }

  function goToQuestion(index) {
    if (index >= 0 && index < TOTAL_QUESTIONS) {
      renderQuestion(index);
    }
  }

  function nextQuestion() {
    if (state.currentIndex < TOTAL_QUESTIONS - 1) {
      renderQuestion(state.currentIndex + 1);
    }
  }

  function prevQuestion() {
    if (state.currentIndex > 0) {
      renderQuestion(state.currentIndex - 1);
    }
  }

  function updateProgress() {
    const answered = Object.keys(state.userAnswers).length;
    elements.answeredCount.textContent = answered;
    const pct = Math.round((answered / TOTAL_QUESTIONS) * 100);
    elements.progressBarFill.style.width = `${pct}%`;
  }

  // =========================================================================
  // SUBMISSION & RESULTS
  // =========================================================================
  function openConfirmSubmitModal() {
    if (state.isSubmitted) {
      openResultModal();
      return;
    }

    const answeredCount = Object.keys(state.userAnswers).length;
    const unansweredCount = TOTAL_QUESTIONS - answeredCount;
    const flaggedCount = state.flaggedSet.size;

    elements.cAnsweredNum.textContent = answeredCount;
    elements.cUnansweredNum.textContent = unansweredCount;
    elements.cFlaggedNum.textContent = flaggedCount;

    if (unansweredCount > 0) {
      elements.confirmText.innerHTML = `Bạn còn <strong style="color: var(--danger);">${unansweredCount} câu chưa làm</strong>. Bạn có chắc chắn muốn nộp bài ngay bây giờ?`;
    } else {
      elements.confirmText.innerHTML = `Bạn đã hoàn thành <strong>toàn bộ 40/40 câu</strong>. Bạn có muốn nộp bài để xem điểm và lời giải chi tiết?`;
    }

    elements.confirmModal.classList.add("open");
  }

  function closeConfirmModal() {
    elements.confirmModal.classList.remove("open");
  }

  function submitQuiz(isAuto = false) {
    closeConfirmModal();
    if (state.isSubmitted) return;

    state.isSubmitted = true;
    if (state.timerInterval) clearInterval(state.timerInterval);

    elements.btnSubmit.textContent = "Xem kết quả bài thi";

    // Tính điểm
    let correctCount = 0;
    state.quizQuestions.forEach((q, idx) => {
      if (state.userAnswers[idx] === q.activeCorrectKey) {
        correctCount += 1;
      }
    });

    const wrongCount = TOTAL_QUESTIONS - correctCount;
    const unansweredCount = TOTAL_QUESTIONS - Object.keys(state.userAnswers).length;
    const scale10 = ((correctCount / TOTAL_QUESTIONS) * 10).toFixed(1);

    // Lưu kết quả vào danh sách nộp bài của Admin
    saveSubmissionRecord({
      studentName: state.student.name || "Sinh viên TDC",
      studentId: state.student.id || "N/A",
      studentClass: state.student.className || "N/A",
      score: correctCount,
      total: TOTAL_QUESTIONS,
      scale10: scale10,
      timeSpent: formatTime(state.elapsedSeconds),
      timestamp: new Date().toLocaleString("vi-VN")
    });

    // Cập nhật lại câu hỏi hiện tại để hiển thị đáp án và lời giải
    renderQuestion(state.currentIndex);

    // Mở modal kết quả
    openResultModal();
  }

  function openResultModal() {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    // Phân tích điểm theo 4 chủ điểm
    const topicScores = {
      comp: { correct: 0, total: 0 },
      rel: { correct: 0, total: 0 },
      modal: { correct: 0, total: 0 },
      rep: { correct: 0, total: 0 }
    };

    state.quizQuestions.forEach((q, idx) => {
      const userAns = state.userAnswers[idx];
      const isCorrect = userAns === q.activeCorrectKey;

      if (!userAns) unansweredCount++;
      else if (isCorrect) correctCount++;
      else wrongCount++;

      // Phân loại chủ điểm
      const t = q.topic.toLowerCase();
      let matchedKey = "comp";
      if (t.includes("so sánh") || t.includes("comparative") || t.includes("superlative")) {
        matchedKey = "comp";
      } else if (t.includes("rút gọn") || t.includes("relative") || t.includes("infinitive") || t.includes("participle")) {
        matchedKey = "rel";
      } else if (t.includes("modal") || t.includes("khiếm khuyết") || t.includes("prohibition") || t.includes("obligation") || t.includes("deduction")) {
        matchedKey = "modal";
      } else if (t.includes("reported") || t.includes("tường thuật") || t.includes("gián tiếp")) {
        matchedKey = "rep";
      }

      topicScores[matchedKey].total += 1;
      if (isCorrect) topicScores[matchedKey].correct += 1;
    });

    const scale10 = ((correctCount / TOTAL_QUESTIONS) * 10).toFixed(1);

    elements.resultScore.textContent = correctCount;
    elements.resultScale10.textContent = `Điểm: ${scale10} / 10`;
    elements.statCorrect.textContent = correctCount;
    elements.statWrong.textContent = wrongCount;
    elements.statUnanswered.textContent = unansweredCount;
    elements.statTime.textContent = formatTime(state.elapsedSeconds);

    // Rating
    if (correctCount >= 36) {
      elements.resultRating.textContent = "🌟 Xuất sắc! Kiến thức rất vững vàng!";
      elements.resultRating.style.color = "var(--success)";
    } else if (correctCount >= 30) {
      elements.resultRating.textContent = "👍 Giỏi! Đạt kết quả rất tốt!";
      elements.resultRating.style.color = "var(--primary)";
    } else if (correctCount >= 24) {
      elements.resultRating.textContent = "👌 Khá! Cần ôn luyện thêm một số câu khó.";
      elements.resultRating.style.color = "var(--warning)";
    } else {
      elements.resultRating.textContent = "📚 Cần nỗ lực hơn! Hãy xem kỹ phần giải thích chi tiết.";
      elements.resultRating.style.color = "var(--danger)";
    }

    // Hiển thị điểm 4 chủ đề
    TOPIC_CONFIG.forEach(cfg => {
      const el = document.getElementById(cfg.elementId);
      if (el) {
        const item = topicScores[cfg.key];
        el.textContent = `${item.correct} / ${item.total} câu`;
      }
    });

    // Breakdown grid 1..40 pills
    elements.breakdownGrid.innerHTML = "";
    state.quizQuestions.forEach((q, idx) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "b-item";
      item.textContent = idx + 1;

      const userAns = state.userAnswers[idx];
      if (userAns === q.activeCorrectKey) {
        item.classList.add("correct");
        item.title = `Câu ${idx + 1}: Đúng (Chọn ${userAns})`;
      } else if (!userAns) {
        item.classList.add("unanswered");
        item.title = `Câu ${idx + 1}: Chưa làm (Đáp án đúng: ${q.activeCorrectKey})`;
      } else {
        item.classList.add("wrong");
        item.title = `Câu ${idx + 1}: Sai (Chọn ${userAns}, Đáp án đúng: ${q.activeCorrectKey})`;
      }

      item.addEventListener("click", () => {
        elements.resultModal.classList.remove("open");
        goToQuestion(idx);
      });

      elements.breakdownGrid.appendChild(item);
    });

    elements.resultModal.classList.add("open");
  }

  // =========================================================================
  // ADMIN DASHBOARD & CSV EXPORT (THEO DÕI SỐ LƯỢT LÀM BÀI)
  // =========================================================================
  function openAdminDashboard() {
    const submissions = getSubmissions();
    elements.adminVisitCount.textContent = state.visitCount;
    elements.adminSubmissionCount.textContent = submissions.length;

    let avgScore = 0;
    if (submissions.length > 0) {
      const sum = submissions.reduce((acc, curr) => acc + (curr.score || 0), 0);
      avgScore = (sum / submissions.length).toFixed(1);
    }
    elements.adminAvgScore.textContent = `${avgScore} / ${TOTAL_QUESTIONS}`;

    // Render bảng sinh viên
    elements.adminTableBody.innerHTML = "";
    if (submissions.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">Chưa có lượt sinh viên nào nộp bài.</td>`;
      elements.adminTableBody.appendChild(tr);
    } else {
      submissions.forEach((sub, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td><strong>${escapeHTML(sub.studentName)}</strong></td>
          <td>${escapeHTML(sub.studentId || "—")}</td>
          <td>${escapeHTML(sub.studentClass || "—")}</td>
          <td><strong style="color: var(--primary);">${sub.score} / ${sub.total}</strong></td>
          <td><strong>${sub.scale10}</strong></td>
          <td>${escapeHTML(sub.timeSpent)}</td>
          <td style="font-size: 0.76rem; color: var(--text-muted);">${escapeHTML(sub.timestamp)}</td>
        `;
        elements.adminTableBody.appendChild(tr);
      });
    }

    elements.adminModal.classList.add("open");
  }

  function exportSubmissionsCSV() {
    const submissions = getSubmissions();
    if (submissions.length === 0) {
      alert("Chưa có dữ liệu bài nộp nào để xuất!");
      return;
    }

    // Thêm UTF-8 BOM (\uFEFF) để Excel hiển thị tiếng Việt có dấu hoàn hảo
    let csv = "\uFEFFSTT,Họ và tên,MSSV,Lớp,Điểm số (trên 40),Điểm thang 10,Thời gian làm bài,Thời điểm nộp bài\n";

    submissions.forEach((s, idx) => {
      const name = `"${(s.studentName || "").replace(/"/g, '""')}"`;
      const id = `"${(s.studentId || "").replace(/"/g, '""')}"`;
      const cls = `"${(s.studentClass || "").replace(/"/g, '""')}"`;
      const score = s.score;
      const scale10 = s.scale10;
      const time = `"${s.timeSpent}"`;
      const timestamp = `"${s.timestamp}"`;

      csv += `${idx + 1},${name},${id},${cls},${score},${scale10},${time},${timestamp}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Bang_Diem_Sinh_Vien_TDC_Revision_Units_10_13_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function clearAdminData() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử nộp bài của sinh viên đã lưu trên máy này?")) {
      localStorage.removeItem(STORAGE_KEY_SUBMISSIONS);
      updateNavSubmissionCount();
      openAdminDashboard();
    }
  }

  // =========================================================================
  // FULL 40 QUESTIONS REVIEW MODAL
  // =========================================================================
  function openFullReviewModal() {
    elements.resultModal.classList.remove("open");
    elements.fullReviewContent.innerHTML = "";

    state.quizQuestions.forEach((q, idx) => {
      const userAns = state.userAnswers[idx];
      const isCorrect = userAns === q.activeCorrectKey;
      const card = document.createElement("div");
      card.className = "full-review-card";

      let statusBadge = "";
      if (isCorrect) {
        statusBadge = `<span style="background-color: var(--success-light); color: var(--success-dark); padding: 3px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: 700;">Đúng ✓</span>`;
      } else if (!userAns) {
        statusBadge = `<span style="background-color: var(--warning-light); color: var(--warning); padding: 3px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: 700;">Chưa làm</span>`;
      } else {
        statusBadge = `<span style="background-color: var(--danger-light); color: var(--danger); padding: 3px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: 700;">Sai ✗ (Bạn chọn: ${userAns})</span>`;
      }

      let optionsHtml = "";
      q.options.forEach(opt => {
        let optStyle = "padding: 6px 10px; border-radius: 6px; margin-bottom: 4px; font-size: 0.88rem; display: flex; align-items: center; gap: 8px;";
        if (opt.key === q.activeCorrectKey) {
          optStyle += " background-color: var(--success-light); color: var(--success-dark); font-weight: 700; border: 1px solid var(--success-border);";
        } else if (userAns === opt.key && !isCorrect) {
          optStyle += " background-color: var(--danger-light); color: var(--danger-dark); border: 1px solid var(--danger-border);";
        } else {
          optStyle += " background-color: var(--bg-subtle); color: var(--text-main);";
        }
        optionsHtml += `<div style="${optStyle}"><strong>${opt.key}.</strong> <span>${escapeHTML(opt.text)}</span></div>`;
      });

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
          <div>
            <strong style="color: var(--primary);">Câu ${idx + 1} / 40:</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 6px;">(${q.topic})</span>
          </div>
          <div>${statusBadge}</div>
        </div>
        <p style="font-size: 0.98rem; font-weight: 600; margin-bottom: 10px; line-height: 1.5;">${escapeHTML(q.question)}</p>
        <div style="margin-bottom: 10px;">${optionsHtml}</div>
        <div style="background-color: var(--bg-subtle); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: 0 8px 8px 0; font-size: 0.84rem; line-height: 1.55;">
          <div style="margin-bottom: 5px;"><strong>🇻🇳 Dịch nghĩa:</strong> ${q.translation}</div>
          <div><strong>📚 Giải thích:</strong> ${q.explanation}</div>
        </div>
      `;

      elements.fullReviewContent.appendChild(card);
    });

    elements.fullReviewModal.classList.add("open");
  }

  // =========================================================================
  // EVENTS & KEYBOARD
  // =========================================================================
  function attachEvents() {
    // Top actions
    elements.btnThemeToggle.addEventListener("click", toggleTheme);
    elements.btnAdminOpen.addEventListener("click", openAdminDashboard);

    // Device switchers
    elements.btnViewDesktop.addEventListener("click", () => setViewMode("desktop"));
    elements.btnViewIpad.addEventListener("click", () => setViewMode("ipad"));
    elements.btnViewMobile.addEventListener("click", () => setViewMode("mobile"));

    // Upper Meta
    elements.btnEditStudent.addEventListener("click", () => {
      elements.studentModal.classList.add("open");
    });
    elements.btnNewQuizTop.addEventListener("click", () => {
      if (confirm("Bạn có muốn tạo bộ 40 câu xáo trộn ngẫu nhiên mới? Bài làm hiện tại sẽ được khởi tạo lại.")) {
        restartQuiz();
      }
    });
    elements.btnQuickSubmit.addEventListener("click", openConfirmSubmitModal);

    // Question Card Buttons
    elements.btnPrev.addEventListener("click", prevQuestion);
    elements.btnNext.addEventListener("click", nextQuestion);
    elements.btnSubmit.addEventListener("click", openConfirmSubmitModal);
    elements.btnCardFlag.addEventListener("click", () => toggleFlag(state.currentIndex));

    // Confirm Modal
    elements.btnCancelSubmit.addEventListener("click", closeConfirmModal);
    elements.btnCloseConfirm.addEventListener("click", closeConfirmModal);
    elements.btnConfirmSubmit.addEventListener("click", () => submitQuiz(false));

    // Result Modal
    elements.btnCloseResult.addEventListener("click", () => elements.resultModal.classList.remove("open"));
    elements.btnReview.addEventListener("click", () => elements.resultModal.classList.remove("open"));
    elements.btnRestart.addEventListener("click", restartQuiz);
    elements.btnViewAll40.addEventListener("click", openFullReviewModal);

    // Full Review Modal
    elements.btnCloseFullReview.addEventListener("click", () => elements.fullReviewModal.classList.remove("open"));

    // Student Modal Form
    elements.btnCloseStudent.addEventListener("click", () => elements.studentModal.classList.remove("open"));
    elements.formStudent.addEventListener("submit", (e) => {
      e.preventDefault();
      saveStudentProfile(
        elements.inputStudentName.value,
        elements.inputStudentId.value,
        elements.inputStudentClass.value
      );
      elements.studentModal.classList.remove("open");
    });

    // Admin Modal
    elements.btnCloseAdmin.addEventListener("click", () => elements.adminModal.classList.remove("open"));
    elements.btnExportCsv.addEventListener("click", exportSubmissionsCSV);
    elements.btnClearData.addEventListener("click", clearAdminData);

    // Close modals when clicking backdrop
    [elements.resultModal, elements.confirmModal, elements.studentModal, elements.adminModal, elements.fullReviewModal].forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    });

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowLeft") {
        prevQuestion();
      } else if (e.key === "ArrowRight") {
        nextQuestion();
      } else if (["1", "a", "A"].includes(e.key)) {
        selectOption("A");
      } else if (["2", "b", "B"].includes(e.key)) {
        selectOption("B");
      } else if (["3", "c", "C"].includes(e.key)) {
        selectOption("C");
      } else if (["4", "d", "D"].includes(e.key)) {
        selectOption("D");
      } else if (["f", "F"].includes(e.key)) {
        toggleFlag(state.currentIndex);
      }
    });
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Khởi động ứng dụng khi DOM sẵn sàng
  document.addEventListener("DOMContentLoaded", () => {
    cacheDOMElements();
    initQuiz();
  });

})();
