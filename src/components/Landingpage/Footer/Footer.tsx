import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (

        <footer className="border-t border-white">
            <div className="flex flex-row items-center justify-between py-4 px-10">
                <div className="flex flex-col gap-10">
                    <Image
                        src="/kinoxp-logo-icon.png"
                        width={100}
                        height={100}
                        alt="Logo"
                    />
                    <p className="text-white text-[12px]">Copyright © 2023 Kinoxp. All Rights Reserved.</p>
                </div>
                <div className="flex flex-row mx-10">
                    <div className="text-white px-10 leading-relaxed">
                        <h4 className="text-[24px] font-semibold">Info</h4>
                        <p className="pb-2">Email: Kinoxp@biograf.dk</p>
                        <p className="pb-2">Phone: 25 64 47 30</p>
                        <p className="pb-2">Address: Biografstræde 69,<br/>
                            4200 Slagelse
                        </p>
                    </div>
                    <div className="text-white px-10 leading-relaxed">
                        <h4 className="text-[24px] font-semibold">Opening hours</h4>
                        <div className="flex flex-col pb-2">
                            <p>mon - thur</p>
                            <p>08:00 - 20:00</p>
                        </div>
                        <div>
                            <p>fre - sun</p>
                            <p>08:00 - 23:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer