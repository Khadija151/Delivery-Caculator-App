import {
  CalculateDeliveryFeeParams,
  CalculateDeliveryFeeResult,
} from "./types";
export const calculateDeliveryFee = ({
  cartValue,
  deliveryDistance,
  numberOfItems,
  orderTime,
}: CalculateDeliveryFeeParams): CalculateDeliveryFeeResult => {
  const FREE_DELIVERY_VALUE = 200;
  const BASE_FEE = 2;
  const MIN_CART_VALUE = 10;
  const MAX_DELIVERY_DISTANCE_BEFORE_EXTRA_FEE = 1000;
  const DELIVERY_DISTANCE_FEE_INTERVAL = 500;
  const ITEM_SURCHARGE_THRESHOLD_LOW = 5;
  const ITEM_SURCHARGE_THRESHOLD_HIGH = 12;
  const ITEM_SURCHARGE_LOW = 0.5;
  const ITEM_SURCHARGE_HIGH = 1.2;
  const RUSH_DAY = 5;
  const RUSH_HOUR_START = 15;
  const RUSH_HOUR_END = 19;
  const RUSH_HOUR_MULTIPLIER = 1.2;
  const MAX_TOTAL_FEE = 15;

  const cartValueFloat = parseFloat(cartValue);
  const deliveryDistanceValue = parseFloat(deliveryDistance);
  const numberOfItemsInt = parseInt(numberOfItems);
  const orderDate = new Date(orderTime);

  const freeDelivery = cartValueFloat >= FREE_DELIVERY_VALUE ? true : false;
  let calculatedValue = 0;
  if (!freeDelivery) {
    const cartValueSurcharge =
      cartValueFloat < MIN_CART_VALUE ? MIN_CART_VALUE - cartValueFloat : 0;

    const additionalDistanceFee =
      deliveryDistanceValue <= MAX_DELIVERY_DISTANCE_BEFORE_EXTRA_FEE
        ? 0
        : Math.ceil(
            (deliveryDistanceValue - MAX_DELIVERY_DISTANCE_BEFORE_EXTRA_FEE) /
              DELIVERY_DISTANCE_FEE_INTERVAL
          );
    const deliveryFee = Math.min(
      BASE_FEE + additionalDistanceFee,
      MAX_TOTAL_FEE
    );

    let itemSurcharge = 0;
    if (
      numberOfItemsInt >= ITEM_SURCHARGE_THRESHOLD_LOW &&
      numberOfItemsInt <= ITEM_SURCHARGE_THRESHOLD_HIGH
    ) {
      itemSurcharge =
        (numberOfItemsInt - (ITEM_SURCHARGE_THRESHOLD_LOW - 1)) *
        ITEM_SURCHARGE_LOW;
    } else if (numberOfItemsInt > ITEM_SURCHARGE_THRESHOLD_HIGH) {
      itemSurcharge =
        (numberOfItemsInt - (ITEM_SURCHARGE_THRESHOLD_LOW - 1)) *
          ITEM_SURCHARGE_LOW +
        ITEM_SURCHARGE_HIGH;
    }

    const isRushHour =
      orderDate.getDay() === RUSH_DAY &&
      orderDate.getHours() >= RUSH_HOUR_START &&
      orderDate.getHours() < RUSH_HOUR_END;
    const rushHourMultiplier = isRushHour ? RUSH_HOUR_MULTIPLIER : 1;

    calculatedValue = Math.min(
      (deliveryFee + cartValueSurcharge + itemSurcharge) * rushHourMultiplier,
      MAX_TOTAL_FEE
    );
  }
  return { result: calculatedValue.toFixed(2) };
};
