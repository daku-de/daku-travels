'use client';
import StatusDropDown from './statusDropdown';
import CountryDropdown from './countryDropdown';

export default function EditPage() {
    return (
        <div>
            <StatusDropDown onStatusChange={(s) => console.log(s)} />
            <CountryDropdown
                onCountryChange={(c) => {
                    console.log(c);
                }}
                error={false}
            />
        </div>
    );
}
