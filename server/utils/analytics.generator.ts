import { Document, Model } from "mongoose";
import { MonthlyData } from "../interface/analytics.interface";

export async function generateLast12MonthData<T extends Document>(
  model: Model<T>
): Promise<MonthlyData[]> {
  try {
    const last12Months: MonthlyData[] = [];
    const now = new Date();
    now.setDate(now.getDate() + 1);

    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - i * 28
      );
      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()- 28
      );

      const count = await model.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      last12Months.push({
        month: endDate.toLocaleString("default", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        count,
      });
    }

    return last12Months;
  } catch (error: any) {
    throw new Error(`Error generating monthly data: ${error.message}`);
  }
}
