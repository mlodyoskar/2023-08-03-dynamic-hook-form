import { NextResponse } from "next/server";

const employees = [
 { name: "Aaron Davis", country: "USA", retired: false },
 { name: "Krzysztof Januszewski", country: undefined, retired: true },
 { name: " Jan Kowalski", country: undefined, retired: false },
 { name: "Oskar Puchalski", country: "POL", retired: false },
 { name: "John Smith", country: undefined, retired: true },
];

export async function GET() {
 return NextResponse.json({ employees });
}
