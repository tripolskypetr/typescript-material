namespace Material {

  const {
    h,
    Fragment,
  } = preact;

  const {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
  } = preactHooks;

  const {
    MDCFormField,
  } = mdc.formField;

  const {
    MDCTextField,
  } = mdc.textField;

  const {
    style
  } = typestyle;

  const CSS_CLASSES = {
    ROOT: 'mdc-text-field',
    FULLWIDTH: 'mdc-text-field--fullwidth',
    TEXTAREA: 'mdc-text-field--textarea',
    DENSE: 'mdc-text-field--dense',
    DISABLED: 'mdc-text-field--disabled',
    FOCUSED: 'mdc-text-field--focused',
    HELPER_LINE: 'mdc-text-field-helper-line',
    INVALID: 'mdc-text-field--invalid',
    NO_LABEL: 'mdc-text-field--no-label',
    OUTLINED: 'mdc-text-field--outlined',
    WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
    WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon',
  };

  const textFieldPaddingFix = style({
    padding: '11px',
  });

  export const TextField = ({
    className = '',
    leadingIcon = '',
    trailingIcon = '',
    fullWidth = false,
    outlined = false,
    textArea = false,
    disabled = false,
    focused = false,
    valid = true,
    value = '',
    label = '',
    helperText = '',
    maxLength = 20,
    onInput = (e) => console.log({e}),
    ...otherProps
  }) => {

    const mdcTextField = useRef(null);
    const textFieldElement = useRef(null);

    const [state, setState] = useState({
      trailingIcon,
      leadingIcon,
      helperText,
      disabled,
      value,
      valid,
    });

    useLayoutEffect(() => {
      const text = new MDCTextField(textFieldElement.current);
      mdcTextField.current = text;
      return () => mdcTextField.current = null;
    }, [fullWidth, outlined, textArea]);

    useEffect(() => {
      setState({
        trailingIcon,
        leadingIcon,
        helperText,
        disabled,
        value,
        valid,
      });
    }, [
      trailingIcon,
      leadingIcon,
      helperText,
      disabled,
      value,
      valid,
    ]);

    useEffect(() => {
      const {current} = mdcTextField;
      if (current) {
        current.value = state.value;
        current.disabled = state.disabled;
        current.valid = state.valid;
        current.helperTextContent = state.helperText;
        current.leadingIconContent = state.leadingIcon;
        current.trailingIconContent = state.trailingIcon;
      }
    }, [
      state.trailingIcon,
      state.leadingIcon,
      state.helperText,
      state.disabled,
      state.value,
      state.valid,
    ]);

    const classes = () => classNames(CSS_CLASSES.ROOT, 'text-field', {
      [CSS_CLASSES.FULLWIDTH]: fullWidth,
      [CSS_CLASSES.TEXTAREA]: textArea,
      [CSS_CLASSES.DISABLED]: disabled,
      [CSS_CLASSES.FOCUSED]: focused,
      [CSS_CLASSES.INVALID]: !valid,
      [CSS_CLASSES.OUTLINED]: outlined || textArea || fullWidth,
      [CSS_CLASSES.TEXTAREA]: textArea || fullWidth,
      [CSS_CLASSES.WITH_LEADING_ICON]: leadingIcon,
      [CSS_CLASSES.WITH_TRAILING_ICON]: trailingIcon,
      [CSS_CLASSES.NO_LABEL]: !label,
    });

    return (
      <div class="text-field-container" className={classNames(textFieldPaddingFix, className)}  {...otherProps}>
        <label ref={textFieldElement} className={classes()}>
          {state.leadingIcon && <Icon className="mdc-text-field__icon" icon={state.leadingIcon}/>}
          {textArea || fullWidth ? <textarea disabled={disabled} class="mdc-text-field__input" onInput={onInput}/> : <input disabled={disabled} onInput={onInput} class="mdc-text-field__input"/>}
          {outlined || textArea || fullWidth ? <div class="mdc-notched-outline">
            <div class="mdc-notched-outline__leading"/>
            <div class="mdc-notched-outline__notch">
              {label && <label class="mdc-floating-label">{label}</label>}
            </div>
            <div class="mdc-notched-outline__trailing"/>
          </div> : (label && <label class="mdc-floating-label">{label}</label>)}
          {state.trailingIcon ? <Icon className="mdc-text-field__icon" icon={state.trailingIcon}/> : null}
        </label>
        {state.helperText && (
          <div class="mdc-text-field-helper-line">
            <p class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg">
              {state.helperText}
            </p>
          </div>
        )}
      </div>
    );
  };

}

