
interface Student {
    id: number;
    name: string;
    marks: number;
    grade: string;
}

let students: Student[] = [];

const nameInput =
    document.getElementById("studentName") as HTMLInputElement;

const marksInput =
    document.getElementById("studentMarks") as HTMLInputElement;

const addBtn =
    document.getElementById("addBtn") as HTMLButtonElement;

const studentTable =
    document.getElementById("studentTable") as HTMLTableSectionElement;

const message =
    document.getElementById("message") as HTMLParagraphElement;


// Calculate grade
function calculateGrade(marks: number): string {
    if (marks >= 90) return "A";
    else if (marks >= 75) return "B";
    else if (marks >= 60) return "C";
    else if (marks >= 40) return "D";
    else return "Fail";
}


// Add student
function addStudent(): void {
    const name: string = nameInput.value.trim();
    const marks: number = Number(marksInput.value);

    if (name === "" || marksInput.value === "") {
        message.textContent = "Please enter all details.";
        return;
    }

    if (marks < 0 || marks > 100 || !Number.isFinite(marks)) {
        message.textContent = "Marks must be between 0 and 100.";
        return;
    }

    const student: Student = {
        id: Date.now(),
        name: name,
        marks: marks,
        grade: calculateGrade(marks)
    };

    students.push(student);

    nameInput.value = "";
    marksInput.value = "";
    message.textContent = "";

    displayStudents();
}


// Display student records
function displayStudents(): void {
    studentTable.innerHTML = "";

    students.forEach((student: Student) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>
            <td>
                <button class="delete-btn" data-id="${student.id}">
                    Delete
                </button>
            </td>
        `;

        studentTable.appendChild(row);
    });
}


// Delete student
studentTable.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "BUTTON") {
        const id = Number(target.dataset.id);

        students = students.filter(student => student.id !== id);

        displayStudents();
    }
});


// Button event
addBtn.addEventListener("click", addStudent);
