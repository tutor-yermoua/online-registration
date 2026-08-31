// ປະກາດຕົວແປເລີ່ມຕົ້ນຢູ່ໜ້າ 1 ສະເໝີ
let currentPage = 1;

// ຟັງຊັນສະຫຼັບໜ້າ (ປ້ອງກັນບໍ່ໃຫ້ໜ້າລວມກັນ ແລະ ເກັບສະຖານະໄວ້)
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
}

// ຟັງຊັນກົດປຸ່ມ "ຕໍ່ໄປ" (ຈາກໜ້າ 1 ໄປໜ້າ 2)
function nextPage() {
    if (currentPage === 1) {
        // ກວດສອບວ່າເລືອກແຂວງແລ້ວ ຫຼືຍັງ
        const provinceText = document.getElementById('provinceSelectedText').innerText;
        if (provinceText.includes('-----') || provinceText === '') {
            alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!');
            return;
        }
    }
    
    if (currentPage < 3) {
        showPage(currentPage + 1);
    }
}

// ຟັງຊັນກົດປຸ່ມ "ກັບຄືນ"
function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// 1. ເປີດ-ປິດ ປຸ່ມ Dropdown
function toggleDropdown(listId) {
    document.querySelectorAll('.dropdown-list').forEach(list => {
        if (list.id !== listId) list.style.display = 'none';
    });
    const list = document.getElementById(listId);
    if (list) {
        list.style.display = (list.style.display === 'none') ? 'block' : 'none';
    }
}

// ຟັງຊັນເລືອກຄອສແລ້ວສົ່ງຄ່າໄປໜ້າຊຳລະເງິນ (Page 3)
function selectCourseAndPay(courseName, coursePrice) {
    document.getElementById('selectedCourseName').innerText = 'ຊື່ຄອສ: ' + courseName;
    document.getElementById('selectedCoursePrice').innerText = 'ລາຄາ: ' + coursePrice;
    showPage(3);
}

// ຟັງຊັນກ໊ອບປີ້ເລກບັນຊີ
function copyAccountNumber() {
    const accNo = document.getElementById('accountNumber').innerText;
    navigator.clipboard.writeText(accNo).then(() => {
        alert('ກ໊ອບປີ້ເລກບັນຊີສຳເລັດແລ້ວ: ' + accNo);
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

// ໂຫຼດຂໍ້ມູນແຂວງ ແລະ ເມືອງ
document.addEventListener('DOMContentLoaded', () => {
    // ໃຫ້ແນ່ໃຈວ່າສະແດງໜ້າ 1 ເປັນຄ່າເລີ່ມຕົ້ນເມື່ອໂຫຼດເວັບ
    showPage(1);

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
    const districtListEl = document.getElementById('districtList');
    const districtSelectedText = document.getElementById('districtSelectedText');

    if (provinceListEl && provinceSelectedText) {
        provinceListEl.innerHTML = '';
        for (let province in laoData) {
            let li = document.createElement('li');
            li.textContent = province;
            li.onclick = function() {
                provinceSelectedText.textContent = province;
                provinceListEl.style.display = 'none';

                if (districtListEl && districtSelectedText) {
                    districtSelectedText.textContent = '----- ກະລຸນາເລືອກເມືອງ -----';
                    districtListEl.innerHTML = '';
                    let districts = laoData[province] || [];
                    districts.forEach(district => {
                        let liDist = document.createElement('li');
                        liDist.textContent = district;
                        liDist.onclick = function() {
                            districtSelectedText.textContent = district;
                            districtListEl.style.display = 'none';
                        };
                        districtListEl.appendChild(liDist);
                    });
                }
            };
            provinceListEl.appendChild(li);
        }
    }
});
function updateStepIndicator(currentStep) {
    const steps = document.querySelectorAll('.step-item');
    const progressLine = document.getElementById('progressLine');

    // ປັບຄວາມຍາວເສັ້ນສີຂຽວ
    if (currentStep === 1) {
        progressLine.style.width = '0%';
    } else if (currentStep === 2) {
        progressLine.style.width = '50%';
    } else if (currentStep === 3) {
        progressLine.style.width = '100%';
    }

    // ປ່ຽນ Class active ຂອງແຕ່ລະວົງມົນ
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        if (stepNum <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}
// ຕົວປານເກັບໜ້າປັດຈຸບັນ
let currentStep = 1;

function updateStepIndicator() {
    const totalSteps = 3;
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach((item, index) => {
        if (index < currentStep) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const progressLine = document.getElementById('progressLine');
    if (progressLine) {
        // ປັບຄຳນວນເປີເຊັນໃໝ່ ເພື່ອໃຫ້ເສັ້ນໄປຢຸດຢູ່ກິ່ງກາງວົງມົນເລກ 3 ພໍດີ
        // ຖ້າຢູ່ໜ້າ 3 ໃຫ້ width ເປັນປະມານ 88% - 90% (ຂຶ້ນກັບຄວາມກວ້າງຂອງ wrapper)
        let percentage = 0;
        if (currentStep === 1) {
            percentage = 0;
        } else if (currentStep === 2) {
            percentage = 50;
        } else if (currentStep === 3) {
            percentage = 100; // ແກ້ໄຂໄລຍະນີ້
        }
        
        // ໃຊ້ວິທີຄຳນວນແບບຫັກລบໄລຍະຂອບວົງມົນອອກ ເພື່ອບໍ່ໃຫ້ເສັ້ນກາຍ
        let calculatedPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        
        // ຖ້າຢູ່ໜ້າ 3 ໃຫ້ລົດລົງໜ້ອຍໜຶ່ງເພື່ອບໍ່ໃຫ້ລື່ນຂອບວົງມົນ (ປັບເປັນ 92% ຫຼື 95% ຕາມຄວາມເໝາະສົມ)
        if (currentStep === 3) {
            progressLine.style.width = '92%'; 
        } else if (currentStep === 2) {
            progressLine.style.width = '48%';
        } else {
            progressLine.style.width = '0%';
        }
    }
}

// ເມື່ອກົດປຸ່ມ ຕໍ່ໄປ (Next)
function nextPage() {
    if (currentStep < 3) {
        // ซ่อนໜ້າເກົ່າ
        document.getElementById(`page-${currentStep}`).style.display = 'none';
        currentStep++;
        // ສະແດງໜ້າໃໝ່
        document.getElementById(`page-${currentStep}`).style.display = 'block';
        updateStepIndicator();
    }
}

// ເເມື່ອກົດປຸ່ມ ກັບຄືນ (Back)
function prevPage() {
    if (currentStep > 1) {
        // ซ่อนໜ້າເກົ່າ
        document.getElementById(`page-${currentStep}`).style.display = 'none';
        currentStep--;
        // ສະແດງໜ້າເກົ່າ
        document.getElementById(`page-${currentStep}`).style.display = 'block';
        updateStepIndicator();
    }
}

// ສຳຫຼັບໜ້າເລືອກຄອສແລ້ວໄປໜ້າ 3 ໂດຍກົງ (ຖ້າມີຟັງຊັນນີ້)
function selectCourseAndPay(courseName, coursePrice) {
    document.getElementById('selectedCourseName').innerText = courseName;
    document.getElementById('selectedCoursePrice').innerText = coursePrice;
    
    // ซ่อนໜ້າ 2 แล้วໄປໜ້າ 3
    document.getElementById(`page-${currentStep}`).style.display = 'none';
    currentStep = 3;
    document.getElementById(`page-${currentStep}`).style.display = 'block';
    updateStepIndicator();
}

// ເອີ້ນໃຊ້ງານຄັ້ງທຳອິດເວລາໂຫຼດໜ້າเว็บ
window.onload = function() {
    updateStepIndicator();
};