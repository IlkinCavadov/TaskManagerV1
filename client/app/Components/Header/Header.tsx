"use client";

import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import { github, profile, moon } from '@/utils/Icons';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

function Header() {

  const { user, logoutUser } = useUserContext();
  const { activeTasks, openAddModal } = useTasks();

  const { name } = user;
  const userId = user._id;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close popup when clicking outside safely
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target;
      if (menuRef.current && target instanceof Node && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    
  <header className="w-full flex flex-col sm:flex-row justify-between items-center bg-[#f9f9f9] px-4 sm:px-6 py-3 sm:my-4">      <div>
        <h1 className='text-lg font-medium'>
          <span role='img' aria-label='wave'>👋</span>
          {userId ? ` Welcome, ${name}` : ' Welcome to TaskManager'}
        </h1>

        <p className='text-sm'>
          {userId ? (
            <>
              Here's what's happening with your tasks today.<br />
              You have <span className='font-bold text-[#3aafae]'>{activeTasks.length}</span> active tasks
            </>
          ) : (
            'Please login or register to manage your tasks efficiently.'
          )}
        </p>
      </div>
          
        
      <div className='h-12.5 flex items-center gap-[10.4rem]'>
        {userId ? (
        <button
          className='px-8 py-3 bg-[#3aafae] text-white rounded-[50px] 
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out'
          onClick={openAddModal}>
          New Task
        </button>
        ) : null}
        
        

        <div className='flex gap-4 items-center'>
          {/* GitHub */}
          <Link
            href="https://github.com/IlkinCavadov"
            passHref
            target='_blank'
            rel='noopener noreferrer'
            className='h-10 w-10 rounded-full flex items-center justify-center text-lg border-2 border-[#3aafae]'
            
          >
            {github}
          </Link>

          {/* Dark Mode */}
          <Link
            href="#"
            passHref
            target='_blank'
            rel='noopener noreferrer'
            className='h-10 w-10 rounded-full flex items-center justify-center text-lg border-2 border-[#3aafae]'
          >
            {moon}
          </Link>

          {/* Profile Popup */}
          
          {userId ? (  
          <div className="relative" ref={menuRef}>
            

            
            <button
              onClick={() => setOpen(!open)}
              className='h-10 w-10 rounded-full flex items-center justify-center text-lg border-2 border-[#3aafae]'
            >
              {profile}
            </button>

            

            {open && (
              <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md border border-gray-200 text-sm z-50">
                <Link
                  href="/"
                  target='_blank'
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                  setOpen(false)
                    logoutUser();
                    // Add your actual sign-out logic here
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
            </div>
          ): null}
              
            
          

        </div>
      </div>
    </header>
  );
}

export default Header;
