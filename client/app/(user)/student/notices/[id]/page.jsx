import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

const page = () => {
    const username = "Lewis"
    const notice = {
        title:"Mind Control",
        author:"Kots Atieno",
        message:"Whats up the world is going crazy"
    }
    return (
    <>
        <>
            <div className='w-[500px] lg:w-[700px] grid gap-4'>
                <div className='my-4'>
                    <h2 className='font-semibold text-2xl'>{notice.title}</h2>
                    <h2 className='font-semibold text-xs'>By {notice.author}</h2>
                </div>
                <div className='font-semibold tracking-wider text-black/90 indent-2'>
                    {notice.message}
                    <div className='flex items-end gap-2 tracking-normal'>
                    </div>
                </div>
                <div className='grid gap-2 absolute bottom-8 w-[500px]'>
                    <div>
                        <Button >Download</Button>
                        <p>The world a messed up place ....</p>
                    </div>
                    <Input
                    type='message'
                    placeholder='Any comments ...'
                    />
                    <Button>
                        <Send/>
                    </Button>
                </div>
            </div>
        </>
    </>
  )
}

export default page