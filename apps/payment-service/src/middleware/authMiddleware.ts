import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import type { CustomJwtSessionClaims } from "@repo/types";

export const shouldBeUser = createMiddleware<{
    Variables: {
        userId: string;
    };
}>(async (c, next) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
        require('fs').appendFileSync('auth_debug.log', 'Auth failed. Token was: ' + c.req.header('Authorization') + '\n');
        return c.json({ 
            message: "You are not logged in!" 
        }); 
    }

    c.set("userId", auth.userId);

    await next();
});

export const shouldBeAdmin = createMiddleware<{
    Variables: {
        userId: string;
    };
}>(async (c, next) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
        return c.json({ 
            message: "You are not logged in!" 
        }); 
    }

    const claims = auth.sessionClaims as CustomJwtSessionClaims;

    if (claims.metadata?.role !== "admin") {
        return c.json({ message: "You are not authorized!" });
    }

    c.set("userId", auth.userId);

    await next();
});