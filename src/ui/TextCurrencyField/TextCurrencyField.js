import { TextInputField } from "evergreen-ui";

const TextCurrencyField = (props) => {
    
  // const valueInputTextCurrencyConvert = (value) => {
  //   const valueDisplay = (value / 100).toLocaleString('en-US', {
  //     style: 'currency',
  //     currency: 'CAD',
  //   });

  //   return valueDisplay;
  // }

  return (
    <TextInputField
      label={props.label}
      description={props.description}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required
      validationMessage={props.validationMessage}
    />
  );
};

export default TextCurrencyField;
