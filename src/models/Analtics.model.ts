import { Analytics as PrismaAnalytics } from "../../prisma/src/generated/prisma-client";

export interface Analytics extends PrismaAnalytics {
  id: string;
  urlId: string;
  ipAddress: string;
  os: string;
  location: string;
  createdAt: Date;
}

export const mapAnalyticsToPrismaModel = (analytics: PrismaAnalytics): Analytics => ({
    ...analytics,
});