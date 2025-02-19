import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
// to check if user exists or not db if not add them in db by fetching details from clerk
export const checkUser = async () => {

    const user = await currentUser();

    if (!user)
        return null;

    try {
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        if (loggedInUser) {
            return loggedInUser;
        }
        
        // user doesn't exist create user in db
        const name = `${user.firstName} ${user.lastName}`;

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl:user.imageUrl,
                email:user.emailAddresses[0].emailAddress,
            }
        })

        return newUser;

    } catch (error:unknown) {
        if (error instanceof Error)
            console.error(error.message);
        else
            console.error("An unknown error occured");
        
    }

}
