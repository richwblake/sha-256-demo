const originalInput = document.getElementById("original-m-form-input");
const changedInput = document.getElementById("hashed-m-form-input");
const originalMessageHash = document.getElementById("original-msg-hash");
const changedMessageHash = document.getElementById("changed-msg-hash");
const matchNotif = document.getElementById("match-notif");

const genChecksumForInput = async (msg) => {
  if (msg.length === 0) {
    return "";
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(msg);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return hashToString(hash);
};

const hashToString = async (hash) => {
  const hashArr = Array.from(new Uint8Array(hash));
  return hashArr.join("");
};

const listenForOriginalChange = () => {
  originalInput.addEventListener("input", async (e) => {
    const hashedMsg = await genChecksumForInput(e.target.value);
    originalMessageHash.textContent = hashedMsg;
    checkForMatch();
  });
};

const listenForChangeMessage = () => {
  changedInput.addEventListener("input", async (e) => {
    const hashedMsg = await genChecksumForInput(e.target.value);
    changedMessageHash.textContent = hashedMsg;
    checkForMatch();
  });
};

const checkForMatch = () => {
  if (
    originalMessageHash.textContent === changedMessageHash.textContent &&
    (originalMessageHash.textContent !== "" ||
      changedMessageHash.textContent !== "")
  ) {
    matchNotif.classList.remove("hidden");
    matchNotif.classList.add("show");
  } else {
    matchNotif.classList.add("hidden");
    matchNotif.classList.remove("show");
  }
};

listenForOriginalChange();
listenForChangeMessage();
