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

document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.getElementById('page-1');
    const step2Container = document.getElementById('step2Container');
    const registrationForm = document.getElementById('registrationForm');

    // 1. ຂໍ້ມູນແຂວງ ແລະ ເມືອງ
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

                // ໂຫຼດເມືອງຕໍ່
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

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (page1) page1.style.display = 'none';
            if (step2Container) step2Container.style.display = 'block';
        });
    }

    const backToStep1Btn = document.getElementById('backToStep1');
    const backToStep1BottomBtn = document.getElementById('backToStep1Bottom');

    function goBackTo1() {
        if (step2Container) step2Container.style.display = 'none';
        if (page1) page1.style.display = 'block';
    }
    if (backToStep1Btn) backToStep1Btn.addEventListener('click', goBackTo1);
    if (backToStep1BottomBtn) backToStep1BottomBtn.addEventListener('click', goBackTo1);

    // 2. ລະບົບກັ່ນຕອງວິຊາຮຽນ
    const mainFilterBtns = document.querySelectorAll('#mainFilter .filter-btn');
    const subFilterBtns = document.querySelectorAll('#subFilter .sub-btn');
    const courseCards = document.querySelectorAll('.course-list .course-card');

    let currentMain = 'all';
    let currentSub = 'all';

    function filterCourses() {
        courseCards.forEach(card => {
            const cardCat = card.getAttribute('data-cat'); 
            const cardSub = card.getAttribute('data-sub'); 

            let match = true;
            if (currentSub !== 'all') {
                match = (cardSub === currentSub);
            } else if (currentMain !== 'all') {
                match = (cardCat === currentMain);
            }
            card.style.display = match ? 'flex' : 'none';
        });
    }

    function updateSubButtonsVisibility(mainCategory) {
        let firstVisibleSub = null;

        subFilterBtns.forEach(sb => {
            const matches = (mainCategory === 'all' || sb.getAttribute('data-cat') === mainCategory);
            sb.style.display = matches ? 'inline-block' : 'none';

            if (matches && !firstVisibleSub) {
                firstVisibleSub = sb;
            }
        });

        subFilterBtns.forEach(b => b.classList.remove('active'));
        if (firstVisibleSub) {
            firstVisibleSub.classList.add('active');
            currentSub = firstVisibleSub.getAttribute('data-sub');
        } else {
            currentSub = 'all';
        }
    }

    function updateBadgeCounts() {
        subFilterBtns.forEach(btn => {
            const subType = btn.getAttribute('data-sub');
            const selectedCount = Array.from(courseCards).filter(card => card.getAttribute('data-sub') === subType && card.classList.contains('selected')).length;
            let badge = btn.querySelector('.sub-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'sub-badge';
                badge.style.marginLeft = '6px'; badge.style.padding = '2px 6px'; badge.style.borderRadius = '50%';
                badge.style.fontSize = '11px'; badge.style.fontWeight = 'bold';
                btn.appendChild(badge);
            }
            badge.textContent = selectedCount;
            badge.style.display = (selectedCount > 0) ? 'inline-block' : 'none';
            badge.style.background = btn.classList.contains('active') ? 'rgba(255, 255, 255, 0.3)' : '#3b82f6';
            badge.style.color = '#ffffff';
        });
    }

    mainFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mainFilterBtns.forEach(b => { 
                b.classList.remove('active'); 
                const icon = b.querySelector('.fa-check'); 
                if(icon) icon.style.display = 'none'; 
            });
            btn.classList.add('active');
            const icon = btn.querySelector('.fa-check'); 
            if(icon) icon.style.display = 'inline-block';

            currentMain = btn.getAttribute('data-filter');

            updateSubButtonsVisibility(currentMain);
            filterCourses();
            updateBadgeCounts();
        });
    });

    subFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSub = btn.getAttribute('data-sub');
            filterCourses();
            updateBadgeCounts();
        });
    });

    // 3. ລະບົບເລືອກວິຊາ (ປັບໃຫ້ເລືອກໄດ້ພຽງ 1 ວິຊາເທົ່ານັ້ນ)
    window.selectedCourses = [];

    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            courseCards.forEach(c => {
                if (c !== card) c.classList.remove('selected');
            });

            card.classList.toggle('selected');

            const courseName = card.getAttribute('data-name') || 'ວິຊາຮຽນ';
            const coursePrice = parseFloat(card.getAttribute('data-price')) || 0;
            const courseTime = card.getAttribute('data-time') || '-';
            const courseDays = card.getAttribute('data-days') || '-';

            if (card.classList.contains('selected')) {
                window.selectedCourses = [{ 
                    name: courseName, 
                    price: coursePrice, 
                    time: courseTime, 
                    days: courseDays 
                }];
            } else {
                window.selectedCourses = [];
            }

            updateSummary();
            updateBadgeCounts();
        });
    });

    window.removeCourse = function(courseName) {
        window.selectedCourses = window.selectedCourses.filter(c => c.name !== courseName);
        courseCards.forEach(card => { if(card.getAttribute('data-name') === courseName) card.classList.remove('selected'); });
        updateSummary();
        updateBadgeCounts();
    };

    // ==========================================
    // 💡 ລະບົບເປີດ-ປິດ Modal QR Code (ອັບເດດໃໝ່)
    // ==========================================
    window.payCourse = function(courseName, price) {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'flex'; // ສະແດງ Pop-up QR Code ຂຶ້ນມາ
        } else {
            // ຖ້າຫາກຍັງບໍ່ໄດ້ສ້າງ HTML Modal ໃຫ້ແຈ້ງເຕືອນສຳຮອງ
            alert('ກົດຊຳລະຄ່າເທີມສຳລັບວິຊາ: ' + courseName + ' ຈຳນວນເງິນ ' + price.toLocaleString() + ' ກີບ');
        }
    };

    // ຟັງຊັນສຳລັບປິດ Modal QR Code
    window.closeQRModal = function() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // ຟັງຊັນປຸ່ມຢືນຢັນການໂອນເງິນໃນ Modal
    window.finishPayment = function() {
        alert('ຢືນຢັນການໂອນເງິນສຳເລັດ!');
        closeQRModal();
    };

    window.updateSummary = function() {
        const container = document.getElementById('selectedCoursesListContainer');
        if (!container) return;

        if (window.selectedCourses.length === 0) {
            container.innerHTML = '<p style="color: #64748b; font-size: 13px; text-align: center; padding: 10px;">ຍັງບໍ່ໄດ້ເລືອກວິຊາຮຽນ</p>';
            return;
        }

        container.innerHTML = '';
        window.selectedCourses.forEach((course) => {
            let div = document.createElement('div');
            div.className = 'selected-course-item';
            div.innerHTML = `
                <button type="button" class="delete-course-btn" onclick="removeCourse('${course.name}')" >
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <div class="selected-course-title">${course.name}</div>
                <div class="selected-course-price">ຄ່າຮຽນ ${course.price.toLocaleString()}ກີບ/ເທີມ</div>
                <div class="course-details-list">
                    <div class="course-detail-row">
                        <i class="fa-regular fa-clock"></i>
                        <span>ເວລາຮຽນ: <strong>${course.time}</strong></span>
                    </div>
                    <div class="course-detail-row">
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>ຮຽນ: <strong>${course.days}</strong></span>
                    </div>
                </div>
                <div style="margin-top: 12px;">
                    <button type="button" class="btn-pay-course" onclick="payCourse('${course.name}', ${course.price})" style="width: 100%; padding: 8px; background-color: #2563eb; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                        <i class="fa-solid fa-credit-card" style="margin-right: 5px;"></i> ຊຳລະຄ່າເທີມ
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    };

    // 4. ລະບົບສົ່ງຂໍ້ມູນໄປ Google Sheets
    const finalSubmitBtn = document.getElementById('finalSubmitBtn'); 
    if (finalSubmitBtn) {
        finalSubmitBtn.addEventListener('click', () => {
            if (window.selectedCourses.length === 0) {
                alert('ກະລຸນາເລືອກຢ່າງໜ້ອຍ 1 ວິຊາຮຽນກ່ອນບັນທຶກ!');
                return;
            }

            const studentName = document.querySelector('input[name="fullname"]')?.value || 'ບໍ່ໄດ້ລະບຸ';
            const school = document.querySelector('input[name="school"]')?.value || '';

            const provinceText = document.getElementById('provinceSelectedText')?.textContent || '';
            const districtText = document.getElementById('districtSelectedText')?.textContent || '';
            const province = provinceText.includes('ກະລຸນາ') ? '' : provinceText;
            const district = districtText.includes('ກະລຸນາ') ? '' : districtText;

            const whatsapp = document.querySelector('input[name="whatsapp"]')?.value || '';
            const facebook = document.querySelector('input[name="facebook"]')?.value || '';

            const courseName = window.selectedCourses.map(c => c.name).join(', ');
            const totalCoursePrice = window.selectedCourses.reduce((sum, c) => sum + c.price, 0);
            const coursePriceFormatted = totalCoursePrice.toLocaleString() + ' ກີບ';

            const noteInput = document.querySelector('input[name="note"]');
            const note = noteInput ? noteInput.value : '-';

            const formData = {
                studentName: studentName,
                school: school,
                province: province,
                district: district,
                whatsapp: whatsapp,
                facebook: facebook,
                courseName: courseName,          
                coursePrice: coursePriceFormatted, 
                note: note                      
            };

            const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzUbXASpDaA8Gw7iBbGHPpIxbhv_g-JfJjklIKuDEJ0A5V1IES5seA0UHCkp3aPe5A-/exec";

            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'form-overlay-box';
            loadingOverlay.id = 'formProcessingOverlay';
            loadingOverlay.innerHTML = `
                <div class="center-spinner"></div>
                <div style="color: #334155; font-size: 15px; font-weight: 500; margin-top: 10px;">ກຳລັງບັນທຶກຂໍ້ມູນ</div>
            `;
            document.body.appendChild(loadingOverlay);

            fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            setTimeout(() => {
                if (loadingOverlay) {
                    loadingOverlay.innerHTML = `
                        <div class="success-modal-card">
                            <div class="success-circle-large" style="margin-bottom: 15px;">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div style="color: #1e293b; font-size: 16px; font-weight: 600;">ລົງທະບຽນສຳເລັດແລ້ວ</div>
                        </div>
                    `;
                }
            }, 500);

            setTimeout(() => {
                location.reload(); 
            }, 2000);
        });
    }
});

// ປິດ Dropdown ເວລາຄລິກບ່ອນອື່ນນອກກ່ອງ
window.onclick = function(event) {
    if (!event.target.closest('.custom-dropdown')) {
        document.querySelectorAll('.dropdown-list').forEach(list => {
            list.style.display = 'none';
        });
    }
};

// --- ລະບົບການຊຳລະຄ່າເທີມ ແລະ ສົ່ງສະລິບ ---

// 1. ເປີດ Modal: ຕອນກົດປຸ່ມ "ຊຳລະຄ່າເທີມ" ໃຫ້ບັງຄັບຣີເຊັດກັບມາເປັນໜ້າ QR Code (ໜ້າ 1) ສະເໝີ
function openQRModal() {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // ບັງຄັບໃຫ້ສະແດງໜ້າ QR Code ແລະ ເຊື່ອງໜ້າສົ່ງສະລິບທຸກຄັ້ງທີ່ເປີດໃໝ່
        const qrSection = document.getElementById('qrSection');
        const uploadSlipSection = document.getElementById('uploadSlipSection');
        
        if (qrSection && uploadSlipSection) {
            qrSection.style.display = 'block';
            uploadSlipSection.style.display = 'none';
        }

        // ເຄຼຍໄຟລ໌ຮູບສະລິບທີ່ເຄີຍເລືອກໄວ້ (ໃຫ້ົງກັບ id="slipFile" ໃນ HTML)
        const slipFile = document.getElementById('slipFile');
        if (slipFile) {
            slipFile.value = '';
        }
    }
}

// 2. ປິດ Modal (ກົດ X ອອກ): ປິດປົກກະຕິ
function closeQRModal() {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 3. ເວລາກົດປຸ່ມ "ບັນທຶກຮູບ QR Code": ດາວໂຫລດຮູບລົງເຄື່ອງ + ປ່ຽນໄປໜ້າສົ່ງສະລິບ
function saveQRCode() {
    // ສ້າງ Link ດາວໂຫລດຮູບ QR Code ລົງເຄື່ອງອັດຕະໂນມັດ
    const imagePath = 'Logo/QR Code.png'; // ເສັ້ນທາງຮູບຂອງທ່ານ
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = 'QR_Code_Payment.png'; // ຊື່ໄຟລ໌ທີ່ຈະບັນທຶກລົງເຄື່ອງ
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // ຫຼັງຈາກບັນທຶກແລ້ວ ໃຫ້ປ່ຽນໄປໜ້າອັບໂຫຼດສະລິບ
    const qrSection = document.getElementById('qrSection');
    const uploadSlipSection = document.getElementById('uploadSlipSection');

    if (qrSection && uploadSlipSection) {
        qrSection.style.display = 'none';
        uploadSlipSection.style.display = 'block';
    }
}
// 4. ເວລາກົດປຸ່ມ "ໂອນເງິນແລ້ວ": ສະແດງ Loading 2 ວິນາທີ -> ປິດ Modal -> ກັບມາໜ້າລົງທະບຽນ
function submitSlip() {
    const slipFile = document.getElementById('slipFile');

    // ตรวจสอบว่าผู้ใช้เลือกรูประสลิบแล้ว หรือยัง
    if (slipFile && slipFile.files.length === 0) {
        alert("ກະລຸນາເລືອກຮູບສະລິບທານໂອນເງິນກ່ອນ!");
        return;
    }

    // 1. ສ້າງ Element ຂອງ Loading Overlay ຂຶ້ນມາສະແດງຊົ່ວຄາວ
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-overlay';
    loadingDiv.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">ກຳລັງສົ່ງ</div>
    `;
    document.body.appendChild(loadingDiv);

    // 2. หน่วงเวลาไว้ 2 ວິນາທີ (2000 milliseconds)
    setTimeout(function() {
        // ລຶບ Loading ອອກ
        loadingDiv.remove();

        // 3. ปิด Modal ທີ່ຂຶ້ນມາ QR ຢู່ນັ້ນອອກ
        if (typeof closeQRModal === 'function') {
            closeQRModal();
        }

    }, 2000); // 2 ວິນາທີ
}
// ຟັງຊັນສຳລັບສະແດງຮູບ Preview ໃນກ່ອງ Dropzone
function showImagePreview(file) {
    const dropzoneContent = document.getElementById('dropzoneContent');
    if (!dropzoneContent) return;

    // ตรวจสอบວ່າແມ່ນໄຟລ໌ຮູບພາບແທ້ບໍ່
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
           // ປ່ຽນໃຫ້ຮູບຂະຫຍາຍໃຫຍ່ເຕັມກ໋ອງພດີ
        dropzoneContent.innerHTML = `
            <img src="${e.target.result}" alt="Slip Preview" style="width: 72%; height: 72%; object-fit: cover; border-radius: 4px;">
        `;
        }
        
        reader.readAsDataURL(file);
    }
}

// 1. ເວລາກົດຄລິກເລືອກໄຟລ໌ຜ່ານ input file ປົກກະຕິ
const slipFile = document.getElementById('slipFile');
if (slipFile) {
    slipFile.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            showImagePreview(this.files[0]);
        }
    });
}

// 2. ເວລາກະລາກຮູບມາວາງ (Drag and Drop)
const dropZone = document.getElementById('dropZone');
if (dropZone && slipFile) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.style.backgroundColor = '#f1d4df';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.style.backgroundColor = '#f9f9f9';
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files && files.length > 0) {
            slipFile.files = files; // ຍັດໄຟລ໌ໃສ່ input
            showImagePreview(files[0]); // ເອີ້ນໃຊ້ຟັງຊັນສະແດງຮູບ Preview
        }
    }, false);
}
// 3. ເວລາກົດປຸ່ມ "ບັນທຶກຮູບ QR Code": ສະແດງວົງມົນປິ່ນ 5 ວິນາທີ -> ປ່ຽນເປັນຕິກຖືກ "ບັນທຶກຮູບສຳເລັດ" 5 ວິນາທີ -> ໄປໜ້າສະລິບ
function saveQRCode() {
    const loadingModal = document.getElementById('customLoadingModal');
    const loadingIconContainer = document.getElementById('loadingIconContainer');
    const loadingText = document.getElementById('loadingText');

    if (loadingModal) {
        // 1. ເປີດ Modal ຂຶ້ນມາສະແດງວົງມົນປິ່ນ
        loadingModal.style.display = 'flex';
        loadingIconContainer.innerHTML = `<div class="spinner-circle"></div>`;
        loadingText.innerHTML = `ກຳລັງບັນທຶກ<span class="dots"></span>`;
    }

    // 2. ສ້າງຄຳສັ່ງດາວໂຫຼດຮູບ QR Code ລົງເຄື່ອງ
    const imagePath = 'Logo/QR Code.png'; // ເສັ້ນທາງຮູບຂອງທ່ານ
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = 'QR_Code_Payment.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 3. ໃຫ້ສະແດງວົງມົນປິ່ນ "ກຳລັງບັນທຶກ..." ໄວ້ 5 ວິນາທີ
    setTimeout(function() {
        if (loadingIconContainer && loadingText) {
            // ປ່ຽນເປັນເຄື່ອງໝາຍຕິກຖືກ ແລະ ສະແດງຄຳວ່າ "ບັນທຶກຮູບສຳເລັດ"
            loadingIconContainer.innerHTML = `<div class="success-check-circle">✓</div>`;
            loadingText.innerHTML = `ບັນທຶກຮູບສຳເລັດ`;
        }

        // 4. ໃຫ້ຄ້າງໜ້າ "ບັນທຶກຮູບສຳເລັດ" ໄວ້ອີກ 5 ວິນາທີ (ລວມເປັນ 10 ວິນາທີ) ຈຶ່ງປ່ຽນໄປໜ້າສົ່ງສະລິບ
        setTimeout(function() {
            if (loadingModal) {
                loadingModal.style.display = 'none';
            }

            // ປ່ຽນໄປໜ້າອັບໂຫຼດສະລິບ
            const qrSection = document.getElementById('qrSection');
            const uploadSlipSection = document.getElementById('uploadSlipSection');

            if (qrSection && uploadSlipSection) {
                qrSection.style.display = 'none';
                uploadSlipSection.style.display = 'block';
            }
        }, 1000); // 5 ວິນາທີສຳລັບຕອນສະແດງຜົນສຳເລັດ

    }, 2500); // 5 ວິນາທີສຳລັບຕອນກຳລັງໂຫຼດ
}

function copyAccountNumber() {
    const accountNumber = "052-12-00-01901348-001";

    navigator.clipboard.writeText(accountNumber).then(() => {
        showCopyNotification("ກ໋ອບປີ້ແລ້ວ✨");
    }).catch(err => {
        console.error("ບໍ່ສາມາດຄັດລອກໄດ້: ", err);
    });
}

function showCopyNotification(message) {
    // ຊອກຫາກ່ອງ "ລາຍລະອຽດບັນຊີ"
    const accountDetailsBox = document.querySelector(".account-details");
    if (!accountDetailsBox) return;

    // ຖ້າມີອັນເກົ່າໃຫ້ລຶບອອກກ່ອນ
    const existingToast = document.getElementById("copyToast");
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.id = "copyToast";
    toast.innerText = message;
    
    // ຕັ້ງຄ່າ CSS ໃຫ້ຢູ່ກາງພາຍໃນກ່ອງລາຍລະອຽດບັນຊີ
    toast.style.position = "absolute";
    toast.style.top = "50%";
    toast.style.left = "50%";
    toast.style.transform = "translate(-50%, -50%)";
    toast.style.backgroundColor = "rgba(255, 255, 255, 0.95)"; // ພື້ນຫຼັງສີຂາວໂປ່ງໃສໜ້ອຍໜຶ່ງ ໃຫ້ອ່ານງ່າຍ
    toast.style.color = "#16a34a"; // ຕົວໜັງສືສີຂຽວ
    toast.style.padding = "8px 16px";
    toast.style.borderRadius = "6px";
    toast.style.fontWeight = "bold";
    toast.style.fontSize = "14px";
    toast.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    toast.style.zIndex = "99";
    toast.style.transition = "opacity 0.3s ease";

    // เอาໄປເພີ່ມໃສ່ໃນກ່ອງ account-details
    accountDetailsBox.style.position = "relative"; // ຮັບປະກັນວ່າກ່ອງແມ່ເປັນ relative
    accountDetailsBox.appendChild(toast);

    // ເວລາ 1.5 ວິນາທີແລ້ວໃຫ້ເຟດຫາຍໄປ
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 1500);
}