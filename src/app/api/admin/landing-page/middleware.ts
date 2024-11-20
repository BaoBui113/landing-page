import authMiddleware from "@/middleware/authMiddleware";

export async function middleware(req: Request) {
  if (!!req) {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
  }
  return null;
}
