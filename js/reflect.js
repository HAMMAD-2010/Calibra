/* Guided Reflection Flow.
   Answers are held only in this page's memory. Nothing is saved, stored, or sent.
   Only predefined choice IDs are passed to the next page through the URL. */
(function () {
  var scenarioId = CalibraUI.getParam("scenario");
  var scenario = (window.CALIBRA_SCENARIOS || []).filter(function (s) { return s.id === scenarioId; })[0];
  var stepNames = ["What happened?", "What might be an assumption?", "What are some possible responses?", "What could be a safe next step?"];

  var root = document.getElementById("reflect-root");
  var state = { step: 1, facts: {}, assumptions: {}, response: null, next: null };
  var progressReady = false;

  function hasAnswers() {
    return Object.keys(state.facts).length > 0 || Object.keys(state.assumptions).length > 0 ||
      !!state.response || !!state.next;
  }

  // Warn before accidental reloads or tab closes, because answers are not saved.
  window.addEventListener("beforeunload", function (e) {
    if (hasAnswers()) { e.preventDefault(); e.returnValue = ""; }
  });

  function showError(message) {
    root.innerHTML = '<div class="notice notice-error" role="alert"><strong>Something went wrong.</strong> ' + message +
      '</div><div class="btn-row"><a class="btn btn-secondary" href="scenarios.html">Choose another scenario</a>' +
      '<button class="exit-btn" type="button" data-exit="true">Exit</button></div>';
    CalibraUI.announce(message);
  }

  if (!scenario) {
    showError("We could not find that scenario. Please choose one from the list.");
    return;
  }

  function progressHTML() {
    var pct = Math.round(((state.step - 1) / 4) * 100);
    var steps = stepNames.map(function (name, i) {
      var n = i + 1;
      var cls = n < state.step ? ' class="done"' : "";
      var cur = n === state.step ? ' aria-current="step"' : "";
      return "<li" + cls + cur + ">" + n + ". " + name.replace("?", "") + "</li>";
    }).join("");
    return '<div class="progress-wrap"><div class="progress-label"><span>Step ' + state.step + " of 4</span><span>" +
      pct + '% complete</span></div><div class="progress-track" role="progressbar" aria-label="Reflection progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
      pct + '"><div class="progress-fill" style="width:' + pct + '%"></div></div><ol class="stepper">' + steps + "</ol></div>";
  }

  function choiceGroup(name, legend, options, type, selected, hint) {
    var items = options.map(function (o) {
      var checked = type === "checkbox" ? !!selected[o.id] : selected === o.id;
      var sub = o.note ? '<span class="choice-sub">' + o.note + "</span>" : "";
      var title = o.title ? "<strong>" + o.title + "</strong><br>" : "";
      return '<div class="choice"><input type="' + type + '" name="' + name + '" id="' + name + "-" + o.id +
        '" value="' + o.id + '"' + (checked ? " checked" : "") + '><label for="' + name + "-" + o.id + '">' +
        title + o.text + sub + "</label></div>";
    }).join("");
    return '<fieldset class="choice-list"><legend>' + legend + "</legend>" +
      (hint ? '<p class="muted" style="margin-top:-.4rem">' + hint + "</p>" : "") + items + "</fieldset>";
  }

  function stepBody() {
    var s = state.step;
    if (s === 1) {
      return '<div class="card"><h3>The scenario</h3><p>' + scenario.story + "</p></div>" +
        choiceGroup("facts", "Which of these are directly stated in the scenario?",
          scenario.facts, "checkbox", state.facts, "Select only what is explicitly known. You can select none or several.");
    }
    if (s === 2) {
      return choiceGroup("assumptions", "Which of these might be an assumption or an interpretation?",
        scenario.assumptions, "checkbox", state.assumptions,
        "Nobody can know for certain what another person intended or felt. Selecting an item here means it is a possibility, not a fact.");
    }
    if (s === 3) {
      return choiceGroup("response", "Choose one possible response to explore. None is the single right answer.",
        scenario.responses, "radio", state.response, "Each option is reasonable. You can change your choice at any time.");
    }
    return choiceGroup("next", "Choose a safe next step to explore. You can always pause.",
      (window.CALIBRA_NEXT_STEPS || []).map(function (n) { return { id: n.id, text: n.title, note: n.explain }; }),
      "radio", state.next, "Context and safety matter. No option is guaranteed to solve the situation.");
  }

  function readCurrentSelection() {
    var s = state.step;
    if (s === 1 || s === 2) {
      var key = s === 1 ? "facts" : "assumptions";
      var boxes = root.querySelectorAll('input[name="' + key + '"]');
      state[key] = {};
      boxes.forEach(function (b) { if (b.checked) state[key][b.value] = true; });
    } else if (s === 3) {
      var r = root.querySelector('input[name="response"]:checked');
      state.response = r ? r.value : null;
    } else {
      var n = root.querySelector('input[name="next"]:checked');
      state.next = n ? n.value : null;
    }
  }

  function render(focusHeading) {
    var heading = stepNames[state.step - 1];
    var last = state.step === 4;
    var html = '<p class="muted">Scenario: <strong>' + scenario.title + '</strong></p>' +
      progressHTML() +
      '<h2 id="step-heading" tabindex="-1">Step ' + state.step + ": " + heading + "</h2>" +
      '<form id="reflect-form" novalidate>' + stepBody() +
      '<div class="btn-row">' +
      '<button class="btn btn-secondary" type="button" id="btn-back"' + (state.step === 1 ? " disabled" : "") + ">Back</button>" +
      '<button class="btn btn-primary" type="submit">' + (last ? "Finish and explore next steps" : "Continue") + "</button>" +
      '<span class="spacer"></span>' +
      '<button class="btn btn-ghost" type="button" id="btn-skip">Skip this step</button>' +
      '<button class="exit-btn" type="button" data-exit="true">Exit</button>' +
      "</div></form>" +
      '<p class="muted" style="margin-top:1.25rem;font-size:.92rem">Your answers are kept only while this page is open. They are not saved or sent anywhere. Reloading or leaving will clear them.</p>';
    root.innerHTML = html;
    bind();
    if (focusHeading) document.getElementById("step-heading").focus();
    CalibraUI.announce("Step " + state.step + " of 4: " + heading);
    // Keep the URL in step with the page so the view can be shared as a link.
    history.replaceState(null, "", CalibraUI.link("reflect.html", { scenario: scenario.id, step: state.step }));
    progressReady = true;
  }

  function bind() {
    var form = document.getElementById("reflect-form");
    var back = document.getElementById("btn-back");
    var skip = document.getElementById("btn-skip");
    document.querySelectorAll("[data-exit]").forEach(function (b) { b.addEventListener("click", function () { window.location.href = (window.CALIBRA_CONFIG || {}).exitUrl || "index.html"; }); });

    back.addEventListener("click", function () {
      readCurrentSelection();
      if (state.step > 1) { state.step--; render(true); }
    });

    skip.addEventListener("click", function () {
      // Skipping a step clears that step's answer; the user can still move on.
      clearStep();
      advance();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      readCurrentSelection();
      if (state.step === 3 && !state.response) return showInlineError("Please choose one response, or use Skip this step.");
      if (state.step === 4 && !state.next) return showInlineError("Please choose one next step, or use Skip this step.");
      advance();
    });
  }

  function showInlineError(message) {
    var existing = document.getElementById("step-error");
    if (existing) existing.remove();
    var p = document.createElement("p");
    p.id = "step-error";
    p.className = "error-msg";
    p.setAttribute("role", "alert");
    p.textContent = message;
    document.getElementById("reflect-form").prepend(p);
    CalibraUI.announce(message);
  }

  function clearStep() {
    if (state.step === 1) state.facts = {};
    if (state.step === 2) state.assumptions = {};
    if (state.step === 3) state.response = null;
    if (state.step === 4) state.next = null;
  }

  function advance() {
    if (state.step < 4) {
      state.step++;
      render(true);
    } else {
      // Only predefined IDs are passed on. No free text, no personal details.
      window.location.href = CalibraUI.link("next-steps.html", {
        scenario: scenario.id,
        response: state.response || "",
        next: state.next || ""
      });
    }
  }

  var initialStep = parseInt(CalibraUI.getParam("step"), 10);
  if (initialStep >= 1 && initialStep <= 4) state.step = initialStep;
  render(false);
})();
