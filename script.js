(() => {
  const $ = (selector) => document.querySelector(selector);
  const state = { power: true, temperature: 24, mode: "Cool", fan: "High" };
  const modeDetails = {
    Cool: { icon: "❄", description: "Refreshing airflow", verb: "Cooling" },
    Heat: { icon: "♨", description: "Warm, comfortable air", verb: "Heating" },
    Fan: { icon: "✣", description: "Air circulation only", verb: "Circulating air" },
    Dry: { icon: "◌", description: "Reducing room humidity", verb: "Drying" },
    Auto: { icon: "✧", description: "Automatic comfort control", verb: "Auto mode" }
  };
  const fanBars = $("#fanBars");
  const temperatureValue = $("#temperatureValue");
  const tempFill = $(".range-track span");
  const mainControls = $("#mainControls");
  const settingsGrid = $("#settingsGrid");

  function render() {
    const details = modeDetails[state.mode];
    const disabled = !state.power;
    temperatureValue.textContent = state.temperature;
    tempFill.style.width = ((state.temperature - 16) / 14 * 100) + "%";
    $("#modeIcon").textContent = details.icon;
    $("#modeSummary").textContent = state.mode;
    $("#modeDescription").textContent = details.description;
    $("#fanSummary").textContent = state.fan;
    $("#powerLabel").textContent = state.power ? "POWER ON" : "POWER OFF";
    $("#powerButton").classList.toggle("is-off", disabled);
    $("#powerButton").setAttribute("aria-pressed", String(state.power));
    mainControls.classList.toggle("is-disabled", disabled);
    settingsGrid.classList.toggle("is-disabled", disabled);
    $("#statusPulse").style.background = disabled ? "var(--red)" : "var(--green)";
    $("#statusPulse").style.boxShadow = disabled ? "0 0 10px #ff667e" : "0 0 12px #4ce0a1";
    $("#statusText").textContent = disabled ? "AC is switched off" : details.verb + " to " + state.temperature + "°C · Fan " + state.fan;
    document.querySelectorAll("[data-mode]").forEach(button => {
      const active = button.dataset.mode === state.mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-fan]").forEach(button => {
      const active = button.dataset.fan === state.fan;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const levels = { Low: 1, Med: 2, High: 3, Turbo: 4 };
    [...fanBars.children].forEach((bar, index) => {
      bar.style.opacity = index < levels[state.fan] ? "1" : ".18";
    });
    $("#decreaseTemp").disabled = disabled || state.temperature <= 16;
    $("#increaseTemp").disabled = disabled || state.temperature >= 30;
    $("#decreaseTemp").style.opacity = $("#decreaseTemp").disabled ? ".35" : "1";
    $("#increaseTemp").style.opacity = $("#increaseTemp").disabled ? ".35" : "1";
  }

  $("#powerButton").addEventListener("click", () => { state.power = !state.power; render(); });
  $("#decreaseTemp").addEventListener("click", () => { if (state.power) state.temperature = Math.max(16, state.temperature - 1); render(); });
  $("#increaseTemp").addEventListener("click", () => { if (state.power) state.temperature = Math.min(30, state.temperature + 1); render(); });
  document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
    if (!state.power) return;
    state.mode = button.dataset.mode;
    render();
  }));
  document.querySelectorAll("[data-fan]").forEach(button => button.addEventListener("click", () => {
    if (!state.power) return;
    state.fan = button.dataset.fan;
    render();
  }));
  render();
})();