document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
      registerForm.addEventListener("submit", async function (event) {
          event.preventDefault();
          const email = document.getElementById("regEmail").value;
          const password = document.getElementById("regPassword").value;

          if (password.length < 6) {
              document.getElementById("responseMessage").innerText = "Password must be at least 6 characters long.";
              return;
          }

          const response = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          document.getElementById("responseMessage").innerText = data.message;
      });
  }

  if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
          event.preventDefault();
          const email = document.getElementById("loginEmail").value;
          const password = document.getElementById("loginPassword").value;

          const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          document.getElementById("responseMessage").innerText = data.message;
      });
  }
});
