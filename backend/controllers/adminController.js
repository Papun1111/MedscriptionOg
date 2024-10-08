import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fee,
            address
        } = req.body;

        const imageFile = req.file;

        // Check for missing fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address || !imageFile) {
            return res.status(400).json({ success: false, message: "Invalid Request! Missing details" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid Request! Invalid Email" });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Invalid Request! Weak Password" });
        }

        // Password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address: JSON.parse(address),
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addDoctor };
