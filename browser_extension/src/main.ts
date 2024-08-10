chrome.action.onClicked.addListener(async (tab) => {
  console.log("clicked");
  const id = tab.id;
  if (id === undefined) {
    throw new Error("Missing tab ID");
  }
  const debugTarget = {
    tabId: id,
  };

  try {
    // Attach the debugger to the tab
    await chrome.debugger.attach(debugTarget, "1.2");

    // Simulate pressing the Shift key down
    await chrome.debugger.sendCommand(debugTarget, "Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Shift",
      code: "ShiftLeft",
      keyCode: 16,
      windowsVirtualKeyCode: 16,
      isShift: true,
      isControl: false,
      isAlt: false,
    });

    // Simulate typing the uppercase letter 'R'
    await chrome.debugger.sendCommand(debugTarget, "Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "R",
      code: "KeyR",
      keyCode: 82,
      windowsVirtualKeyCode: 82,
      isShift: true,
      isControl: false,
      isAlt: false,
      text: "R",
    });

    await chrome.debugger.sendCommand(debugTarget, "Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "R",
      code: "KeyR",
      keyCode: 82,
      windowsVirtualKeyCode: 82,
      isShift: true,
      isControl: false,
      isAlt: false,
      text: "R",
    });

    // Simulate releasing the Shift key
    await chrome.debugger.sendCommand(debugTarget, "Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "Shift",
      code: "ShiftLeft",
      keyCode: 16,
      windowsVirtualKeyCode: 16,
      isShift: false,
      isControl: false,
      isAlt: false,
    });
    await chrome.debugger.detach(debugTarget);
    console.log("Typed 'R' into the active element.");
  } catch (error) {
    console.error("Failed to attach debugger or send key event:", error);
  }
});
