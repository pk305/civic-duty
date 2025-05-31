async function sendEmail() {
  if (!validateForm()) {
    return;
  }

  const button = document.getElementById("send-button");
  const originalText = button.innerHTML;

  button.disabled = true;
  button.innerHTML = '<span class="loading"></span>Sending...';

  try {
    const selectedRecipients = [];
    Object.keys(recipients).forEach((key) => {
      const checkbox = document.getElementById(key);
      if (checkbox.checked) {
        selectedRecipients.push(key);
      }
    });

    const formData = {
      selectedRecipients,
      subject: document.getElementById("subject").value,
      content: document.getElementById("email-content").value,
      senderName: document.getElementById("sender-name").value.trim(),
      senderEmail: document.getElementById("sender-email").value.trim(),
    };

    const response = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      showToast(
        `✅ ${result.message} Thank you for your civic participation!`,
        "success"
      );
      resetForm();
    } else {
      showToast(`❌ ${result.message}`, "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showToast(
      "❌ Network error. Please check your connection and try again.",
      "error"
    );
  } finally {
    button.disabled = false;
    button.innerHTML = originalText;
  }
}
