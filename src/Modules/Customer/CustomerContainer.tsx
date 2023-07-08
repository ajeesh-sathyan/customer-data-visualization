import React, { useContext, useRef, useState } from "react";
import CustomerList from "./CustomerList";
import { AppContext } from "../../Context/Context";
import { ICustomer } from "../../Types/CustomerTypes";
import AddEditCustomer from "./AddEditCustomer";
import { Toast } from "primereact/toast";
import {
    addCustomer,
    deleteCustomers,
    updateCustomer,
} from "../../Context/Actions";

const CustomerContainer: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const toast = useRef<Toast | null>(null);
    const isAdd = useRef<boolean>(true);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
        null
    );
    const [showAddEditDialog, setShowAddEditDialog] = useState<boolean>(false);
    const confirmDeleteCustomers = (data: ICustomer[]) => {
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Selected customer(s) deleted successfully",
            life: 3000,
        });
        dispatch(deleteCustomers(data));
    };
    const addEditCustomerOnClick = (
        isAddaAction: boolean,
        user: ICustomer | null = null
    ) => {
        setSelectedCustomer(user);
        isAdd.current = isAddaAction;
        setShowAddEditDialog(true);
    };
    const saveCustomer = (customer: ICustomer) => {
        if (
            isAdd.current &&
            state.customers.find(
                (item: ICustomer) =>
                    item["customer e-mail"] === customer["customer e-mail"]
            )
        ) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Customer email exists",
                life: 2000,
            });
            return;
        }
        setShowAddEditDialog(false);
        setSelectedCustomer(null);
        dispatch(isAdd.current ? addCustomer(customer) : updateCustomer(customer));
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: `Customer ${isAdd.current ? "added" : "updated"} successfully`,
            life: 2000,
        });
    };
    return (
        <div>
            <Toast ref={toast} position="bottom-right" />
            <CustomerList
                customers={state.customers}
                deleteCustomer={confirmDeleteCustomers}
                addEditCustomer={addEditCustomerOnClick}
            />
            <AddEditCustomer
                isAdd={isAdd.current}
                show={showAddEditDialog}
                closeClick={() => setShowAddEditDialog(false)}
                customer={selectedCustomer}
                saveCustomer={saveCustomer}
            />
        </div>
    );
};

export default CustomerContainer;
