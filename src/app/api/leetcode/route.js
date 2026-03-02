import { NextResponse } from "next/server";


const USERNAME="AmberHasan"; //my leetcode user name

const FALLBACK_STATS = {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: "N/A",
};

export async function GET(){
    try{
        //fetching the leetcode data from the api
        const res=await fetch(
            `https://leetcode-stats-api.herokuapp.com/${USERNAME}`,
           {
             next : {revalidate : 3600} , //cache for 1 hour
            }
        );

        if (!res.ok) {
            return NextResponse.json(FALLBACK_STATS);
        }

        const data = await res.json();
        return NextResponse.json({
            totalSolved: data?.totalSolved ?? 0,
            easySolved: data?.easySolved ?? 0,
            mediumSolved: data?.mediumSolved ?? 0,
            hardSolved: data?.hardSolved ?? 0,
            ranking: data?.ranking ?? "N/A",
        });
    }catch(error){
         return NextResponse.json(FALLBACK_STATS);
    }
}