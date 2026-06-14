import { NextResponse } from "next/server";
import dashboardData from "../../data/dashbord.json";

export async function GET(){
    return NextResponse.json(dashboardData);
}