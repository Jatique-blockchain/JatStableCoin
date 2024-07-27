export function formatToDollars(value: number | string): string {

    // Convert the value to a number
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    console.log("this is the numberValue", { numberValue });
    // Check if the conversion was successful
    if (isNaN(numberValue)) {
        return 'N/A';
    }

    // Use Intl.NumberFormat to format the number as USD
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    console.log("this is the formatter", { formatter });
    const formattedValue = formatter.format(numberValue);
    console.log("this is the formattedValue", { formattedValue });
    return formattedValue;
}