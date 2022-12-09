
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const ThemeContext = createContext({
    title: "hexagon",
    primaryColor: '#fff',
    secondaryColor: '#000',
    language: 'en-US',
    getAttributesArray: async () => { },
    updateAttribute: async (attribute: Attribute) => { }
})

export interface Attribute {
    name: string,
    value: string
    id: number
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [attributes, setAttributes] = useState({
        title: "hexagon",
        primaryColor: '#fff',
        secondaryColor: '#000',
        language: 'en-US',
    })
    const [isLoading, setIsloading] = useState(true)

    const getAttributes = async () => {
        const res = await api.get('/api/attributes')
        setAttributes({
            title: res.data.find((value: any) => value.name === "title").value,
            primaryColor: res.data.find((value: any) => value.name === "primaryColor").value,
            secondaryColor: res.data.find((value: any) => value.name === "secondaryColor").value,
            language: res.data.find((value: any) => value.name === "language").value,

        })
        setIsloading(false)
    }

    const getAttributesArray = async () => {
        const res = await api.get('/api/attributes')
        return res.data
    }

    const updateAttribute = async (attribute: any) => {
        await api.patch('/api/attributes', { attribute })
        getAttributes()
    }

    useEffect(() => {
        getAttributes()
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                title: attributes.title,
                primaryColor: attributes.primaryColor,
                secondaryColor: attributes.secondaryColor,
                language: attributes.language,
                getAttributesArray,
                updateAttribute
            }}>
            {isLoading === false ? children : null}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider