"use client"
import React from 'react'
import Image from 'next/image'
import StatCard from './StatCard'
import { useState , useEffect } from 'react'
import StatCard2 from './StatCard2'




const ProgrammingSection = () => {
  const [stats , setStats]= useState(null);

  const [loading , setLoading] = useState(true);

  useEffect(()=>{

    const fetchstats=async()=>{
        try{
            const res= await fetch("api/leetcode");
            const data= await res.json();
            setStats(data);
        }catch(error){
            console.log("failed to fetch leetcode stats" ,error);
        }finally{
            setLoading(false)
        }
    };

    fetchstats();
  } , []);
    
  return (
    <div className="min-h-screen text-white">
              <div className="md:grid md:grid-cols-2 gap-6 items-center py-6 px-1 xl:gap-10 sm:py-5 xl:px-16">
  <Image
        src="/Knight.png" width={450} height={450} alt="knight"
        className="rounded-2xl "
        />

        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
    <h2  className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">Problem Solving</h2>
      <p className="text-base sm:p-0">
        I actively practice competitive programming on LeetCode with a strong focus on data structures, algorithms, and problem-solving consistency. Through disciplined practice and continuous learning, I have achieved the <span className="text-purple-500 font-bold">Knight</span> level on LeetCode.
      </p>
       <h2 className="mt-4 text-3xl font-bold text-pink-500">Problem Stats From  Leetcode</h2>
<section className="mt-5">
    {loading ? (
<p className="text-xl font-bold text-green-700">Loading the stats</p>
    ) : (

       <div>

        
        <StatCard2  title={
    <>
      <span className="hidden sm:inline">Total Problems Solved till now</span>
      <span className="sm:hidden">Total Solved</span>
    </>
  } value={stats.totalSolved} />


        <div className=" sm:flex sm:justify-between">
        <StatCard title="Easy" value={stats.easySolved} />
        <StatCard title="Medium" value={stats.mediumSolved} />
        <StatCard title="Hard" value={stats.hardSolved} />
        </div>
        <StatCard2 title="Global Ranking" value={stats.ranking}/>
     </div>
    )
    }
    </section>

        </div>
              </div>
      
    </div>
  )
}

export default ProgrammingSection
