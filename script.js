document.addEventListener('DOMContentLoaded', () => {

  const pomodoro = document.getElementById('pomodoro');
  const shortBreak = document.getElementById('short-break');
  const longBreak = document.getElementById('long-break');

  let pomodoroDuration = 25;
  let shortBreakDuration = 5;
  let longBreakDuration = 15;

  let timer = document.querySelector('.timer');
  let startButton = document.getElementById('start-button');
  let pauseButton = document.getElementById('pause-button');
  const ring = new Audio('./assets/ring.mp3');

  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds');
  let progressPercentage = document.getElementById('progress-percentage');
  let progressIndicator = document.getElementById('progress-indicator');

  let totalSeconds = 0;
  let initialTotalSeconds = 0;
  let interval;
  let isPaused = false;
  let pomodoroCount = 0;

  const resetTimerUI = () => {
    clearInterval(interval);
    clearInterval(quoteInterval);
    isPaused = true;
    startButton.classList.add('visible');
    pauseButton.classList.remove('visible');
    progressPercentage.innerText = '0%';
    progressIndicator.style.width = '0%';
    timer.classList.remove('visible');
  };

  const selectTimer = (selectedTimer) => {

    pomodoro.classList.remove('timer-selected');
    shortBreak.classList.remove('timer-selected');
    longBreak.classList.remove('timer-selected');

    selectedTimer.classList.add('timer-selected');
    updateQuoteVisibility();
  };

  const selectPomodoro = () => {
    resetTimerUI();
    hideQuote();
    selectTimer(pomodoro);

    setTimeout(() => {
      timer.classList.add('visible'); 

      minutes.innerHTML = `${pomodoroDuration}`.padStart(2, '0');
      seconds.innerHTML = '00';

      totalSeconds = pomodoroDuration * 60;
      initialTotalSeconds = totalSeconds;

      startQuoteRotation(pomodoroQuotes);
    }, 200);
  };

  const selectShortBreak = () => {
    resetTimerUI();
    hideQuote();
    selectTimer(shortBreak);

    setTimeout(() => {
      timer.classList.add('visible');

      minutes.innerHTML = `${shortBreakDuration}`.padStart(2, '0');
      seconds.innerHTML = '00';

      totalSeconds = shortBreakDuration * 60;
      initialTotalSeconds = totalSeconds;

      startQuoteRotation(shortBreakQuotes);
    }, 200);
  };

  const selectLongBreak = () => {
    resetTimerUI();
    hideQuote();
    selectTimer(longBreak);

    setTimeout(() => {
      timer.classList.add('visible');

      minutes.innerHTML = `${longBreakDuration}`.padStart(2, '0');
      seconds.innerHTML = '00';

      totalSeconds = longBreakDuration * 60;
      initialTotalSeconds = totalSeconds;

      startQuoteRotation(longBreakQuotes);
    }, 200);
  };

  pomodoro.addEventListener('click', selectPomodoro);
  shortBreak.addEventListener('click', selectShortBreak);
  longBreak.addEventListener('click', selectLongBreak);

  // Timer functionality
  const progressBar = document.getElementById('progress-bar');

  const pomodoroMessages = [
    "You have completed a unit of focused labor. Kier smiles upon you.",
    "The numbers are pleased. You may rest… briefly.",
    "Your toil has not gone unnoticed. A reprieve is sanctioned.",
    "You have honored the pact of diligence. A short respite awaits."
  ];

  const breakMessages = [
    "Recalibration complete. Return to your purpose.",
    "Your moment of kindness has expired. Please proceed.",
    "Welcome back. The work missed you.",
    "Your outie entrusted you with this duty. Honor them."
  ];

  const startTimer = () => {
    startButton.classList.remove('visible');
    pauseButton.classList.add('visible');
    progressBar.classList.add('visible');

    if (isPaused) {

      isPaused = false;
    } else {

      totalSeconds = initialTotalSeconds;
    }

    interval = setInterval(() => {
      totalSeconds--;

      let mins = Math.floor(totalSeconds / 60);
      let secs = totalSeconds % 60;

      minutes.innerHTML = mins.toString().padStart(2, '0');
      seconds.innerHTML = secs.toString().padStart(2, '0');


      let progress = Math.floor(((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100);
      progressPercentage.innerText = `${progress}%`;
      progressIndicator.style.width = `${progress}%`;

      if (totalSeconds === 0) {
        clearInterval(interval);
        ring.play();
        showNotification();
      }
    }, 1000);
  };

  ring.addEventListener('error', () => {
    console.error('Failed to load the ring sound.');
  });

  const pauseTimer = () => {
    startButton.classList.add('visible');
    pauseButton.classList.remove('visible');
    clearInterval(interval);
    isPaused = true;
  };

  const showNotification = () => {
    if (Notification.permission === "granted") {
      let message;
      if (totalSeconds === 25 * 60) {
        message = pomodoroMessages[pomodoroCount % pomodoroMessages.length];
        pomodoroCount++;
      } else {
        message = breakMessages[Math.floor(Math.random() * breakMessages.length)];
      }
      new Notification("Timer Complete", {
        body: message,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          showNotification();
        }
      });
    }
  };

  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);


  Notification.requestPermission();


  let quoteInterval;
  let currentQuoteIndex = 0;

  const quoteText = document.getElementById('quote');
  const quoteAuthor = document.getElementById('quote-author');

  // Quotes for Pomodoro sessions
  const pomodoroQuotes = [
    { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "- Steve Jobs" },
    { text: "Fail fast, fail often, but always fail forward.", author: "- Sundar Pichai" },
    { text: "The best way to predict the future is to invent it.", author: "- Alan Kay" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "– John D. Rockefeller" },
    { text: "If you're not a little confused by what's going on, you're not paying attention.", author: "– Tim Cook" },
    { text: "If you are not embarrassed by the first version of your product, you've launched too late.", author: "- Reid Hoffman" },
    { text: "You have to be willing to be misunderstood if you're going to innovate.", author: "- Jeff Bezos" },
    { text: "Everything around you that you call life was made up by people that were no smarter than you.", author: "- Steve Jobs" }
  ];

  // Quotes for short break sessions
  const shortBreakQuotes = [
    { text: "If you don’t build your dream, someone else will hire you to help them build theirs.", author: "- Mukesh Ambani" },
    { text: "I don't believe in taking the right decisions. I take decisions and make them right.", author: "- Ratan Tata" },
    { text: "Success is not a destination, it's a journey. Every challenge you face is an opportunity to learn and grow.", author: "- Gautam Adani" }
  ];

  //Quotes for long break sessions
  const longBreakQuotes = [
    { text: "You don't have to win to get a prize. Rather, you have to win because you wanted to do the best job.", author: "- Mr Weiherer" },
    { text: "Life isn’t a race, it’s a marathon. It’s about endurance, not speed.", author: "- Harshit" },
    { text: "Don’t wait for opportunity. Create it.", author: "- Unknown" }
  ];

  // Quotes generator
  const displayQuote = (quote) => {
    if (quoteText && quoteAuthor) { // Ensure elements are not null
      quoteText.textContent = `“${quote.text}”`;
      quoteAuthor.textContent = quote.author;
      quoteText.classList.add('visible');
      quoteAuthor.classList.add('visible');
    }
  };

  const hideQuote = () => {
    if (quoteText && quoteAuthor) {
      quoteText.classList.remove('visible');
      quoteAuthor.classList.remove('visible');
    }
  };

  const startQuoteRotation = (quotes) => {
    if (settingsContent.classList.contains('visible')) {
      return; // Don't start the quote rotation if settings are open
    } else {
      hideQuote(); // Hide the quote initially
      currentQuoteIndex = 0;
      displayQuote(quotes[currentQuoteIndex]);

      quoteInterval = setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        displayQuote(quotes[currentQuoteIndex]);
      }, 20000); // Change quote every 20 seconds
    }
  };

  //Settings visibility
  const settingsLink = document.getElementById('settings');
  const closeButton = document.getElementById('close-button');
  const settingsContent = document.getElementById('settings-content');

  // Toggle quote visibility
 
  const stopQuoteRotation = () => {
    clearInterval(quoteInterval); //Stop the interval
    hideQuote(); //Hide the quote visually
  };

  const toggleQuoteVisibility = (visible) => {
    if (visible) {
      quoteText.classList.add('visible');
      quoteAuthor.classList.add('visible');
    } else {
      quoteText.classList.remove('visible');
      quoteAuthor.classList.remove('visible');
    }
  };

  const isTimerSelected = () => {
    return document.querySelector('.timer-selected') !== null;
  };

  const updateQuoteVisibility = () => {
    const settingsHidden = !settingsContent.classList.contains('visible');
    const timerSelected = isTimerSelected();
    toggleQuoteVisibility(settingsHidden && timerSelected);
  };

  // Toggle settings content visibility when the settings link is clicked
  settingsLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    if (settingsContent.classList.contains('visible')) {
      // Close settings content
      settingsContent.classList.remove('visible');
      settingsContent.setAttribute('aria-hidden', 'true');
      settingsLink.classList.remove('settings-link-selected');
      // Ensure no elements within settingsContent have focus
      settingsContent.querySelectorAll('button, [tabindex="0"]').forEach(el => el.blur());
      updateQuoteVisibility(); // Update visibility after closing settings
    } else {
      // Open settings content
      settingsContent.classList.add('visible');
      settingsLink.classList.add('settings-link-selected');
      settingsContent.setAttribute('aria-hidden', 'false');
      stopQuoteRotation(); // Stop the quote rotation when settings are open
    }
  });

  // Hide settings content when the close button is clicked
  closeButton.addEventListener('click', () => {
    settingsContent.classList.remove('visible');
    settingsContent.setAttribute('aria-hidden', 'true');
    settingsLink.classList.remove('settings-link-selected');
    // Ensure no elements within settingsContent have focus
    settingsContent.querySelectorAll('button, [tabindex="0"]').forEach(el => el.blur());
    updateQuoteVisibility(); // Update visibility after closing settings
  });

  // Theme change
  let currentTheme = 'green-light-theme-set'; // Default theme

  const applyTheme = (theme) => {
    document.documentElement.classList.remove('green-light-theme-set', 'blue-light-theme-set', 'green-dark-theme-set', 'blue-dark-theme-set');
    document.documentElement.classList.add(theme);
    currentTheme = theme;
  };

  document.getElementById('green-light-theme').addEventListener('click', () => applyTheme('green-light-theme-set'));
  document.getElementById('blue-light-theme').addEventListener('click', () => applyTheme('blue-light-theme-set'));
  document.getElementById('green-dark-theme').addEventListener('click', () => applyTheme('green-dark-theme-set'));
  document.getElementById('blue-dark-theme').addEventListener('click', () => applyTheme('blue-dark-theme-set'));

  //Timer duration change and save button event listener
  const inputs = document.querySelectorAll('#pomodoroInput, #shortBreakInput, #longBreakInput');

  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      // Force remove all non-digit characters immediately
      let digitsOnly = e.target.value.replace(/[^\d]/g, '');
  
      // Limit to 2 digits
      if (digitsOnly.length > 2) {
        digitsOnly = digitsOnly.slice(0, 2);
      }
  
      // Update only if cleaned version is different
      if (e.target.value !== digitsOnly) {
        e.target.value = digitsOnly;
      }
    });
  });
  

  document.getElementById('save-button').addEventListener('click', () => {
    const newPomodoro = parseInt(document.getElementById('pomodoroInput').value);
    const newShortBreak = parseInt(document.getElementById('shortBreakInput').value);
    const newLongBreak = parseInt(document.getElementById('longBreakInput').value);

    if (
      Number.isInteger(newPomodoro) && newPomodoro >= 1 && newPomodoro <= 60 &&
      Number.isInteger(newShortBreak) && newShortBreak >= 1 && newShortBreak <= 30 &&
      Number.isInteger(newLongBreak) && newLongBreak >= 1 && newLongBreak <= 60
    ) {
      pomodoroDuration = newPomodoro;
      shortBreakDuration = newShortBreak;
      longBreakDuration = newLongBreak;

      localStorage.setItem('theme', currentTheme); //Save selected theme

      alert("Settings saved!"); // change to cursive text under button later

      settingsContent.classList.remove('visible');
      settingsContent.setAttribute('aria-hidden', 'true');
      settingsLink.classList.remove('settings-link-selected');

      if (isTimerSelected()) {
        if (pomodoro.classList.contains('timer-selected')) {
          selectPomodoro(); // Restart the timer with new duration
        } else if (shortBreak.classList.contains('timer-selected')) {
          selectShortBreak(); // Restart the timer with new duration
        } else if (longBreak.classList.contains('timer-selected')) {
          selectLongBreak(); // Restart the timer with new duration
        }
      }
    } else {
      alert("Please enter valid numbers for all fields.");
    }
  });

  // Load saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Add touch event handlers
  document.querySelectorAll('button, .timer-selector li, #theme-settings li div').forEach(element => {
      element.addEventListener('touchstart', function(e) {
          this.style.opacity = '0.7';
      });

      element.addEventListener('touchend', function(e) {
          this.style.opacity = '1';
      });
  });

  // Prevent double-tap zoom on interactive elements
  document.querySelectorAll('button, a, .timer-selector li').forEach(element => {
      element.addEventListener('touchend', function(e) {
          e.preventDefault();
          if (this.click) {
              this.click();
          }
      });
  });

});