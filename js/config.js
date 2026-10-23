/* Calibra configuration.
   Review these values before any deployment. */
window.CALIBRA_CONFIG = {
  // Where the "Exit" button sends the user. Before launch, the project team should
  // choose a neutral destination (for example, a school-approved page). "index.html" is a placeholder.
  exitUrl: "index.html",

  // Research features are OFF. Recruitment, surveys, participant testing and data
  // collection must stay disabled until school, supervisor and ethics approvals exist.
  researchParticipantMode: false,

  // The chatbot is a scripted demo. Set to true only after a secure, server-side
  // AI endpoint has been built, reviewed and configured. No API key belongs in this file.
  liveAiConnected: false,

  // Support resources: no verified contacts have been supplied yet.
  // Entries in support.html remain placeholders until the project team verifies them.
  verifiedResourcesSupplied: false
};
