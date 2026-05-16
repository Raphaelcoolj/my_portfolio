"use server";

import dbConnect from "./db";
import Portfolio from "@/models/Portfolio";
import { revalidatePath } from "next/cache";
import cloudinary from "./cloudinary";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "portfolio" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject({ success: false, error: error.message });
          }
          resolve({ success: true, url: result?.secure_url });
        }
      ).end(buffer);
    });
  } catch (error: any) {
    console.error("Upload image error:", error);
    return { success: false, error: error.message };
  }
}

export async function getPortfolioData() {
  try {
    await dbConnect();
    let portfolio = await Portfolio.findOne({});
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }
    return JSON.parse(JSON.stringify(portfolio));
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

export async function updatePortfolioData(formData: any) {
  try {
    await dbConnect();
    let portfolio = await Portfolio.findOne({});
    if (!portfolio) {
      await Portfolio.create(formData);
    } else {
      await Portfolio.findOneAndUpdate({}, formData, { new: true });
    }
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return { success: false, error: "Failed to update portfolio" };
  }
}
