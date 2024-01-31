import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { validateNumber } from "../validators/validateNumber";
import { calculateDeliveryFee } from "../helpers/calculateDeliveryFee";

import {
  CalculateDeliveryFeeParams,
  Fields,
  FormErrors,
  validateNumberParams,
  ValidateNumberResult,
} from "./../helpers/types";

const Calculator = () => {
  const [formState, setFormState] = useState<Fields>({
    cartValue: "",
    deliveryDistance: "",
    numberOfItems: "",
    orderTime: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    cartValue: "",
    deliveryDistance: "",
    numberOfItems: "",
  });

  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const fields: Fields = {
    cartValue: "cartValue",
    deliveryDistance: "deliveryDistance",
    numberOfItems: "numberOfItems",
    orderTime: "orderTime",
  };

  const updateFormValidity = () => {
    setIsFormValid(
      !!formState.cartValue.trim() &&
        !!formState.deliveryDistance.trim() &&
        !!formState.numberOfItems.trim() &&
        !!formState.orderTime.trim() &&
        !formErrors.cartValue &&
        !formErrors.deliveryDistance &&
        !formErrors.numberOfItems
    );
  };

  useEffect(() => {
    setDeliveryFee(0);
    const validateField = ({
      value,
      integer,
    }: validateNumberParams): string => {
      const validationResult: ValidateNumberResult = validateNumber({
        value,
        integer,
      });
      return validationResult.error;
    };
    setFormErrors((prev) => ({
      ...prev,
      cartValue: validateField({ value: formState.cartValue }),
      deliveryDistance: validateField({ value: formState.deliveryDistance }),
      numberOfItems: validateField({
        value: formState.numberOfItems,
        integer: true,
      }),
    }));
  }, [formState]);

  useEffect(() => {
    updateFormValidity();
  }, [formErrors]);

  const handleCalculate = () => {
    const params: CalculateDeliveryFeeParams = {
      cartValue: formState.cartValue,
      deliveryDistance: formState.deliveryDistance,
      numberOfItems: formState.numberOfItems,
      orderTime: formState.orderTime,
    };

    const calculatedResult = calculateDeliveryFee(params);
    const formatedResult = calculatedResult.result.toFixed(2);
    setDeliveryFee(parseFloat(formatedResult));
  };

  const handleChange = (field: keyof Fields, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container id="main-content">
      <Box my={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} style={{ margin: "auto" }}>
            <Paper elevation={3} square={false} style={{ padding: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Cart Value (€)"
                    fullWidth
                    variant="outlined"
                    value={formState.cartValue}
                    onChange={(e) =>
                      handleChange(
                        fields.cartValue as keyof Fields,
                        e.target.value
                      )
                    }
                    error={!!formErrors.cartValue}
                    helperText={formErrors.cartValue}
                    data-test-id={fields.cartValue}
                    id={fields.cartValue}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Delivery Distance (m)"
                    fullWidth
                    variant="outlined"
                    value={formState.deliveryDistance}
                    onChange={(e) =>
                      handleChange(
                        fields.deliveryDistance as keyof Fields,
                        e.target.value
                      )
                    }
                    error={!!formErrors.deliveryDistance}
                    helperText={formErrors.deliveryDistance}
                    data-test-id={fields.deliveryDistance}
                    id={fields.deliveryDistance}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Number of Items"
                    fullWidth
                    variant="outlined"
                    value={formState.numberOfItems}
                    onChange={(e) =>
                      handleChange(
                        fields.numberOfItems as keyof Fields,
                        e.target.value
                      )
                    }
                    error={!!formErrors.numberOfItems}
                    helperText={formErrors.numberOfItems}
                    data-test-id={fields.numberOfItems}
                    id={fields.numberOfItems}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Order Time"
                    fullWidth
                    variant="outlined"
                    type="datetime-local"
                    value={formState.orderTime}
                    onChange={(e) =>
                      handleChange(
                        fields.orderTime as keyof Fields,
                        e.target.value
                      )
                    }
                    InputLabelProps={{ shrink: true }}
                    data-test-id={fields.orderTime}
                    id={fields.orderTime}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box my={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCalculate}
                      disabled={!isFormValid}
                      data-test-id="calculateButton"
                    >
                      Calculate Delivery Fee
                    </Button>
                    {!!deliveryFee && (
                      <Typography
                        mt={2}
                        variant="body1"
                        id="delivery-fee-text"
                        aria-live="polite"
                        data-test-id="fee"
                        style={{ fontSize: "1rem" }}
                      >
                        Delivery Fee: €{deliveryFee}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Calculator;
