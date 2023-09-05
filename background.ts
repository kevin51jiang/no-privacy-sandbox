const settingsToDisable = [
  "adMeasurementEnabled",
  "fledgeEnabled",
  "topicsEnabled",
  "privacySandboxEnabled"
]

for (const setting of settingsToDisable) {
  if (chrome.privacy.websites?.[setting]) {
    chrome.privacy.websites?.[setting].get({}, function (details) {
      if (details.levelOfControl === "controllable_by_this_extension") {
        chrome.privacy.websites[setting].set({ value: false }, function () {
          if (chrome.runtime.lastError === undefined) {
            console.log(`Successfully disabled ${setting}`)
          } else {
            console.log("Sadness!", chrome.runtime.lastError)
          }
        })
      }
    })
  } else {
    console.log(`Setting "${setting}" not found`)
  }
}
