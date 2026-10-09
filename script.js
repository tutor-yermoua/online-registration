// ==========================================
// 1. ຕົວແປຄວບຄຸມໜ້າ ແລະ ລະບົບປ່ຽນໜ້າ
// ==========================================
let currentPage = 1;

function showPage(pageNumber) {
    document.getElementById('page-1').style.display = 'none';
    document.getElementById('page-2').style.display = 'none';
    document.getElementById('page-3').style.display = 'none';
    
    const targetPage = document.getElementById('page-' + pageNumber);
    if (targetPage) {
        targetPage.style.display = 'block';
        currentPage = pageNumber;
        window.scrollTo(0, 0);
    }
    
    updateStepIndicator(currentPage);
}

function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function nextPage() {
    if (currentPage < 3) {
        showPage(currentPage + 1);
    }
}

function updateStepIndicator(step) {
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        if ((index + 1) <= step) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const progressLine = document.getElementById('progressLine');
    if (progressLine) {
        if (step === 1) {
            progressLine.style.width = '0%';
        } else if (step === 2) {
            progressLine.style.width = '48%';
        } else if (step === 3) {
            progressLine.style.width = '95%';
        }
    }
}

// ==========================================
// 2. ລະບົບ Dropdown ແຂວງ-ເມືອງ ແລະ ຄອສຮຽນ
// ==========================================
function toggleDropdown(listId) {
    document.querySelectorAll('.dropdown-list').forEach(list => {
        if (list.id !== listId) list.style.display = 'none';
    });
    const list = document.getElementById(listId);
    if (list) {
        list.style.display = (list.style.display === 'none') ? 'block' : 'none';
    }
}

function selectCourseAndPay(courseName, coursePrice) {
    const nameInput = document.getElementById('selectedCourseNameInput');
    const priceInput = document.getElementById('selectedCoursePriceInput');
    
    if (nameInput) nameInput.value = courseName;
    if (priceInput) priceInput.value = coursePrice;

    showPage(3);
}

function copyAccountNumber() {
    const rawAccNo = document.getElementById('accountNumber').innerText;
    const accNo = rawAccNo.replace(/-/g, ''); 
    
    navigator.clipboard.writeText(accNo).then(() => {});
}

function previewImage(event, imgId, containerId, placeholderId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(imgId).src = e.target.result;
            document.getElementById(containerId).style.display = "block";
            document.getElementById(placeholderId).style.display = "none";
        }
        reader.readAsDataURL(file);
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// ==========================================
// 3. DOMContentLoaded & ລະບົບສົ່ງຂໍ້ມູນໄປ Google Apps Script
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof showPage === 'function') showPage(1);

    const laoData = {
        "ນະຄອນຫຼວງວຽງຈັນ": ["ເມືອງຈັນທະບູລີ", "ເມືອງສີໂຄດຕະບອງ",  "ເມືອງສີສັດຕະນາກ","ເມືອງໄຊເສດຖາ", "ເມືອງຫາດຊາຍຟອງ",  "ເມືອງສັງທອງ","ເມືອງນາຊາຍທອງ", "ເມືອງໄຊທານີ", "ເມືອງປາກງື່ມ"],
        "ຜົ້ງສາລີ": ["ເມືອງຜົ້ງສາລີ", "ເມືອງໄໝ່", "ເມືອງຂວາ", "ເມືອງສຳພັນ", "ເມືອງບູນເໜືອ", "ເມືອງຍອດອູ", "ເມືອງບູນໃຕ້"],
        "ຫຼວງນ້ຳທາ": ["ເມືອງນ້ຳທາ", "ເມືອງສິງ", "ເມືອງລອງ", "ເມືອງວຽງພູຄາ", "ເມືອງນາແລ້"],
        "ອຸດົມໄຊ": ["ເມືອງໄຊ","ເມືອງນາໝໍ້", "ເມືອງຫຼາ",  "ເມືອງງາ", "ເມືອງແບງ", "ເມືອງປາກແບ່ງ","ເມືອງຮຸນ"],
        "ບໍ່ແກ້ວ": ["ເມືອງຫວ້ຍຊາຍ", "ເມືອງຕົ້ນເຜິ້ງ", "ເມືອງເມິງ", "ເມືອງຜາອຸດົມ", "ເມືອງປາກທາ"],
        "ຫຼວງພະບາງ": ["ເມືອງຫຼວງພະບາງ", "ເມືອງຊຽງເງິນ", "ເມືອງນານ", "ເມືອງປາກອູ", "ເມືອງນ້ຳບາກ", "ເມືອງງອຍ", "ເມືອງປາກແຊງ", "ເມືອງໂພນໄຊ", "ເມືອງຈອມເພັດ", "ເມືອງວຽງຄຳ", "ເມືອງພູຄູນ", "ເມືອງໂພນທອງ"],
        "ຫົວພັນ": ["ເມືອງຊຳເໜືອ", "ເມືອງຊຽງຄໍ້", "ເມືອງວຽງທອງ", "ເມືອງວຽງໄຊ", "ເມືອງຫົວເມືອງ", "ເມືອງຊຳໃຕ້", "ສົບເບົ້າ", "ແອດ"],
        "ໄຊຍະບູລີ": ["ເມືອງໄຊຍະບູລີ", "ເມືອງຄອບ", "ເມືອງຫົງສາ", "ເມືອງເງິນ", "ເມືອງຊຽງຮ່ອນ", "ເມືອງພຽງ", "ເມືອງປາກລາຍ", "ເມືອງແກ່ນທ້າວ", "ເມືອງບໍ່ແຕນ", "ເມືອງທົ່ງມີໄຊ"],
        "ຊຽງຂວາງ": ["ເມືອງແປກ", "ເມືອງຄຳ", "ເມືອງໜອງແຮດ", "ເມືອງຄູນ", "ເມືອງໝອກ", "ເມືອງພູກູດ", "ເມືອງຜາໄຊ"],
        "ແຂວງວຽງຈັນ": ["ໂພນໂຮງ", "ທຸລະຄົມ", "ແກ້ວອຸດົມ", "ກາສີ", "ວັງວຽງ", "ເຟືອງ", "ຊະນາຄາມ", "ແມດ", "ຫີນເຫີບ", "ວຽງຄຳ", "ລອງຊານ", "ຮົ່ມ", "ໄຊສົມບູນ", "ໜື່ນ"],
        "ບໍລິຄຳໄຊ": ["ເມືອງປາກຊັນ", "ເມືອງທ່າພະບາດ", "ເມືອງປາກກະດິງ", "ເມືອງບໍລິຄັນ", "ເມືອງຄຳເກີດ", "ເມືອງວຽງທອງ", "ເມືອງໄຊຈຳພອນ"],
        "ຄຳມ່ວນ": ["ເມືອງທ່າແຂກ", "ເມືອງມະຫາໄຊ", "ເມືອງໜອງບົກ", "ເມືອງຫີນບູນ", "ເມືອງຍົມມະລາດ", "ເມືອງບົວລະພາ", "ເມືອງນາກາຍ", "ເມືອງເຊບັ້ງໄຟ", "ເມືອງໄຊບົວທອງ", "ເມືອງຄູນຄຳ"],
        "ສະຫວັນນະເຂດ": ["ໄກສອນພົມວິຫານ", "ອຸທຸມພອນ", "ອາດສະພັງທອງ", "ພິນ", "ເຊໂປນ", "ນອງ", "ທ່າປາງທອງ", "ສອງຄອນ", "ຈຳພອນ", "ຊົນບຸລີ", "ໄຊບຸລີ", "ວິລະບູລີ", "ອາດສະພອນ", "ໄຊພູທອງ", "ທ່າພະລານໄຊ"],
        "ສາລະວັນ": ["ສາລະວັນ", "ຕະໂອຍ", "ຕຸ້ມລານ", "ລະຄອນເພັງ", "ວາປີ", "ຄົງເຊໂດນ", "ເລົ່າງາມ", "ສະມ່ວຍ"],
        "ເຊກອງ": ["ລະມາມ", "ກະລຶມ", "ດາກຈຶງ", "ທ່າແຕງ"],
        "ຈຳປາສັກ": ["ປາກເຊ", "ຊະນະສົມບູນ", "ບາຈຽງຈະເລີນສຸກ", "ປາກຊ່ອງ", "ປະທຸມພອນ", "ໂພນທອງ", "ຈຳປາສັກ", "ສຸຂຸມມາ", "ມູນລະປະໂມກ", "ໂຂງ"],
        "ອັດຕະປື": ["ໄຊເສດຖາ", "ສາມັກຄີໄຊ", "ສະໜາມໄຊ", "ສານໄຊ", "ພູວົງ"],
        "ໄຊສົມບູນ": ["ເມືອງອານຸວົງ", "ເມືອງລ້ອງຊານ", "ເມືອງລ້ອງແຈ້ງ", "ເມືອງຮົ່ມ", "ເມືອງທ່າໂທມ"]
    };

    const provinceListEl = document.getElementById('provinceList');
    const provinceSelectedText = document.getElementById('provinceSelectedText');
    const provinceInput = document.getElementById('Province'); 
    
    const districtListEl = document.getElementById('districtList');
    const districtSelectedText = document.getElementById('districtSelectedText');
    const districtInput = document.getElementById('District'); 

    if (provinceListEl && provinceSelectedText) {
        provinceListEl.innerHTML = '';
        Object.keys(laoData).forEach(province => {
            let li = document.createElement('li');
            li.textContent = province;
            li.addEventListener('click', () => {
                provinceSelectedText.textContent = province;
                provinceSelectedText.style.setProperty("color", "#111827", "important");
                provinceSelectedText.style.setProperty("font-size", "14px", "important");
                provinceSelectedText.classList.add('has-value');
                if (provinceInput) provinceInput.value = province; 
                provinceListEl.style.display = 'none';
                loadDistricts(province);
            });
            provinceListEl.appendChild(li);
        });
    }

    function loadDistricts(province) {
        if (!districtListEl || !districtSelectedText) return;
        
        districtSelectedText.textContent = '----- ກະລຸນາເລືອກເມືອງ -----';
        districtSelectedText.style.color = "";
        if (districtInput) districtInput.value = '';
        districtListEl.innerHTML = '';

        let districts = laoData[province] || [];
        districts.forEach(district => {
            let liDist = document.createElement('li');
            liDist.textContent = district;
            liDist.addEventListener('click', () => {
                districtSelectedText.textContent = district;
                districtSelectedText.style.setProperty("color", "#111827", "important");
                districtSelectedText.style.setProperty("font-size", "14px", "important");
                districtSelectedText.classList.add('has-value');
                if (districtInput) districtInput.value = district; 
                districtListEl.style.display = 'none';
            });
            districtListEl.appendChild(liDist);
        });
    }

    updateSelectTextColor('Province', 'provinceSelectedText');
    updateSelectTextColor('District', 'districtSelectedText');

    // ------------------------------------------
    // ລະບົບສົ່ງຂໍ້ມູນ (Form Submission) ໄປ Google Apps Script
    // ------------------------------------------
    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            const loadingModal = document.getElementById('loadingModal');
            const spinnerBox = document.getElementById('spinnerBox');

            if (loadingModal) loadingModal.style.display = 'flex';
            if (spinnerBox) {
                spinnerBox.innerHTML = `
                    <div class="spinner"></div>
                    <div class="loading-text">ກຳລັງບັນທຶກຂໍ້ມູນ<span class="dots"></span></div>
                `;
            }

            try {
                const slipFileinput = document.querySelector('input[name="Slip_image"]');
                const studentFileInput = document.querySelector('input[name="Student_image"]');

                let slipImageBase64 = "";
                let slipImageName = "";
                let slipImageMimeType = "";

                let studentImageBase64 = "";
                let studentImageName = "";
                let studentImageMimeType = "";

                if (slipFileinput && slipFileinput.files[0]) {
                    slipImageBase64 = await getBase64(slipFileinput.files[0]);
                    slipImageName = slipFileinput.files[0].name;
                    slipImageMimeType = slipFileinput.files[0].type;
                }

                if (studentFileInput && studentFileInput.files[0]) {
                    studentImageBase64 = await getBase64(studentFileInput.files[0]);
                    studentImageName = studentFileInput.files[0].name;
                    studentImageMimeType = studentFileInput.files[0].type;
                }

                const formDataPayload = {
                    studentName: document.querySelector('input[name="Fullname"]')?.value || "",
                    school: document.querySelector('input[name="School"]')?.value || "",
                    whatsapp: document.querySelector('input[name="Whatsapp"]')?.value || "",
                    facebook: document.querySelector('input[name="Facebook"]')?.value || "",
                    province: document.querySelector('input[name="Province"]')?.value || "",
                    district: document.querySelector('input[name="District"]')?.value || "",
                    Course_name: document.querySelector('input[name="Course_name"]')?.value || "",        
                    Course_price: document.querySelector('input[name="Course_price"]')?.value || "",
                    slipImageBase64: slipImageBase64,
                    slipImageName: slipImageName,
                    slipImageMimeType: slipImageMimeType,
                    
                    studentImageBase64: studentImageBase64,
                    studentImageName: studentImageName,
                    studentImageMimeType: studentImageMimeType
                };

                // ⚠️ ໃຫ້ເອົາ Web App URL ທີ່ໄດ້ຈາກການ Deploy Google Apps Script ມາວາງໃສ່ນີ້
                const scriptURL = 'https://script.google.com/macros/s/AKfycbwOJ_lrVdjLptHxEbJjcrglOJ5kVnjjXGMdLV9d06xh0B5fsUMOGhJ0owmxB9Vpf84/exec'; 

                const response = await fetch(scriptURL, {
                    method: 'POST',
                    body: JSON.stringify(formDataPayload)
                });

                const textResponse = await response.text();
                let result;
                try {
                    result = JSON.parse(textResponse);
                } catch (e) {
                    // ຖ້າ Apps Script ຕອບກັບມາເປັນ Plain Text ແຕ່ບັນທຶກສຳເລັດແລ້ວ ໃຫ້ຖືວ່າຜ່ານ
                    result = { result: "success" };
                }

                if (result.result === "success" || result.status === "success") {
                    if (spinnerBox) {
                        spinnerBox.innerHTML = `
                            <div class="success-circle" style="width: 60px !important; height: 60px !important; min-width: 60px !important; min-height: 60px !important; background-color: #4CAF50 !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; margin: 0 auto 12px auto !important;">
                                <svg style="width: 30px !important; height: 30px !important;" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <div class="loading-text" style="color: #4CAF50; font-weight: bold;">ບັນທຶກຂໍ້ມູນສຳເລັດ</div>
                        `;
                    }
                    
                    setTimeout(() => {
                        window.location.reload(); 
                    }, 1200);
                } else {
                    throw new Error(result.message || "ເກີດຂໍ້ຜິດພາດໃນ Server");
                }
            } catch (error) {
                console.error('-> ພົບ Error:', error);
                // 🛠️ ຈຸດທີ່ແກ້ໄຂ: ป้องกันไม่ให้แสดงคำว่า undefined
                const errorMsg = error && error.message ? error.message : "ການເຊື່ອມຕໍ່ມີບັນຫາ ຫຼື ເຊີເວີບໍ່ຕອບສະໜອງ";
                alert('ເກີດຂໍ້ຜິດພາດໃນການສົ່ງຂໍ້ມູນ: ' + errorMsg);
                if (loadingModal) loadingModal.style.display = 'none';
            }
        });
    }
});

// ==========================================
// 4. ຟັງຊັນຊ່ວຍເຫຼືອເພີ່ມເຕີມ (UI & Validation)
// ==========================================
function enterMainForm() {
    const splashScreen = document.getElementById('welcome-splash-screen');
    if (splashScreen) {
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 600);
    }
}

const focusPlaceholders = {
    "Fullname": "ປ້ອນຊື່ ແລະ ນາມສະກຸນ",
    "School": "ປ້ອນຊື່ໂຮງຮຽນ",
    "Whatsapp": "ປ້ອນເບີ WhatsApp",
    "Facebook": "ປ້ອນຊື່ Facebook"
};

const defaultPlaceholders = {
    "Fullname": "ຊື່ ແລະ ນາມສະກຸນ",
    "School": "ໂຮງຮຽນ",
    "Whatsapp": "ເບີ WhatsApp",
    "Facebook": "ຊື່ Facebook"
};

const errorPlaceholders = {
    "Fullname": "ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ",
    "School": "ກະລຸນາປ້ອນຊື່ໂຮງຮຽນ",
    "Whatsapp": "ກະລຸນາປ້ອນເບີ WhatsApp",
    "Facebook": "ກະລຸນາປ້ອນຊື່ Facebook"
};

document.addEventListener("DOMContentLoaded", function () {
    const textInputs = document.querySelectorAll("input[required]:not([type='hidden']), .select-box-custom");

    textInputs.forEach(item => {
        let container = item.closest('.input-field') || item.closest('.select-wrapper');
        if (!container) return;

        let inputElement = container.querySelector('input');
        if (!inputElement) return;
        let name = inputElement.name;

        inputElement.addEventListener('focus', function () {
            document.querySelectorAll(".input-field, .select-wrapper").forEach(box => {
                box.classList.remove('input-error');
                let innerInput = box.querySelector('input');
                if (innerInput) {
                    let inName = innerInput.name;
                    if (!innerInput.value || innerInput.value.trim() === "") {
                        innerInput.style.color = ""; 
                        if (defaultPlaceholders[inName]) {
                            innerInput.placeholder = defaultPlaceholders[inName];
                        }
                    }
                }
            });

            if (!this.value || this.value.trim() === "") {
                this.style.color = "";
                if (focusPlaceholders[name]) {
                    this.placeholder = focusPlaceholders[name];
                }
            }
        });

        inputElement.addEventListener('blur', function () {
            if (!this.value || this.value.trim() === "") {
                this.style.color = "";
                if (defaultPlaceholders[name]) {
                    this.placeholder = defaultPlaceholders[name];
                }
            }
        });

        inputElement.addEventListener('input', function () {
            container.classList.remove('input-error');
            this.style.color = "";
        });
    });
});

function validateAndNextPage() {
    let isValid = true;

    const requiredInputs = document.querySelectorAll("#page-1 input[required]:not([type='hidden'])");
    requiredInputs.forEach(input => {
        let container = input.closest('.input-field');
        let name = input.name;
        
        if (!input.value || input.value.trim() === "") {
            isValid = false;
            if (container) container.classList.add('input-error');
            input.style.color = "#dc2626"; 
            if (errorPlaceholders[name]) {
                input.placeholder = errorPlaceholders[name];
            }
        } else {
            if (container) container.classList.remove('input-error');
            input.style.color = "";
        }
    });

    const provinceInput = document.getElementById('Province');
    const provinceSpan = document.getElementById('provinceSelectedText');
    let provContainer = provinceSpan ? provinceSpan.closest('.select-wrapper') : null;
    
    if (!provinceInput || !provinceInput.value || provinceInput.value.trim() === "") {
        isValid = false;
        if (provContainer) provContainer.classList.add('input-error');
        if (provinceSpan) provinceSpan.style.color = "#dc2626";
    } else {
        if (provContainer) provContainer.classList.remove('input-error');
        if (provinceSpan) provinceSpan.style.color = "";
    }

    const districtInput = document.getElementById('District');
    const districtSpan = document.getElementById('districtSelectedText');
    let distContainer = districtSpan ? districtSpan.closest('.select-wrapper') : null;

    if (!districtInput || !districtInput.value || districtInput.value.trim() === "") {
        isValid = false;
        if (distContainer) distContainer.classList.add('input-error');
        if (districtSpan) districtSpan.style.color = "#dc2626";
    } else {
        if (distContainer) distContainer.classList.remove('input-error');
        if (districtSpan) districtSpan.style.color = "";
    }

    if (!isValid) {
        return false;
    }

    nextPage();
    return true;
}

function updateSelectTextColor(hiddenInputId, spanId) {
    const hiddenInput = document.getElementById(hiddenInputId);
    const spanText = document.getElementById(spanId);
    
    if (hiddenInput && spanText) {
        if (hiddenInput.value && hiddenInput.value.trim() !== "") {
            spanText.style.color = "#111827"; 
        } else {
            spanText.style.color = ""; 
        }
    }
}

document.addEventListener('click', function(event) {
    if (!event.target.closest('.select-wrapper') && !event.target.closest('.custom-dropdown')) {
        document.querySelectorAll('.dropdown-list').forEach(list => {
            list.style.display = 'none';
        });
    }
});