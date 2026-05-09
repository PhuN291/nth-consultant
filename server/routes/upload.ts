import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Cloudinary config — đọc từ CLOUDINARY_URL env (format: cloudinary://api_key:api_secret@cloud_name)
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true });
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter(_req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Chỉ chấp nhận ảnh JPG, PNG, WEBP, GIF"));
    }
    cb(null, true);
  },
});

router.post("/", requireAdmin, upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có file được upload" });
    }
    if (!process.env.CLOUDINARY_URL) {
      return res.status(500).json({ message: "Cloudinary chưa được cấu hình (CLOUDINARY_URL)" });
    }

    // Upload buffer lên Cloudinary qua upload_stream
    const result = await new Promise<{ secure_url: string; public_id: string; width: number; height: number }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "accounting-hub/blog",
            resource_type: "image",
            transformation: [{ quality: "auto:good", fetch_format: "auto" }],
          },
          (err, uploaded) => {
            if (err || !uploaded) return reject(err);
            resolve({
              secure_url: uploaded.secure_url,
              public_id: uploaded.public_id,
              width: uploaded.width,
              height: uploaded.height,
            });
          },
        );
        stream.end(req.file!.buffer);
      },
    );

    return res.json({ url: result.secure_url, ...result });
  } catch (err: any) {
    if (err?.message?.includes("File too large")) {
      return res.status(413).json({ message: "Ảnh quá lớn (tối đa 5MB)" });
    }
    next(err);
  }
});

export default router;
