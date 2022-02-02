import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
  
    //you could als check for any property on session object
    //like role===admin || name=="jane doe"
    if(!session) return NextResponse.redirect('/home')
    //if user authenticated continue
  }
};
