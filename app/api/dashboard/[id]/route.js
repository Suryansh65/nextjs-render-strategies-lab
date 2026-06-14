import dashboardData from  "../../../data/dashbord.json";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json(
            { error: 'Product ID not found' },
            { status: 400 }
        );
    }

    const product = dashboardData.find((d) => d.id === Number(id));
    if (!product) {
        return NextResponse.json(
            { error: 'Product Not Found' },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
}