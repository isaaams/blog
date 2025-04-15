import React from "react";
import { useState } from "react";
import data from "./employee.json"
export default function Employee(){
    const [employee,setEmployee]=useState(data)
    return(
        <>
            <table>
                {employee.map((e)=>(
                    <tr>
                        <td>
                            <img src={`${e.image}`} width="200px"height="200px"></img><br></br>
                            {e.nom}
                            </td>
                    </tr>
                )
                
                )}
               
            </table>
        </>
    )
}