const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question");
const img_url = document.getElementById("url");
const answer = document.getElementById("answer");
const modal = document.getElementsByClassName("modal")[0];

const modalC = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");
const btnC = document.getElementById("contact");
const resetForm = document.getElementById("resetButton");
const submitForm = document.getElementById("submitButton");
const nameForm = document.getElementById("nameForm");
const emailForm = document.getElementById("emailForm");
const feedbackForm = document.getElementById("feedback");

let contentArray = localStorage.getItem("itemsM")
  ? JSON.parse(localStorage.getItem("itemsM"))
  : [];
// Escutadores nos botões
document.getElementById("newCard").addEventListener("click", toggleCreateBox);
document.getElementById("delCards").addEventListener("click", delFlashcards);
document.getElementById("save").addEventListener("click", addFlashcard);
document.getElementById("close").addEventListener("click", toggleCreateBox);
btnC.addEventListener("click", toggleCreateFeedback);

contentArray.forEach(divMaker);

function divMaker(text) {
  let div = document.createElement("div");
  let h2_question = document.createElement("h2");
  let h2_answer = document.createElement("p");
  let img = document.createElement("img");
  let img_div = document.createElement("div");
  let btn = document.createElement("button");

  btn.innerText = "×";
  div.className = "flashcard";
  div.id = text.id;
  img_div.className = "img_div";

  h2_question.setAttribute(
    "style",
    "border-bottom:1px solid var(--roxo); font-size: 2.5rem;padding: 1.5rem; margin-bottom:1.5rem;text-align: center"
  );

  div.setAttribute("style", "position:relative");

  h2_question.innerHTML = text.my_question;
  let valor = text.my_url;
  img.setAttribute("style", "display:none");
  img.setAttribute("src", valor);

  h2_answer.setAttribute(
    "style",
    "text-align: left; display:none; padding: 0 3rem; font-weight: 400"
  );
  h2_answer.innerHTML = text.my_answer;

  btn.setAttribute(
    "style",
    "position: absolute; top: 0; right: 0; font-size: 2rem; background: transparent; padding: 1rem 2rem"
  );

  img_div.appendChild(img);

  div.appendChild(h2_question);
  div.appendChild(img_div);
  div.appendChild(h2_answer);
  div.appendChild(btn);

  div.addEventListener("click", function () {
    if (h2_answer.style.display == "none" && img.style.display == "none") {
      h2_answer.style.display = "block";
      img.style.display = "block";
    } else {
      h2_answer.style.display = "none";
      img.style.display = "none";
    }
  });
  btn.addEventListener("click", () => {
    delFlashcard(text.id);
  });
  flashcards.appendChild(div);
}
function addFlashcard() {
  question.setAttribute("data-invalid", "false");
  answer.setAttribute("data-invalid", "false");
  document.getElementById("question-error").innerText = "";
  document.getElementById("answer-error").innerText = "";
  document.getElementById("url-error").innerText = "";
  let valor = img_url.value;
  const errors = {
    my_question: "",
    my_answer: "",
    my_url: "",
  };
  const flashcard_info = {
    id: `card_${Math.ceil(Math.random() * 100000000)}`,
    my_question: question.value,
    my_answer: answer.value,
    my_url: valor,
  };
  if (!flashcard_info.my_question.trim()) {
    errors.my_question = "The question field can't be empty";
    question.setAttribute("data-invalid", "true");
    document.getElementById("question-error").innerText = errors.my_question;
  }
  if (!flashcard_info.my_answer.trim()) {
    errors.my_answer = "The answer field can't be empty";
    answer.setAttribute("data-invalid", "true");
    document.getElementById("answer-error").innerText = errors.my_answer;
  }
  if (!flashcard_info.my_url.trim()) {
    errors.my_url = "The URL field can't be empty";
    img_url.setAttribute("data-invalid", "true");
    document.getElementById("url-error").innerText = errors.my_url;
  }
  console.log(errors);
  if (errors.my_question || errors.my_answer || errors.my_url) {
    return;
  }
  contentArray.push(flashcard_info);
  localStorage.setItem("itemsM", JSON.stringify(contentArray));
  divMaker(contentArray[contentArray.length - 1]);
  question.value = "";
  answer.value = "";
  img_url.value = "";
  toggleCreateBox();
}

function toggleCreateBox() {
  let newExpanded =
  modal.getAttribute("aria-expanded") === "false" ? "true" : "false";
  modal.setAttribute("aria-expanded", newExpanded);
  question.focus()

  setTimeout(() => {
    let newTransition =
      modal.getAttribute("data-transition") === "false" ? "true" : "false";
    modal.setAttribute("data-transition", newTransition);
    resetError();
  }, 300);
}
modal.addEventListener("click", toggleCreateBox);
createBox.addEventListener("click", (event) => {
  event.stopPropagation();
});

function toggleCreateFeedback() {
  let newExpanded =
  modalC.getAttribute("aria-expanded") === "false" ? "true" : "false";
  modalC.setAttribute("aria-expanded", newExpanded);
  nameForm.focus()

  setTimeout(() => {
    let newTransition =
      modalC.getAttribute("data-transition") === "false" ? "true" : "false";
    modalC.setAttribute("data-transition", newTransition);
    resetError();
  }, 300);
}
modalC.addEventListener("click", toggleCreateFeedback);
modalContent.addEventListener("click", (event) => {
  event.stopPropagation();
});

function resetError() {
  question.setAttribute("data-invalid", "false");
  answer.setAttribute("data-invalid", "false");
  document.getElementById("question-error").innerText = "";
  document.getElementById("answer-error").innerText = "";
}

function delFlashcards() {
  let confirmation = confirm(
    "Do you really want to delete all your moviecards?"
  );
  if (!confirmation) {
    return;
  }
  localStorage.removeItem("itemsM");
  flashcards.innerHTML = "";
  contentArray = [];
}
function delFlashcard(id) {
  let confirmation = confirm("Do you really want to delete this moviecard?");
  if (!confirmation) {
    return;
  }
  const filtered = contentArray.filter((card) => card.id != id);
  document.getElementById(id).remove();
  localStorage.setItem("itemsM", JSON.stringify(filtered));
}
resetForm.addEventListener("click", () => {
  nameForm.value = "";
  emailForm.value = "";
  feedbackForm.value = "";
});
submitForm.addEventListener("click", (event) => {
  event.preventDefault();
  alert("Thank you for your feedback");
  toggleCreateFeedback()
});
