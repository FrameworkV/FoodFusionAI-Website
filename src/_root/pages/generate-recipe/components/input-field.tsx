import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import React from 'react'

interface InputFieldProps {
    createResponseHandler: () => void
    onInputChange: (value: string) => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
    request: string
}

const InputField: React.FC<InputFieldProps> = ({createResponseHandler, onInputChange, handleKeyDown, request}) => {
    return (
        <div className="flex w-full justify-center items-center px-4">
            <div className="flex p-2 bg-muted rounded-xl w-full max-w-[40em]">
                <Textarea value={request} onChange={({ target }) => onInputChange(target.value)} onKeyDown={handleKeyDown} className="w-full h-min resize-none !ring-transparent " placeholder="Send a message to create a new Recipe..." />
                <Button onClick={() => createResponseHandler()}><Send /></Button>
            </div>
        </div>
    )
}

export default InputField