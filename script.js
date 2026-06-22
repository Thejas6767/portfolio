document.addEventListener("DOMContentLoaded", function () {

    /* Skill section animation */
    const skills = document.querySelectorAll(".skill-category");

    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("pop-in");
            }
        });
    }, { threshold: 0.3 });

    skills.forEach(skill => {
        skillObserver.observe(skill);
    });


    /* Divider grow animation */
    const divider = document.querySelector("#grow-divider");

    const dividerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.5 });

    if (divider) {
        dividerObserver.observe(divider);
    }


    /* Contact form submit */
    const form = document.getElementById("my-form");
    const status = document.getElementById("status");

    if (form) {
        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            const data = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {

                if (response.ok) {
                    status.innerHTML = "✓ Message sent successfully!";
                    status.style.color = "#c5a059";
                    form.reset();
                }

                else {
                    status.innerHTML = "Oops! Something went wrong.";
                    status.style.color = "red";
                }

            }).catch(() => {

                status.innerHTML = "Network Error!";
                status.style.color = "red";

            });

        });
    }

});
/* typing animation */

const text = "Full Stack Java Developer";
let index = 0;

function typingEffect(){

if(index < text.length){

document.getElementById("typing").innerHTML += text.charAt(index);

index++;

setTimeout(typingEffect,80);

}

}

typingEffect();
/* smooth scroll navigation */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior:"smooth"
});

});

});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("my-form");
    const status = document.getElementById("status");
    const submitBtn = document.getElementById("submit-btn");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop page from refreshing
            
            // Show loading animation on the button
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            status.innerHTML = "Please wait...";
            status.className = "status-box";
            status.style.display = "block";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                if (response.status == 200) {
                    // Success!
                    status.innerHTML = "Success! Your message has been sent. ➤";
                    status.className = "status-box success";
                    form.reset(); // Reset form fields
                } else {
                    // Error response from server
                    status.innerHTML = jsonRes.message || "Oops! Something went wrong.";
                    status.className = "status-box error";
                }
            })
            .catch(error => {
                // Network error
                status.innerHTML = "Something went wrong with the network. Please try again.";
                status.className = "status-box error";
            })
            .then(() => {
                // Reset button text
                submitBtn.innerHTML = 'Send Message <span>➤</span>';
                submitBtn.disabled = false;
                // Automatically hide the status message after 5 seconds
                setTimeout(() => {
                    status.style.display = "none";
                }, 5000);
            });
        });
    }
});