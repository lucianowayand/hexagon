import { useState, useEffect, useContext, useRef } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { Attribute, ThemeContext } from "../../../context/ThemeContext";


export default function Dashboard() {
    const [attributes, setAttributes] = useState<Attribute[]>([])
    const [selected, setSelected] = useState<Attribute>()

    const { getAttributesArray, updateAttribute } = useContext(ThemeContext)

    const getAttributes = async () => {
        const verde = await getAttributesArray().then((res: any) => {
            setAttributes(res)
        })
    }

    const updateAtt = async () => {
        await updateAttribute(selected!)
        getAttributes()
    }

    useEffect(() => {
        getAttributes()
    }, [])

    return (
        <DashboardLayout>
            <h1>Settings</h1>
            <div className="mt-4 w-full border rounded">
                <table className="table-fixed w-full">
                    <thead className="text-left border">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Value</th>
                        </tr>
                    </thead>
                    <tbody className="border rounded">
                        {attributes.map((attribute, index) => {
                            return (
                                <tr key={index} className="border hover:bg-gray-100" onClick={() => {
                                    setSelected(attribute)
                                }}>
                                    <td className="px-4 py-2">{attribute.name}</td>
                                    <td className="px-4 py-2">{attribute.value}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                {selected ? (
                    <div className="mt-10 border px-6 py-4 rounded flex flex-col">
                        <div className="flex flex-row justify-between">
                            <h1>Name</h1>
                            <h1>Value</h1>
                        </div>
                        <div className="mt-4 flex flex-row justify-between">
                            <h1>{selected.name}</h1>
                            <input type="text" value={selected.value} onChange={(event: any) => setSelected({
                                value: event.target.value,
                                name: selected.name,
                                id: selected.id
                            })}
                                className="text-right" />
                        </div>
                        <button className="mt-4" onClick={updateAtt}>Save</button>
                    </div>
                ) : null}
            </div>
        </DashboardLayout>
    )
}