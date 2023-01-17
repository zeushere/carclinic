import React from "react";
import {useSelector} from "react-redux";
import {MdClose} from "react-icons/md";
import sortTable from "../table-sorting/table-sorting";

const TypicalFaults = (props) => {
    const faults = useSelector(state => state.carFaults);
    const {carFaults} = faults;
    return (
        <div className="table-responsive-md">
            <div className={'text-right mb-0'}>
                    <MdClose className={'hide_faults__button'} size={'30px'} onClick={() =>
                        props.setTypicalFaultsCarViewFlag(!props.typicalFaultsCarViewFlag)
                    }/>
            </div>
            <table id="myTable1" className="table table-faults mb-0" style={{color : "white"}}>
                <thead  className="text-center">
                <tr className={'table-th'}>
                    <th onClick={()=>sortTable(0)}>Nazwa Usterki</th>
                    <th onClick={() => sortTable(1)}>Prawdopodobieństwo</th>
                </tr>
                </thead>
                {carFaults.map((fault) => (
                    <tbody className="align-middle text-center">
                    <tr key={fault.name}  className={'table-th'}>
                        <td>{fault.name} </td>
                        <td>{fault.possibility} </td>
                    </tr>
                    </tbody>
                ))}

                {carFaults.length === 0 && <tbody className="align-middle text-center">
                <tr  className={'table-th'}>
                    <td>Brak</td>
                    <td>Brak</td>
                </tr>
                </tbody>
                }
            </table>

            </div>
    );
};

export default TypicalFaults;
