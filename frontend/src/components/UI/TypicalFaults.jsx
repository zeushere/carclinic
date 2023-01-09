import React from "react";
import {useSelector} from "react-redux";
import {MdClose} from "react-icons/md";

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
            <table className="table table-faults mb-0" style={{color : "white"}}>
                <thead  className="text-center">
                <tr className={'table-th'}>
                    <th>Nazwa Usterki</th>
                    <th>Prawdopodobieństwo</th>
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
            </table>

            </div>
    );
};

export default TypicalFaults;
