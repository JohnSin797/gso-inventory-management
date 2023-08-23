'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Logout ({ className }) {
    const router = useRouter()
    
    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            router.push('/login')
        } catch (error) {
            console.log(error.message)
            Swal.fire({
                title: 'Server Error',
                icon: 'error',
                text: error.message
            })
        }
    }

    return (
        <button
            className={className}
            onClick={logout}
        >
            logout
        </button>
    )
}