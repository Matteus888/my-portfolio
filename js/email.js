import { showToast } from "./toast.js";

emailjs.init("EBwxHPfiRA47rM116");

// Fonction pour envoyer un email à partir du formulaire de contact
export function setupEmailForm() {
  const form = document.querySelector(".form-card");

  if (!form) return;

  const submitBtn = form.querySelector(".submitBtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    submitBtn.disabled = true;

    const formData = {
      lastname: form.querySelector('input[name="lastname"]').value.trim(),
      firstname: form.querySelector('input[name="firstname"]').value.trim(),
      email: form.querySelector('input[name="email"]').value.trim(),
      phone: form.querySelector('input[name="phone"]').value.trim(),
      object: form.querySelector('input[name="subject"]').value.trim(),
      message: form.querySelector("textarea").value.trim(),
    };

    if (!formData.lastname || !formData.firstname || !formData.email || !formData.object || !formData.message) {
      showToast("emptyFields", "error");
      submitBtn.disabled = false;
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(formData.email)) {
      showToast("invalidEmail", "error");
      submitBtn.disabled = false;
      return;
    }

    if (formData.message.length < 10) {
      showToast("shortMessage", "error");
      submitBtn.disabled = false;
      return;
    }

    emailjs
      .send("service_5a5fcun", "template_bm29pz2", formData)
      .then(() => {
        showToast("successMessage", "success");
        form.reset();
        submitBtn.disabled = false;
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi : ", error);
        showToast("errorMessage", "error");
        submitBtn.disabled = false;
      });
  });
}
