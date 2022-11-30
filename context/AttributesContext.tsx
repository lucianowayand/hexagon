
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const Context = createContext({
    title: "hexagon",
    primaryColor: '#fff',
    secondaryColor: '#000',
    language: 'en-US'
})

const AttributesProvider = ({ children }: { children: React.ReactNode }) => {
    const [attributes, setAttributes] = useState({
        title: "hexagon",
        primaryColor: '#fff',
        secondaryColor: '#000',
        language: 'en-US'
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

    useEffect(() => {
        getAttributes()
    }, [])

    return (
        <Context.Provider
            value={{
                title: attributes.title,
                primaryColor: attributes.primaryColor,
                secondaryColor: attributes.secondaryColor,
                language: attributes.language
            }}>
            {isLoading === false ? children : null}
        </Context.Provider>
    )
}

export default AttributesProvider