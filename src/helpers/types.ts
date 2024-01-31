export interface CalculateDeliveryFeeParams {
  cartValue: string;
  deliveryDistance: string;
  numberOfItems: string;
  orderTime: string;
}

export interface CalculateDeliveryFeeResult {
  result: number;
}

export interface Fields{
  cartValue: string;
  deliveryDistance: string;
  numberOfItems: string;
  orderTime: string;
}

export interface FormErrors {
  cartValue: string ;
  deliveryDistance: string;
  numberOfItems: string;
}

export interface validateNumberParams {
  value: string;
  integer?: boolean;
}
export interface ValidateNumberResult {
  error: string ;
}