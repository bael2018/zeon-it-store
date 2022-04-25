import { useState } from "react"

export const useInput = initValue => {
    const [value, setValue] = useState(initValue)

    return {
        bind: () => {
            return {
                value,
                onChange: e => setValue(e.target.value)
            }
        },
        clearValue: () => setValue(''),
        value
    }
}