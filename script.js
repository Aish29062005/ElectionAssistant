// ================= DATA =================
const electionStages = [
    {
        title: "Announcement & Campaigning",
        description: "This is where everything begins. Candidates announce they’re running, build their teams, travel, give speeches, and try to gain public support.",
        quiz: {
            question: "Why is early campaigning important?",
            options: [
                "To cast the final vote",
                "To build public support and awareness",
                "To swear in the winner",
                "To finalize the nominee"
            ],
            correctIndex: 1
        }
    },
    {
        title: "Primaries & Caucuses",
        description: "Political parties choose their candidates through voting events held in different states.",
        quiz: {
            question: "What makes a primary different from a caucus?",
            options: [
                "Primaries use secret ballots, caucuses involve group discussions and open voting",
                "Primaries are only for Republicans",
                "Primaries happen later than caucuses",
                "There is no difference"
            ],
            correctIndex: 0
        }
    },
    {
        title: "National Conventions",
        description: "Parties officially confirm their candidates and share their goals and plans.",
        quiz: {
            question: "What is decided at a national convention?",
            options: [
                "The current president resigns",
                "Electoral votes are counted",
                "The party finalizes its candidate and policies",
                "Citizens vote directly"
            ],
            correctIndex: 2
        }
    },
    {
        title: "General Election Campaign",
        description: "Candidates compete directly, focusing on convincing undecided voters and winning key states.",
        quiz: {
            question: "Why are swing states important?",
            options: [
                "They have better weather",
                "They can be won by either candidate",
                "They vote first",
                "They have cheaper ads"
            ],
            correctIndex: 1
        }
    },
    {
        title: "Election Day",
        description: "Voters across the country cast their votes either in person or by mail.",
        quiz: {
            question: "When is Election Day held?",
            options: [
                "First Tuesday of November",
                "Tuesday after the first Monday in November",
                "November 1st",
                "Second Tuesday of December"
            ],
            correctIndex: 1
        }
    },
    {
        title: "Electoral College & Inauguration",
        description: "Electors officially choose the president, and the winner is sworn in on January 20.",
        quiz: {
            question: "How many electoral votes are needed to win?",
            options: ["538", "100", "270", "50"],
            correctIndex: 2
        }
    }
];

// DOM REFERENCES
const timelineList = document.getElementById('timeline-list');
const stageTitle = document.getElementById('stage-title');
const stageDescription = document.getElementById('stage-description');
const quizQuestion = document.getElementById('quiz-question');
const quizOptionsContainer = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');

// STATE
let currentStage = 0;
let hasAnswered = false;

// INIT
function init() {
    renderTimeline();
    showStage(0);
}

// TIMELINE
function renderTimeline() {
    timelineList.innerHTML = '';

    electionStages.forEach((stage, index) => {
        const item = document.createElement('li');
        item.className = `timeline-item ${index === 0 ? 'active' : ''}`;
        item.dataset.stage = index;

        item.innerHTML = `
            <div class="timeline-marker">${index + 1}</div>
            <div class="timeline-content">
                <h3>${stage.title}</h3>
            </div>
        `;

        item.addEventListener('click', () => switchStage(index));
        timelineList.appendChild(item);
    });
}

// STAGE SWITCH
function switchStage(index) {
    if (currentStage === index) return;

    currentStage = index;

    // Update active state
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    restartAnimations();
    showStage(index);
}

// Smooth animation reset
function restartAnimations() {
    const details = document.querySelector('.stage-details');
    const quiz = document.querySelector('.quiz-section');

    [details, quiz].forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
    });
}

// LOAD CONTENT
function showStage(index) {
    const stage = electionStages[index];

    // Update text
    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;

    // Reset quiz
    quizQuestion.textContent = stage.quiz.question;
    quizOptionsContainer.innerHTML = '';
    quizFeedback.className = 'quiz-feedback hidden';
    quizFeedback.textContent = '';
    hasAnswered = false;

    // Render options
    stage.quiz.options.forEach((text, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = text;

        btn.addEventListener('click', () =>
            handleAnswer(i, stage.quiz.correctIndex, btn)
        );

        quizOptionsContainer.appendChild(btn);
    });
}

// QUIZ LOGIC 
function handleAnswer(selected, correct, button) {
    if (hasAnswered) return;

    hasAnswered = true;

    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => opt.disabled = true);

    if (selected === correct) {
        button.classList.add('correct');
        showFeedback(true, "Correct! Nice work.");
    } else {
        button.classList.add('incorrect');
        allOptions[correct].classList.add('correct');
        showFeedback(false, "Not quite. Check the explanation above.");
    }
}

// FEEDBACK
function showFeedback(isCorrect, message) {
    quizFeedback.textContent = message;
    quizFeedback.className = `quiz-feedback ${isCorrect ? 'success' : 'error'}`;
}

// START APP
document.addEventListener('DOMContentLoaded', init);