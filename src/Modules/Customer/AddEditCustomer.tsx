import React, { ChangeEvent, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Gender, ICustomer } from "../../Types/CustomerTypes";
import { classNames } from "primereact/utils";
import { validateEmail } from "../../Utilities/Utils";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import {
    Dropdown,
    DropdownChangeEvent,
    DropdownProps,
} from "primereact/dropdown";
import countryJson from "../../Assets/Data/isoCountries.json";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import CountryFlag from "../../Shared/BaseComponents/CountryFlags";

interface IAddEditCustomer {
    show: boolean;
    isAdd: boolean;
    customer: ICustomer | null;
    saveCustomer: (data: ICustomer) => void;
    closeClick: () => void;
}

const customerInitialData: ICustomer = {
    "customer name": "",
    age: 0,
    country: "",
    "annual Salary": 0,
    "car purchase amount": 0,
    "credit card debt": 0,
    "customer e-mail": "",
    "net worth": 0,
    gender: Gender.Male,
};
const AddEditCustomer: React.FC<IAddEditCustomer> = (props) => {
    const { show, isAdd, closeClick, saveCustomer, customer } = props;
    const [submitted, setSubmitted] = useState(false);
    const [customerForm, setCustomerForm] = useState<ICustomer>(
        customer || customerInitialData
    );
    const [selectedCountryOption, setSelectedCountryOption] = useState(
        customer ? countryJson.find((item) => item.name === customer.country) : null
    );
    console.log("customerForm", customerForm);

    useEffect(() => {
        setCustomerForm(customer || { ...customerInitialData });
        setSelectedCountryOption(
            customer
                ? countryJson.find((item) => item.name === customer.country)
                : null
        );
    }, [customer]);

    const setFormValue = (value: string | number | Gender, name: string) => {
        let customerTemp = { ...customerForm };

        (customerTemp as any)[`${name}`] = value;

        setCustomerForm(customerTemp);
    };

    const onInputChange = (
        e: ChangeEvent<HTMLInputElement> | RadioButtonChangeEvent,
        name: string
    ) => {
        setFormValue((e.target && e.target.value) || "", name);
    };

    const onInputRadioChange = (e: RadioButtonChangeEvent, name: string) => {
        setFormValue((e.target && e.target.value) || Gender.Male, name);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        setFormValue(e.value || 0, name);
    };

    const saveCustomerForm = () => {
        setSubmitted(true);
        if (
            customerForm["customer name"] &&
            customerForm["customer e-mail"] &&
            validateEmail(customerForm["customer e-mail"])
        ) {
            saveCustomer(customerForm);
            setCustomerForm(customerInitialData);
        }
    };

    const footer = (
        <React.Fragment>
            <Button
                label="Cancel"
                size="small"
                icon="pi pi-times"
                outlined
                onClick={closeClick}
            />
            <Button
                label={isAdd ? "Create" : "Update"}
                size="small"
                icon="pi pi-check"
                severity="success"
                onClick={saveCustomerForm}
            />
        </React.Fragment>
    );

    const countryChange = (e: DropdownChangeEvent) => {
        const val = (e.target && e.target.value) || "";
        setFormValue(val.name, "country");
        setSelectedCountryOption(val);
    };

    const selectedCountryTemplate = (
        option: { name: string },
        props: DropdownProps
    ) => {
        if (option) {
            return <CountryFlag name={option.name} />;
        }
        return <span>{props.placeholder}</span>;
    };
    const countryOptionTemplate = (option: { name: string }) => {
        return <CountryFlag name={option.name} />;
    };
    return (
        <Dialog
            visible={show}
            style={{ width: "50rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header={isAdd ? "Create customer" : "Uodate customer"}
            modal
            className="p-fluid"
            footer={footer}
            onHide={closeClick}
        >
            <div className="field">
                <label htmlFor="email" className="font-bold">
                    Email
                </label>
                <InputText
                    id="email"
                    type="email"
                    autoFocus
                    disabled={!isAdd}
                    value={customerForm["customer e-mail"]}
                    required
                    onChange={(e) => onInputChange(e, "customer e-mail")}
                    className={!validateEmail ? "p-invalid" : ""}
                />
                {submitted && !customerForm["customer e-mail"] && (
                    <small className="p-error">Email is required.</small>
                )}
            </div>
            <div className="field">
                <label htmlFor="name" className="font-bold">
                    Name
                </label>
                <InputText
                    id="name"
                    value={customerForm["customer name"]}
                    onChange={(e) => onInputChange(e, "customer name")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !customerForm["customer name"],
                    })}
                />
                {submitted && !customerForm["customer name"] && (
                    <small className="p-error">Name is required.</small>
                )}
            </div>
            <div className="field">
                <label htmlFor="country" className="font-bold">
                    Country
                </label>
                <Dropdown
                    value={selectedCountryOption}
                    onChange={countryChange}
                    options={countryJson}
                    optionLabel="name"
                    placeholder="Select a Country"
                    valueTemplate={selectedCountryTemplate}
                    itemTemplate={countryOptionTemplate}
                    appendTo={document.body}
                    className="w-full"
                />
            </div>
            <div className="grid">
                <div className="field col-6">
                    {" "}
                    <div className="field">
                        <label className="mb-3 font-bold">Gender</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton
                                    inputId="male"
                                    name="gender"
                                    value={Gender.Male}
                                    onChange={(e) => onInputRadioChange(e, "gender")}
                                    checked={customerForm.gender === Gender.Male}
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton
                                    inputId="female"
                                    name="gender"
                                    value={Gender.Female}
                                    onChange={(e) => onInputRadioChange(e, "gender")}
                                    checked={customerForm.gender === Gender.Female}
                                />
                                <label htmlFor="famale">Female</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field col-6">
                    <div className="field">
                        <label htmlFor="age" className="font-bold">
                            Age
                        </label>
                        <InputNumber
                            id="age"
                            value={customerForm.age}
                            onChange={(e) => onInputNumberChange(e, "age")}
                        />
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="field col-6">
                    <label htmlFor="anual-salary" className="font-bold">
                        Anual Salary
                    </label>
                    <InputNumber
                        id="age"
                        value={customerForm["annual Salary"]}
                        onChange={(e) => onInputNumberChange(e, "annual Salary")}
                    />
                </div>
                <div className="field col-6">
                    <label htmlFor="age" className="font-bold">
                        Creadit card debt
                    </label>
                    <InputNumber
                        id="creadit-card-debt"
                        value={customerForm["credit card debt"]}
                        onChange={(e) => onInputNumberChange(e, "credit card debt")}
                    />
                </div>
            </div>
            <div className="grid">
                <div className="field col-6">
                    <label htmlFor="age" className="font-bold">
                        Net worth
                    </label>
                    <InputNumber
                        id="net-worth"
                        value={customerForm["net worth"]}
                        onChange={(e) => onInputNumberChange(e, "net worth")}
                    />
                </div>
                <div className="field col-6">
                    <label htmlFor="age" className="font-bold">
                        car purchase amount
                    </label>
                    <InputNumber
                        id="car-purchase-amount"
                        value={customerForm["car purchase amount"]}
                        onChange={(e) => onInputNumberChange(e, "car purchase amount")}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default AddEditCustomer;
