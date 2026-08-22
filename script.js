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
            // ເອົາ class 'selected' ອອກຈາກທຸກໆກາດອື່ນກ່ອນ ເພື່ອໃຫ້ເລືອກໄດ້ແຄ່ 1 ວິຊາ
            courseCards.forEach(c => {
                if (c !== card) c.classList.remove('selected');
            });

            // ສະຫຼັບສະຖານະ selected ຂອງກາດທີ່ຖືກຄລິກ
            card.classList.toggle('selected');

            const courseName = card.getAttribute('data-name') || 'ວິຊາຮຽນ';
            const coursePrice = parseFloat(card.getAttribute('data-price')) || 0;
            const courseTime = card.getAttribute('data-time') || '-';
            const courseDays = card.getAttribute('data-days') || '-';
            
            const rawCat = card.getAttribute('data-cat') || '';
            const courseCat = (rawCat === 'calc' || rawCat === 'ສາຍຄິດໄລ່') ? 'ສາຍຄິດໄລ່' : 'ສາຍພາສາ';
            const courseYear = card.getAttribute('data-year') || '2026-2027';

            if (card.classList.contains('selected')) {
                window.selectedCourses = [{ 
                    name: courseName, 
                    price: coursePrice, 
                    time: courseTime, 
                    days: courseDays, 
                    cat: courseCat, 
                    year: courseYear, 
                    scholarship: 'not_received' 
                }];
            } else {
                window.selectedCourses = [];
            }

            updateSummary();
            updateBadgeCounts();
        });
    });

    window.toggleScholarship = function(index, status) {
        window.selectedCourses[index].scholarship = status;
        updateSummary();
    };

    window.removeCourse = function(courseName) {
        window.selectedCourses = window.selectedCourses.filter(c => c.name !== courseName);
        courseCards.forEach(card => { if(card.getAttribute('data-name') === courseName) card.classList.remove('selected'); });
        updateSummary();
        updateBadgeCounts();
    };

    window.updateSummary = function() {
        const container = document.getElementById('selectedCoursesListContainer');
        const sumCount = document.getElementById('sumCount');
        const sumPrice = document.getElementById('sumPrice');
        const sumFinalPrice = document.getElementById('sumFinalPrice');
        if (!container) return;

        if (window.selectedCourses.length === 0) {
            container.innerHTML = '<p style="color: #64748b; font-size: 13px; text-align: center; padding: 10px;">ຍັງບໍ່ໄດ້ເລືອກວິຊາຮຽນ</p>';
            if(sumCount) sumCount.textContent = '0 ວິຊາ';
            if(sumPrice) sumPrice.textContent = '0 ກີບ';
            if(sumFinalPrice) sumFinalPrice.textContent = '0 ກີບ';
            return;
        }

        container.innerHTML = '';
        let total = 0;
        window.selectedCourses.forEach((course, index) => {
            total += course.price;
            let div = document.createElement('div');
            div.className = 'selected-course-item';
            div.innerHTML = `
                <button type="button" class="delete-course-btn" onclick="removeCourse('${course.name}')" title="ລຶບວິຊານີ້">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <div class="selected-course-title">${course.name}</div>
                <div class="selected-course-price">ຄ່າຮຽນ ${course.price.toLocaleString()}ກີບ</div>
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
                <div class="course-badges-row">
                    <span class="info-badge purple">${course.cat}</span>
                    <span class="info-badge green">${course.year}</span>
                </div>
                <div class="scholarship-btn-group">
                    <button type="button" class="scholarship-btn ${course.scholarship === 'not_received' ? 'active-not' : ''}" onclick="toggleScholarship(${index}, 'not_received')">
                        ${course.scholarship === 'not_received' ? '✓ ' : ''}ບໍ່ໄດ້ທຶນ
                    </button>
                    <button type="button" class="scholarship-btn ${course.scholarship === 'received' ? 'active-rec' : ''}" onclick="toggleScholarship(${index}, 'received')">
                        ${course.scholarship === 'received' ? '✓ ' : ''}ໄດ້ທຶນ
                    </button>
                </div>
            `;
            container.appendChild(div);
        });

        if(sumCount) sumCount.textContent = window.selectedCourses.length + ' ວິຊາ';
        if(sumPrice) sumPrice.textContent = total.toLocaleString() + ' ກີບ';
        if(sumFinalPrice) sumFinalPrice.textContent = total.toLocaleString() + ' ກີບ';
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

            // ສ້າງ Overlay ສະແດງວົງມົນໝູນ "ກຳລັງບັນທຶກຂໍ້ມູນ" ໄວ້ກາງຈໍ
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'form-overlay-box';
            loadingOverlay.id = 'formProcessingOverlay';
            loadingOverlay.innerHTML = `
                <div class="center-spinner"></div>
                <div style="color: #334155; font-size: 15px; font-weight: 500; margin-top: 10px;">ກຳລັງບັນທຶກຂໍ້ມູນ</div>
            `;
            document.body.appendChild(loadingOverlay);

            // ສົ່ງຂໍ້ມູນໄປ Google Sheets (ໃຊ້ no-cors)
            fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // ຕັ້ງເວລາ ໃຫ້ວົງມົນໝູນໂຊว์ກ່ອນ 1 ວິນາທີ ແລ້ວຈຶ່ງປ່ຽນເປັນກ່ອງສີຂາວພ້ອມເຄື່ອງໝາຍຕິກຖືກ
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

            // ລໍຖ້າອີກ 1.5 ວິນາທີ (ລວມເປັນ 2.5 ວິ) ແລ້ວ Refresh ໜ້າເວັບ
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