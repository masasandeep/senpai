import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        const response = NextResponse.json({ message: "Logout successful" });
        response.cookies.set("token", "", {
            httpOnly: true
        })
        return response
    }catch(error: any){
        console.log("Logout error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}