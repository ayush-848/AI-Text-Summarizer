const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const wordCount = document.getElementById("word-count");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const text = e.target.value.trim();
  const wordLength = text.split(/\s+/).filter(Boolean).length;
  wordCount.textContent = `Words: ${wordLength}`;

  if (text.length >= 200 && text.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData() {
  submitButton.classList.add("submit-button--loading");
  submitButton.disabled = true;

  const text_to_summarize = textArea.value;

  fetch('/summarize', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text_to_summarize }),
  })
    .then(response => response.text())
    .then(summary => {
      summarizedTextArea.value = summary;
    })
    .catch(err => {
      summarizedTextArea.value = "Error fetching summary.";
      console.error(err);
    })
    .finally(() => {
      submitButton.classList.remove("submit-button--loading");
      submitButton.disabled = false;
    });
}
