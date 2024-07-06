const questions = [
    {
        question: "What is the primary focus of your research?",
        options: ["Drug screening", "Disease modeling", "Toxicity testing", "Personalized medicine"]
    },
    {
        question: "What level of complexity do you need in your model?",
        options: ["Simple (2D cell culture)", "Moderate (3D culture)", "High (multi-cell type interactions)", "Very high (organ-level interactions)"]
    },
    {
        question: "How important is high-throughput capability for your research?",
        options: ["Not important", "Somewhat important", "Very important", "Critical"]
    },
    {
        question: "Do you need to model specific mechanical forces or fluid dynamics?",
        options: ["No", "Maybe", "Yes", "Absolutely critical"]
    },
    {
        question: "How important is it to have a humanized system for your research?",
        options: ["Not important", "Somewhat important", "Very important", "Critical"]
    }
];

function createQuestionnaire() {
    const questionnaireDiv = document.getElementById('questionnaire');
    questions.forEach((q, index) => {
        const selectElement = document.createElement('select');
        selectElement.id = `q${index}`;
        selectElement.innerHTML = `
            <option value="">Select an option</option>
            ${q.options.map((option, i) => `<option value="${i}">${option}</option>`).join('')}
        `;
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${q.question}</p>`;
        questionElement.appendChild(selectElement);
        questionnaireDiv.appendChild(questionElement);
    });
}

function getRecommendation() {
    const answers = questions.map((_, index) => 
        document.getElementById(`q${index}`).value
    );
    
    let recommendation = "";
    let listItems = [];
    
    if (answers[1] <= 1 && answers[2] >= 2) {
        recommendation = "2D cell culture systems might be most suitable for your high-throughput needs. Advantages include:";
        listItems = [
            "Simplicity and reproducibility",
            "Cost-effectiveness",
            "Easy to scale for high-throughput screening",
            "Well-established protocols and extensive literature",
            "Suitable for initial drug screening and toxicity testing"
        ];
    } else if (answers[1] == 2 && answers[4] >= 2) {
        recommendation = "3D organoid cultures could provide the complexity and human relevance you need. Advantages include:";
        listItems = [
            "Better representation of in vivo cellular organization",
            "Improved cell-cell and cell-matrix interactions",
            "More physiologically relevant drug responses",
            "Potential for long-term culture and disease modeling",
            "Compatibility with patient-derived cells for personalized medicine"
        ];
    } else if (answers[3] >= 2 && answers[1] >= 2) {
        recommendation = "Organ-on-chip systems would be ideal to model mechanical forces and complex interactions. Advantages include:";
        listItems = [
            "Ability to mimic tissue-specific microenvironments",
            "Integration of fluid flow and mechanical stresses",
            "Potential for multi-organ interactions",
            "Real-time monitoring of cellular responses",
            "Reduced animal testing and improved predictivity of human responses"
        ];
    } else if (answers[4] == 3 && answers[0] == 3) {
        recommendation = "Patient-derived organoids might be perfect for your personalized medicine approach. Advantages include:";
        listItems = [
            "Direct use of patient-specific cells",
            "Preservation of genetic and epigenetic features",
            "Potential for drug screening and efficacy prediction",
            "Modeling of rare diseases and cancer",
            "Long-term expansion and biobanking possibilities"
        ];
    } else if (answers[1] == 3 && answers[2] <= 1) {
        recommendation = "Multi-organ-chip systems could provide the high complexity you need for your research. Advantages include:";
        listItems = [
            "Simulation of organ-organ interactions",
            "Assessment of systemic drug effects and toxicity",
            "Integration of multiple tissue types",
            "Potential for long-term studies",
            "Reduced need for animal testing in complex physiological studies"
        ];
    } else {
        recommendation = "Based on your answers, a combination of methods might be best. Consider consulting with a bioengineering specialist to design a custom in vitro system for your specific needs. Potential advantages of a custom approach include:";
        listItems = [
            "Tailored complexity to match your research questions",
            "Integration of multiple technologies for comprehensive analysis",
            "Optimized balance between throughput and physiological relevance",
            "Flexibility to adapt the system as your research evolves",
            "Potential for developing novel, cutting-edge methodologies"
        ];
    }

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<p>${recommendation}</p><ul>` + 
        listItems.map(item => `<li>${item}</li>`).join('') + 
        '</ul>';
}

document.addEventListener('DOMContentLoaded', () => {
    createQuestionnaire();
    document.getElementById('getRecommendation').addEventListener('click', getRecommendation);
});
