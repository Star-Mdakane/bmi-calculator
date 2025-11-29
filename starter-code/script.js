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
const metricForm = document.querySelector(".inputs-metric");
const imperialForm = document.querySelector(".inputs-imperial");
const bmiValue = document.querySelector("#bmi");
const bmiText = document.querySelector(".score-message");
const scoreMessage = document.querySelector(".bmi-output");

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


const getIdealWeight = (bmi, idealWeightFormula, unitSystem, height) => {
    const weight = idealWeightFormula(bmi, height);

    return convertWeight(weight, unitSystem);
}

const convertWeight = (weight, unitSystem) => {
    if (unitSystem === 'metric') {

        return `${weight.toFixed(2)} kg`;
    } else if (unitSystem === 'imperial') {

        const stone = Math.floor(weight / 14);
        const pounds = Math.round(weight % 14);
        return `${stone} stone ${pounds} pounds`;
    }
}

const updateBmiClassifications = (range, height, unitSystem, heightUnit) => {

    let classificationText = '';
    let idealWeight;
    let heightInMeters;
    let heightInInches;

    if (unitSystem === "metric") {
        if (heightUnit === 'cm') {
            heightInMeters = height / 100;
        } else if (heightUnit === 'm') {
            heightInMeters = height;
        }
        idealWeight = (bmi) => bmi * (heightInMeters * heightInMeters);
    } else if (unitSystem === "imperial") {
        if (heightUnit === 'ft') {
            heightInInches = height * 12;
        } else if (heightUnit === 'in') {
            heightInInches = height;
        }
        idealWeight = (bmi) => (bmi * (heightInInches * heightInInches)) / 703;
    }

    if (range < 18.5) { classificationText = `<p class="text">Your BMI suggests you're underweight. Your ideal weight is above <span class="text-b">${getIdealWeight(18.5, idealWeight, unitSystem, height)}</span>.</p>` }
    else if (range >= 18.5 && range < 24.5) { classificationText = `<p class="text">Your BMI suggests you're a healthy weight. Your ideal weight is between <span class="text-b">${getIdealWeight(18.5, idealWeight, unitSystem, height)} - ${getIdealWeight(24.5, idealWeight, unitSystem, height)}</span>.</p>` }
    else if (range >= 25 && range < 29.5) { classificationText = `<p class="text">Your BMI suggests you're overweight. Your ideal weight is between <span class="text-b">${getIdealWeight(25, idealWeight, unitSystem, height)} - ${getIdealWeight(29.5, idealWeight, unitSystem, height)}</span>.</p>` }
    else { classificationText = `<p class="text">Your BMI suggests you're obese. Your ideal weight is below <span class="text-b">${getIdealWeight(30, idealWeight, unitSystem, height)}</span>.</p>` }

    return classificationText;
}





metricForm.addEventListener("input", (e) => {

    let isValid = true;

    metricForm.querySelectorAll("input").forEach(input => {
        if (input.value.trim() === "" || input.value == 0) {
            isValid = false;
        } else if (isNaN(input.value)) {
            isValid = false;
        }
    })

    if (isValid) {
        if (isMetric) {
            empty.style.display = 'none';
            scoreMessage.style.display = 'flex';
        }
        const height = Number(metricForm.querySelector("#heightCm").value);
        const weight = Number(metricForm.querySelector("#weightKg").value);
        const bmi = metricBmi(weight, height);
        console.log(height)
        console.log(weight)
        console.log(bmi)
        bmiValue.textContent = bmi.toFixed(2);
        bmiText.innerHTML = updateBmiClassifications(bmi, height, "metric", 'cm')

        console.log(updateBmiClassifications(bmi, height, "metric", 'cm'))
    } else {
        if (isMetric) {
            scoreMessage.style.display = 'none';
            empty.style.display = 'flex';
        }
    }
})

imperialForm.addEventListener("input", (e) => {

    let isValid = true;

    imperialForm.querySelectorAll("input").forEach(input => {
        if (input.value.trim() === "" || input.value == 0) {
            isValid = false;
        } else if (isNaN(input.value)) {
            isValid = false;
        }
    })

    if (isValid) {
        if (!isMetric) {
            empty.style.display = 'none';
            scoreMessage.style.display = 'flex';
        }

        const heightF = Number(imperialForm.querySelector("#heightFt").value);
        const heightI = Number(imperialForm.querySelector("#heightIn").value);
        const weightS = Number(imperialForm.querySelector("#weightSt").value);
        const weightP = Number(imperialForm.querySelector("#weightLbs").value);
        const bmi = imperialBmi(weightS, weightP, heightF, heightI);
        const totalHeightInInches = (heightF * 12) + heightI;
        console.log(bmi)
        bmiValue.textContent = bmi.toFixed(2);
        bmiText.innerHTML = updateBmiClassifications(bmi, totalHeightInInches, "imperial", 'in')
        console.log(updateBmiClassifications(bmi, totalHeightInInches, "imperial", 'in'))
    } else {
        if (!isMetric) {
            scoreMessage.style.display = 'none';
            empty.style.display = 'flex';
        }
    }
})

let isMetric = true;

system.forEach(button => {
    button.addEventListener("change", () => {
        if (button.checked) {
            if (button.value === "metric") {
                metric.style.display = "grid";
                imperial.style.display = "none";
                isMetric = true;
            } else if (button.value === "imperial") {
                imperial.style.display = "grid";
                metric.style.display = "none";
                isMetric = false;
            }
        }
    })
})
