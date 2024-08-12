'use client';
import { loadLocations } from '@/actions/actions';
import { auth } from '@/auth';
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
            />
        </div>
    );
}
