
import { createContext } from "react";

export async function getServerSideProps() {
    const res = await fetch(process.env.BASE_URL + "/api/attributes");
    const data = await res.json();

    return {
        props: { attributes: data },
    };
}

export const Context = createContext({
    title: "hexagon",
    primaryColor: '#fff',
    secondaryColor: '#000',
})

const ContextProvider = ({ children }: { children: React.ReactNode }, {attributes}:any) => {
    return (
        <Context.Provider value={{ title: 'hexagon', primaryColor: "#000", secondaryColor: "#fff" }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider