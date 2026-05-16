"use server";

import dbConnect from "./db";
import Portfolio from "@/models/Portfolio";
import { revalidatePath } from "next/cache";

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
