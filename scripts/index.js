const form = document.getElementById("registration-form");

const name = document.getElementById("name");
const email = document.getElementById("email");

const topic1 = document.getElementById("topic-1");
const topic2 = document.getElementById("topic-2");
const topic3 = document.getElementById("topic-3");

const listTopic1 = document.getElementById("list-topic-1");
const listTopic2 = document.getElementById("list-topic-2");
const listTopic3 = document.getElementById("list-topic-3");

const summaryName = document.getElementById("summary-name");
const summaryEmail = document.getElementById("summary-email");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const currentPage = document.getElementById("current-page");

const progressIndication = [
  ...document.querySelectorAll(
    ".registration-progress__indication > .registration-progress__indicator",
  ),
];
const forwardButtons = [
  ...document.querySelectorAll(".registration-form__button--submit"),
];

const backButtons = [
  ...document.querySelectorAll(".registration-form__button--back"),
];

forwardButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const activeFieldset = [
      ...form.querySelectorAll("fieldset:not(.not-displayed)"),
    ];
    removeCheckboxMessages();

    const id = activeFieldset[0].id;
    if (id === "step1") {
      if (!form.checkValidity()) {
        setErrorStateStep1(activeFieldset);
        return;
      }
      step1.classList.toggle("not-displayed");
      step2.classList.toggle("not-displayed");
      progressIndication[0].classList.toggle(
        "registration-progress__indicator--active",
      );
      progressIndication[1].classList.toggle(
        "registration-progress__indicator--active",
      );
      progressIndication[0].classList.add(
        "registration-progress__indicator--done",
      );
      summaryName.textContent = name.value;
      summaryEmail.textContent = email.value;
      currentPage.innerText = 2;
    } else if (id === "step2") {
      if (atLeastOneCheckBoxSelected(activeFieldset)) {
        setErrorStateStep2(activeFieldset);
        return;
      }
      step2.classList.toggle("not-displayed");
      step3.classList.toggle("not-displayed");
      progressIndication[1].classList.toggle(
        "registration-progress__indicator--active",
      );
      progressIndication[2].classList.toggle(
        "registration-progress__indicator--active",
      );
      progressIndication[1].classList.add(
        "registration-progress__indicator--done",
      );

      displayTopic(topic1, listTopic1);
      displayTopic(topic2, listTopic2);
      displayTopic(topic3, listTopic3);
      currentPage.innerText = 3;
    } else if (id === "step3") {
      progressIndication[2].classList.toggle(
        "registration-progress__indicator--active",
      );
      progressIndication[2].classList.add(
        "registration-progress__indicator--done",
      );
      [...step3.getElementsByTagName("button")].forEach(
        (b) => (b.disabled = true),
      );
      alert("✅ Success");
    }
  }),
);

backButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const id = document.querySelector("fieldset:not(.not-displayed)").id;
    if (id === "step2") {
      step1.classList.toggle("not-displayed");
      step2.classList.toggle("not-displayed");
      progressIndication[0].classList.toggle(
        "registration-progress__indicator--active",
      );
      progressIndication[1].classList.toggle(
        "registration-progress__indicator--active",
      );
      removeCheckboxMessages();
      currentPage.innerText = 1;
    } else if (id === "step3") {
      step2.classList.toggle("not-displayed");
      step3.classList.toggle("not-displayed");
      progressIndication[1].classList.toggle(
        "registration-progress__indicator--active",
      );
      progressIndication[2].classList.toggle(
        "registration-progress__indicator--active",
      );
      currentPage.innerText = 2;
    }
  }),
);

function setErrorStateStep1(activeFieldset) {
  activeFieldset
    .flatMap((e) => [...e.querySelectorAll("input")])
    .forEach((e) => e.classList.add("registration-form__field--show-invalid"));

  progressIndication[0].classList.remove(
    "registration-progress__indicator--done",
  );
}

function setErrorStateStep2(activeFieldset) {
  [...activeFieldset[0].querySelectorAll("input[type=checkbox]")]
    .map((e) => {
      e.setCustomValidity("Select at least one topic.");
      return e;
    })
    .forEach((e) => e.classList.add("registration-form__field--show-invalid"));
}

function atLeastOneCheckBoxSelected(activeFieldset) {
  return (
    activeFieldset[0].querySelectorAll("input[type=checkbox]:checked")
      .length === 0
  );
}

function removeCheckboxMessages() {
  [...step2.querySelectorAll("input[type=checkbox]")]
    .map((e) => {
      e.setCustomValidity("");
      return e;
    })
    .forEach((e) =>
      e.classList.remove("registration-form__field--show-invalid"),
    );
}

function displayTopic(topic, listTopic) {
  if (!topic.checked) {
    listTopic.classList.add("not-displayed");
  } else {
    listTopic.classList.remove("not-displayed");
  }
}
