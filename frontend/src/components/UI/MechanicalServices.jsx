import React, {useEffect} from "react";
import '../../styles/mechanical-service.css'
import CommonSection from "./CommonSection";
import Helmet from "../Helmet/Helmet";
import {useDispatch, useSelector} from "react-redux";
import {MdClose} from "react-icons/md";
import {listMechanicalServices} from "../../actions/mechanicalServicesActions";
import {Link} from "react-router-dom";

export const MechanicalServices = () => {

    const mechanicalServicesList = useSelector(state => state.mechanicalServicesList);
    const {mechanicalServices} = mechanicalServicesList;
    const dispatch = useDispatch();

    function getMechanicalServiceId (mechanicalServiceId) {
        localStorage.setItem('mechanicalServiceId', mechanicalServiceId.id);
        localStorage.setItem('mechanicalServiceName', mechanicalServiceId.name);
        localStorage.setItem('mechanicalServiceExpectedServiceCost', mechanicalServiceId.expectedServiceCost)
        localStorage.setItem('mechanicalServiceExpectedExecutionTime', mechanicalServiceId.expectedExecutionTime.substr(0, 5))
    }

    useEffect(() => {
        dispatch(listMechanicalServices())
    },[dispatch])
    return (
        <Helmet title="Usługi Mechaniczne">
            <CommonSection title="Usługi mechaniczne"/>
            <div className="table-responsive-md m-5">
                <table className="table table-faults mb-0" style={{color: "white"}}>
                    <thead className="text-center">
                    <tr className={'table-th'}>
                        <th>Nazwa usługi</th>
                        <th>Czas wykonania</th>
                        <th>Koszt usługi</th>
                        <th>Wybór</th>
                    </tr>
                    </thead>
                    {mechanicalServices?.map((mechanicalService) => (
                        <tbody className="align-middle text-center">
                        <tr key={mechanicalService?.id} className={'table-th'}>
                            <td>{mechanicalService?.name} </td>
                            <td>{mechanicalService.expectedExecutionTime?.substr(0, 5)}{mechanicalService.expectedExecutionTime ? ' h' : 'Zależny od usterki'} </td>
                            <td>{mechanicalService?.expectedServiceCost} {mechanicalService?.expectedServiceCost ? ' zł' : 'Do uzgodnienia'}</td>
                            <td className={'mechanical__service__link'}>
                                <button type="button" className="btn btn-primary btn-lg mechanicalService__button "
                                onClick={() => getMechanicalServiceId(mechanicalService)}><Link to={'/home'} className= "">Wybierz</Link></button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>

            </div>
        </Helmet>
    )
}
export default MechanicalServices;