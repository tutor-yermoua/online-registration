const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ໃຊ້ memoryStorage ເພື່ອນຳໄຟລ໌ຮູບພາບມາເປັນ Buffer ແລ້ວບັນທຶກລົງ LONGBLOB
const upload = multer({ storage: multer.memoryStorage() });

// ເຊື່ອມຕໍ່ຖານຂໍ້ມູນ db_Regis_Online
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_Regis_Online'
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database: db_Regis_Online!");
});

// API ຮັບຂໍ້ມູນ ແລະ ຮູບພາບ
app.post('/api/register', upload.fields([
    { name: 'Slip_image', maxCount: 1 },
    { name: 'Student_image', maxCount: 1 }
]), (req, res) => {
    const { 
        Fullname, 
        School, 
        Whatsapp, 
        Facebook, 
        Province, 
        District, 
        Course_name,      
        Course_price      
    } = req.body;
    
    // ດຶງ Buffer ຂອງຮູບພາບ
    const slipImageBuffer = req.files['Slip_image'] ? req.files['Slip_image'][0].buffer : null;
    const studentImageBuffer = req.files['Student_image'] ? req.files['Student_image'][0].buffer : null;

    const sql = `INSERT INTO tbRegistration 
        (FullName, School, Whatsapp, Facebook, Province, District, CourseName, CoursePrice, SlipImage, StudentImage) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
        Fullname, 
        School, 
        Whatsapp, 
        Facebook, 
        Province, 
        District, 
        Course_name,      
        Course_price,     
        slipImageBuffer, 
        studentImageBuffer
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'error', message: err.message });
        }
        res.json({ status: 'success', message: 'ບັນທຶກຂໍ້ມູນ ແລະ ຮູບພາບລົງ Database ສຳເລັດ!' });
    });
});
// 👈 ປ່ຽນຈຸດນີ້ໃຫ້ຮັບ IP '0.0.0.0' ເພື່ອໃຫ້ມືຖື ຫຼື ຄອມເຄື່ອງອື່ນໃນວົງ Wi-Fi ດຽວກันເຂົ້າເถิงໄດ້
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://192.168.32.195:${PORT}`);
});