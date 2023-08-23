import { useState, useEffect } from "react";

export default function PasswordStrengthChecker ({ password, onStrengthChange }) {
    
    const [strength, setStrength] = useState('');

    useEffect(() => {
        const checkPasswordStrength = (value) => {
            const isStrongRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?=.{10,15})/;
            const isMediumRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,15})/;
            if(isStrongRegex.test((value))) {
                setStrength('strong')
                onStrengthChange('strong')
            }
            else if(isMediumRegex.test(value)) {
                setStrength('medium')
                onStrengthChange('medium')
            }
            else if(value == '') {
                setStrength('')
                onStrengthChange('')
            }
            else {
                setStrength('weak')
                onStrengthChange('weak')
            }
        }
        checkPasswordStrength(password)
    }, [password, onStrengthChange])

    

    return(
        <div>
            <div className="flex space-x-1">
                <div className={`w-1/3 border ${strength == 'strong' ? 'border-cyan-400' : strength == 'weak' ? 'border-red-600' : strength == 'medium' ? 'border-green-600' : 'border-gray-300'}`}></div>
                <div className={`w-1/3 border ${strength == 'strong' ? 'border-cyan-400' : strength == 'medium' ? 'border-green-600' : 'border-gray-300'}`}></div>
                <div className={`w-1/3 border ${strength == 'strong' ? 'border-cyan-400' : 'border-gray-300'}`}></div>
            </div>
            <p className="block h-3 text-xs text-right text-gray-300">{strength}</p>
        </div>
    )
}