/**
 *  Transform Numeric - Main
 */


export const convertToFormattedNumeric = (args: ConvertNumericArguments): string => {
    const _minFraction = args.minFractionDigits || 0;
    const _maxFraction = args.maxFractionDigits || _minFraction || 0;

    if(args.value) {
        const _formatted = args.value.toLocaleString('en-US', {
            minimumFractionDigits: _minFraction,
            maximumFractionDigits: _maxFraction
        });

        return _formatted;
    }

    const _dummyValue = 0;
    const _formatted = _dummyValue.toLocaleString('en-US', {
        minimumFractionDigits: _minFraction,
        maximumFractionDigits: _maxFraction
    });

    return _formatted;
}

export const convertToAntdInputFormatter = (args: { value?: number }): string => {
    if(args.value) {
        const [ intPart, fractionPart ] = `${ args.value }`.split('.');
        const _formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return (fractionPart) ? `${ _formattedIntPart }.${ fractionPart }` : `${ _formattedIntPart }`
    }

    return ('');
}

export interface ConvertNumericArguments {
    value: number | undefined | null;
    minFractionDigits?: number;
    maxFractionDigits?: number;
  }