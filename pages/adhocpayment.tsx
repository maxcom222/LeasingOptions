import React, { useContext, useEffect, useState } from 'react';
import MainLayout from '../components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
// import wrapper from 'redux/store.tsx/store';
// import { AuthenticationService } from "business-logic/authenticationService";

// export const getServerSideProps = wrapper.getServerSideProps(
//     async (context) => {
//         const internalCheck = await AuthenticationService.IsInternalPage()

//         if(!internalCheck.data) {
//             context.res.writeHead(403);
//             context.res.end();
//             return;
//         }
//     }
// )

const AdhocPayment = () => {
    const router = useRouter();
    const [orderId, setOrderId] = useState("")
    const [paymentType, setpaymentType] = useState("gap")
    const [amount, setamount] = useState("")
    const [notes, setnotes] = useState("")
    const methods = useForm();
    const { register, handleSubmit, errors } = methods;
    const getLinkClick = () => {  
        if(!errors.amount) {
            router.push(`/onlinepayment?orderid=${orderId}&type=${paymentType}&amount=${amount}&notes=${notes}`);
        }
    }

    useEffect(() => {     
        const queryParams = new URLSearchParams(window?.location?.search);
        setOrderId(queryParams.get("orderid"));
    }, []);

    return (
        <>
            <MetaHead>
                <title>Secure Online Payment - Product</title>
            </MetaHead>
            <section className="container-fluid py-3 py-md-5">
                <div className="container">
                    <div className="row">
                        <div className="col-24 col-md-20 offset-md-2">
                            <h1>Secure Online Payment - Product</h1>
                            <form onSubmit={handleSubmit(getLinkClick)}>
                                <div className="form-row mb-3">
                                    <div className="col-24 col-md-12 col-lg-5 mb-2 mb-md-0">
                                        <label className="w-100 d-block" htmlFor="paymentType">Payment Type:</label>
                                        <select onChange={(event) => { setpaymentType(event.currentTarget.value) }} id="paymentType" name="paymentType" className={`form-control ${errors.paymentType ? "is-invalid" : ""}`} ref={register({ required: true })}>
                                            <option value="gap">GAP</option>
                                            <option value="smart">SMART</option>
                                            <option value="procfee">PROC FEE</option>
                                            <option value="other">OTHER</option>
                                        </select>
                                    </div>                
                                    {paymentType === 'other' && 
                                        <div className="col-24 col-md-12 col-lg-7 mb-2 mb-md-0">
                                            <label className="w-100 d-block" htmlFor="notes">Notes</label>
                                            <textarea onChange={(event) => setnotes(event.currentTarget.value)} className="form-control form-control--input" name="notes" id="notes" aria-label="Notes" aria-describedby="notes"
                                                placeholder="Please add notes if they're relevant."
                                                ref={register()} defaultValue={notes}></textarea>
                                        </div>
                                    }
                                    <div className="col-24 col-md-12 col-lg-7 mb-3 mb-md-0">
                                        <label className="w-100 d-block" htmlFor="amount">Amount<small> (Required)</small></label>
                                        <input type="text" onChange={(event) => setamount(event.currentTarget.value)}  className={`form-control ${errors.amount ? "is-invalid" : ""}`} id="amount" name={"amount"} maxLength={100}
                                            ref={register({required: true})} defaultValue={amount} />
                                        {errors.amount && <span className="invalid-feedback d-block">This field is required</span>}
                                    </div>
                                    <div className="col-24 col-md-12 col-lg-5">
                                        <label className="w-100 d-none d-lg-block">&nbsp;</label>
                                        <button type="submit" className="btn btn-primary btn-lg">Get Link</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

AdhocPayment.layout = MainLayout;

export default AdhocPayment;