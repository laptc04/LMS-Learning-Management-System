import React from 'react'
import Toolbar from './components/Toolbar'
import ControlBar from './components/Controlbar'
import ShareLesson from './components/ShareLesson'
import SidebarJoinClass from './components/Sidebar'

export default function JoinClassPage() {
    return (
        <div className='flex min-h-screen'>
            <SidebarJoinClass />

            {/* <Toolbar /> */}
            <div className="w-4/5 flex flex-col">
                <ControlBar />
                <ShareLesson />
            </div>
        </div>
    )
}
