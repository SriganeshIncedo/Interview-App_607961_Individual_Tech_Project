const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const moment = require("moment");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "interviewdb",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Connected to database");
  }
});

app.post("/api/interviews", upload.single("photo"), (req, res) => {
  const interviewer = req.body.interviewer;
  const grade = req.body.grade;
  const interviewee = req.body.interviewee;
  const recruiter = req.body.recruiter;
  const project = req.body.project;
  const position = req.body.position;
  const date = req.body.date;
  const result = req.body.result;
  const photo = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO interviews (interviewer, grade, interviewee, recruiter, project, position, date, photo, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    interviewer,
    grade,
    interviewee,
    recruiter,
    project,
    position,
    date,
    photo,
    result,
  ];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      res.sendStatus(500);
    } else {
      console.log("Data inserted successfully");
      res.sendStatus(200);
    }
  });
});

const cron = require("node-cron");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "user@gmail.com",
    pass: "myuhvpumiaygiech", //generate
  },
});

cron.schedule("00 58 11 * * *", () => {
  const sql =
    "SELECT interviewer, grade, interviewee, recruiter, project, position, DATE_FORMAT(date, '%Y-%m-%d') as date, photo, result FROM interviews WHERE date = DATE(NOW())";
  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Data fetched successfully");

      const doc = new PDFDocument();
      const date = moment().format("DD-MM-YYYY");
      const outputFilename = `Incedo interview-report-${date}.pdf`;
      const outputStream = fs.createWriteStream(outputFilename);
      doc.pipe(outputStream);
      doc
        .fontSize(20)
        .fillColor("orangered")
        .text("Incedo".slice(0, 6), { align: "center" });
      doc
        .fontSize(10)
        .fillColor("black")
        .text(`Daily Interview Report (${date})`, { align: "center" });

      const table = {
        headers: [
          "Interviewer",
          "Grade",
          "Interviewee",
          "Recruiter",
          "Project",
          "Position",
          "Date",
          "Result",
        ],
        rows: results.map((interview) => [
          interview.interviewer,
          interview.grade,
          interview.interviewee,
          interview.recruiter,
          interview.project,
          interview.position,
          interview.date,
          interview.result,
        ]),
      };
      doc.moveDown().table(table, { align: "center" });

      doc.end();

      const mailOptions = {
        from: "from@gmail.com",
        to: "to@gmail.com",
        subject: "Incedo Daily Interview Report",
        html: `
      <h1>Incedo Daily Interview Report ${date}</h1>
          <table class="table table-striped table-bordered border-primary" border="1">
            <thead>
              <tr>
                <th>Interviewer</th>
                <th>Grade</th>
                <th>Interviewee</th>
                <th>Recruiter</th>
                <th>Project</th>
                <th>Position</th>
                <th>Date</th>
                <th>Photo</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  (interview) => `
                <tr>
                  <td>${interview.interviewer}</td>
                  <td>${interview.grade}</td>
                  <td>${interview.interviewee}</td>
                  <td>${interview.recruiter}</td>
                  <td>${interview.project}</td>
                  <td>${interview.position}</td>
                  <td>${interview.date}</td>
                  <td>${interview.photo}</td>
                  <td>${interview.result}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `,
        attachments: [{ filename: outputFilename, path: outputFilename }],
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully");
        }
      });
    }
  });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
