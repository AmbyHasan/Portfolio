import { NextResponse } from "next/server";


const USERNAME="AmberHasan"; //my leetcode user name

export async function GET(){
    try{
        //fetching the leetcode data from the api
        const res=await fetch(
            `https://leetcode-stats-api.herokuapp.com/${USERNAME}`,
           {
             next : {revalidate : 3600} , //cache for 1 hour
            }
        );

        const data = await res.json();
        return NextResponse.json(data);
    }catch(error){
         return NextResponse.json(
      { error: "Failed to fetch LeetCode stats" },
      { status: 500 }
    );
    }
}