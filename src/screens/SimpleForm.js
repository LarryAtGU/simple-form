import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { Input } from "../components/ui/Input";
import { colors } from "../constants/colors";
import Button from "../components/ui/Button";
const initValue = {
  amount: { value: "", isValid: true },
  date: { value: "", isValid: true },
  description: { value: "", isValid: true },
};
export const SimpleForm = () => {
  const [input, setInput] = useState(initValue);
  const [formIsValid, setFormIsValid] = useState(true);
  const inputChangeHandler = (inputIdentifier, inputValue) =>
    setInput((curValues) => {
      return {
        ...curValues,
        [inputIdentifier]: { value: inputValue, isValid: true },
      };
    });

  const validateData = (data) => {
    const amountIsValid = !isNaN(data.amount) && data.amount > 0;
    // check !isNaN is redundant above
    const dateIsValid = data.date.toString() !== "Invalid Date";
    const descIsValid = data.description.trim().length > 10;

    setInput((curState) => {
      return {
        amount: { value: curState.amount.value, isValid: amountIsValid },
        date: { value: curState.date.value, isValid: dateIsValid },
        description: {
          value: curState.description.value,
          isValid: descIsValid,
        },
      };
    });
    const valid = amountIsValid && dateIsValid && descIsValid;
    setFormIsValid(valid);
    return valid;
  };
  const onCancelHandler = () => {
    setInput(initValue);
    setFormIsValid(true);
  };
  const onSubmitHandler = () => {
    const data = {
      amount: +input.amount.value, // convert string to number
      date: new Date(input.date.value),
      description: input.description.value,
    };
    if (validateData(data)) Alert.alert("Everything looks good...");
  };
  return (
    <View style={styles.form}>
      <Text style={styles.title}>My Simple Form</Text>
      <View style={styles.panel}>
        <Input
          label="Amount"
          invalid={!input.amount.isValid}
          style={styles.halfInput}
          config={{
            keyboardType: "decimal-pad",
            placeholder: "0.00",
            value: input.amount.value,
            onChangeText: inputChangeHandler.bind(null, "amount"),
          }}
        />
        <Input
          label="Date"
          invalid={!input.date.isValid}
          style={styles.halfInput}
          config={{
            placeholder: "YYYY-MM-DD",
            value: input.date.value,
            onChangeText: inputChangeHandler.bind(null, "date"),
            maxLength: 10,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!input.description.isValid}
        config={{
          multiline: true,
          //autoCorrect: false, // by default, it is true
          //autoCapitalize: 'none' // by default, it is sentence.
          value: input.description.value,
          onChangeText: inputChangeHandler.bind(null, "description"),
        }}
      />
      {!formIsValid && (
        <View style={styles.errorBack}>
          <Text style={styles.errorText}>
            Inputs are not valid, please check your input
          </Text>
        </View>
      )}
      <View style={styles.buttonPanel}>
        <Button onPress={onCancelHandler}>Cancel</Button>
        <Button onPress={onSubmitHandler}>Submit</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    width: "90%",
    backgroundColor: colors.primary700,
    padding: 5,
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    color: colors.primary50,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  panel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPanel: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  halfInput: {
    flex: 1,
  },
  errorBack: {
    backgroundColor: colors.primary50,
    padding: 5,
    borderRadius: 6,
  },
  errorText: {
    color: colors.error500,
    fontSize: 14,
    textAlign: "center",
  },
});
