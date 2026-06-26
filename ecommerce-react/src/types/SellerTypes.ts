export interface PickupAddress{
  name: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  locality: string;
}

export interface BankDetails{
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

export interface BusinessDetails{
  businessName: string;
 
}

export interface Seller{
  id?: number;
  mobile: string;
  otp: string;
  gstin:string;
  pickupAddress:PickupAddress;
  bankDetails:BankDetails;
  businessDetails:BusinessDetails;
  sellerName: string;
  email:string;
  password:string;
accountStatus?:string;
}

export interface SellerReport{
  id: number;
  seller: Seller;
  totalEarnings: number;
  totalSales: number;
  totalRefunds: number;
  totalTax: number;
  netEarnings: number;
  totalOrders: number;
  canceledOrders: number;
  totalTransactions: number;
}