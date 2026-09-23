const pdfParse = require("pdf-parse")
const {generateInterviewReport,generateResumePdf} = require("../services/aiService")
const interviewReportModel = require("../models/interviewReportModel")

async function generateInterviewReportController(req , res) {


    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {selfDescription,jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    
  console.log("AI RESULT:", JSON.stringify(interviewReportByAi, null, 2))
console.log("TITLE:", interviewReportByAi.title)

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
          resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi

    })

   console.log("DB RESULT:", interviewReport)

    res.status(201).json({
        message: "Interview Report genrated Successfully",
        interviewReport
    })
    
}

async function getInterviewReportById(req, res){

    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId , user: req.user.id
    })

    if(!interviewReport){
        return res.status(404).json({
            message: " inetrview Report Not Found"
        })
    }

    res.status(201).json({
        message:"Interview Report fetched Successfully",
        interviewReport
    })


}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

async function generateResumePdfController(req, res){

    const {interviewReportId} = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview Report not found"
        })
    }

    const {resume,jobDescription,selfDescription} = interviewReport

    const pdfBuffer = await generateResumePdf({resume ,jobDescription, selfDescription})

        res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })


    res.send(pdfBuffer)

}


module.exports = {generateInterviewReportController,getInterviewReportById,getAllInterviewReportsController, generateResumePdfController}