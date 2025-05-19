import React from 'react';
import OriginalDatePicker from "../../../../components/DatePicker";

interface DatePickerWrapperProps {
    value: string | null;
    onChange: (dateString: string | null) => void;
}

// Hàm chuyển "dd/MM/yyyy" -> "yyyy-MM-dd"
const convertToISOFormat = (dateStr: string): string | null => {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const DatePickerWrapper: React.FC<DatePickerWrapperProps> = ({ value, onChange }) => {
    const handleDateChange = (val: string | null) => {
        if (!val) {
            onChange(null);
            return;
        }

        const isoDate = convertToISOFormat(val);
        onChange(isoDate);
        console.log('✅ ISO date format:', isoDate);
    };

    return (
        <OriginalDatePicker
            value={value}
            onChange={handleDateChange}
        />
    );
};

export default DatePickerWrapper;
