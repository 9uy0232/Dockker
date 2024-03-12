const validateData = (userData) => {
    let errors = [];
    if (!userData.firstname) {
        errors.push("กรุณากรอกชื่อ");
    }

    if (!userData.lastname) {
        errors.push("กรุณากรอกนามสกุล");
    }

    if (!userData.age) {
        errors.push("กรุณากรอกอายุ");
    }

    if (!userData.gender) {
        errors.push("กรุณาเพิ่มเพศ");
    }

    if (!userData.interests) {
        errors.push("กรุณาเลือกความสนใจ");
    }

    if(!userData.description) {
        errors.push("กรุณากรอกคำอธิบาย");
    }
    return errors;
}

const submitData = async () => {

    let firstnameDOM = document.querySelector("input[name=firstname]");
    let lastnameDOM = document.querySelector("input[name=lastname]");
    let ageDOM = document.querySelector("input[name=age]") || {};
    let genderDOM = document.querySelector("input[name=gender]:checked") || {};
    let interestDOM = document.querySelectorAll("input[name=interest]:checked");
    let descriptionDOM = document.querySelector("textarea[name=description]");
    let messageDOM = document.querySelector("#message");

    try {
        let interest = "";

        for (let i = 0; i < interestDOM.length; i++) {
            interest += interestDOM[i].value;
            if (i != interestDOM.length - 1) {
                interest += ",";
            }
        }
        console.log("Test");
        let userData = {
            firstname: firstnameDOM.value,
            lastname: lastnameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }

        console.log("Submit Data", userData);

        const errors = validateData(userData);

        if (errors.length > 0) {
            // มี Error เกิดขึ้น
            throw {
                message: "กรอกข้อมูลไม่ครบถ้วน",
                errors: errors,
            }
        }

        const respone = await axios.post("http://localhost:3000/users", userData);
        console.log("Respone", respone.data);
        messageDOM.innerText = "บันทึกข้อมูลสำเร็จ";
        messageDOM.classList.add("success");

    } catch (error) {
        console.log("Error message", error.message);
        console.log("Error", error.errors);
        /*
        if (error.respone) {
            console.log(error.respone.data.message);
        }
        */

        let htmlData = "<div>";
        htmlData += `<div>${error.message}</div>`;
        htmlData += "<ul>";
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }

        htmlData += "</ul>";
        htmlData += "</div>";

        messageDOM.innerHTML = htmlData;
        messageDOM.classList.add("danger");
    }

}