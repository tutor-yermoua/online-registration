const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ใช้ memoryStorage ເກັບຮູບເປັນ Buffer
const upload = multer({ storage: multer.memoryStorage() });

// ເຊື່ອມຕໍ່ຖານຂໍ້ມູນ db_Regis_Online
/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_Regis_Online'
});*/

/*const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});*/

const db = mysql.createConnection(process.env.DATABASE_URL);

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
    
    // ດຶງ Buffer  ຂອງຮູບພາບ
    const slipImageBuffer = req.files['Slip_image'] ? req.files['Slip_image'][0].buffer : null;
    const studentImageBuffer = req.files['Student_image'] ? req.files['Student_image'][0].buffer : null;

    // ຄຳສັ່ງ SQL ບັນທຶກລົງ Table tbregistration
    const sql = `INSERT INTO tbregistration 
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

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});