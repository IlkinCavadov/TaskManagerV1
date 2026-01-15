"use client"; 

import { useUserContext } from '@/context/userContext';
import IconCheck from '@/public/icons/IconCheck';
import IconDeleteAll from '@/public/icons/IconDeleteAll';
import IconFileCheck from '@/public/icons/IconFileCheck';
import IconGrid from '@/public/icons/IconGrid'
import IconStopwatch from '@/public/icons/IconStopwatch';
import { link } from 'fs'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

function MiniSidebar() {

const {user} = useUserContext()
const pathname = usePathname();

const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };


  const navItems = [
    {
      icon : <IconGrid />,
      title: "All",
      link: "/",
    },
    {
      icon : <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon : <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon : <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];


  return (
    <div className='basis-20 flex flex-col bg-[#f9f9f9]'>
      <div className='flex items-center justify-center h-20'>
        <Image src="/logo.png" alt="logo" width={60} height={60} />
      </div>

      <div className='mt-8 flex-1 flex flex-col items-center justify-between'>
        <ul className='flex flex-col gap-10'>
          {navItems.map((item, index) =>
            <li key={index} className='relative group'>
              <Link href={item.link}>{item.icon}</Link>
              {/* Hover effect */}
              <span className='u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] dark:bg-2 px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>{item.title}</span>
            </li>
          )}
        </ul>
          {user.role === "admin" ? (
        <div className='mb-6'>
          <button className='w-12 h-12 flex justify-center items-center border-2 border-[#eb5e45] p-1 rounded-full'>
            <IconDeleteAll strokeColor="#eb5e45" />
          </button>
          
        </div>
          ):null}
      </div>

    </div>
  )
}

export default MiniSidebar