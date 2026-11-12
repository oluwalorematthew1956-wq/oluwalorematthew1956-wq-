// COS 106 - Term Project - script.js

document.addEventListener("DOMContentLoaded", () => {
  // ===== ACADEMIC PLANNER - Arrays and Functions =====
  // Array to store tasks
  let tasks = [];

  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");

  // Function to show tasks on the page - DOM Manipulation + Dynamic Content
  function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
      }

      // Complete Button - Event Handling
      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Done";
      completeBtn.type = "button";
      completeBtn.style.marginLeft = "1rem";
      completeBtn.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
      });

      // Delete Button - Event Handling
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.type = "button";
      deleteBtn.style.marginLeft = "0.5rem";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
      });

      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

    if (taskCount) {
      taskCount.textContent = "Total tasks: " + tasks.length;
    }
  }

  // Add Task - Event Handling
  if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text === "") {
        alert("Please type a task before you add.");
        return;
      }
      tasks.push({ text: text, completed: false });
      taskInput.value = "";
      renderTasks();
    });

    // Also add when you press Enter
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTaskBtn.click();
      }
    });
  }

  renderTasks();

  // ===== CONTACT PAGE - Form Validation =====
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const message = document.getElementById("message");

      // 1. No field is empty
      if (firstName && firstName.value.trim() === "") {
        e.preventDefault();
        alert("Please enter your First Name.");
        firstName.focus();
        return;
      }
      if (lastName && lastName.value.trim() === "") {
        e.preventDefault();
        alert("Please enter your Last Name.");
        lastName.focus();
        return;
      }
      if (email && email.value.trim() === "") {
        e.preventDefault();
        alert("Please enter your Email Address.");
        email.focus();
        return;
      }
      if (phone && phone.value.trim() === "") {
        e.preventDefault();
        alert("Please enter your Phone Number.");
        phone.focus();
        return;
      }
      if (message && message.value.trim() === "") {
        e.preventDefault();
        alert("Please type your Message.");
        message.focus();
        return;
      }

      // 2. Email format is valid - must have @ and .
      if (
        (email && !email.value.includes("@")) ||
        (email && !email.value.includes("."))
      ) {
        e.preventDefault();
        alert("Please enter a valid Email Address, e.g. matthew@gmail.com");
        email.focus();
        return;
      }

      // 3. Phone number contains only digits
      if (phone && !/^[0-9]+$/.test(phone.value.trim())) {
        e.preventDefault();
        alert(
          "Phone Number must contain only digits (0-9), no letters or + - space.",
        );
        phone.focus();
        return;
      }

      alert(
        "Thank you " + firstName.value + "! Your message has been received.",
      );
    });
  }

  // ===== ABOUT PAGE - Video Play/Pause =====
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("click", () => {
      if (video.paused) video.play();
      else video.pause();
    });
  }
});
