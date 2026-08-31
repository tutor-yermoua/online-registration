const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// ຕັ້ງຄ່າບ່ອນເກັບໄຟລ໌ຮູບພາບດ້ວຍ Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ປ້ອງກັນຊື່ໄຟລ໌ຊ້ຳກັນ
    }
});
const upload = multer({ storage: storage });

// ເຊື່ອມຕໍ່ Database MySQL ດ້ວຍ Pool ເພື່ອປ້ອງກັນການຫຼຸດ
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_olms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ກວດສອບການເຊື່ອມຕໍ່ Pool
db.query('SELECT 1', (err) => {
    if (err) {
        console.error("Database connection error: ", err);
    } else {
        console.log("ເຊື່ອມຕໍ່ Database MySQL ດ້ວຍ Pool ສຳເລັດແລ້ວ!");
    }
});

// ໃຫ້ Server ຮັບຂໍ້ມູນແບບ Form URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ໃຫ້ສາມາດເຂົ້າເຖິງ Folder uploads ໄດ້ໂດຍກົງ
app.use('/uploads', express.static('uploads'));

// ໃຫ້ Server ສົ່ງໜ້າ index.html ເມື່ອມີຄົນເຂົ້າເວັບໄຊ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API ຮັບຂໍ້ມູນລົງທະບຽນ (POST) ຕອບກັບເປັນ JSON ໃຫ້ Fetch API
app.post('/register', upload.any(), (req, res) => {
    const { Fullname, School, Province, District, Whatsapp, Facebook, Course_name, Course_price } = req.body;
    
    let slip_image = '';
    let student_image = '';

    if (req.files) {
        req.files.forEach(file => {
            if (file.fieldname === 'Slip_image' || file.fieldname === 'slip_image') {
                slip_image = file.filename;
            } else if (file.fieldname === 'Student_image' || file.fieldname === 'student_image') {
                student_image = file.filename;
            }
        });
    }
    const sql = `INSERT INTO tb_registration (Fullname, School, Province, District, Whatsapp, Facebook, Course_name, Course_price, Slip_image, Student_image) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [Fullname, School, Province, District, Whatsapp, Facebook, Course_name, Course_price, slip_image, student_image];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Error: ", err);
            return res.status(500).json({ success: false, message: "ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ!" });
        }
        // ຕອບກັບ JSON ໄປໃຫ້ JavaScript ທີ່ Fetch ມາ
        res.json({ success: true, message: "ລົງທະບຽນສຳເລັດແລ້ວ!" });
    });
});
// ເປີດ Server ທີ່ Port 3000
app.listen(3000, () => {
    console.log("Server กำลังວຽກຢູ່ທີ່ http://localhost:3000");
});