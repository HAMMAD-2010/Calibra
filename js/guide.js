/* Calibra Guide: SCRIPTED DEMO ONLY.
   This is not connected to a live AI model. Replies are predefined. Nothing is sent
   to a server, and the transcript lives only in memory until the page is closed or cleared. */
(function () {
  var cfg = window.CALIBRA_CONFIG || {};
  var log = document.getElementById("chat-log");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-input");
  var sendBtn = document.getElementById("chat-send");
  var error = document.getElementById("chat-error");
  var chips = document.getElementById("chat-chips");
  var unavailable = document.getElementById("chat-unavailable");
  var transcript = []; // in memory only

  var MAX_LENGTH = 300;

  // Pre-reviewed safety message. Local emergency and support details must be verified
  // and approved by qualified people before deployment. No numbers are invented here.
  var SAFETY_MESSAGE = "It sounds like you might be in danger or at risk of being hurt. Please stop and speak with a trusted adult right now. " +
    "If anyone is in immediate danger, contact local emergency services. " +
    "This demo cannot check on you, contact anyone, or provide emergency help. " +
    "[Placeholder: verified local emergency and support details will be shown here after review.]";

  var SAFETY_PATTERN = /(hurt myself|harm myself|kill myself|end my life|suicid|self[- ]harm|abus(e|ed|ing)|someone is hurting|hitting me|hurt me|touch(ed|ing)? me|want to hurt|going to hurt|weapon|threat|i am not safe|i'm not safe|in danger)/i;
  var DIAGNOSIS_PATTERN = /(diagnos|do i have (depression|anxiety|adhd|ptsd)|medication|medicine|prescri|pills|dose)/i;

  var RULES = [
    { match: /(fact|assum)/i, reply: "A fact is something that can be observed, such as what someone said or did. An assumption is a guess about what someone else thought or intended. Calibra suggests checking which parts you actually know. Which part of the scenario feels most unclear to you?" },
    { match: /(boundar)/i, reply: "A respectful boundary is a short, calm statement about what you would like, such as asking someone to stop or to ask first. It is optional, and it does not need to be said in a particular way. Would it help to look at one example sentence, or to think about when it might feel safe to say it?" },
    { match: /(trusted adult|who can i talk|who could|adult)/i, reply: "A trusted adult might be a parent or guardian, a teacher, a school counselor, or another adult you feel safe approaching. You do not have to explain everything at once. Which of these people feels easiest to approach?" },
    { match: /(unsure|don'?t know|not sure|what can i do|what should i do|respond)/i, reply: "It is okay to be unsure. You could take a pause, write down what you know, or choose one small option from the Next Step page. Which of those feels like the right size for you right now?" },
    { match: /(help me understand|scenario|understand)/i, reply: "Each scenario is fictional and describes a neutral situation. You can go through four steps: what happened, what might be an assumption, possible responses, and a safe next step. Would you like to start with the first step?" }
  ];

  var FALLBACK = "I can help with understanding the website, facts and assumptions, boundaries, and trusted adults. Could you tell me which of these you would like to explore?";

  function addMessage(role, text, extraClass) {
    var div = document.createElement("div");
    div.className = "msg " + (role === "user" ? "msg-user" : "msg-bot") + (extraClass ? " " + extraClass : "") + " fade-in";
    var label = role === "user" ? "You" : "Calibra Guide (demo)";
    div.innerHTML = '<div class="msg-meta" style="color:inherit;opacity:.85;margin-bottom:.2rem">' + label + "</div><div></div>";
    div.lastChild.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    transcript.push({ role: role, text: text });
    return div;
  }

  function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
    CalibraUI.announce(message);
  }
  function clearError() { error.textContent = ""; error.classList.add("hidden"); }

  function setBusy(busy) {
    sendBtn.disabled = busy;
    input.disabled = busy;
    if (busy) {
      var t = document.createElement("div");
      t.id = "typing";
      t.className = "msg msg-bot";
      t.setAttribute("role", "status");
      t.innerHTML = '<span class="sr-only">Calibra Guide demo is preparing a reply</span><span class="typing" aria-hidden="true"><span></span><span></span><span></span></span>';
      log.appendChild(t);
      log.scrollTop = log.scrollHeight;
    } else {
      var old = document.getElementById("typing");
      if (old) old.remove();
    }
  }

  function scriptedReply(text) {
    if (SAFETY_PATTERN.test(text)) {
      return { safety: true, text: SAFETY_MESSAGE };
    }
    if (DIAGNOSIS_PATTERN.test(text)) {
      return { text: "I can't diagnose conditions or recommend medication, and I'm not a qualified professional. A doctor, school nurse, or school counselor can help with questions about health. Would you like to think about which of them to speak with?" };
    }
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i].match.test(text)) return { text: RULES[i].reply };
    }
    return { text: FALLBACK };
  }

  function send(text) {
    clearError();
    var trimmed = (text || "").trim();
    if (!trimmed) return showError("Please type a question first, or choose one of the suggestions.");
    if (trimmed.length > MAX_LENGTH) return showError("That message is too long. Please keep it under " + MAX_LENGTH + " characters.");

    addMessage("user", trimmed);
    input.value = "";
    setBusy(true);

    // Simulated delay so the loading state can be reviewed. There is no network call.
    window.setTimeout(function () {
      setBusy(false);
      var reply = scriptedReply(trimmed);
      if (reply.safety) {
        addMessage("bot", reply.text, "msg-safety");
        showError("Ordinary reflection has been paused. Please reach out to a trusted adult now.");
        chatFinishedForSafety();
      } else {
        addMessage("bot", reply.text);
      }
      input.focus();
    }, 700);
  }

  function chatFinishedForSafety() {
    // Stop ordinary reflection until a person is involved. Only safety links remain.
    input.disabled = true;
    sendBtn.disabled = true;
    chips.classList.add("hidden");
  }

  function clearConversation() {
    transcript = [];
    log.innerHTML = "";
    intro();
    chips.classList.remove("hidden");
    input.disabled = false;
    sendBtn.disabled = false;
    clearError();
    CalibraUI.announce("Conversation cleared.");
    input.focus();
  }

  function intro() {
    addMessage("bot", "Hi, I'm Calibra Guide. I'm a demo assistant with predefined replies. I can help you understand this website, think about facts and assumptions, explore boundaries, and learn about trusted adults. I'm not a therapist, a counselor, or emergency support.");
    addMessage("bot", "What would you like to explore first?");
  }

  // Suggestion chips
  var SUGGESTIONS = [
    "Help me understand this fictional scenario.",
    "What is the difference between a fact and an assumption?",
    "How can someone set a respectful boundary?",
    "Who could be a trusted adult?",
    "What can I do if I am unsure how to respond?"
  ];
  chips.innerHTML = SUGGESTIONS.map(function (s, i) {
    return '<button class="chip" type="button" data-q="' + i + '">' + s + "</button>";
  }).join("");
  chips.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-q]");
    if (btn) send(SUGGESTIONS[parseInt(btn.getAttribute("data-q"), 10)]);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    send(input.value);
  });

  document.getElementById("chat-clear").addEventListener("click", clearConversation);
  document.querySelectorAll("[data-exit]").forEach(function (b) {
    b.addEventListener("click", function () { window.location.href = cfg.exitUrl || "index.html"; });
  });

  // Unavailable-service state: shown when no live AI endpoint is configured.
  if (!cfg.liveAiConnected) {
    unavailable.classList.remove("hidden");
  }

  intro();
})();
