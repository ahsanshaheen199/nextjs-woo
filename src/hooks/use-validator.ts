import Validator from 'validatorjs';

export const useValidator = () => {
  function validate(data: any, rules: Validator.Rules) {
    const validator = new Validator(data, rules);

    validator.setAttributeFormatter(function (attribute) {
      return attribute.replace(/[A-Z]/g, (letter: string) => ` ${letter.toLowerCase()}`);
    });

    return validator;
  }

  return { validate };
};
