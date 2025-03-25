"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";



export async function updateUser(data: Record<string, any>) {

    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    if (!user) throw new Error("User not found");

    try {
        // write the transaction to 
        // check industry exists
        const result = await db.$transaction(
            async (tx) => {
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry
                    }
                });

                // if doesn't exist create it with default values
                if (!industryInsight) {
                    const insights = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRanges: [],
                            growthRate: 0,
                            demandLevel: "MEDIUM",
                            topSkills: [],
                            marketOutlook: "NEUTRAL",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        }
                    });



                }
                // Update the user 
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        industry: data.industry,
                        bio: data.bio,
                        experience: data.experience,
                        skills: data.skills
                    },
                });

                return { updatedUser, industryInsight };
                // if any of this fails transaction will roll over the instructions
            },
            {
                timeout: 10000, //increasing tx timeout value to 10s from default value
            }
        );

        revalidatePath('/');
        return {success:true, ...result};
    } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);

    }
}

export async function getUserOnBoardingStatus() {

    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })

    if (!user) throw new Error("User not found");

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                industry: true,
            }
        });

        return {
            isOnboarded: !!user?.industry
        };

    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(error.message)
        else
            throw new Error("Failed to check onboarding status");
    }

}