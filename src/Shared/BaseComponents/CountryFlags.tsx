import React from "react";
import countryJson from "../../Assets/Data/isoCountries.json";
import flagPlaceHolder from "../../Assets/Images/flag_placeholder.png";

interface ICountryFlagProps {
    name: string;
}

const CountryFlag: React.FC<ICountryFlagProps> = (props) => {
    const { name } = props;
    const countryDetails = countryJson.find((item) => item.name === name);
    return (
        <div className="flex align-items-center gap-2">
            {countryDetails && (
                <img
                    alt="flag"
                    src={flagPlaceHolder}
                    className={`flag flag-${countryDetails.code.toLocaleLowerCase()}`}
                    style={{ width: "24px" }}
                />
            )}
            <span>{name}</span>
        </div>
    );
};

export default CountryFlag;
