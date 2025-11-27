const system = document.querySelectorAll("input[type='radio']");
const metric = document.querySelector(".inputs-metric");
const imperial = document.querySelector(".inputs-imperial");
const centi = document.querySelector(".centi");
const kilos = document.querySelector(".kilos");
const inches = document.querySelector(".inches");
const feet = document.querySelector(".feet");
const stones = document.querySelector(".stones");
const pounds = document.querySelector(".pounds");
const metricInputs = document.querySelectorAll(".inputs-metric input");
const imperialInputs = document.querySelectorAll(".inputs-imperial input");
const metricForm = document.querySelectorAll(".inputs-metric");
const imperialForm = document.querySelectorAll(".inputs-imperial");

const metricBmi = (weightK, heightC) => {
    const height = (heightC / 100) ** 2;
    const weight = weightK;

    return weight / height;
}

const imperialBmi = (weightS = 1, weightP, heightF = 1, heightI) => {
    const weight = weightP + (weightS * 14);
    const height = heightI + (heightF * 12);

    return (weight * 703) / (height ** 2);
}


metricForm.forEach(form => {
    form.addEventListener("input", (e) => {
        e.preventDefault();

        let isValid = true;

        form.querySelectorAll("input").forEach(input => {
            if (isNaN(input.value) || input.value === "") {
                isValid = false;
            }
        })

        if (isValid) {
            const height = Number(form.querySelector("#heightCm").value);
            const weight = Number(form.querySelector("#weightKg").value);
            const bmi = metricBmi(weight, height);
            console.log(height)
            console.log(weight)
            console.log(bmi)
        }
    })
})


imperialForm.forEach(form => {
    form.addEventListener("input", (e) => {
        e.preventDefault();

        let isValid = true;

        form.querySelectorAll("input").forEach(input => {
            if (isNaN(input.value || input.value === '')) {
                isValid = false;
            }
        })

        if (isValid) {
            const heightF = Number(form.querySelector("#heightFt").value);
            const heightI = Number(form.querySelector("#heightIn").value);
            const weightS = Number(form.querySelector("#weightSt").value);
            const weightP = Number(form.querySelector("#weightLbs").value);
            const bmi = imperialBmi(weightS, weightP, heightF, heightI);
            console.log(bmi)
        }
    })
})


system.forEach(button => {
    button.addEventListener("change", () => {
        if (button.checked) {
            if (button.value === "metric") {
                metric.style.display = "grid";
                imperial.style.display = "none";
                console.log("metric")

            } else if (button.value === "imperial") {
                imperial.style.display = "grid";
                metric.style.display = "none";
                console.log("imperial")

            }
        }
    })
})
