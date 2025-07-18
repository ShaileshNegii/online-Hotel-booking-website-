document.getElementById("booking-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // prevent page reload
  const guestName = document.getElementById("guest-name").value;
  const checkIn = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;
  const guests = document.getElementById("guests").value;

  const statusSection = document.getElementById("booking-status");
  const statusMessage = document.getElementById("status-message");
  const submitBtn = this.querySelector("button[type='submit']");

  // Client-side validation
  if (!checkIn || !checkOut || !guests) {
    statusMessage.textContent = "❗ Please fill in all fields.";
    statusSection.style.display = "block";
    return;
  }

  const bookingData = { guestName,checkIn, checkOut, guests };

  // Disable button to prevent duplicate submissions
  submitBtn.disabled = true;

  try {
    const response = await fetch("http://localhost:5050/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    let result = {};
    try {
      result = await response.json();
    } catch {
      result.message = "Invalid server response.";
    }

    if (response.ok) {
      statusMessage.textContent = "✅ Thank you! Your booking has been received.";
    } else {
      statusMessage.textContent = "❌ Booking failed: " + (result.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error submitting booking:", error);
    statusMessage.textContent = "❌ Booking failed: Server unreachable.";
  }

  statusSection.style.display = "block";
  submitBtn.disabled = false;
  this.reset(); // reset the form fields
});
