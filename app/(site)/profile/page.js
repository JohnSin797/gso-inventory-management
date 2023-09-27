import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";

export default function Profile () {
    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-2">
                    <p className="font-bold">Personal Information</p>
                    <div className="flex gap-2">
                        <div className="w-full">
                            <label className="text-xs font-bold">First Name</label>
                            <input 
                                type="text"
                                className="w-full border hover:border-black rounded-lg p-2"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold">Last Name</label>
                            <input 
                                type="text"
                                className="w-full border hover:border-black rounded-lg p-2"
                            />
                        </div>
                    </div>
                    <button className="w-full md:w-1/6 p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-600/80">
                        save
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 space-y-2">
                    <p className="font-bold">Account Settings</p>
                    <div className="flex gap-2">
                        <div className="w-full">
                            <label className="text-xs font-bold">Username</label>
                            <input 
                                type="text"
                                className="w-full border hover:border-black rounded-lg p-2"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold">New Password</label>
                            <input 
                                type="password"
                                className="w-full border hover:border-black rounded-lg p-2"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-full">
                            <label className="text-xs font-bold">Current Password</label>
                            <input 
                                type="password"
                                className="w-full border hover:border-black rounded-lg p-2"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold">Confirm Password</label>
                            <input 
                                type="password"
                                className="w-full border hover:border-black rounded-lg p-2"
                            />
                        </div>
                    </div>
                    <button className="w-full md:w-1/6 p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-600/80">
                        save
                    </button>
                </div>
            </div>
        </div>
    )
}