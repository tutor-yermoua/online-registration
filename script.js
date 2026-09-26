// ປະກາດຕົວແປຄວບຄຸມໜ້າປັດຈຸບັນ
let currentPage = 1;

// ຟັງຊັນສະຫຼັບໜ້າ ແລະ ອັບເດດ Step Indicator ພ້ອມກັນ
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

// ຟັງຊັນກົດປຸ່ມ "ກັບຄືນ"
function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// ຟັງຊັນກົດປຸ່ມ "ຕໍ່ໄປ"
function nextPage() {
    if (currentPage < 3) {
        showPage(currentPage + 1);
    }
}

// ຟັງຊັນຈັດການ Progress Bar ດ້ານເທິງ
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
            progressLine.style.width = '92%';
        }
    }
}

// 1. ເປີດ-ປິດ ປຸ່ມ Dropdown ຂອງແຂວງ-ເມືອງ
function toggleDropdown(listId) {
    document.querySelectorAll('.dropdown-list').forEach(list => {
        if (list.id !== listId) list.style.display = 'none';
    });
    const list = document.getElementById(listId);
    if (list) {
        list.style.display = (list.style.display === 'none') ? 'block' : 'none';
    }
}

// ຟັງຊັນເລືອກຄອສແລ້ວເກັບຄ່າລົງ Hidden Input ພ້ອມຍ້າຍໄປໜ້າ 3 (ຊຳລະເງິນ)
function selectCourseAndPay(courseName, coursePrice) {
    const nameInput = document.getElementById('selectedCourseNameInput');
    const priceInput = document.getElementById('selectedCoursePriceInput');
    
    if (nameInput) nameInput.value = courseName;
    if (priceInput) priceInput.value = coursePrice;

    showPage(3);
}

// ຟັງຊັນກ໊ອບປີ້ເລກບັນຊີ
function copyAccountNumber() {
    const accNo = document.getElementById('accountNumber').innerText;
    navigator.clipboard.writeText(accNo).then(() => {
        // alert('ກ໊ອບປີ້ເລກບັນຊີສຳເລັດແລ້ວ: ' + accNo);
    });
}

// ຟັງຊັນສະແດງຕົວຢ່າງຮູບພາບກ່ອນອັບໂຫຼດ
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

// ຟັງຊັນຊ່ວຍແປງ File ໃຫ້ເປັນ Base64 ສົ່ງໄປ Google Sheet
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// --- DOMContentLoaded Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof showPage === 'function') showPage(1);

    const laoData = {
        "ນະຄອນຫຼວງວຽງຈັນ": ["ຈັນທະບູລີ", "ສີໂຄດຕະບອງ", "ໄຊເສດຖາ", "ສີສັດຕະນາກ", "ນາຊາຍທອງ", "ໄຊທານີ", "ຫາດຊາຍຟອງ", "ສັງທອງ", "ປາກງື່ມ"],
        "ຜົ້ງສາລີ": ["ເມືອງຜົ້ງສາລີ", "ເມືອງໄໝ່", "ເມືອງຂວາ", "ເມືອງສຳພັນ", "ເມືອງບູນເໜືອ", "ເມືອງຍອດອູ", "ເມືອງບູນໃຕ້"],
        "ຫຼວງນ້ຳທາ": ["ເມືອງນ້ຳທາ", "ເມືອງສິງ", "ເມືອງລອງ", "ເມືອງວຽງພູຄາ", "ເມືອງນາແລ"],
        "ອຸດົມໄຊ": ["ເມືອງໄຊ", "ເມືອງຫຼາ", "ເມືອງນາໝໍ້", "ເມືອງງາ", "ເມືອງແບ່ງ", "ເມືອງຮຸນ", "ເມືອງປາກແບ່ງ"],
        "ບໍ່ແກ້ວ": ["ເມືອງຫວ້ຍຊາຍ", "ເມືອງຕົ້ນເຜິ້ງ", "ເມືອງເມິງ", "ເມືອງຜາອຸດົມ", "ເມືອງປາກທາ"],
        "ຫຼວງພະບາງ": ["ເມືອງຫຼວງພະບາງ", "ເມືອງຊຽງເງິນ", "ເມືອງນານ", "ເມືອງປາກອູ", "ເມືອງນ້ຳບາກ", "ເມືອງງອຍ", "ເມືອງປາກແຊງ", "ເມືອງໂພນໄຊ", "ເມືອງຈອມເພັດ", "ເມືອງວຽງຄຳ", "ເມືອງພູຄູນ", "ເມືອງໂພນທອງ"],
        "ຫົວພັນ": ["ເມືອງຊຳເໜືອ", "ເມືອງຊຽງຄໍ້", "ເມືອງວຽງທອງ", "ເມືອງວຽງໄຊ", "ເມືອງຫົວເມືອງ", "ເມືອງຊຳໃຕ້", "ສົບເບົ້າ", "ແອດ"],
        "ໄຊຍະບູລີ": ["ເມືອງໄຊຍະບູລີ", "ເມືອງຄອບ", "ເມືອງຫົງສາ", "ເມືອງເງິນ", "ເມືອງຊຽງຮ່ອນ", "ເມືອງພຽງ", "ເມືອງປາກລາຍ", "ເມືອງແກ່ນທ້າວ", "ເມືອງບໍ່ແຕນ", "ເມືອງທົ່ງມີໄຊ"],
        "ຊຽງຂວາງ": ["ເມືອງແປກ", "ເມືອງຄຳ", "ເມືອງໜອງແຮດ", "ເມືອງຄູນ", "ເມືອງໝອກໄໝ່", "ເມືອງພູກູດ", "ເມືອງຜາໄຊ", "ທ່າໂທມ"],
        "ແຂວງວຽງຈັນ": ["ໂພນໂຮງ", "ທຸລະຄົມ", "ແກ້ວອຸດົມ", "ກາສີ", "ວັງວຽງ", "ເຟືອງ", "ຊະນາຄາມ", "ແມດ", "ຫີນເຫີບ", "ວຽງຄຳ", "ລອງຊານ", "ຮົ່ມ", "ໄຊສົມບູນ", "ໜື່ນ"],
        "ບໍລິຄຳໄຊ": ["ເມືອງປາກຊັນ", "ເມືອງທ່າພະບາດ", "ເມືອງປາກກະດິງ", "ເມືອງບໍລິຄັນ", "ເມືອງຄຳເກີດ", "ເມືອງວຽງທອງ", "ເມືອງໄຊຈຳພອນ"],
        "ຄຳມ່ວນ": ["ເມືອງທ່າແຂກ", "ເມືອງມະຫາໄຊ", "ເມືອງໜອງບົກ", "ເມືອງຫີນບູນ", "ເມືອງຍົມມະລາດ", "ເມືອງບົວລະພາ", "ເມືອງນາກາຍ", "ເມືອງເຊບັ້ງໄຟ", "ເມືອງໄຊບົວທອງ", "ເມືອງຄູນຄຳ"],
        "ສະຫວັນນະເຂດ": ["ໄກສອນພົມວິຫານ", "ອຸທຸມພອນ", "ອາດສະພັງທອງ", "ພິນ", "ເຊໂປນ", "ນອງ", "ທ່າປາງທອງ", "ສອງຄອນ", "ຈຳພອນ", "ຊົນບຸລີ", "ໄຊບຸລີ", "ວິລະບູລີ", "ອາດສະພອນ", "ໄຊພູທອງ", "ທ່າພະລານໄຊ"],
        "ສາລະວັນ": ["ສາລະວັນ", "ຕະໂອຍ", "ຕຸ້ມລານ", "ລະຄອນເພັງ", "ວາປີ", "ຄົງເຊໂດນ", "ເລົ່າງາມ", "ສະມ່ວຍ"],
        "ເຊກອງ": ["ລະມາມ", "ກະລຶມ", "ດັກຈຶງ", "ທ່າແຕງ"],
        "ຈຳປາສັກ": ["ປາກເຊ", "ຊະນະສົມບູນ", "ບາຈຽງຈະເລີນສຸກ", "ປາກຊ່ອງ", "ປະທຸມພອນ", "ໂພນທອງ", "ຈຳປາສັກ", "ສຸຂຸມມາ", "ມູນລະປະໂມກ", "ໂຂງ"],
        "ອັດຕະປື": ["ໄຊເສດຖາ", "ສາມັກຄີໄຊ", "ສະໜາມໄຊ", "ສານໄຊ", "ພູວົງ"],
        "ໄຊສົມບູນ": ["ໄຊສົມບູນ", "ທ່າໂທມ", "ຮົ່ມ", "ລ້ອງຊານ", "ພູນ"]
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
                
                if (districtInput) districtInput.value = district; 
                districtListEl.style.display = 'none';
            });
            districtListEl.appendChild(liDist);
        });
    }
});

// --- Form Submit Handling ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            console.log("-> 1. เริ่มกดปุ่มส่งฟอร์มแล้ว");

            const loadingModal = document.getElementById('loadingModal');
            const spinnerBox = document.getElementById('spinnerBox');

            if (loadingModal) loadingModal.style.display = 'flex';

            if (spinnerBox) {
                spinnerBox.innerHTML = `
                    <div class="spinner"></div>
                    <div class="loading-text">ກຳລັງບັນທຶກ<span class="dots"></span></div>
                `;
            }

            try {
                const formData = new FormData(this);
                const data = {};
                
                formData.forEach((value, key) => {
                    if (typeof value === 'string') {
                        data[key] = value;
                    }
                });

                const slipFile = document.getElementById('slipInput').files[0];
                const studentFile = document.getElementById('studentImgInput').files[0];

                if (slipFile) {
                    data.Slip_image = await getBase64(slipFile);
                    data.Slip_filename = slipFile.name;
                }

                if (studentFile) {
                    data.Student_image = await getBase64(studentFile);
                    data.Student_filename = studentFile.name;
                }

                const scriptURL = 'https://script.google.com/macros/s/AKfycbxbUjtd5M4c8aS46YXYfKhlFSIqDfXX4OEb-z8Cd2jcJFhCsDXJE5K4F_mWpVFzB6WD/exec'; 
                console.log("-> กำลังส่งข้อมูลไป Apps Script...", data);

                const response = await fetch(scriptURL, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log("-> ผลลัพธ์จาก Server:", result);

                if (result.status === "success") {
                    if (spinnerBox) {
                        spinnerBox.innerHTML = `
                            <div class="success-icon">✓</div>
                            <div class="loading-text">ບັນທຶກຂໍ້ມູນສຳເລັດ!</div>
                        `;
                    }
                    setTimeout(() => {
                        window.location.reload(); 
                    }, 1500);
                } else {
                    throw new Error(result.message || "ເກີດຂໍ້ຜິດພາດໃນ Server");
                }

            } catch (error) {
                console.error('-> พบ Error:', error);
                alert('ເກີດຂໍ້ຜິດພາດໃນການສົ່ງຂໍ້ມູນ: ' + error.message);
                if (loadingModal) loadingModal.style.display = 'none';
            }
        });
    }
});

// --- Welcome / Splash Screen ---
function enterMainForm() {
    const splashScreen = document.getElementById('welcome-splash-screen');
    splashScreen.style.opacity = '0';
    splashScreen.style.visibility = 'hidden';
    
    setTimeout(function() {
        splashScreen.style.display = 'none';
    }, 600);
}

// --- Placeholders & Validation Logic ---
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
                
                let spanText = box.querySelector('span[id$="SelectedText"]');
                let hiddenInputId = spanText && spanText.id.includes('province') ? 'Province' : 'District';
                let hiddenInput = document.getElementById(hiddenInputId);
                if (spanText && (!hiddenInput || !hiddenInput.value)) {
                    spanText.style.color = "";
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

    updateSelectTextColor('Province', 'provinceSelectedText');
    updateSelectTextColor('District', 'districtSelectedText');
});

function validateAndNextPage() {
    let isValid = true;

    const requiredInputs = document.querySelectorAll("#page-1 input[required]:not([type='hidden'])");
    requiredInputs.forEach(input => {
        let container = input.closest('.input-field');
        
        if (!input.value || input.value.trim() === "") {
            isValid = false;
            if (container) container.classList.add('input-error');
            input.style.color = "#dc2626"; 
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
    } else {
        if (provContainer) provContainer.classList.remove('input-error');
    }

    const districtInput = document.getElementById('District');
    const districtSpan = document.getElementById('districtSelectedText');
    let distContainer = districtSpan ? districtSpan.closest('.select-wrapper') : null;

    if (!districtInput || !districtInput.value || districtInput.value.trim() === "") {
        isValid = false;
        if (distContainer) distContainer.classList.add('input-error');
    } else {
        if (distContainer) distContainer.classList.remove('input-error');
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