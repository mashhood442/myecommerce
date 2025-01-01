import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";



const filepath = path.join(process.cwd(), "src", "app", "data", "prod.json");


export async function GET(){
    try {
    // Use fs.promises.access to check if the file exists
    await fs.promises.access(filepath);
        
        // Read the file asynchronously
        const filecontents = await fs.promises.readFile(filepath, "utf8");
        const prod = JSON.parse(filecontents!);

        return NextResponse.json(prod);
    }
    catch (error) {
        // Handle errors gracefully
        return NextResponse.json(
        { message: "Error reading file", error },
        {status: 500})
        
    }
}


export async function POST (req: Request){
 try {
    // Parse the JSON request body
    const body = await req.json();

    
        // Read the existing file asynchronously
        const filecontents = await fs.promises.readFile(filepath, "utf8");
        const prod = JSON.parse(filecontents);
        // Add the new product to the array
        prod.push(body);
        // Write the updated array back to the file asynchronously
        await fs.promises.writeFile(filepath, JSON.stringify(prod, null, 2), "utf8");

        return NextResponse.json(body, {status: 201});
    
 } catch (error) {
    return NextResponse.json(
        { message: "Error reading file", error },
        {status: 500}
    )
 }
}