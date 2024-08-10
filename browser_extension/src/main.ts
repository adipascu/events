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
    await chrome.debugger.attach(debugTarget, "1.2");

    await chrome.debugger.sendCommand(debugTarget, "Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "a",
      code: "KeyA",
      keyCode: 65,
      windowsVirtualKeyCode: 65,
      isShift: false,
      isControl: false,
      isAlt: false,
      text: "a",
    });

    await chrome.debugger.sendCommand(debugTarget, "Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "a",
      code: "KeyA",
      keyCode: 65,
      windowsVirtualKeyCode: 65,
      isShift: false,
      isControl: false,
      isAlt: false,
      text: "a",
    });

    await chrome.debugger.detach(debugTarget);

    console.log("Typed 'a' into the active element.");
  } catch (error) {
    console.error("Failed to attach debugger or send key event:", error);
  }
});
