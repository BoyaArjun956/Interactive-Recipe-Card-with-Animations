let currentStep = -1;
const totalSteps = document.querySelectorAll('#steps-list li').length;

function toggleVisibility(id) {
    const element = document.getElementById(id);
    const button = element.previousElementSibling;
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        element.classList.add('visible');
        button.setAttribute('aria-expanded', 'true');
        button.textContent = `Hide ${id.split('-')[0].charAt(0).toUpperCase() + id.split('-')[0].slice(1)}`;
    } else {
        element.classList.remove('visible');
        element.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = `Show ${id.split('-')[0].charAt(0).toUpperCase() + id.split('-')[0].slice(1)}`;
    }
}

function startCooking() {
    const stepsList = document.getElementById('steps-list');
    if (stepsList.classList.contains('hidden')) {
        toggleVisibility('steps-list');
    }
    currentStep = 0;
    highlightStep();
    document.getElementById('start-cooking').classList.add('hidden');
    document.getElementById('next-step').classList.remove('hidden');
    updateProgress();
}

function nextStep() {
    if (currentStep < totalSteps - 1) {
        currentStep++;
        highlightStep();
        updateProgress();
    }
    if (currentStep === totalSteps - 1) {
        document.getElementById('next-step').classList.add('hidden');
    }
}

function highlightStep() {
    const steps = document.querySelectorAll('#steps-list li');
    steps.forEach((step, index) => {
        step.classList.toggle('highlight', index === currentStep);
    });
}

function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = ((currentStep + 1) / totalSteps) * 100;
    progress.style.width = `${percentage}%`;
}

function startTimer(minutes) {
    let time = minutes * 60;
    const display = document.getElementById('timer-display');
    const interval = setInterval(() => {
        const minutesLeft = Math.floor(time / 60);
        const secondsLeft = time % 60;
        display.textContent = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
        time--;
        if (time < 0) {
            clearInterval(interval);
            display.textContent = 'Time’s up!';
        }
    }, 1000);
}